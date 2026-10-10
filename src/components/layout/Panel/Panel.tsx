"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import EmptyState, { type EmptyStateProps } from "@/components/feedback/EmptyState/EmptyState";
import { PanelWrapper } from "./Panel.styles";

export interface PanelProps {
  /** Optional `<h2>` at the top, styled like the settings cards' headings. */
  heading?: string;
  /** Whether there's nothing to list: shows `emptyState` instead of `children`. */
  isEmpty?: boolean;
  /** The message shown while `isEmpty`: icon, title, description and an optional action. */
  emptyState?: EmptyStateProps;
  /** Extra class, merged with `panel`, so a parent can position it. */
  className?: string;
  /** The panel's content, usually a `CardGrid`. Not rendered while `isEmpty`. */
  children?: ReactNode;
}

/**
 * The tinted, bordered **box around a list section**, with an optional heading, that shows a
 * message instead of the list while it's empty. It keeps a minimum height
 * (`theme.layout.panelMinHeight`), so the section doesn't jump when the first item is added.
 *
 * ```tsx
 * <Panel
 *   heading="Tus negocios"
 *   isEmpty={businesses.length === 0}
 *   emptyState={{
 *     icon: "store",
 *     title: "Aún no tienes negocios",
 *     description: "Agrega tu primer negocio para empezar a recibir reservas.",
 *     action: <AddBusinessButton />,
 *   }}
 * >
 *   <CardGrid layout="rows">…</CardGrid>
 * </Panel>
 * ```
 *
 * **Just a message**: without `heading` or `children`, it's a boxed message on its own, like
 * "No encontramos este negocio": `<Panel isEmpty emptyState={{ … }} />`.
 *
 * **Styling**: BEM block `panel`, styled by `PanelWrapper`. The message is an `EmptyState`,
 * centered in the space under the heading.
 */
export default function Panel({
  heading,
  isEmpty = false,
  emptyState,
  className,
  children,
}: PanelProps) {
  return (
    <PanelWrapper className={clsx("panel", className)}>
      {heading && <h2 className="panel__heading">{heading}</h2>}
      {isEmpty ? emptyState && <EmptyState {...emptyState} /> : children}
    </PanelWrapper>
  );
}
