"use client";

import Link from "next/link";
import styled from "styled-components";
import { buttonStyles, type ButtonStyleProps } from "./buttonStyles";

// A link styled as a pill button, for actions that navigate.
const ButtonLink = styled(Link).attrs({ className: "button-link" })<ButtonStyleProps>`
  ${buttonStyles}
`;

export default ButtonLink;
