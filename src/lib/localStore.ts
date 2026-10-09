// A value kept in localStorage that components read through useSyncExternalStore (see
// hooks/useStoredValue). Subscribers hear changes from this tab directly and from other tabs
// through the "storage" event. Storage can throw (blocked site data, some private modes); reads
// then count as empty and writes just don't persist.
export interface LocalStore<T> {
  subscribe: (listener: () => void) => () => void;
  // The raw stored string: a string is a stable snapshot, unlike a freshly parsed object.
  readRaw: () => string | null;
  parse: (raw: string | null) => T;
  write: (value: T) => void;
  clear: () => void;
}

export function createLocalStore<T>({
  key,
  validate,
  empty,
}: {
  key: string;
  // Returns the value if it has the expected shape, or null to treat it as empty.
  validate: (value: unknown) => T | null;
  empty: T;
}): LocalStore<T> {
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  return {
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) listener();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
    readRaw() {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    parse(raw) {
      if (!raw) return empty;
      try {
        return validate(JSON.parse(raw)) ?? empty;
      } catch {
        return empty;
      }
    },
    write(value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Storage unavailable: the value just won't persist.
      }
      notify();
    },
    clear() {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Nothing stored to remove.
      }
      notify();
    },
  };
}
