import type { ComponentType, SVGProps } from "react";
import { CalendarIcon, HomeIcon, StoreIcon } from "./icons";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Register your business", href: "/register", icon: StoreIcon },
  { label: "Book an appointment", href: "/book", icon: CalendarIcon },
];
