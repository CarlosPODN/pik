import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";
import { roleForPath } from "@/lib/roles";

// Runs before a role's routes render: anyone logged out or in the other role is sent home to
// pick one, so pages never render for the wrong person.
export function proxy(request: NextRequest) {
  const required = roleForPath(request.nextUrl.pathname);
  if (required && request.cookies.get(SESSION_COOKIE)?.value !== required) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// Must be a static list: keep it in sync with ROLE_HOME in lib/constants.ts.
export const config = {
  matcher: ["/register/:path*", "/book/:path*"],
};
