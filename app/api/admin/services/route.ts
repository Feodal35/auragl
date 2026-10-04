import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllServices, saveService } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const services = await getAllServices();
  return NextResponse.json({ success: true, data: services });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const service = await saveService(body);

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/leistungen");
    revalidatePath("/termin");
    revalidatePath("/admin/leistungen");

    return NextResponse.json({ success: true, data: service });
  } catch (err: any) {
    console.error("[Services POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern des Services." },
      { status: 500 }
    );
  }
}
