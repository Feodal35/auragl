import { NextResponse } from "next/server";
import { updateMessageStatus } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const success = await updateMessageStatus(id, body.status, body.internal_notes);
  if (!success) {
    return NextResponse.json({ success: false, error: "Nachricht nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
