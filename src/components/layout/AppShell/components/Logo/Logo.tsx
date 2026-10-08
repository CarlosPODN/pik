"use client";

import { LogoWrapper } from "./Logo.styles";

// Text wordmark until there is an official PIK logo asset.
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <LogoWrapper className="logo" href="/" aria-label="PIK, ir al inicio" onClick={onClick}>
      PIK
    </LogoWrapper>
  );
}
