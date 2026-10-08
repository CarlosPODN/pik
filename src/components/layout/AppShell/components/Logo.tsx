"use client";

import Link from "next/link";
import styled from "styled-components";

const LogoWrapper = styled(Link)`
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

// Text wordmark until there is an official PIK logo asset.
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <LogoWrapper className="logo" href="/" aria-label="PIK, ir al inicio" onClick={onClick}>
      PIK
    </LogoWrapper>
  );
}
