import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getBusinessSettings,
  saveBusinessSettings,
  getOpeningHours,
  saveOpeningHours,
} from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const [business, hours] = await Promise.all([
    getBusinessSettings(),
    getOpeningHours(),
  ]);

  return NextResponse.json({ success: true, data: { business, hours } });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.business) {
      await saveBusinessSettings(body.business);
    }
    if (body.hours) {
      await saveOpeningHours(body.hours);
    }

    // Immediately purge Next.js server & ISR cache for all pages
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/kontakt");
    revalidatePath("/ueber-uns");
    revalidatePath("/termin");
    revalidatePath("/leistungen");
    revalidatePath("/preise");
    revalidatePath("/galerie");
    revalidatePath("/admin/einstellungen");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[Settings POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern der Einstellungen." },
      { status: 500 }
    );
  }
}
