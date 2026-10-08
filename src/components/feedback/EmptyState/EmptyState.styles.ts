"use client";

import styled from "styled-components";

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.xl}`};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
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
