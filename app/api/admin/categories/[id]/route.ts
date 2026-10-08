import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveCategory } from "@/lib/db";
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
    const updated = await saveCategory({ ...body, id: parseInt(id, 10) });

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/leistungen");
    revalidatePath("/admin/leistungen");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[Categories PUT Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Aktualisieren der Kategorie." },
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
    const updated = await saveCategory({ ...body, id: parseInt(id, 10) });

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/leistungen");
    revalidatePath("/admin/leistungen");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[Categories PATCH Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Aktualisieren der Kategorie." },
      { status: 500 }
    );
  }
}
