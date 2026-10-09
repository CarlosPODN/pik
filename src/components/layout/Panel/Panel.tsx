"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { PanelWrapper } from "./Panel.styles";

export interface PanelProps {
  /** Optional `<h2>` at the top, styled like the settings cards' headings. */
  heading?: string;
  /** Extra class, merged with `panel`, so a parent can position it. */
  className?: string;
  /** The panel's content, usually a `CardGrid`. */
  children: ReactNode;
}

/**
 * The tinted, bordered **box around a list section**, with an optional heading. It keeps a
 * minimum height (`theme.layout.panelMinHeight`), so the section doesn't jump when the first
 * item is added.
 *
 * ```tsx
 * <Panel heading="Tus negocios">
 *   <CardGrid layout="rows">…</CardGrid>
 * </Panel>
 * ```
 *
 * **Pairs with** `EmptyState`, which uses the same box: show `EmptyState` while the list is
 * empty and `Panel` once it has items, and they look like one container.
 *
 * **Styling**: BEM block `panel`, styled by `PanelWrapper`.
 */
export default function Panel({ heading, className, children }: PanelProps) {
  return (
    <PanelWrapper className={clsx("panel", className)}>
      {heading && <h2 className="panel__heading">{heading}</h2>}
      {children}
    </PanelWrapper>
  );
}
