import { NextResponse } from "next/server";
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

  const body = await request.json();

  if (body.business) {
    await saveBusinessSettings(body.business);
  }
  if (body.hours) {
    await saveOpeningHours(body.hours);
  }

  return NextResponse.json({ success: true });
}
