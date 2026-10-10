"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon/Icon";
import type { NavItemConfig } from "../../navItems";
import { NavItemWrapper } from "./NavItem.styles";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export interface NavItemProps {
  /** The entry to show, from `NAV_ITEMS` in `navItems.ts`. */
  item: NavItemConfig;
  /** Runs on click, so the drawer can close. */
  onNavigate: () => void;
}

/**
 * One sidebar link, with its icon, highlighted while you're on its page or anywhere under it
 * (`/register` stays active on `/register/abc`).
 *
 * ```tsx
 * {navItems.map((item) => (
 *   <NavItem key={item.href} item={item} onNavigate={closeDrawer} />
 * ))}
 * ```
 *
 * **Accessibility**: the active link has `aria-current="page"`.
 *
 * **Styling**: BEM block `nav-item`, modifier `nav-item--active`.
 */
export default function NavItem({ item, onNavigate }: NavItemProps) {
  const pathname = usePathname();

  const active = isActive(pathname, item.href);

  return (
    <NavItemWrapper
      href={item.href}
      className={clsx("nav-item", { "nav-item--active": active })}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <Icon name={item.icon} className="nav-item__icon" />
      <span className="nav-item__label">{item.label}</span>
    </NavItemWrapper>
  );
}
