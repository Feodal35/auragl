import { NextResponse } from "next/server";
import { AppointmentRequestSchema } from "@/lib/validations";
import { createAppointmentRequest } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendAppointmentNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`appointment-${ip}`, 5, 600000);

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

    const validated = AppointmentRequestSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Bitte überprüfe deine Eingaben in den markierten Feldern.",
          details: validated.error.flatten(),
        },
        { status: 400 }
      );
    }

    const appointment = await createAppointmentRequest({
      first_name: validated.data.first_name,
      last_name: validated.data.last_name,
      email: validated.data.email,
      phone: validated.data.phone,
      treatment_title: validated.data.treatment_title,
      preferred_date: validated.data.preferred_date,
      preferred_time: validated.data.preferred_time,
      alternative_date: validated.data.alternative_date,
      notes: validated.data.notes,
      privacy_accepted: validated.data.privacy_accepted,
    });

    // Dispatch notification
    sendAppointmentNotification(validated.data).catch((err) =>
      console.error("[Appointment Notification Error]:", err)
    );

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Die Anfrage konnte nicht gespeichert werden. Bitte versuche es später noch einmal.",
      },
      { status: 500 }
    );
  }
}
