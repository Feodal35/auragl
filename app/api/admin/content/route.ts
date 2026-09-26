import { NextResponse } from "next/server";
import { getContentSections, saveContentSection } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const sections = await getContentSections();
  return NextResponse.json({ success: true, data: sections });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const body = await request.json();
  const saved = await saveContentSection(body);
  return NextResponse.json({ success: true, data: saved });
}
