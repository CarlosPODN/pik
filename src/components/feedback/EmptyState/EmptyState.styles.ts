"use client";

import styled from "styled-components";
import { PanelWrapper } from "@/components/layout/Panel/Panel.styles";

// Same box as Panel, with the message centered in it.
export const EmptyStateWrapper = styled(PanelWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.xl}`};
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
