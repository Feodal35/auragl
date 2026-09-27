import { NextResponse } from "next/server";
import { ContactMessageSchema } from "@/lib/validations";
import { createContactMessage } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`contact-${ip}`, 5, 600000);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Zu viele Anfragen. Bitte warte einige Minuten, bevor du es erneut versuchst.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    const validated = ContactMessageSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Bitte überprüfe deine Eingaben.",
          details: validated.error.flatten(),
        },
        { status: 400 }
      );
    }

    const message = await createContactMessage({
      name: validated.data.name,
      email: validated.data.email,
      phone: validated.data.phone,
      subject: validated.data.subject,
      message: validated.data.message,
      privacy_accepted: validated.data.privacy_accepted,
    });

    // Dispatch notification
    sendContactNotification(validated.data).catch((err) =>
      console.error("[Contact Notification Error]:", err)
    );

    return NextResponse.json({
      success: true,
      data: message,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Ein interner Fehler ist aufgetreten. Bitte versuche es später noch einmal.",
      },
      { status: 500 }
    );
  }
}
