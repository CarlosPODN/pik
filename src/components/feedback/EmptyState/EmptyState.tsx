"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon/Icon";
import { EmptyStateWrapper } from "./EmptyState.styles";

// Message for a list or section with nothing to show yet, with an optional next step.
export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: IconName;
  title: string;
  description: string;
  action?: ReactNode;
}) {
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
