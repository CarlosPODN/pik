"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Role } from "@/types/session";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import { AppShellWrapper } from "./AppShell.styles";

export interface AppShellProps {
  /**
   * The session's role, `null` while logged out. It picks the sidebar's nav items and whether
   * the "Usas PIK como…" card shows.
   */
  role: Role | null;
  /** The page, rendered in `<main>`. */
  children: ReactNode;
}

/**
 * The app frame around every page: **phones** get a sticky top bar and an off-canvas drawer;
 * **desktop** (`lg`) gets a static sidebar. The breakpoint switch is pure CSS, so the
 * server-rendered HTML is right on every screen size.
 *
 * ```tsx
 * // app/_components/SessionAppShell.tsx
 * <AppShell role={session?.role ?? null}>{children}</AppShell>
 * ```
 *
 * **Drawer**: opening it moves focus to its close button and locks page scroll; Escape or the
 * backdrop closes it, and focus returns to the menu button.
 *
 * **Navigation**: add entries in `navItems.ts`.
 *
 * **Styling**: BEM block `app-shell` (`app-shell__content` is the `<main>`).
 */
export default function AppShell({ role, children }: AppShellProps) {
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
        role={role}
        open={drawerOpen}
        onClose={closeDrawer}
        closeButtonRef={closeButtonRef}
      />
      <main className="app-shell__content">{children}</main>
    </AppShellWrapper>
  );
}
