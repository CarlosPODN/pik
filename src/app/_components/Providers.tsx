"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { theme } from "@/styles/theme";

export interface ProvidersProps {
  /** The whole app. */
  children: ReactNode;
}

/**
 * App-wide providers, used only by the root layout: the styled-components registry (collects
 * styles during server rendering), the `ThemeProvider` with the PIK theme, and the global styles.
 *
 * ```tsx
 * // app/layout.tsx
 * <Providers>…</Providers>
 * ```
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
