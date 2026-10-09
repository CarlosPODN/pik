"use client";

import styled from "styled-components";

export const AudienceSwitchWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.md} {
    align-self: flex-start;
  }

  .audience-switch {
    &__tab {
      flex: 1;
      min-height: 44px; /* comfortable touch target */
      padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
      border: none;
      border-radius: ${({ theme }) => theme.radii.pill};
      background: transparent;
      color: ${({ theme }) => theme.colors.muted};
      font: inherit;
      font-size: 0.9375rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition:
        background 0.15s ease,
        color 0.15s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.foreground};
      }

      &:focus-visible {
        outline: none;
        box-shadow: ${({ theme }) => theme.shadows.focusRing};
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }

    &__tab--selected,
    &__tab--selected:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.onPrimary};
    }
  }
`;
