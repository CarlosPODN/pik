"use client";

import styled from "styled-components";

export const SessionCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  .session-card {
    &__label {
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.75rem;
    }

    &__role {
      display: block;
      color: ${({ theme }) => theme.colors.foreground};
      font-size: 0.875rem;
    }

    &__switch {
      align-self: flex-start;
      min-height: 32px;
      padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.radii.pill};
      background: transparent;
      color: ${({ theme }) => theme.colors.primary};
      font: inherit;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: ${({ theme }) => theme.colors.primarySoft};
      }

      &:focus-visible {
        outline: none;
        box-shadow: ${({ theme }) => theme.shadows.focusRing};
      }
    }
  }
`;
