"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Icon from "@/components/Icon/Icon";
import styled from "styled-components";
import type { NavItemConfig } from "../navItems";

const NavItemWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 44px; /* comfortable touch target */
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.navItem};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  &.nav-item--active,
  &.nav-item--active:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    box-shadow: none;
  }
`;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
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

function ActiveAwareNavLink(props: { item: NavItemConfig; onNavigate: () => void }) {
  const pathname = usePathname();
  return <NavLink {...props} active={isActive(pathname, props.item.href)} />;
}

// usePathname suspends on routes whose dynamic params are only known at request time (like
// /register/[id]), which would block prerendering the whole layout. The Suspense boundary
// keeps it local: the server renders the plain link, and the active state fills in after.
export default function NavItem(props: { item: NavItemConfig; onNavigate: () => void }) {
  return (
    <Suspense fallback={<NavLink {...props} active={false} />}>
      <ActiveAwareNavLink {...props} />
    </Suspense>
  );
}
