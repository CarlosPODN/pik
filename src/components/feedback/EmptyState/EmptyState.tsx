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
 * Message for a list or page with **nothing to show**, with an optional next step: an icon
 * badge, a title, a description and the action, centered.
 *
 * ```tsx
 * <Panel heading="Tus negocios" isEmpty={businesses.length === 0} emptyState={{
 *   icon: "store",
 *   title: "Aún no tienes negocios",
 *   description: "Agrega tu primer negocio para empezar a recibir reservas.",
 * }}>
 *   …
 * </Panel>
 * ```
 *
 * **Where**: `Panel` renders it from its `emptyState` prop, inside its box; pages don't render
 * it themselves.
 *
 * **Styling**: BEM block `empty-state`. It has no box of its own; it grows to fill the space
 * it's in and centers its content there.
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
