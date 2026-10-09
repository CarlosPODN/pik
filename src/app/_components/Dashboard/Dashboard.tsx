"use client";

import type { Role } from "@/types/session";
import BusinessHome from "./components/BusinessHome";
import ClientHome from "./components/ClientHome";

export interface DashboardProps {
  /** The session's role, which picks the home to show. */
  role: Role;
}

/**
 * The home page once a role is picked: `ClientHome` for clients (their appointments),
 * `BusinessHome` for businesses (upcoming appointments across their businesses).
 *
 * ```tsx
 * // app/page.tsx (Server Component)
 * if (session) return <Dashboard role={session.role} />;
 * ```
 */
export default function Dashboard({ role }: DashboardProps) {
  return role === "client" ? <ClientHome /> : <BusinessHome />;
}
