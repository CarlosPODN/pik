"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  endSession,
  parseSession,
  readStoredSession,
  startSession,
  subscribeToSession,
} from "@/lib/session";

// The server can't read localStorage, so it renders logged out and the client fills in the
// stored session right after hydration.
const getServerSnapshot = () => null;

export function useSession() {
  const raw = useSyncExternalStore(subscribeToSession, readStoredSession, getServerSnapshot);
  const session = useMemo(() => parseSession(raw), [raw]);

  return { session, role: session?.role ?? null, startSession, endSession };
}
