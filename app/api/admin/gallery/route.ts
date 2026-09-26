import { NextResponse } from "next/server";
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

  const body = await request.json();
  const item = await saveGalleryItem(body);
  return NextResponse.json({ success: true, data: item });
}
