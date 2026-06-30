import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login and api setup/login/logout/media stream)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      const token = request.cookies.get("admin-token")?.value;
      if (token) {
        // If already logged in, redirect to dashboard
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    const token = request.cookies.get("admin-token")?.value;
    if (!token) {
      // Redirect to login if no token cookie exists
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify matching routes
export const config = {
  matcher: ["/admin/:path*"],
};
