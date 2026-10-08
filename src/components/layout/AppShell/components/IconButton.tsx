"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";
import { IconButtonWrapper } from "./IconButton.styles";

// Square icon-only button for the shell (open/close the drawer). Hidden on desktop, where the
// sidebar is always visible. Give it an aria-label.
export default function IconButton({ className, ...props }: ComponentProps<"button">) {
  return <IconButtonWrapper className={clsx("icon-button", className)} {...props} />;
}
