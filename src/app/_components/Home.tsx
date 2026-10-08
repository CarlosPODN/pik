"use client";

import type { ReactNode } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { useSession } from "@/hooks/useSession";
import PageSkeleton from "@/components/feedback/PageSkeleton";
import Dashboard from "./Dashboard/Dashboard";

// Picks the home for the saved role: the public landing while logged out, the role's dashboard
// after. The role lives in localStorage, which the server can't read, so until hydration this
// shows a skeleton rather than guessing (a guess would flash the landing for logged-in people).
export default function Home({ landing }: { landing: ReactNode }) {
  const hydrated = useHydrated();
  const { role } = useSession();

  if (!hydrated) return <PageSkeleton />;
  return role ? <Dashboard role={role} /> : landing;
}
