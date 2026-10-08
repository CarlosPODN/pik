"use client";

import type { ReactNode } from "react";
import { LandingPageWrapper } from "./LandingPage.styles";

// Stacks the landing's sections.
export default function LandingPage({ children }: { children: ReactNode }) {
  return <LandingPageWrapper className="landing-page">{children}</LandingPageWrapper>;
}
