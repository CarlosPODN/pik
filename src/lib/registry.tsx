"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export interface StyledComponentsRegistryProps {
  /** The whole app. */
  children: ReactNode;
}

/**
 * Makes styled-components work with server rendering: it collects the styles each component
 * uses while rendering on the server and injects them into the HTML stream, so the page arrives
 * styled. In the browser it just renders its children.
 *
 * ```tsx
 * // app/_components/Providers.tsx
 * <StyledComponentsRegistry>…</StyledComponentsRegistry>
 * ```
 */
export default function StyledComponentsRegistry({ children }: StyledComponentsRegistryProps) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
