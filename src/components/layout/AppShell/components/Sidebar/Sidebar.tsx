"use client";

import clsx from "clsx";
import type { Ref } from "react";
import IconButton from "../IconButton/IconButton";
import Logo from "../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import SessionCard from "../SessionCard/SessionCard";
import Icon from "@/components/Icon/Icon";
import type { Role } from "@/types/session";
import { NAV_ITEMS } from "../../navItems";
import { SidebarWrapper } from "./Sidebar.styles";

export interface SidebarProps {
  /** The panel's id, which the top bar's menu button points at (`aria-controls`). */
  id: string;
  /** The session's role, `null` while logged out. Picks the nav items and the session card. */
  role: Role | null;
  /** Whether the drawer is open on phones. Ignored on desktop, where it's always shown. */
  open: boolean;
  /** Closes the drawer: the close button, the backdrop, and any link or logo click. */
  onClose: () => void;
  /** Ref to the close button, which `AppShell` focuses when the drawer opens. */
  closeButtonRef: Ref<HTMLButtonElement>;
}

/**
 * The navigation panel: logo, nav links, and the session card at the bottom. A drawer over a
 * backdrop on phones, a static column on desktop (`lg`).
 *
 * ```tsx
 * <Sidebar id={drawerId} role={role} open={drawerOpen} onClose={closeDrawer}
 *   closeButtonRef={closeButtonRef} />
 * ```
 *
 * **Nav items**: logged out, only items without a `role` show (Inicio); once a role is picked,
 * its items show too. Items live in `navItems.ts`.
 *
 * **Styling**: BEM block `sidebar`, modifier `sidebar--open`.
 */
export default function Sidebar({ id, role, open, onClose, closeButtonRef }: SidebarProps) {
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
          <SessionCard role={role} onNavigate={onClose} />
          <p className="sidebar__copyright">© 2026 PIK</p>
        </footer>
      </aside>
    </SidebarWrapper>
  );
}
