"use client";

import styled from "styled-components";
import Link from "next/link";

export const LogoWrapper = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;
