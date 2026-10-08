"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

// One column on phones, as many 360px+ columns as fit from lg.
const CardGridWrapper = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  list-style: none;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: ${({ theme }) => theme.space.lg};
  }
`;

// A list of cards. Children are the <li> items.
export default function CardGrid({ children }: { children: ReactNode }) {
  return <CardGridWrapper className="card-grid">{children}</CardGridWrapper>;
}
