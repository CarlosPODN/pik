"use client";

import { PageSkeletonWrapper } from "./PageSkeleton.styles";

// Placeholder while a page reads browser-saved data (localStorage) after hydration.
export default function PageSkeleton() {
  return (
    <PageSkeletonWrapper
      className="page-skeleton"
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
