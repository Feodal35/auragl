/**
 * Email and Notification Dispatcher for Aura Glow by Mürvet
 *
 * Sends via Gmail SMTP (Nodemailer) — completely free, unlimited.
 * Setup: Google Account → Security → 2-Step Verification → App Passwords → Mail
 * Env vars needed:  GMAIL_USER=auralow@gmail.com  GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
 */

import nodemailer from "nodemailer";

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

/** Studio owner — all form notifications go here */
const STUDIO_EMAIL = "Murvetdincer@aura6lowbymürvet.de";

function createTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendAppointmentNotification(
  data: AppointmentNotificationData
): Promise<boolean> {
  const recipient = process.env.NOTIFICATION_EMAIL_TO || STUDIO_EMAIL;
  const timeDisplay = data.preferred_time ? ` um ${data.preferred_time} Uhr` : "";

  const subject = `📅 Terminanfrage: ${data.first_name} ${data.last_name} – ${data.treatment_title}`;
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF6F1; border: 1px solid #E8D6C5; border-radius: 6px; overflow: hidden;">
      <div style="background: #392D29; padding: 24px 28px;">
        <h2 style="color: #EFE6DD; margin: 0; font-size: 20px; font-weight: normal; letter-spacing: 0.04em;">
          Neue Terminanfrage
        </h2>
        <p style="color: #D9A891; margin: 4px 0 0; font-size: 13px;">Aura Glow by Mürvet · Peine</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #392D29;">
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #756A63;">Kunde</td>
            <td style="padding: 10px 0;">${data.first_name} ${data.last_name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">E-Mail</td>
            <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #A26D57;">${data.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">Telefon</td>
            <td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #A26D57;">${data.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">Behandlung</td>
            <td style="padding: 10px 0; font-weight: bold;">${data.treatment_title}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">Wunschtermin</td>
            <td style="padding: 10px 0;">${data.preferred_date}${timeDisplay}</td>
          </tr>
          ${data.alternative_date ? `
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">Ausweichtermin</td>
            <td style="padding: 10px 0;">${data.alternative_date}</td>
          </tr>` : ""}
          ${data.notes ? `
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #756A63; vertical-align: top;">Hinweise</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${data.notes}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #EFE6DD; border-radius: 4px; text-align: center;">
          <a href="mailto:${data.email}?subject=Re: Terminanfrage ${data.treatment_title}"
             style="display: inline-block; padding: 10px 24px; background: #A26D57; color: white; text-decoration: none; border-radius: 4px; font-size: 14px;">
            ✉️ ${data.first_name} antworten
          </a>
        </div>
      </div>
      <div style="padding: 14px 28px; background: #F0E8DF; font-size: 11px; color: #A0897E; text-align: center;">
        Aura Glow by Mürvet · Ernst-Moritz-Arndt-Straße 13, 31224 Peine
      </div>
    </div>
  `;

  let sent = false;
  const transport = createTransport();

  // 1. Gmail SMTP (free, unlimited)
  if (transport) {
    try {
      await transport.sendMail({
        from: `"${data.first_name} ${data.last_name} via Aura Glow" <${process.env.GMAIL_USER}>`,
        replyTo: `"${data.first_name} ${data.last_name}" <${data.email}>`,
        to: recipient,
        subject,
        html,
      });
      sent = true;
    } catch (err) {
      console.error("[Email Error - Gmail SMTP]:", err);
    }
  }

  // 2. Webhook fallback (Slack/Discord/n8n/Zapier) — optional
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!sent && webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📅 *Neue Terminanfrage*\n*Name:* ${data.first_name} ${data.last_name}\n*Behandlung:* ${data.treatment_title}\n*Datum:* ${data.preferred_date} ${data.preferred_time}\n*Kontakt:* ${data.email} | ${data.phone}`,
        }),
      });
      sent = true;
    } catch (err) {
      console.error("[Webhook Error]:", err);
    }
  }

  if (!sent) {
    console.info(
      `[Notification] Appointment: ${data.first_name} ${data.last_name} – ${data.treatment_title} – ${data.preferred_date}` +
      `\n  → GMAIL_USER or GMAIL_APP_PASSWORD not set. Add them to Vercel env vars.`
    );
  }

  return true;
}

export async function sendContactNotification(
  data: ContactNotificationData
): Promise<boolean> {
  const recipient = process.env.NOTIFICATION_EMAIL_TO || STUDIO_EMAIL;

  const subject = `💬 Kontaktanfrage: ${data.name} – ${data.subject}`;
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF6F1; border: 1px solid #E8D6C5; border-radius: 6px; overflow: hidden;">
      <div style="background: #392D29; padding: 24px 28px;">
        <h2 style="color: #EFE6DD; margin: 0; font-size: 20px; font-weight: normal; letter-spacing: 0.04em;">
          Neue Kontaktanfrage
        </h2>
        <p style="color: #D9A891; margin: 4px 0 0; font-size: 13px;">Aura Glow by Mürvet · Peine</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #392D29;">
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #756A63;">Name</td>
            <td style="padding: 10px 0;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">E-Mail</td>
            <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #A26D57;">${data.email}</a></td>
          </tr>
          ${data.phone ? `
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">Telefon</td>
            <td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #A26D57;">${data.phone}</a></td>
          </tr>` : ""}
          <tr style="border-bottom: 1px solid #E8D6C5;">
            <td style="padding: 10px 0; font-weight: bold; color: #756A63;">Betreff</td>
            <td style="padding: 10px 0; font-weight: bold;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #756A63; vertical-align: top;">Nachricht</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #EFE6DD; border-radius: 4px; text-align: center;">
          <a href="mailto:${data.email}?subject=Re: ${data.subject}"
             style="display: inline-block; padding: 10px 24px; background: #A26D57; color: white; text-decoration: none; border-radius: 4px; font-size: 14px;">
            ✉️ ${data.name.split(" ")[0]} antworten
          </a>
        </div>
      </div>
      <div style="padding: 14px 28px; background: #F0E8DF; font-size: 11px; color: #A0897E; text-align: center;">
        Aura Glow by Mürvet · Ernst-Moritz-Arndt-Straße 13, 31224 Peine
      </div>
    </div>
  `;

  let sent = false;
  const transport = createTransport();

  // 1. Gmail SMTP
  if (transport) {
    try {
      await transport.sendMail({
        from: `"${data.name} via Aura Glow" <${process.env.GMAIL_USER}>`,
        replyTo: `"${data.name}" <${data.email}>`,
        to: recipient,
        subject,
        html,
      });
      sent = true;
    } catch (err) {
      console.error("[Email Error - Gmail SMTP]:", err);
    }
  }

  // 2. Webhook fallback
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!sent && webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `💬 *Neue Kontaktnachricht*\n*Name:* ${data.name}\n*Betreff:* ${data.subject}\n*Kontakt:* ${data.email}${data.phone ? ` | ${data.phone}` : ""}\n*Nachricht:* ${data.message}`,
        }),
      });
      sent = true;
    } catch (err) {
      console.error("[Webhook Error]:", err);
    }
  }

  if (!sent) {
    console.info(
      `[Notification] Contact from: ${data.name} (${data.subject})` +
      `\n  → GMAIL_USER or GMAIL_APP_PASSWORD not set. Add them to Vercel env vars.`
    );
  }

  return true;
}
