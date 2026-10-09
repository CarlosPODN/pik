import type { Role } from "@/types/session";
import { ROLE_HOME, ROLES } from "./constants";

export const isRole = (value: unknown): value is Role => ROLES.includes(value as Role);

// The role a path belongs to (its ROLE_HOME or anything under it), or null for shared routes.
export function roleForPath(pathname: string): Role | null {
  return (
    ROLES.find(
      (role) => pathname === ROLE_HOME[role] || pathname.startsWith(`${ROLE_HOME[role]}/`),
    ) ?? null
  );
}
