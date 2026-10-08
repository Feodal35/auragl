import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveCaseStudy, deleteCaseStudy } from "@/lib/db";
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
    const updated = await saveCaseStudy({ ...body, id: parseInt(id, 10) });

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin/fallstudien");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[CaseStudies PUT Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Aktualisieren der Fallstudie." },
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
    const updated = await saveCaseStudy({ ...body, id: parseInt(id, 10) });

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin/fallstudien");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[CaseStudies PATCH Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Aktualisieren der Fallstudie." },
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
    const success = await deleteCaseStudy(parseInt(id, 10));

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin/fallstudien");

    return NextResponse.json({ success });
  } catch (err: any) {
    console.error("[CaseStudies DELETE Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Löschen der Fallstudie." },
      { status: 500 }
    );
  }
}
