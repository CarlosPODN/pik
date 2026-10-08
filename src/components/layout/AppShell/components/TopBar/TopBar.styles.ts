"use client";

import styled from "styled-components";

export const TopBarWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.layout.topBarHeight};
  padding: 0 ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.md} {
    padding: 0 ${({ theme }) => theme.space.xl};
  }

  /* On desktop the sidebar is always visible, so the top bar isn't needed. */
  ${({ theme }) => theme.media.lg} {
    display: none;
  }
`;
