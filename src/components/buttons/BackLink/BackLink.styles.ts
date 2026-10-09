"use client";

import Link from "next/link";
import styled from "styled-components";

// A quiet text link with a left arrow, above a page's title, back to the page it came from.
export const BackLinkWrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: ${({ theme }) => theme.space.xs};
  min-height: 44px; /* comfortable touch target */
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }

  &:focus-visible {
    outline: none;
    border-radius: ${({ theme }) => theme.radii.sm};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;
