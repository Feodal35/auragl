import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllCategories, saveCategory } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const categories = await getAllCategories();
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await saveCategory(body);

    // Instant cache purge for homepage and services
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/leistungen");
    revalidatePath("/admin/leistungen");

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    console.error("[Categories POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern der Kategorie." },
      { status: 500 }
    );
  }
}
