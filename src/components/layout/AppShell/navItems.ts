import type { IconName } from "@/components/Icon/Icon";
import type { Role } from "@/types/session";

/** One entry in the sidebar's navigation. */
export interface NavItemConfig {
  /** Visible text, in Spanish. */
  label: string;
  /** Where it goes. It's highlighted on this path and anything under it. */
  href: string;
  /** Icon shown before the label. */
  icon: IconName;
  /** Only shown once the person has picked this role. Items without one are always shown. */
  role?: Role;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: "Inicio", href: "/", icon: "home" },
  { label: "Registra tu negocio", href: "/register", icon: "store", role: "business" },
  { label: "Agenda una cita", href: "/book", icon: "calendar", role: "client" },
];
