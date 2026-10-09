"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { LocalStore } from "@/lib/localStore";

const getServerSnapshot = () => null;

// Reads a localStorage-backed store and re-renders when it changes. The server can't read
// localStorage, so it renders the empty value; use useHydrated to tell "empty" from "not read
// yet" when that matters.
export function useStoredValue<T>(store: LocalStore<T>): T {
  const raw = useSyncExternalStore(store.subscribe, store.readRaw, getServerSnapshot);
  return useMemo(() => store.parse(raw), [store, raw]);
}
