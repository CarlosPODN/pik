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
 * <Suspense fallback={<AppShell role={null}><PageSkeleton /></AppShell>}>
 *   <SessionAppShell>{children}</SessionAppShell>
 * </Suspense>
 * ```
 *
 * **Suspense**: reading the cookie is request-time data, so render it inside a Suspense
 * boundary; the logged-out shell is the fallback.
 */
export default async function SessionAppShell({ children }: SessionAppShellProps) {
  const session = await getSession();

  return <AppShell role={session?.role ?? null}>{children}</AppShell>;
}
