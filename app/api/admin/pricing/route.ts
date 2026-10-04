import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllPricing, savePriceRow } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const pricing = await getAllPricing();
  return NextResponse.json({ success: true, data: pricing });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const row = await savePriceRow(body);

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/preise");
    revalidatePath("/admin/preise");

    return NextResponse.json({ success: true, data: row });
  } catch (err: any) {
    console.error("[Pricing POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern der Preise." },
      { status: 500 }
    );
  }
}
