import type { Role, Session } from "@/types/session";
import { createLocalStore } from "./localStore";

const ROLES: readonly Role[] = ["client", "business"];

export const sessionStore = createLocalStore<Session | null>({
  key: "pik:session",
  empty: null,
  validate: (value) =>
    typeof value === "object" &&
    value !== null &&
    "role" in value &&
    ROLES.includes(value.role as Role)
      ? { role: value.role as Role }
      : null,
});

export const startSession = (role: Role) => sessionStore.write({ role });

export const endSession = () => sessionStore.clear();
