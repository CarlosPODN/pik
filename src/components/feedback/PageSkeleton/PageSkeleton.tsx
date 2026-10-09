"use client";

import clsx from "clsx";
import { PageSkeletonWrapper } from "./PageSkeleton.styles";

export type SkeletonTone = "brand" | "neutral";

// Placeholder while a page reads browser-saved data (localStorage) after hydration. "brand"
// blocks are violet-tinted; "neutral" ones are gray, for plain white pages.
export default function PageSkeleton({ tone = "brand" }: { tone?: SkeletonTone }) {
  return (
    <PageSkeletonWrapper
      className={clsx("page-skeleton", { "page-skeleton--neutral": tone === "neutral" })}
      role="status"
      aria-busy="true"
      aria-label="Cargando…"
    >
      <div className="page-skeleton__block page-skeleton__block--header" aria-hidden="true" />
      <div className="page-skeleton__block page-skeleton__block--line" aria-hidden="true" />
      <div className="page-skeleton__block" aria-hidden="true" />
    </PageSkeletonWrapper>
  );
}
