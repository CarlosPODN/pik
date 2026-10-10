"use client";

import styled from "styled-components";

// The message centered in whatever space is left in its container (a Panel's box, under its
// heading).
export const EmptyStateWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  text-align: center;

  .empty-state {
    &__icon {
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.primarySoft};
      color: ${({ theme }) => theme.colors.primary};
    }

    &__title {
      font-size: 1.125rem;
      font-weight: 700;
    }

    &__description {
      max-width: 44ch;
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }

    &__action {
      margin-top: ${({ theme }) => theme.space.sm};
    }
  }
`;
