"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import Icon, { type IconName } from "@/components/Icon/Icon";

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.xl}`};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;

  .empty-state__icon {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
  }

  .empty-state__title {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .empty-state__description {
    max-width: 44ch;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.5;
  }

  .empty-state__action {
    margin-top: ${({ theme }) => theme.space.sm};
  }
`;

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
