"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False on the server and during hydration, true after: lets a component wait for
// browser-only state (like localStorage) instead of rendering a wrong first guess.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
