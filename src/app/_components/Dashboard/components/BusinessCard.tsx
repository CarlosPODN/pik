"use client";

import Link from "next/link";
import styled from "styled-components";
import Icon from "@/components/Icon/Icon";
import { categoryLabel } from "@/lib/businesses";
import { formatPhone } from "@/lib/format";
import type { Business } from "@/types/business";

// The whole card links to the business settings.
const Card = styled(Link).attrs({ className: "business-card" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
  height: 100%;
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

const IconBadge = styled.span.attrs({ className: "business-card__icon" })`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
`;

const Body = styled.div.attrs({ className: "business-card__body" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  flex: 1;
  min-width: 0;
`;

const NameRow = styled.div.attrs({ className: "business-card__name-row" })`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const Name = styled.h3.attrs({ className: "business-card__name" })`
  font-size: 1rem;
`;

const Pending = styled.span.attrs({ className: "business-card__pending" })`
  padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.attention};
  color: ${({ theme }) => theme.colors.onAttention};
  font-size: 0.75rem;
  font-weight: 600;
`;

const Meta = styled.p.attrs({ className: "business-card__meta" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;

const Chevron = styled(Icon).attrs({ className: "business-card__chevron" })`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function BusinessCard({ business }: { business: Business }) {
  const details = [categoryLabel(business.category), business.phone && formatPhone(business.phone)]
    .filter(Boolean)
    .join(" · ");

  return (
    <Card href={`/businesses/${business.id}`}>
      <IconBadge>
        <Icon name="store" size={24} />
      </IconBadge>
      <Body>
        <NameRow>
          <Name>{business.name}</Name>
          {!business.touched && <Pending>Sin editar</Pending>}
        </NameRow>
        <Meta>{details || "Agrega su categoría y teléfono"}</Meta>
      </Body>
      <Chevron name="arrow-right" />
    </Card>
  );
}
