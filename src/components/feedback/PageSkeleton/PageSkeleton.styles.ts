"use client";

import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  50% { opacity: 0.5; }
`;

// Three blocks roughly shaped like a page: a header, a line, a card.
export const PageSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};

  .page-skeleton {
    &__block {
      height: 160px;
      border-radius: ${({ theme }) => theme.radii.md};
      background: ${({ theme }) => theme.colors.surface};
      animation: ${pulse} 1.4s ease-in-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }

    &__block--header {
      height: 220px;
    }

    &__block--line {
      height: 40px;
    }
  }
`;
