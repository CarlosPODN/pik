"use client";

import styled from "styled-components";

// Stacks the landing's sections.
const LandingPage = styled.div.attrs({ className: "landing-page" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sectionGap};
`;

export default LandingPage;
