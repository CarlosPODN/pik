"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

// A section of the settings form: heading, short description, then its fields in a grid that
// is one column on phones and two from md. Children span both columns with grid-column.
const Card = styled.section.attrs({ className: "form-card" })`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space.xl};
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: ${({ theme }) => theme.space.xl};
  }
`;

const Header = styled.div.attrs({ className: "form-card__header" })`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Heading = styled.h2.attrs({ className: "form-card__heading" })`
  font-size: 1.375rem;
  letter-spacing: -0.01em;
`;

const Intro = styled.p.attrs({ className: "form-card__intro" })`
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.5;
`;

export default function FormCard({
  heading,
  intro,
  children,
}: {
  heading: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <Header>
        <Heading>{heading}</Heading>
        <Intro>{intro}</Intro>
      </Header>
      {children}
    </Card>
  );
}
