import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude public login & logout endpoints from protection
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  // 2. Determine if route requires admin authorization
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    const sessionCookie = request.cookies.get("aura_admin_session")?.value;
    const supabaseToken = request.cookies.get("sb-access-token")?.value;

    let isAuthenticated = false;

    // Check custom HMAC-signed session token
    if (sessionCookie) {
      const verified = await verifySessionToken(sessionCookie);
      if (verified && verified.email) {
        isAuthenticated = true;
      }
    }

    // Check Supabase session token
    if (!isAuthenticated && supabaseToken) {
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      if (isAdminApi) {
        return NextResponse.json(
          { success: false, error: "Zugriff verweigert. Bitte melde dich an." },
          { status: 401 }
        );
      }

      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
