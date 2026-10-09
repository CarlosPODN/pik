"use client";

import type { ReactNode } from "react";
import { PageLayoutWrapper } from "./PageLayout.styles";

export interface PageLayoutProps {
  /**
   * The page's `<h1>`. To color a word or two with the brand accent, wrap them in
   * `<span className="page-layout__accent">`.
   */
  title: ReactNode;
  /** Shown at the end of the header row from `md` (under the title on phones), e.g. a button. */
  action: ReactNode;
  /** Subtitle under the title. */
  description: string;
  /** Accessible name of the content section, which has no visible heading. */
  sectionLabel: string;
  /** The page content. */
  children: ReactNode;
}

/**
 * Page frame for **list pages** (the role homes, the business list): a header with the title,
 * its subtitle and an action, then the content section.
 *
 * ```tsx
 * <PageLayout
 *   title="Registra tu negocio."
 *   description="Aquí puedes agregar tus negocios y editar su información."
 *   action={<AddBusinessButton size="sm" />}
 *   sectionLabel="Tus negocios"
 * >
 *   <Panel heading="Tus negocios">…</Panel>
 * </PageLayout>
 * ```
 *
 * **Styling**: BEM block `page-layout`; `page-layout__accent` is the one class meant for use
 * inside `title`.
 */
export default function PageLayout({
  title,
  action,
  description,
  sectionLabel,
  children,
}: PageLayoutProps) {
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
