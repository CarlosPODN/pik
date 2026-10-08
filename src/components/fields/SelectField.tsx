"use client";

import { useId, type SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { fieldStyles } from "./fieldStyles";

const SelectFieldWrapper = styled.div`
  ${fieldStyles}
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
    <SelectFieldWrapper className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="field__control"
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
      </select>
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </SelectFieldWrapper>
  );
}
