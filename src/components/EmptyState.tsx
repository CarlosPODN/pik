"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import Icon, { type IconName } from "@/components/Icon/Icon";

const Wrapper = styled.div.attrs({ className: "empty-state" })`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.xl}`};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const IconBadge = styled.span.attrs({ className: "empty-state__icon" })`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.p.attrs({ className: "empty-state__title" })`
  font-size: 1.125rem;
  font-weight: 700;
`;

const Description = styled.p.attrs({ className: "empty-state__description" })`
  max-width: 44ch;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const Action = styled.div.attrs({ className: "empty-state__action" })`
  margin-top: ${({ theme }) => theme.space.sm};
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
    <Wrapper>
      <IconBadge>
        <Icon name={icon} size={28} />
      </IconBadge>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {action && <Action>{action}</Action>}
    </Wrapper>
  );
}
