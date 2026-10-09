"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { PanelWrapper } from "./Panel.styles";

// The box around a list section (see PanelWrapper), with an optional heading. EmptyState uses
// the same box, so a list and its empty state look like one container.
export default function Panel({
  heading,
  className,
  children,
}: {
  heading?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <PanelWrapper className={clsx("panel", className)}>
      {heading && <h2 className="panel__heading">{heading}</h2>}
      {children}
    </PanelWrapper>
  );
}
