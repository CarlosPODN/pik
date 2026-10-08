import type { IconName } from "@/components/Icon/Icon";
import type { Role } from "@/types/session";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: IconName;
  // Only shown once the person has picked this role. Items without one are always shown.
  role?: Role;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: "Inicio", href: "/", icon: "home" },
  { label: "Registra tu negocio", href: "/register", icon: "store", role: "business" },
  { label: "Agenda una cita", href: "/book", icon: "calendar", role: "client" },
];
