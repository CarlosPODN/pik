"use client";

import { endSession, sessionStore, startSession } from "@/lib/session";
import { useStoredValue } from "./useStoredValue";

export function useSession() {
  const session = useStoredValue(sessionStore);

  return { session, role: session?.role ?? null, startSession, endSession };
}
