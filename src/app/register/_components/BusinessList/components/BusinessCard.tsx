"use client";

import Link from "next/link";
import styled from "styled-components";
import Icon from "@/components/Icon/Icon";
import { categoryLabel } from "@/lib/businesses";
import type { Business } from "@/types/business";

// The whole card links to the business settings.
const BusinessCardWrapper = styled(Link)`
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

  .business-card__icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
  }

  .business-card__body {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.xxs};
    flex: 1;
    min-width: 0;
  }

  .business-card__name-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.space.sm};
  }

  .business-card__name {
    font-size: 1rem;
  }

  .business-card__pending {
    padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.attention};
    color: ${({ theme }) => theme.palette.white}; /* by design choice; ~3.2:1 on flama */
    font-size: 0.75rem;
    font-weight: 600;
  }

  .business-card__meta {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.875rem;
  }

  .business-card__chevron {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export default function BusinessCard({ business }: { business: Business }) {
  const category = categoryLabel(business.category);

  return (
    <BusinessCardWrapper className="business-card" href={`/register/${business.id}`}>
      <span className="business-card__icon">
        <Icon name="store" size={24} />
      </span>
      <div className="business-card__body">
        <div className="business-card__name-row">
          <h3 className="business-card__name">{business.name}</h3>
          {!business.touched && <span className="business-card__pending">Sin editar</span>}
        </div>
        <p className="business-card__meta">{category ?? "Agrega su categoría y teléfono"}</p>
      </div>
      <Icon className="business-card__chevron" name="arrow-right" />
    </BusinessCardWrapper>
  );
}
