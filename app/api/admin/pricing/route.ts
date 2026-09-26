import { NextResponse } from "next/server";
import { getAllPricing, savePriceRow } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const pricing = await getAllPricing();
  return NextResponse.json({ success: true, data: pricing });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Nicht autorisiert." }, { status: 401 });
  }

  const body = await request.json();
  const row = await savePriceRow(body);
  return NextResponse.json({ success: true, data: row });
}
