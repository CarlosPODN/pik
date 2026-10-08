"use client";

import { PageSkeletonWrapper } from "./PageSkeleton.styles";

// Placeholder while a page reads browser-saved data (localStorage) after hydration.
export default function PageSkeleton() {
  return (
    <PageSkeletonWrapper className="page-skeleton" role="status" aria-label="Cargando">
      <div className="page-skeleton__block page-skeleton__block--header" />
      <div className="page-skeleton__block page-skeleton__block--line" />
      <div className="page-skeleton__block" />
    </PageSkeletonWrapper>
  );
}
