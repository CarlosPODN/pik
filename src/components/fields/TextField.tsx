"use client";

import { useId, type InputHTMLAttributes } from "react";
import styled from "styled-components";
import { fieldStyles } from "./fieldStyles";

const TextFieldWrapper = styled.div`
  ${fieldStyles}
`;

export default function TextField({
  label,
  error,
  ...inputProps
}: { label: string; error?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "id">) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <TextFieldWrapper className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field__control"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </TextFieldWrapper>
  );
}
