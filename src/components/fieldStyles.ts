import styled, { css } from "styled-components";

// Shared look for form fields: a label above, the control, then a hint or an error.
export const FieldWrapper = styled.div.attrs({ className: "field" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

export const FieldLabel = styled.label.attrs({ className: "field__label" })`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const FieldError = styled.p.attrs({ className: "field__error" })`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.8125rem;
`;

export const controlStyles = css<{ $invalid: boolean }>`
  width: 100%;
  min-height: 44px; /* comfortable touch target */
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border: 1px solid
    ${({ $invalid, theme }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font: inherit;
  font-size: 1rem; /* 16px keeps iOS Safari from zooming in on focus */

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primarySoft};
  }
`;
