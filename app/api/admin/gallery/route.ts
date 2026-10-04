import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllGalleryItems, saveGalleryItem } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const items = await getAllGalleryItems();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const item = await saveGalleryItem(body);

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/galerie");
    revalidatePath("/admin/galerie");

    return NextResponse.json({ success: true, data: item });
  } catch (err: any) {
    console.error("[Gallery POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern der Galerie." },
      { status: 500 }
    );
  }
}
