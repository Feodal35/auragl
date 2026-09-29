import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await savePriceRow({ ...body, id: parseInt(id, 10) });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[Pricing PUT Error]:", err);
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
    const success = await deletePriceRow(parseInt(id, 10));

    revalidatePath("/", "layout");

    return NextResponse.json({ success });
  } catch (err: any) {
    console.error("[Pricing DELETE Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Löschen." },
      { status: 500 }
    );
  }
}
