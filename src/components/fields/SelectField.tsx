"use client";

import { useId, type SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { controlStyles, FieldError, FieldLabel, FieldWrapper } from "./fieldStyles";

const Select = styled.select.attrs({ className: "select-field__select" })<{ $invalid: boolean }>`
  ${controlStyles}
`;

export default function SelectField({
  label,
  error,
  placeholder,
  options,
  ...selectProps
}: {
  label: string;
  error?: string;
  placeholder: string;
  options: { value: string; label: string }[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id">) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        id={id}
        $invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...selectProps}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </FieldWrapper>
  );
}
