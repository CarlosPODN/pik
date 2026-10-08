"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { AppShellWrapper } from "./AppShell.styles";

// Mobile: sticky top bar + off-canvas drawer. Desktop (lg): static sidebar.
// The breakpoint switch is pure CSS, so the server-rendered HTML is correct on every screen size.
export default function AppShell({ children }: { children: ReactNode }) {
  const drawerId = useId();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const menuButton = menuButtonRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus({ preventScroll: true });
    };
  }, [drawerOpen]);

  return (
    <AppShellWrapper className="app-shell">
      <TopBar
        drawerId={drawerId}
        drawerOpen={drawerOpen}
        onOpenDrawer={openDrawer}
        menuButtonRef={menuButtonRef}
      />
      <Sidebar
        id={drawerId}
        open={drawerOpen}
        onClose={closeDrawer}
        closeButtonRef={closeButtonRef}
      />
      <main className="app-shell__content">{children}</main>
    </AppShellWrapper>
  );
}
