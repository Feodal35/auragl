import { cookies } from "next/headers";
import { signSessionToken, verifySessionToken } from "./token";

const SESSION_COOKIE_NAME = "aura_admin_session";

export interface AdminUser {
  email: string;
  role: string;
}

/**
 * Checks server-side if current request has a valid admin session.
 * Checks HMAC-SHA256 signed secure HTTP-only session cookie.
 */
export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  const verified = await verifySessionToken(sessionCookie);
  if (verified && verified.email) {
    return {
      email: verified.email,
      role: verified.role || "admin",
    };
  }

  return null;
}

/**
 * Server-side login handler.
 * Validates credentials via environment variables or default studio credentials.
 * Issues an HMAC-SHA256 signed HTTP-only cookie upon success.
 */
export async function loginAdmin(email: string, pass: string): Promise<{ success: boolean; error?: string }> {
  const normalizedEmail = (email || "").trim().toLowerCase();
  const envAdminEmail = (process.env.ADMIN_EMAIL || "auralow@gmail.com").trim().toLowerCase();
  const envAdminPass = (process.env.ADMIN_PASSWORD || "AuraLow2828..").trim();

  if (normalizedEmail === envAdminEmail && (pass || "").trim() === envAdminPass) {
    const cookieStore = await cookies();
    const token = await signSessionToken({
      email: normalizedEmail,
      role: "admin",
    });

    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return { success: true };
  }

  return { success: false, error: "Ungültige Anmeldedaten." };
}

/**
 * Logout handler.
 */
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
