"use client";

import styled from "styled-components";
import { buttonStyles, type ButtonStyleProps } from "./buttonStyles";

// A pill button for actions that don't navigate. Defaults to type="button" so it never submits
// a form by accident; pass type="submit" when it should.
const Button = styled.button.attrs<ButtonStyleProps>(({ type }) => ({
  className: "button",
  type: type ?? "button",
}))<ButtonStyleProps>`
  ${buttonStyles}
`;

export default Button;
