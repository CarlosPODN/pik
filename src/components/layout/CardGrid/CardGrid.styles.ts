"use client";

import styled from "styled-components";

// One column on phones, as many 360px+ columns as fit from lg. The "rows" layout stays one
// card per row at every width.
export const CardGridWrapper = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  list-style: none;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: ${({ theme }) => theme.space.lg};
  }

  &.card-grid--rows {
    grid-template-columns: minmax(0, 1fr);
    gap: ${({ theme }) => theme.space.md};
  }
`;
