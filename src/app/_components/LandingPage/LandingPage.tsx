"use client";

import type { ReactNode } from "react";
import { LandingPageWrapper } from "./LandingPage.styles";

export interface LandingPageProps {
  /** The landing's sections, in order. */
  children: ReactNode;
}

/**
 * Stacks the landing's sections with the page's spacing.
 *
 * ```tsx
 * <LandingPage>
 *   <LandingHero />
 *   <LandingActions />
 * </LandingPage>
 * ```
 *
 * **Styling**: BEM block `landing-page`.
 */
export default function LandingPage({ children }: LandingPageProps) {
  return <LandingPageWrapper className="landing-page">{children}</LandingPageWrapper>;
}
