"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { ButtonWrapper } from "./Button.styles";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "md" | "sm";

/** Look options shared by `Button` and `ButtonLink`. */
export interface ButtonOptions {
  /** `"primary"` (default, filled violet), `"secondary"` (outlined) or `"danger"` (destructive). */
  variant?: ButtonVariant;
  /** `"md"` (default) or `"sm"`, the compact size for headers and dialogs. */
  size?: ButtonSize;
}

/** Every `<button>` attribute is passed through; `type` defaults to `"button"`. */
export type ButtonProps = ButtonOptions & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * BEM classes for the `button` block, shared by `Button` and `ButtonLink`. Primary and md are
 * the defaults, so they have no modifier: `button`, `button--secondary`, `button--danger`,
 * `button--sm`.
 */
export function buttonClassName({ variant = "primary", size = "md" }: ButtonOptions) {
  return clsx("button", {
    "button--secondary": variant === "secondary",
    "button--danger": variant === "danger",
    "button--sm": size === "sm",
  });
}

/**
 * A pill button for actions that **don't navigate** (use `ButtonLink` for those).
 *
 * ```tsx
 * <Button onClick={add}>Agregar empleado</Button>
 * <Button type="submit" form={formId}>Guardar cambios</Button>
 * <Button variant="danger" size="sm" onClick={confirm}>Eliminar</Button>
 * ```
 *
 * **Type**: defaults to `type="button"` so it never submits a form by accident; pass
 * `type="submit"` when it should (with `form={id}` to submit a form it isn't inside).
 *
 * **Styling**: BEM block `button`, styled by `ButtonWrapper`; see `buttonClassName` for the
 * modifiers. A `className` is merged in.
 */
export default function Button({
  variant,
  size,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <ButtonWrapper
      type={type}
      className={clsx(buttonClassName({ variant, size }), className)}
      {...props}
    />
  );
}
