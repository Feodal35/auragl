import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllTestimonials, saveTestimonial } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const testimonials = await getAllTestimonials();
  return NextResponse.json({ success: true, data: testimonials });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const testimonial = await saveTestimonial(body);

    // Instant revalidation so homepage updates immediately
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin/bewertungen");

    return NextResponse.json({ success: true, data: testimonial });
  } catch (err: any) {
    console.error("[Testimonials POST Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Fehler beim Speichern der Bewertung." },
      { status: 500 }
    );
  }
}
