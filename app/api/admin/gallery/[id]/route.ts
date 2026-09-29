import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteGalleryItem } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

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

    return NextResponse.json({ success });
  } catch (err: any) {
    console.error("[Gallery DELETE Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Löschen." },
      { status: 500 }
    );
  }
}
