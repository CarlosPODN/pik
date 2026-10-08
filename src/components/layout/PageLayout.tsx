"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

const PageLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sectionGap};

  .page-layout {
    &__header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.lg};

      ${({ theme }) => theme.media.md} {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: ${({ theme }) => theme.space.xl};
      }
    }

    &__title {
      font-size: 1.75rem;
      line-height: 1.15;
      letter-spacing: -0.02em;

      ${({ theme }) => theme.media.md} {
        font-size: 2.25rem;
      }
    }

    /* A word or two of the title in the accent color. inline-block keeps it in one piece when
       the title wraps. */
    &__accent {
      display: inline-block;
      color: ${({ theme }) => theme.colors.primary};
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.lg};
    }

    &__description {
      max-width: 52ch;
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }
  }
`;

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
