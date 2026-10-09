"use client";

import type { ReactNode } from "react";
import { CardGridWrapper } from "./CardGrid.styles";

// A list of cards. Children are the <li> items.
export default function CardGrid({ children }: { children: ReactNode }) {
  return <CardGridWrapper className="card-grid">{children}</CardGridWrapper>;
}
