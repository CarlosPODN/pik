"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { CardGridWrapper } from "./CardGrid.styles";

// A list of cards, in a grid or one per row. Children are the <li> items.
export default function CardGrid({
  layout = "grid",
  children,
}: {
  layout?: "grid" | "rows";
  children: ReactNode;
}) {
  return (
    <CardGridWrapper className={clsx("card-grid", { "card-grid--rows": layout === "rows" })}>
      {children}
    </CardGridWrapper>
  );
}
