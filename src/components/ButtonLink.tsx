"use client";

import Link from "next/link";
import styled from "styled-components";

// A link styled as the primary pill button, for actions that navigate.
const ButtonLink = styled(Link).attrs({ className: "button-link" })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 48px; /* comfortable touch target */
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.xl}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 600;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export default ButtonLink;
