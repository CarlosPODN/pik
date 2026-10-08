import type { IconName } from "@/components/Icon/Icon";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: IconName;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: "Inicio", href: "/", icon: "home" },
  { label: "Registra tu negocio", href: "/register", icon: "store" },
  { label: "Agenda una cita", href: "/book", icon: "calendar" },
];
