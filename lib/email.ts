/**
 * Email and Notification Dispatcher for Aura Glow by Mürvet
 * Supports:
 * 1. Resend API (via process.env.RESEND_API_KEY)
 * 2. Webhook notification (via process.env.NOTIFICATION_WEBHOOK_URL - Slack, Discord, Zapier, Make)
 * 3. Graceful fallback logging for local development & offline environments
 */

export interface AppointmentNotificationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  treatment_title: string;
  preferred_date: string;
  preferred_time?: string | null;
  alternative_date?: string | null;
  notes?: string | null;
}

export interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

const DEFAULT_SENDER = "Aura Glow Studio <onboarding@resend.dev>";

/** Studio owner notification address — all form submissions land here */
const STUDIO_EMAIL = "murvetdincer@aura6lowbymürvet.de";

export async function sendAppointmentNotification(data: AppointmentNotificationData): Promise<boolean> {
  const recipient =
    process.env.NOTIFICATION_EMAIL_TO ||
    STUDIO_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

  const timeDisplay = data.preferred_time ? ` um ${data.preferred_time} Uhr` : "";
  const subject = `Neue Terminanfrage: ${data.first_name} ${data.last_name} - ${data.treatment_title}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
      <h2 style="color: #795548; margin-top: 0;">Neue Terminanfrage eingegangen</h2>
      <p>Es liegt eine neue Terminanfrage über die Website vor:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Kunde:</td><td>${data.first_name} ${data.last_name}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">E-Mail:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Telefon:</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Behandlung:</td><td>${data.treatment_title}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Wunschtermin:</td><td>${data.preferred_date}${timeDisplay}</td></tr>
        ${data.alternative_date ? `<tr><td style="padding: 8px 0; font-weight: bold;">Ausweichtermin:</td><td>${data.alternative_date}</td></tr>` : ""}
        ${data.notes ? `<tr><td style="padding: 8px 0; font-weight: bold;">Hinweise:</td><td>${data.notes}</td></tr>` : ""}
      </table>
      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        Aura Glow by Mürvet • Automatisches Benachrichtigungssystem
      </div>
    </div>
  `;

  let sent = false;

  // 1. Resend API
  if (resendApiKey && recipient) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFICATION_EMAIL_FROM || DEFAULT_SENDER,
          to: [recipient],
          reply_to: data.email,
          subject,
          html,
        }),
      });

      if (response.ok) {
        sent = true;
      } else {
        const errorText = await response.text();
        console.error("[Email Notification Error - Resend]:", errorText);
      }
    } catch (err) {
      console.error("[Email Notification Network Error]:", err);
    }
  }

  // 2. Webhook notification (Slack/Discord/n8n/Zapier)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📅 *Neue Terminanfrage*\n*Name:* ${data.first_name} ${data.last_name}\n*Behandlung:* ${data.treatment_title}\n*Datum:* ${data.preferred_date} ${data.preferred_time}\n*Kontakt:* ${data.email} | ${data.phone}`,
          content: `📅 **Neue Terminanfrage:** ${data.first_name} ${data.last_name} (${data.treatment_title}) - ${data.preferred_date} ${data.preferred_time}`,
          type: "appointment_request",
          data,
        }),
      });
      sent = true;
    } catch (err) {
      console.error("[Webhook Notification Error]:", err);
    }
  }

  // 3. Fallback log for development/offline
  if (!sent) {
    console.info(`[Notification Info] Appointment submitted: ${data.first_name} ${data.last_name} for "${data.treatment_title}" on ${data.preferred_date}`);
  }

  return true;
}

export async function sendContactNotification(data: ContactNotificationData): Promise<boolean> {
  const recipient =
    process.env.NOTIFICATION_EMAIL_TO ||
    STUDIO_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

  const subject = `Neue Kontaktanfrage: ${data.name} - ${data.subject}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
      <h2 style="color: #795548; margin-top: 0;">Neue Kontaktanfrage eingegangen</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${data.name}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">E-Mail:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Telefon:</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : ""}
        <tr><td style="padding: 8px 0; font-weight: bold;">Betreff:</td><td>${data.subject}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Nachricht:</td><td style="white-space: pre-wrap;">${data.message}</td></tr>
      </table>
      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        Aura Glow by Mürvet • Automatisches Benachrichtigungssystem
      </div>
    </div>
  `;

  let sent = false;

  // 1. Resend API
  if (resendApiKey && recipient) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFICATION_EMAIL_FROM || DEFAULT_SENDER,
          to: [recipient],
          reply_to: data.email,
          subject,
          html,
        }),
      });

      if (response.ok) {
        sent = true;
      } else {
        const errorText = await response.text();
        console.error("[Email Notification Error - Resend]:", errorText);
      }
    } catch (err) {
      console.error("[Email Notification Network Error]:", err);
    }
  }

  // 2. Webhook notification
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `💬 *Neue Kontaktnachricht*\n*Name:* ${data.name}\n*Betreff:* ${data.subject}\n*Kontakt:* ${data.email}${data.phone ? ` | ${data.phone}` : ""}\n*Nachricht:* ${data.message}`,
          content: `💬 **Neue Kontaktnachricht:** ${data.name} (${data.subject})`,
          type: "contact_message",
          data,
        }),
      });
      sent = true;
    } catch (err) {
      console.error("[Webhook Notification Error]:", err);
    }
  }

  // 3. Fallback log for development/offline
  if (!sent) {
    console.info(`[Notification Info] Contact message from: ${data.name} (${data.subject})`);
  }

  return true;
}
