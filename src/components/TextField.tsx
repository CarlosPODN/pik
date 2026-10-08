"use client";

import { useId, type InputHTMLAttributes } from "react";
import styled from "styled-components";
import { controlStyles, FieldError, FieldLabel, FieldWrapper } from "./fieldStyles";

const Input = styled.input.attrs({ className: "text-field__input" })<{ $invalid: boolean }>`
  ${controlStyles}
`;

export default function TextField({
  label,
  error,
  ...inputProps
}: { label: string; error?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "id">) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        $invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </FieldWrapper>
  );
}
