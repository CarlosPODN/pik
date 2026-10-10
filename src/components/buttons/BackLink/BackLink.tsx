"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon/Icon";
import { BackLinkWrapper } from "./BackLink.styles";

// The parent of a path: "/register/abc" → "/register", "/register" → "/".
const parentPath = (pathname: string) => pathname.slice(0, pathname.lastIndexOf("/")) || "/";

export interface BackLinkProps {
  /** Visible text, in Spanish (UI copy). For example `"Mis negocios"`. */
  label: string;
  /** Extra class, merged with `back-link`, so a parent can position it. */
  className?: string;
}

/**
 * A quiet text link with a left arrow that goes **one level up** from the current page.
 * It sits above a page's title, like "← Mis negocios" on a business's settings.
 *
 * ```tsx
 * <BackLink label="Mis negocios" />
 * ```
 *
 * **Destination**: there's no `href` prop. It reads the current path with `usePathname()` and
 * drops the last segment:
 *
 * | Current path    | Links to    |
 * | --------------- | ----------- |
 * | `/register/abc` | `/register` |
 * | `/register`     | `/`         |
 *
 * **Styling**: BEM block `back-link`, styled by `BackLinkWrapper` (a styled Next.js `Link`).
 * It uses `align-self: flex-start`, so in a column flex parent it keeps its own width.
 */
export default function BackLink({ label, className }: BackLinkProps) {
  const pathname = usePathname();

  return (
    <BackLinkWrapper href={parentPath(pathname)} className={clsx("back-link", className)}>
      <Icon name="arrow-left" />
      {label}
    </BackLinkWrapper>
  );
}
