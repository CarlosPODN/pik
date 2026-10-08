import type { Role, Session } from "@/types/session";

// The session lives in localStorage, so it survives reloads, and is read through
// useSyncExternalStore (see hooks/useSession). Listeners hear changes from this tab directly and
// from other tabs through the "storage" event.
const STORAGE_KEY = "pik:session";

const ROLES: readonly Role[] = ["client", "business"];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToSession(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// Returns the raw stored string: a string is a stable snapshot, unlike a freshly parsed object.
// Storage can throw (blocked site data, some private modes); treat that as logged out.
export function readStoredSession(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseSession(raw: string | null): Session | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (
      typeof value === "object" &&
      value !== null &&
      "role" in value &&
      ROLES.includes(value.role as Role)
    ) {
      return { role: value.role as Role };
    }
  } catch {
    // Malformed value: fall through and treat it as logged out.
  }
  return null;
}

export function startSession(role: Role) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ role } satisfies Session));
  } catch {
    // Storage unavailable: the choice just won't persist.
  }
  notify();
}

export function endSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing stored to remove.
  }
  notify();
}
