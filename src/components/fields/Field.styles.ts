"use client";

import styled, { css } from "styled-components";

// The look of a form control (input, select). Also used outside a field, by the opening-hours
// time inputs, so it stays a css fragment. Invalid controls are marked with
// aria-invalid="true", which also tells screen readers.
export const controlStyles = css`
  width: 100%;
  min-height: 44px; /* comfortable touch target */
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font: inherit;
  font-size: 1rem; /* 16px keeps iOS Safari from zooming in on focus */

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.danger};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primarySoft};
  }
`;

// Error text under a field.
export const errorTextStyles = css`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.8125rem;
`;

// The "field" block shared by TextField and SelectField: a label above, the control, then an
// error. Elements: field__label, field__control, field__error.
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};

  .field {
    &__label {
      font-size: 0.875rem;
      font-weight: 600;
    }

    &__control {
      ${controlStyles}
    }

    &__error {
      ${errorTextStyles}
    }
  }
`;
