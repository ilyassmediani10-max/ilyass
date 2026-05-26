import { NextResponse, type NextRequest } from "next/server";
import { canAccessPath } from "@/utils/access-control";
import { AUTH_COOKIE, verifySessionCookie } from "@/utils/session-cookie";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionCookie(request.cookies.get(AUTH_COOKIE)?.value);
  const role = session?.role ?? null;

  if (canAccessPath(role, pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
