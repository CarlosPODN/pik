"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon/Icon";
import { EmptyStateWrapper } from "./EmptyState.styles";

export interface EmptyStateProps {
  /** Icon shown in the round badge above the title. */
  icon: IconName;
  /** Short headline, in Spanish. For example `"Aún no tienes negocios"`. */
  title: string;
  /** One or two sentences on why it's empty or what to do. */
  description: string;
  /** Optional next step under the text, usually a `Button` or `ButtonLink`. */
  action?: ReactNode;
}

/**
 * Message for a list or section with **nothing to show yet**, with an optional next step.
 *
 * ```tsx
 * <EmptyState
 *   icon="store"
 *   title="Aún no tienes negocios"
 *   description="Agrega tu primer negocio para empezar a recibir reservas."
 *   action={<AddBusinessButton />}
 * />
 * ```
 *
 * **Styling**: BEM block `empty-state`. `EmptyStateWrapper` extends `PanelWrapper`, so it has
 * the same box and minimum height as a `Panel`: a list and its empty state look like one
 * container. The content is centered in it.
 */
export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <EmptyStateWrapper className="empty-state">
      <span className="empty-state__icon">
        <Icon name={icon} size={28} />
      </span>
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__description">{description}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </EmptyStateWrapper>
  );
}
