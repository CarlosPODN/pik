"use client";

import type { Ref } from "react";
import styled, { css } from "styled-components";
import { bem } from "@/styles/bem";
import IconButton from "./IconButton";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { CloseIcon } from "@/components/icons";
import { NAV_ITEMS } from "../navItems";

const b = bem("sidebar");

const Backdrop = styled.div.attrs<{ $open: boolean }>(({ $open }) => ({
  className: b("backdrop", { visible: $open }),
}))`
  position: fixed;
  inset: 0;
  z-index: 20;
  background: ${({ theme }) => theme.colors.overlay};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.2s ease;

  ${({ theme }) => theme.media.lg} {
    display: none;
  }
`;

const Panel = styled.aside.attrs<{ $open: boolean }>(({ $open }) => ({
  className: b(undefined, { open: $open }),
}))`
  /* Mobile: off-canvas drawer. */
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

  /* visibility (not just transform) keeps the closed drawer out of the tab order.
     It turns visible instantly on open (so focus can move in) and hides only after the slide-out. */
  ${({ $open }) =>
    $open
      ? css`
          transform: translateX(0);
          visibility: visible;
          transition: transform 0.25s ease;
        `
      : css`
          transform: translateX(-100%);
          visibility: hidden;
          transition:
            transform 0.25s ease,
            visibility 0s linear 0.25s;
        `}

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
`;

const PanelHeader = styled.div.attrs({ className: b("header") })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
`;

const Divider = styled.hr.attrs({ className: b("divider") })`
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

const Nav = styled.nav.attrs({ className: b("nav") })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
`;

const Footer = styled.footer.attrs({ className: b("footer") })`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space.lg};
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.75rem;
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
  return (
    <>
      <Backdrop $open={open} onClick={onClose} aria-hidden="true" />
      <Panel id={id} $open={open} aria-label="Navegación principal">
        <PanelHeader>
          <Logo onClick={onClose} />
          <IconButton ref={closeButtonRef} type="button" aria-label="Cerrar menú" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </PanelHeader>

        <Divider />

        <Nav>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} onNavigate={onClose} />
          ))}
        </Nav>

        <Footer>© 2026 PIK</Footer>
      </Panel>
    </>
  );
}
