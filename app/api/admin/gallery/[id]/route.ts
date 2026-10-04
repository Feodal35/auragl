import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveGalleryItem, deleteGalleryItem } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveGalleryItem({ ...body, id: parseInt(id, 10) });

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/galerie");
    revalidatePath("/admin/galerie");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[Gallery PUT Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Aktualisieren." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveGalleryItem({ ...body, id: parseInt(id, 10) });

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/galerie");
    revalidatePath("/admin/galerie");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[Gallery PATCH Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Aktualisieren." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteGalleryItem(parseInt(id, 10));

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/galerie");
    revalidatePath("/admin/galerie");

    return NextResponse.json({ success });
  } catch (err: any) {
    console.error("[Gallery DELETE Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Löschen." },
      { status: 500 }
    );
  }
}
