"use client";

import styled from "styled-components";

export const AppShellWrapper = styled.div`
  min-height: 100dvh;

  ${({ theme }) => theme.media.lg} {
    display: flex;
  }
  .app-shell {
    /* The page frame for every route: the window scrolls vertically, and anything wider than the
       content area is clipped here. clip (unlike hidden) doesn't create a scroll container, so
       the sticky top bar and sidebar keep working. Pages render only their content, no <main>
       or padding. */
    &__content {
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
  }
`;
