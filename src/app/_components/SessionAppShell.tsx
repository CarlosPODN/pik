import type { ReactNode } from "react";
import AppShell from "@/components/layout/AppShell/AppShell";
import { getSession } from "@/lib/session";

export interface SessionAppShellProps {
  /** The page, passed through to `AppShell`. */
  children: ReactNode;
}

/**
 * Server Component that renders `AppShell` for the **current session**: it reads the role from
 * the session cookie, so the sidebar shows that role's navigation and the "Cambiar de perfil"
 * card.
 *
 * ```tsx
 * // app/layout.tsx
 * <SessionAppShell>{children}</SessionAppShell>
 * ```
 */
export default async function SessionAppShell({ children }: SessionAppShellProps) {
  const session = await getSession();

  return <AppShell role={session?.role ?? null}>{children}</AppShell>;
}
