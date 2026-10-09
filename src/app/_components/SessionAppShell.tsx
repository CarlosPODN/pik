import type { ReactNode } from "react";
import AppShell from "@/components/layout/AppShell/AppShell";
import { getSession } from "@/lib/session";

// The app shell for the current session: the sidebar shows the role's navigation and the
// "Cambiar de perfil" card. Rendered by the root layout inside Suspense.
export default async function SessionAppShell({ children }: { children: ReactNode }) {
  const session = await getSession();

  return <AppShell role={session?.role ?? null}>{children}</AppShell>;
}
