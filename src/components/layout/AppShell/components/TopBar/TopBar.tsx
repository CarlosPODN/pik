"use client";

import type { Ref } from "react";
import IconButton from "../IconButton/IconButton";
import Logo from "../Logo/Logo";
import Icon from "@/components/Icon/Icon";
import { TopBarWrapper } from "./TopBar.styles";

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
