"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { CardGridWrapper } from "./CardGrid.styles";

export interface CardGridProps {
  /**
   * `"grid"` (default): one column on phones, as many 360px+ columns as fit from `lg`.
   * `"rows"`: one card per row at every width.
   */
  layout?: "grid" | "rows";
  /** The `<li>` items, one card each. */
  children: ReactNode;
}

/**
 * A list of cards (`<ul>`), in a grid or one per row.
 *
 * ```tsx
 * <CardGrid layout="rows">
 *   {businesses.map((business) => (
 *     <li key={business.id}>
 *       <BusinessCard business={business} />
 *     </li>
 *   ))}
 * </CardGrid>
 * ```
 *
 * **Styling**: BEM block `card-grid`, modifier `card-grid--rows`.
 */
export default function CardGrid({ layout = "grid", children }: CardGridProps) {
  return (
    <CardGridWrapper className={clsx("card-grid", { "card-grid--rows": layout === "rows" })}>
      {children}
    </CardGridWrapper>
  );
}
