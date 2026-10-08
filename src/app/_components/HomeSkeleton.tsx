"use client";

import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  50% { opacity: 0.5; }
`;

const Wrapper = styled.div.attrs({ className: "home-skeleton" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const Block = styled.div.attrs<{ $height: string }>({ className: "home-skeleton__block" })<{
  $height: string;
}>`
  height: ${({ $height }) => $height};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  animation: ${pulse} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Placeholder while the home page reads the saved role from the browser.
export default function HomeSkeleton() {
  return (
    <Wrapper role="status" aria-label="Cargando">
      <Block $height="220px" />
      <Block $height="40px" />
      <Block $height="160px" />
    </Wrapper>
  );
}
