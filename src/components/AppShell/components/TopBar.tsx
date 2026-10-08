"use client";

import type { Ref } from "react";
import styled from "styled-components";
import { bem } from "@/styles/bem";
import IconButton from "./IconButton";
import Logo from "./Logo";
import { MenuIcon } from "@/components/icons";

const b = bem("top-bar");

const Bar = styled.header.attrs({ className: b() })`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.layout.topBarHeight};
  padding: 0 ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.md} {
    padding: 0 ${({ theme }) => theme.space.xl};
  }

  /* On desktop the sidebar is always visible, so the top bar isn't needed. */
  ${({ theme }) => theme.media.lg} {
    display: none;
  }
`;

export default function TopBar({
  drawerId,
  drawerOpen,
  onOpenDrawer,
  menuButtonRef,
}: {
  drawerId: string;
  drawerOpen: boolean;
  onOpenDrawer: () => void;
  menuButtonRef: Ref<HTMLButtonElement>;
}) {
  return (
    <Bar>
      <Logo />
      <IconButton
        ref={menuButtonRef}
        type="button"
        aria-label="Abrir menú"
        aria-controls={drawerId}
        aria-expanded={drawerOpen}
        onClick={onOpenDrawer}
      >
        <MenuIcon />
      </IconButton>
    </Bar>
  );
}
