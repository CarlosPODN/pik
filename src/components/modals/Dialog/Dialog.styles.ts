"use client";

import styled from "styled-components";

export const DialogWrapper = styled.dialog`
  width: min(420px, calc(100vw - 32px));
  margin: auto;
  padding: ${({ theme }) => theme.space.xl};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  box-shadow: 0 24px 48px -12px rgba(45, 45, 45, 0.35);

  &::backdrop {
    background: ${({ theme }) => theme.colors.overlay};
  }

  .dialog {
    &__title {
      font-size: 1.125rem;
      line-height: 1.3;
    }

    &__body {
      margin-top: ${({ theme }) => theme.space.sm};
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }

    /* Buttons split the width evenly, on every screen size. Long labels wrap instead of
       overflowing. */
    &__actions {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      gap: ${({ theme }) => theme.space.sm};
      margin-top: ${({ theme }) => theme.space.xl};

      & > * {
        min-width: 0;
        white-space: normal;
        text-align: center;
      }
    }
  }
`;
