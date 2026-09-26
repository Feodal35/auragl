import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { addMediaItem } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "general";
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ success: false, error: "Keine Datei hochgeladen." }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Ungültiges Dateiformat. Erlaubt sind JPG, PNG, WEBP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Die Datei überschreitet die Maximalgröße von 5 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Collision-safe filename
    const ext = path.extname(file.name) || ".jpg";
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${cleanBase}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const fullPath = path.join(uploadDir, uniqueFilename);

    await writeFile(fullPath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;

    const media = await addMediaItem({
      filename: uniqueFilename,
      original_name: file.name,
      file_path: fullPath,
      public_url: publicUrl,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: altText,
      category,
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      media,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Fehler beim Hochladen der Datei." },
      { status: 500 }
    );
  }
}
