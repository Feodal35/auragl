import { NextResponse } from "next/server";
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

  const body = await request.json();
  const saved = await saveDesignSetting(body);
  return NextResponse.json({ success: true, data: saved });
}
