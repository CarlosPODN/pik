"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon/Icon";
import styled, { css } from "styled-components";
import type { NavItemConfig } from "../navItems";

const ItemLink = styled(Link).attrs<{ $active: boolean }>(({ $active }) => ({
  className: clsx("nav-item", { "nav-item--active": $active }),
}))`
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

  ${({ $active, theme }) =>
    $active &&
    css`
      &,
      &:hover {
        background: ${theme.colors.primarySoft};
        color: ${theme.colors.primary};
        font-weight: 600;
        box-shadow: none;
      }
    `}
`;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavItem({
  item,
  onNavigate,
}: {
  item: NavItemConfig;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  return (
    <ItemLink
      href={item.href}
      $active={active}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <Icon name={item.icon} className="nav-item__icon" />
      <span className="nav-item__label">{item.label}</span>
    </ItemLink>
  );
}
