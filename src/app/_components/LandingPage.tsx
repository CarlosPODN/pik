"use client";

import type { ReactNode } from "react";
import styled from "styled-components";

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sectionGap};
`;

// Stacks the landing's sections.
export default function LandingPage({ children }: { children: ReactNode }) {
  return <LandingPageWrapper className="landing-page">{children}</LandingPageWrapper>;
}
