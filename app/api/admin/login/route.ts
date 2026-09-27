import { NextResponse } from "next/server";
import { AdminLoginSchema } from "@/lib/validations";
import { loginAdmin } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`login-${ip}`, 5, 900000); // 5 attempts per 15 minutes

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Zu viele Fehlversuche. Bitte versuche es in 15 Minuten erneut.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = AdminLoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Bitte gib eine gültige E-Mail und ein Passwort ein." },
        { status: 400 }
      );
    }

    const result = await loginAdmin(validated.data.email, validated.data.password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Ungültige Anmeldedaten." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[Admin Login Server Error]:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Anmeldung fehlgeschlagen." },
      { status: 500 }
    );
  }
}
