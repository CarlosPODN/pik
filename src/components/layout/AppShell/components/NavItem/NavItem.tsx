"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
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

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItemConfig;
  active: boolean;
  onNavigate: () => void;
}) {
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

function ActiveAwareNavLink(props: NavItemProps) {
  const pathname = usePathname();
  return <NavLink {...props} active={isActive(pathname, props.item.href)} />;
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
 * **Suspense**: `usePathname()` suspends on routes whose params are only known at request time
 * (like `/register/[id]`), which would block prerendering the whole layout. Its own Suspense
 * boundary keeps that local: the server renders the plain link, and the active state fills in
 * after.
 *
 * **Accessibility**: the active link has `aria-current="page"`.
 *
 * **Styling**: BEM block `nav-item`, modifier `nav-item--active`.
 */
export default function NavItem(props: NavItemProps) {
  return (
    <Suspense fallback={<NavLink {...props} active={false} />}>
      <ActiveAwareNavLink {...props} />
    </Suspense>
  );
}
