"use client";

import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import styled from "styled-components";
import { buttonClassName, buttonStyles, type ButtonOptions } from "./buttonStyles";

const ButtonLinkWrapper = styled(Link)`
  ${buttonStyles}
`;

// A link that looks like a pill button, for actions that navigate.
export default function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonOptions & ComponentProps<typeof Link>) {
  return (
    <ButtonLinkWrapper
      className={clsx(buttonClassName({ variant, size }), "button-link", className)}
      {...props}
    />
  );
}
