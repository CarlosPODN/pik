"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";
import styled from "styled-components";

const IconButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  ${({ theme }) => theme.media.lg} {
    display: none;
  }
`;

// Square icon-only button for the shell (open/close the drawer). Hidden on desktop, where the
// sidebar is always visible. Give it an aria-label.
export default function IconButton({ className, ...props }: ComponentProps<"button">) {
  return <IconButtonWrapper className={clsx("icon-button", className)} {...props} />;
}
