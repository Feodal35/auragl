import { NextResponse } from "next/server";
import { savePriceRow, deletePriceRow } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updated = await savePriceRow({ ...body, id: parseInt(id, 10) });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;
  const success = await deletePriceRow(parseInt(id, 10));

  return NextResponse.json({ success });
}
