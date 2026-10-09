"use client";

import { useId, type ComponentProps } from "react";
import { FieldWrapper } from "./Field.styles";

/**
 * Every `<input>` prop except `id` (it's generated) is passed through, `ref` included, so React
 * Hook Form's `register()` output can be spread in.
 */
export type TextFieldProps = {
  /** Visible label, in Spanish. Linked to the input, so it's also its accessible name. */
  label: string;
  /** Error message under the input. When set, the input is marked `aria-invalid`. */
  error?: string;
} & Omit<ComponentProps<"input">, "id">;

/**
 * A labeled text input with its error message.
 *
 * ```tsx
 * <TextField
 *   label="Teléfono de contacto"
 *   type="tel"
 *   autoComplete="tel"
 *   error={errors.phone?.message}
 *   {...register("phone")}
 * />
 * ```
 *
 * **React Hook Form**: spread `register("field")` into it. The ref reaches the input, so the
 * form can focus it when it's the first invalid field.
 *
 * **Accessibility**: the label points at the input, and the error is linked with
 * `aria-describedby`, so screen readers read it with the field.
 *
 * **Styling**: BEM block `field` (`field__label`, `field__control`, `field__error`), from
 * `FieldWrapper` in `Field.styles.ts`, shared with `SelectField`.
 */
export default function TextField({ label, error, ...inputProps }: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <FieldWrapper className="field">
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
    </FieldWrapper>
  );
}
