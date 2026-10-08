import type { ComponentType, SVGProps } from "react";
import { CalendarIcon, HomeIcon, StoreIcon } from "./components/icons";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: "Inicio", href: "/", icon: HomeIcon },
  { label: "Registra tu negocio", href: "/register", icon: StoreIcon },
  { label: "Agenda una cita", href: "/book", icon: CalendarIcon },
];
