import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDesignSettings, saveDesignSetting } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const design = await getDesignSettings();
  return NextResponse.json({ success: true, data: design });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const saved = await saveDesignSetting(body);

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/ueber-uns");
    revalidatePath("/kontakt");
    revalidatePath("/leistungen");
    revalidatePath("/preise");
    revalidatePath("/galerie");
    revalidatePath("/admin/design");

    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    console.error("[Design POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern des Designs." },
      { status: 500 }
    );
  }
}
