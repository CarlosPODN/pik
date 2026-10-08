import { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "sm";

export interface ButtonStyleProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
}

// Shared pill styles for Button and ButtonLink. md is 48px tall (default, primary actions);
// sm is 40px, for buttons next to a title or in a dialog.
export const buttonStyles = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: ${({ $size }) => ($size === "sm" ? "40px" : "48px")};
  padding: ${({ $size, theme }) =>
    $size === "sm" ? `0 ${theme.space.lg}` : `${theme.space.md} ${theme.space.xl}`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  font: inherit;
  font-size: ${({ $size }) => ($size === "sm" ? "0.9375rem" : "1rem")};
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    filter 0.15s ease,
    background 0.15s ease;

  ${({ $variant = "primary", theme }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.primary};
          color: ${theme.colors.onPrimary};

          &:hover {
            filter: brightness(1.1);
          }
        `
      : css`
          border-color: ${theme.colors.border};
          background: ${theme.colors.background};
          color: ${theme.colors.foreground};

          &:hover {
            background: ${theme.colors.surface};
          }
        `}

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
