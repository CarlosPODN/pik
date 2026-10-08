import clsx from "clsx";
import { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "md" | "sm";

export interface ButtonOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// BEM classes for the "button" block, shared by Button and ButtonLink (a link that looks like a
// button carries the same block). Primary and md are the defaults, so they have no modifier.
export function buttonClassName({ variant = "primary", size = "md" }: ButtonOptions) {
  return clsx("button", {
    "button--secondary": variant === "secondary",
    "button--danger": variant === "danger",
    "button--sm": size === "sm",
  });
}

// Pill styles for the "button" block. md is 48px tall (default, primary actions); sm is 40px,
// for buttons next to a title or in a dialog.
export const buttonStyles = css`
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
