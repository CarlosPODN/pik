"use client";

import { PagePlaceholderWrapper } from "./PagePlaceholder.styles";

export interface PagePlaceholderProps {
  /** The page's `<h1>`. */
  title: string;
  /** One sentence on what the page will do. */
  description: string;
}

/**
 * **Temporary** page body for routes whose flow isn't built yet: just a title and a sentence.
 *
 * ```tsx
 * <PagePlaceholder
 *   title="Agenda una cita"
 *   description="Elige un servicio, quién te atiende y el horario que te acomode."
 * />
 * ```
 *
 * **Styling**: BEM block `page-placeholder`.
 */
export default function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <PagePlaceholderWrapper className="page-placeholder">
      <h1 className="page-placeholder__title">{title}</h1>
      <p className="page-placeholder__description">{description}</p>
    </PagePlaceholderWrapper>
  );
}
