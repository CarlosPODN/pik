"use client";

import styled from "styled-components";

export const DeleteRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};

  .delete-row {
    &__text {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xxs};
      min-width: 0;
    }

    &__label {
      font-size: 0.9375rem;
      font-weight: 600;
    }

    &__hint {
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.8125rem;
      line-height: 1.4;
    }

    &__buttons {
      display: flex;
      gap: ${({ theme }) => theme.space.sm};
      flex-shrink: 0;
    }

    /* Square icon buttons. Trash and cancel are outlined; confirm is filled red. */
    &__action {
      display: grid;
      place-items: center;
      width: 44px; /* comfortable touch target */
      height: 44px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.radii.md};
      background: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.foreground};
      cursor: pointer;

      &:hover {
        border-color: ${({ theme }) => theme.colors.foreground};
      }

      &:focus-visible {
        outline: none;
        box-shadow: ${({ theme }) => theme.shadows.focusRing};
      }
    }

    &__action--trash {
      color: ${({ theme }) => theme.colors.danger};

      &:hover {
        border-color: ${({ theme }) => theme.colors.danger};
      }
    }

    &__action--confirm {
      border-color: ${({ theme }) => theme.colors.danger};
      background: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.onPrimary};

      &:hover {
        border-color: ${({ theme }) => theme.colors.danger};
      }
    }
  }
`;
