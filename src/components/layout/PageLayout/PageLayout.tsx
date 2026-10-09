"use client";

import type { ReactNode } from "react";
import { PageLayoutWrapper } from "./PageLayout.styles";

// Page frame for list pages (the role homes, the business list): the title with its subtitle
// and action, then the section (named for screen readers by sectionLabel, with no visible heading).
// Wrap the accent words of the title in <span className="page-layout__accent">.
export default function PageLayout({
  title,
  action,
  description,
  sectionLabel,
  children,
}: {
  title: ReactNode;
  action: ReactNode;
  description: string;
  sectionLabel: string;
  children: ReactNode;
}) {
  return (
    <PageLayoutWrapper className="page-layout">
      <header className="page-layout__header">
        <div className="page-layout__heading">
          <h1 className="page-layout__title">{title}</h1>
          <p className="page-layout__description">{description}</p>
        </div>
        {action}
      </header>
      <section className="page-layout__section" aria-label={sectionLabel}>
        {children}
      </section>
    </PageLayoutWrapper>
  );
}
