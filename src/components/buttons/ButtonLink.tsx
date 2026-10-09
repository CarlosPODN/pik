"use client";

import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonClassName, type ButtonOptions } from "./Button/Button";
import { ButtonWrapper } from "./Button/Button.styles";

/**
 * `Button`'s look options plus every Next.js `Link` prop (`href` is required). Link's legacy
 * `as` prop is left out: it would clash with styled-components' `as`.
 */
export type ButtonLinkProps = ButtonOptions & Omit<ComponentProps<typeof Link>, "as">;

/**
 * A link that looks like a pill button, for actions that **navigate**.
 *
 * ```tsx
 * <ButtonLink href="/register" variant="secondary">Volver</ButtonLink>
 * ```
 *
 * **Styling**: renders `Button`'s styled wrapper as a Next.js `<Link>` (styled-components' `as`),
 * so both share one set of styles. Classes: the `button` block and its modifiers, plus
 * `button-link`.
 */
export default function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return (
    <ButtonWrapper
      as={Link}
      className={clsx(buttonClassName({ variant, size }), "button-link", className)}
      {...props}
    />
  );
}
