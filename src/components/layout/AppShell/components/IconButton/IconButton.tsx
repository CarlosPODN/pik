"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";
import { IconButtonWrapper } from "./IconButton.styles";

/**
 * Square icon-only button for the shell: opening and closing the drawer. Hidden on desktop,
 * where the sidebar is always visible. Takes every `<button>` prop.
 *
 * ```tsx
 * <IconButton type="button" aria-label="Abrir menú" onClick={openDrawer}>
 *   <Icon name="menu" />
 * </IconButton>
 * ```
 *
 * **Accessibility**: it has no visible text, so always give it an `aria-label` (in Spanish).
 *
 * **Styling**: BEM block `icon-button`; a `className` is merged in.
 */
export default function IconButton({ className, ...props }: ComponentProps<"button">) {
  return <IconButtonWrapper className={clsx("icon-button", className)} {...props} />;
}
