"use client";

import clsx from "clsx";
import type { Ref } from "react";
import IconButton from "../IconButton/IconButton";
import Logo from "../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import SessionCard from "../SessionCard/SessionCard";
import Icon from "@/components/Icon/Icon";
import { useSession } from "@/hooks/useSession";
import { NAV_ITEMS } from "../../navItems";
import { SidebarWrapper } from "./Sidebar.styles";

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
