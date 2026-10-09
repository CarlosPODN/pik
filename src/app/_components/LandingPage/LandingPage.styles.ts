"use client";

import styled from "styled-components";

export const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.sectionGap};
`;
