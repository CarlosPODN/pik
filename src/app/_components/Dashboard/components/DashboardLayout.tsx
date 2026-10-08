"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "dashboard" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};

  ${({ theme }) => theme.media.md} {
    gap: ${({ theme }) => theme.space.xxl};
  }
`;

const Header = styled.header.attrs({ className: "dashboard__header" })`
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

const Title = styled.h1.attrs({ className: "dashboard__title" })`
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.02em;

  ${({ theme }) => theme.media.md} {
    font-size: 2.25rem;
  }
`;

// The role ends the title in the accent color. inline-block keeps it in one piece when the
// title wraps.
const RoleAccent = styled.span.attrs({ className: "dashboard__role" })`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
`;

const Section = styled.section.attrs({ className: "dashboard__section" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const Description = styled.p.attrs({ className: "dashboard__description" })`
  max-width: 52ch;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

// Shared frame for both role homes: the welcome title with its action, then a described
// section (named for screen readers by sectionLabel, with no visible heading).
export default function DashboardLayout({
  roleName,
  action,
  description,
  sectionLabel,
  children,
}: {
  roleName: string;
  action: ReactNode;
  description: string;
  sectionLabel: string;
  children: ReactNode;
}) {
  return (
    <Wrapper>
      <Header>
        <Title>
          Te damos la bienvenida, <RoleAccent>{roleName}.</RoleAccent>
        </Title>
        {action}
      </Header>
      <Section aria-label={sectionLabel}>
        <Description>{description}</Description>
        {children}
      </Section>
    </Wrapper>
  );
}
