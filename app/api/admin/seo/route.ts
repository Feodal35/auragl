import { NextResponse } from "next/server";
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

  const body = await request.json();
  const saved = await saveSeoSetting(body.key, body.setting);
  return NextResponse.json({ success: true, data: saved });
}
