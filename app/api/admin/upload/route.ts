import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { addMediaItem } from "@/lib/db";
import { createAdminClient, hasSupabaseConfigured } from "@/lib/supabase";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Validates image header magic bytes to prevent MIME-type spoofing
 */
function isValidImageHeader(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;

  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;

  // WEBP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)
  if (buffer.length >= 12 && buffer.toString("utf-8", 0, 4) === "RIFF" && buffer.toString("utf-8", 8, 12) === "WEBP") {
    return true;
  }

  return false;
}

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

    // 1. Validate file extension
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, error: "Ungültige Dateiendung. Erlaubt sind JPG, PNG, WEBP." },
        { status: 400 }
      );
    }

    // 2. Validate declared MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Ungültiges Dateiformat. Erlaubt sind JPG, PNG, WEBP." },
        { status: 400 }
      );
    }

    // 3. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Die Datei überschreitet die Maximalgröße von 5 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Validate image binary magic bytes (anti-spoofing)
    if (!isValidImageHeader(buffer)) {
      return NextResponse.json(
        { success: false, error: "Die Datei ist kein gültiges Bild oder wurde manipuliert." },
        { status: 400 }
      );
    }

    // Sanitized, collision-safe filename
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const uniqueFilename = `${cleanBase}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;

    let publicUrl = `/uploads/${uniqueFilename}`;
    let storedFilePath = uniqueFilename;

    // 5. If Supabase Storage is configured, upload to cloud bucket
    if (hasSupabaseConfigured()) {
      const adminSupabase = createAdminClient();
      if (adminSupabase) {
        const { error: uploadError } = await adminSupabase.storage
          .from("media")
          .upload(`uploads/${uniqueFilename}`, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!uploadError) {
          const { data: publicUrlData } = adminSupabase.storage
            .from("media")
            .getPublicUrl(`uploads/${uniqueFilename}`);
          publicUrl = publicUrlData.publicUrl;
          storedFilePath = `supabase://media/uploads/${uniqueFilename}`;
        }
      }
    } else {
      // Local development fallback to filesystem
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const fullPath = path.join(uploadDir, uniqueFilename);
      await writeFile(fullPath, buffer);
      storedFilePath = fullPath;
    }

    const media = await addMediaItem({
      filename: uniqueFilename,
      original_name: file.name,
      file_path: storedFilePath,
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
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Fehler beim Hochladen der Datei." },
      { status: 500 }
    );
  }
}
