"use client";

import styled, { keyframes } from "styled-components";

// A light band sweeping left to right across each block.
const shimmer = keyframes`
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
`;

// Gentler fallback for people who ask for reduced motion: nothing moves, the blocks only fade.
const pulse = keyframes`
  50% { opacity: 0.6; }
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
      background-color: ${({ theme }) => theme.colors.surface};
      background-image: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.surface} 25%,
        ${({ theme }) => theme.colors.primarySoft} 50%,
        ${({ theme }) => theme.colors.surface} 75%
      );
      background-size: 200% 100%;
      animation: ${shimmer} 1.6s ease-in-out infinite;

      @media (prefers-reduced-motion: reduce) {
        background-image: none;
        animation: ${pulse} 2.4s ease-in-out infinite;
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
