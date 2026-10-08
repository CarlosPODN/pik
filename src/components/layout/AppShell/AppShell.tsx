"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const AppShellWrapper = styled.div`
  min-height: 100dvh;

  ${({ theme }) => theme.media.lg} {
    display: flex;
  }

  /* The page frame for every route: the window scrolls vertically, and anything wider than the
     content area is clipped here. clip (unlike hidden) doesn't create a scroll container, so
     the sticky top bar and sidebar keep working. Pages render only their content, no <main>
     or padding. */
  .app-shell__content {
    flex: 1;
    min-width: 0; /* lets the flex item shrink below its content's width */
    overflow-x: clip;
    padding: ${({ theme }) => theme.layout.pagePadding.base};

    ${({ theme }) => theme.media.md} {
      padding: ${({ theme }) => theme.layout.pagePadding.md};
    }

    ${({ theme }) => theme.media.lg} {
      padding: ${({ theme }) => theme.layout.pagePadding.lg};
    }
  }
`;

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
