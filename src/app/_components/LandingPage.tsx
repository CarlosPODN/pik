"use client";

import styled from "styled-components";

// Stacks the landing's sections.
const LandingPage = styled.div.attrs({ className: "landing-page" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};

  ${({ theme }) => theme.media.md} {
    gap: ${({ theme }) => theme.space.xxl};
  }
`;

export default LandingPage;
