import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllSeoSettings, saveSeoSetting } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const seo = await getAllSeoSettings();
  return NextResponse.json({ success: true, data: seo });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const saved = await saveSeoSetting(body.key, body.setting);

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/leistungen");
    revalidatePath("/preise");
    revalidatePath("/galerie");
    revalidatePath("/ueber-uns");
    revalidatePath("/termin");
    revalidatePath("/kontakt");
    revalidatePath("/admin/seo");

    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    console.error("[Seo POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern der SEO-Einstellungen." },
      { status: 500 }
    );
  }
}
