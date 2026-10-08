import type { Role, Session } from "@/types/session";
import { createLocalStore } from "./localStore";

const ROLES: readonly Role[] = ["client", "business"];

// How the app names the person in each role ("Te damos la bienvenida, Profesional.", "Usas PIK
// como Cliente"). The business side is "Profesional", so it doesn't repeat "negocio", which names
// the businesses themselves.
export const ROLE_LABELS: Record<Role, string> = {
  client: "Cliente",
  business: "Profesional",
};

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
