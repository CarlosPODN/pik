"use client";

import type { Ref } from "react";
import IconButton from "../IconButton/IconButton";
import Logo from "../Logo/Logo";
import Icon from "@/components/Icon/Icon";
import { TopBarWrapper } from "./TopBar.styles";

export interface TopBarProps {
  /** The drawer's id, for the menu button's `aria-controls`. */
  drawerId: string;
  /** Whether the drawer is open, for the menu button's `aria-expanded`. */
  drawerOpen: boolean;
  /** Opens the drawer. */
  onOpenDrawer: () => void;
  /** Ref to the menu button, which gets focus back when the drawer closes. */
  menuButtonRef: Ref<HTMLButtonElement>;
}

/**
 * The sticky bar at the top on **phones**: the logo and the menu button that opens the drawer.
 * Hidden on desktop, where the sidebar is always visible.
 *
 * ```tsx
 * <TopBar drawerId={drawerId} drawerOpen={drawerOpen} onOpenDrawer={openDrawer}
 *   menuButtonRef={menuButtonRef} />
 * ```
 *
 * **Styling**: BEM block `top-bar`.
 */
export default function TopBar({ drawerId, drawerOpen, onOpenDrawer, menuButtonRef }: TopBarProps) {
  return (
    <TopBarWrapper className="top-bar">
      <Logo />
      <IconButton
        ref={menuButtonRef}
        type="button"
        aria-label="Abrir menú"
        aria-controls={drawerId}
        aria-expanded={drawerOpen}
        onClick={onOpenDrawer}
      >
        <Icon name="menu" />
      </IconButton>
    </TopBarWrapper>
  );
}
