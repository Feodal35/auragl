import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllCaseStudies, saveCaseStudy } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const caseStudies = await getAllCaseStudies();
  return NextResponse.json({ success: true, data: caseStudies });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const caseStudy = await saveCaseStudy(body);

    // Instant revalidation so homepage updates immediately
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin/fallstudien");

    return NextResponse.json({ success: true, data: caseStudy });
  } catch (err: any) {
    console.error("[CaseStudies POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern der Fallstudie." },
      { status: 500 }
    );
  }
}
