import { cookies } from "next/headers";
import { hasSupabaseConfigured, createServerSideClient } from "./supabase";
import { signSessionToken, verifySessionToken } from "./token";

const SESSION_COOKIE_NAME = "aura_admin_session";

export interface AdminUser {
  email: string;
  role: string;
}

/**
 * Checks server-side if current request has a valid admin session.
 * 1. Checks Supabase Auth session if configured.
 * 2. Checks cryptographically signed HMAC session cookie.
 */
export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();

  // 1. Try Supabase Auth session if configured
  if (hasSupabaseConfigured()) {
    try {
      const supabase = await createServerSideClient();
      if (supabase) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user?.email) {
          return {
            email: session.user.email,
            role: "admin",
          };
        }
      }
    } catch {
      // Fallback to signed cookie check below
    }
  }

  // 2. Check HMAC-signed secure session cookie
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
 * Validates credentials via Supabase Auth or secure environment variables.
 * Issues an HMAC-SHA256 signed HTTP-only cookie upon success.
 */
export async function loginAdmin(email: string, pass: string): Promise<{ success: boolean; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. If Supabase is configured, authenticate through Supabase Auth
  if (hasSupabaseConfigured()) {
    try {
      const supabase = await createServerSideClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: pass,
        });
        if (error) {
          return { success: false, error: "Ungültige Anmeldedaten." };
        }
        if (data.session) {
          return { success: true };
        }
      }
    } catch {
      // Fallback to env-configured credentials
    }
  }

  // 2. Verify against secure environment variables or default studio credentials
  const envAdminEmail = (process.env.ADMIN_EMAIL || "auralow@gmail.com").trim().toLowerCase();
  const envAdminPass = (process.env.ADMIN_PASSWORD || "AuraLow2828..").trim();

  if (normalizedEmail === envAdminEmail && pass.trim() === envAdminPass) {
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

  if (hasSupabaseConfigured()) {
    try {
      const supabase = await createServerSideClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {
      // Continue to delete session cookie
    }
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}
