"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "page-layout" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sectionGap};
`;

const Header = styled.header.attrs({ className: "page-layout__header" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.xl};
  }
`;

const Title = styled.h1.attrs({ className: "page-layout__title" })`
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.02em;

  ${({ theme }) => theme.media.md} {
    font-size: 2.25rem;
  }
`;

// A word or two of the title in the accent color. inline-block keeps it in one piece when the
// title wraps.
export const TitleAccent = styled.span.attrs({ className: "page-layout__accent" })`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
`;

const Section = styled.section.attrs({ className: "page-layout__section" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const Description = styled.p.attrs({ className: "page-layout__description" })`
  max-width: 52ch;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

// Page frame for list pages (the role homes, the business list): the title with its action,
// then a described section (named for screen readers by sectionLabel, with no visible heading).
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
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {action}
      </Header>
      <Section aria-label={sectionLabel}>
        <Description>{description}</Description>
        {children}
      </Section>
    </Wrapper>
  );
}
