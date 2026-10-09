"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { ButtonWrapper } from "./Button.styles";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "md" | "sm";

export interface ButtonOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// BEM classes for the "button" block, shared by Button and ButtonLink. Primary and md are the
// defaults, so they have no modifier.
export function buttonClassName({ variant = "primary", size = "md" }: ButtonOptions) {
  return clsx("button", {
    "button--secondary": variant === "secondary",
    "button--danger": variant === "danger",
    "button--sm": size === "sm",
  });
}

// A pill button for actions that don't navigate. Defaults to type="button" so it never submits
// a form by accident; pass type="submit" when it should.
export default function Button({
  variant,
  size,
  type = "button",
  className,
  ...props
}: ButtonOptions & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <ButtonWrapper
      type={type}
      className={clsx(buttonClassName({ variant, size }), className)}
      {...props}
    />
  );
}
