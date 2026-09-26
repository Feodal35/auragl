import { cookies } from "next/headers";
import { hasSupabaseConfigured, createServerSideClient } from "./supabase";

const SESSION_COOKIE_NAME = "aura_admin_session";
const FALLBACK_ADMIN_EMAIL = "auralow@gmail.com";
const FALLBACK_ADMIN_PASS = "AuraLow2828..";

export interface AdminUser {
  email: string;
  role: string;
}

/**
 * Checks server-side if current request has a valid admin session.
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
      // Fallback to cookie check below
    }
  }

  // 2. Check local secure session cookie
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = JSON.parse(Buffer.from(sessionCookie, "base64").toString("utf-8"));
    if (decoded && decoded.email && decoded.exp > Date.now()) {
      return {
        email: decoded.email,
        role: "admin",
      };
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Server-side login handler
 */
export async function loginAdmin(email: string, pass: string): Promise<{ success: boolean; error?: string }> {
  // If Supabase is configured, authenticate through Supabase Auth
  if (hasSupabaseConfigured()) {
    try {
      const supabase = await createServerSideClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
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
      // Proceed to fallback check
    }
  }

  // Fallback verification for local / initial setup
  if (email.toLowerCase() === FALLBACK_ADMIN_EMAIL.toLowerCase() && pass === FALLBACK_ADMIN_PASS) {
    const cookieStore = await cookies();
    const tokenPayload = {
      email: FALLBACK_ADMIN_EMAIL,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64");

    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return { success: true };
  }

  return { success: false, error: "Ungültige Anmeldedaten." };
}

/**
 * Logout handler
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
