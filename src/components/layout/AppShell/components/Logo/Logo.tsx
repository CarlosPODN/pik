"use client";

import { LogoWrapper } from "./Logo.styles";

export interface LogoProps {
  /** Runs on click, before navigating home. The sidebar passes its close handler here. */
  onClick?: () => void;
}

/**
 * The "PIK" wordmark, linking to `/`. A text placeholder until there's an official logo asset.
 *
 * ```tsx
 * <Logo onClick={closeDrawer} />
 * ```
 *
 * **Accessibility**: its accessible name is "PIK, ir al inicio".
 *
 * **Styling**: BEM block `logo`.
 */
export default function Logo({ onClick }: LogoProps) {
  return (
    <LogoWrapper className="logo" href="/" aria-label="PIK, ir al inicio" onClick={onClick}>
      PIK
    </LogoWrapper>
  );
}
