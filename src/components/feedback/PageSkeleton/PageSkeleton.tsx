"use client";

import clsx from "clsx";
import { PageSkeletonWrapper } from "./PageSkeleton.styles";

export type SkeletonTone = "brand" | "neutral";

export interface PageSkeletonProps {
  /**
   * `"brand"` (default): violet-tinted blocks, for pages on violet panels.
   * `"neutral"`: gray blocks, for pages of white cards (like a business's settings).
   */
  tone?: SkeletonTone;
}

/**
 * Loading placeholder shaped roughly like a page: a header, a line and a card, with a shimmer
 * sweeping across them.
 *
 * ```tsx
 * if (!hydrated) return <PageSkeleton />;
 * // app/register/[id]/loading.tsx
 * return <PageSkeleton tone="neutral" />;
 * ```
 *
 * **When**: while a page reads browser-saved data (localStorage) after hydration, and as the
 * fallback in a route's `loading.tsx`. Match the tone to the page it stands in for.
 *
 * **Accessibility**: `role="status"`, `aria-busy` and the label "Cargando…"; the blocks are
 * hidden from screen readers. With `prefers-reduced-motion`, the shimmer becomes a soft fade.
 *
 * **Styling**: BEM block `page-skeleton`, modifier `page-skeleton--neutral`.
 */
export default function PageSkeleton({ tone = "brand" }: PageSkeletonProps) {
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
