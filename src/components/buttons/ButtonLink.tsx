"use client";

import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonClassName, type ButtonOptions } from "./Button/Button";
import { ButtonWrapper } from "./Button/Button.styles";

// A link that looks like a pill button, for actions that navigate. It renders Button's styled
// wrapper as a Next.js <Link> (styled-components' `as`), so both share one set of styles.
// Link's own legacy `as` prop is left out; it would clash with styled-components' `as`.
export default function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonOptions & Omit<ComponentProps<typeof Link>, "as">) {
  return (
    <ButtonWrapper
      as={Link}
      className={clsx(buttonClassName({ variant, size }), "button-link", className)}
      {...props}
    />
  );
}
