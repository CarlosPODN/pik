"use client";

import clsx from "clsx";
import type { Ref } from "react";
import styled from "styled-components";
import IconButton from "./IconButton";
import Logo from "./Logo";
import NavItem from "./NavItem";
import SessionCard from "./SessionCard";
import Icon from "@/components/Icon/Icon";
import { useSession } from "@/hooks/useSession";
import { NAV_ITEMS } from "../navItems";

// display: contents, so the backdrop and the panel lay out as direct children of the shell
// (the panel is a flex column next to the content on desktop) while sharing this wrapper's styles.
const SidebarWrapper = styled.div`
  display: contents;

  .sidebar__backdrop {
    position: fixed;
    inset: 0;
    z-index: 20;
    background: ${({ theme }) => theme.colors.overlay};
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;

    ${({ theme }) => theme.media.lg} {
      display: none;
    }
  }

  &.sidebar--open .sidebar__backdrop {
    opacity: 1;
    pointer-events: auto;
  }

  /* Mobile: off-canvas drawer. */
  .sidebar__panel {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 30;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.lg};
    width: ${({ theme }) => theme.layout.drawerWidth};
    padding: ${({ theme }) => theme.space.lg};
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.surface};

    /* visibility (not just transform) keeps the closed drawer out of the tab order. It turns
       visible instantly on open (so focus can move in) and hides only after the slide-out. */
    transform: translateX(-100%);
    visibility: hidden;
    transition:
      transform 0.25s ease,
      visibility 0s linear 0.25s;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    /* Desktop: static column, always visible. */
    ${({ theme }) => theme.media.lg} {
      position: sticky;
      top: 0;
      flex-shrink: 0;
      width: ${({ theme }) => theme.layout.sidebarWidth};
      height: 100dvh;
      padding: ${({ theme }) => `${theme.space.xl} ${theme.space.lg}`};
      border-right: 1px solid ${({ theme }) => theme.colors.border};
      transform: none;
      visibility: visible;
      transition: none;
    }
  }

  &.sidebar--open .sidebar__panel {
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.25s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    ${({ theme }) => theme.media.lg} {
      transition: none;
    }
  }

  .sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;
  }

  .sidebar__divider {
    border: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  .sidebar__nav {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.xxs};
  }

  .sidebar__footer {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.lg};
    margin-top: auto;
  }

  .sidebar__copyright {
    padding-top: ${({ theme }) => theme.space.lg};
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.75rem;
  }
`;

export default function Sidebar({
  id,
  open,
  onClose,
  closeButtonRef,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  closeButtonRef: Ref<HTMLButtonElement>;
}) {
  const { role } = useSession();
  // Logged out, only the items without a role show (Inicio); after picking a role, its items too.
  const navItems = NAV_ITEMS.filter((item) => !item.role || item.role === role);

  return (
    <SidebarWrapper className={clsx("sidebar", { "sidebar--open": open })}>
      <div className="sidebar__backdrop" onClick={onClose} aria-hidden="true" />
      <aside id={id} className="sidebar__panel" aria-label="Navegación principal">
        <div className="sidebar__header">
          <Logo onClick={onClose} />
          <IconButton ref={closeButtonRef} type="button" aria-label="Cerrar menú" onClick={onClose}>
            <Icon name="close" />
          </IconButton>
        </div>

        <hr className="sidebar__divider" />

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} onNavigate={onClose} />
          ))}
        </nav>

        <footer className="sidebar__footer">
          <SessionCard onNavigate={onClose} />
          <p className="sidebar__copyright">© 2026 PIK</p>
        </footer>
      </aside>
    </SidebarWrapper>
  );
}
