"use client";

import { useId, type SelectHTMLAttributes } from "react";
import { FieldWrapper } from "./Field.styles";

/** Every `<select>` attribute except `id` (it's generated) is passed through. */
export type SelectFieldProps = {
  /** Visible label, in Spanish. Linked to the select, so it's also its accessible name. */
  label: string;
  /** Error message under the select. When set, the select is marked `aria-invalid`. */
  error?: string;
  /** Text of the first, disabled option, shown while the value is `""`. */
  placeholder: string;
  /** The choices, in order. `label` is the Spanish text; `value` is what's stored. */
  options: { value: string; label: string }[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id">;

/**
 * A labeled select with a placeholder option and its error message.
 *
 * ```tsx
 * <SelectField
 *   label="Categoría"
 *   placeholder="Elige una categoría"
 *   options={BUSINESS_CATEGORIES}
 *   value={category}
 *   onChange={(event) => setCategory(event.target.value)}
 *   error={errors.category}
 * />
 * ```
 *
 * **Empty value**: start with `value=""` to show the placeholder; it can't be picked again.
 *
 * **Styling**: BEM block `field`, from `FieldWrapper` in `Field.styles.ts`, shared with
 * `TextField`.
 */
export default function SelectField({
  label,
  error,
  placeholder,
  options,
  ...selectProps
}: SelectFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <FieldWrapper className="field">
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
    </FieldWrapper>
  );
}
