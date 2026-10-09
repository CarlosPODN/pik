import { cookies } from "next/headers";
import type { Session } from "@/types/session";
import { SESSION_COOKIE } from "./constants";
import { isRole } from "./roles";

// The session is a cookie so the server knows the role before rendering. Reading it is
// request-time data: call this inside a Suspense boundary (a route's loading.tsx counts).
// It's written only by the server actions in sessionActions.ts.
export async function getSession(): Promise<Session | null> {
  const role = (await cookies()).get(SESSION_COOKIE)?.value;
  return isRole(role) ? { role } : null;
}
