import { NextResponse } from "next/server";
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

  const { id } = await params;
  const success = await deleteGalleryItem(parseInt(id, 10));

  return NextResponse.json({ success });
}
