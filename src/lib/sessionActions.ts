"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Role } from "@/types/session";
import { ROLE_HOME, SESSION_COOKIE } from "./constants";
import { isRole } from "./roles";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

// Picks a role and opens its first page. Server actions can be called with any argument, so
// the role is checked again here.
export async function startSession(role: Role) {
  if (!isRole(role)) return;
  (await cookies()).set(SESSION_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR_IN_SECONDS,
  });
  redirect(ROLE_HOME[role]);
}

// "Cambiar de perfil": forgets the role and goes back to the landing.
export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/");
}
