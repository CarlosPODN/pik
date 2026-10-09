"use client";

import styled from "styled-components";

export const BusinessSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .business-settings {
    &__back {
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
    }

    &__title {
      margin-bottom: ${({ theme }) => theme.space.md};
      font-size: 1.75rem;
      line-height: 1.15;
      letter-spacing: -0.02em;

      ${({ theme }) => theme.media.md} {
        font-size: 2.25rem;
      }
    }
  }
`;
