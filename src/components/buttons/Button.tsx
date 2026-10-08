"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { buttonClassName, buttonStyles, type ButtonOptions } from "./buttonStyles";

const ButtonWrapper = styled.button`
  ${buttonStyles}
`;

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
