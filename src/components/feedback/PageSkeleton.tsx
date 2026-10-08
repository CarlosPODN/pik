"use client";

import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  50% { opacity: 0.5; }
`;

// Three blocks roughly shaped like a page: a header, a line, a card.
const PageSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};

  .page-skeleton__block {
    height: 160px;
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.surface};
    animation: ${pulse} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  .page-skeleton__block--header {
    height: 220px;
  }

  .page-skeleton__block--line {
    height: 40px;
  }
`;

// Placeholder while a page reads browser-saved data (localStorage) after hydration.
export default function PageSkeleton() {
  return (
    <PageSkeletonWrapper className="page-skeleton" role="status" aria-label="Cargando">
      <div className="page-skeleton__block page-skeleton__block--header" />
      <div className="page-skeleton__block page-skeleton__block--line" />
      <div className="page-skeleton__block" />
    </PageSkeletonWrapper>
  );
}
