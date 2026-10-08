"use client";

import styled from "styled-components";

// display: contents, so the backdrop and the panel lay out as direct children of the shell
// (the panel is a flex column next to the content on desktop) while sharing this wrapper's styles.
export const SidebarWrapper = styled.div`
  display: contents;

  .sidebar {
    &__backdrop {
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

    /* Mobile: off-canvas drawer. */
    &__panel {
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

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
    }

    &__divider {
      border: 0;
      height: 1px;
      background: ${({ theme }) => theme.colors.border};
    }

    &__nav {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xxs};
    }

    &__footer {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.lg};
      margin-top: auto;
    }

    &__copyright {
      padding-top: ${({ theme }) => theme.space.lg};
      border-top: 1px dashed ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.75rem;
    }
  }
  &.sidebar--open .sidebar__backdrop {
    opacity: 1;
    pointer-events: auto;
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
`;
