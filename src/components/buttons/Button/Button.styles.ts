"use client";

import styled from "styled-components";

// Pill styles for the "button" block, used by Button and (rendered as a link) ButtonLink. md is
// 48px tall (default, primary actions); button--sm is 40px, for buttons next to a title or in a
// dialog.
export const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 48px;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.xl}`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    filter 0.15s ease,
    background 0.15s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &.button--danger {
    background: ${({ theme }) => theme.colors.danger};
  }

  &.button--secondary {
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};

    &:hover {
      filter: none;
      background: ${({ theme }) => theme.colors.surface};
    }
  }

  &.button--sm {
    min-height: 40px;
    padding: 0 ${({ theme }) => theme.space.lg};
    font-size: 0.9375rem;
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
