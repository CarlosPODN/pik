"use client";

import type { ReactNode } from "react";
import { PageLayoutWrapper } from "./PageLayout.styles";

// Page frame for list pages (the role homes, the business list): the title with its action,
// then a described section (named for screen readers by sectionLabel, with no visible heading).
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
        <h1 className="page-layout__title">{title}</h1>
        {action}
      </header>
      <section className="page-layout__section" aria-label={sectionLabel}>
        <p className="page-layout__description">{description}</p>
        {children}
      </section>
    </PageLayoutWrapper>
  );
}
