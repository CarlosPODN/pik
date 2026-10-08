"use client";

import styled from "styled-components";

// Page frame for the landing: pads the content and spaces the sections out.
const LandingPage = styled.main.attrs({ className: "landing-page" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.layout.pagePadding.base};

  ${({ theme }) => theme.media.md} {
    gap: ${({ theme }) => theme.space.xxl};
    padding: ${({ theme }) => theme.layout.pagePadding.md};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${({ theme }) => theme.layout.pagePadding.lg};
  }
`;

export default LandingPage;
