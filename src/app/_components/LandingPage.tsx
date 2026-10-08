"use client";

import styled from "styled-components";

// Page frame for the landing: centers the sections and spaces them out.
const LandingPage = styled.main.attrs({ className: "landing-page" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.lg} ${theme.space.xxl}`};

  ${({ theme }) => theme.media.md} {
    gap: ${({ theme }) => theme.space.xxl};
    padding: ${({ theme }) => theme.space.xxl};
  }
`;

export default LandingPage;
