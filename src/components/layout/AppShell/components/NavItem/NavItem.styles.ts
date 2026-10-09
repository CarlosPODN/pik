"use client";

import styled from "styled-components";
import Link from "next/link";

export const NavItemWrapper = styled(Link)`
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
