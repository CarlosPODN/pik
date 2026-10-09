"use client";

import styled from "styled-components";
import Link from "next/link";

// The whole card links to the business settings.
export const BusinessCardWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
  height: 100%;
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  .business-card {
    &__icon {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: ${({ theme }) => theme.radii.md};
      background: ${({ theme }) => theme.colors.primarySoft};
      color: ${({ theme }) => theme.colors.primary};
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xxs};
      flex: 1;
      min-width: 0;
    }

    &__name-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: ${({ theme }) => theme.space.sm};
    }

    &__name {
      font-size: 1rem;
    }

    &__pending {
      padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.attention};
      color: ${({ theme }) => theme.palette.white}; /* by design choice; ~3.2:1 on flama */
      font-size: 0.75rem;
      font-weight: 600;
    }

    &__meta {
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.875rem;
    }

    &__chevron {
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.muted};
    }
  }
`;
