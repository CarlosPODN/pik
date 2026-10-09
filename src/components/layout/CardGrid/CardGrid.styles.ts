"use client";

import styled from "styled-components";

// One column on phones, as many 360px+ columns as fit from lg.
export const CardGridWrapper = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  list-style: none;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: ${({ theme }) => theme.space.lg};
  }
`;
