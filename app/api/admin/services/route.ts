import { NextResponse } from "next/server";
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

  const body = await request.json();
  const service = await saveService(body);
  return NextResponse.json({ success: true, data: service });
}
