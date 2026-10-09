"use client";

import Icon from "@/components/Icon/Icon";
import { categoryLabel } from "@/lib/businesses";
import type { Business } from "@/types/business";
import { BusinessCardWrapper } from "./BusinessCard.styles";

export interface BusinessCardProps {
  /** The business to show. */
  business: Business;
}

/**
 * One business in the `/register` list: its name, category and a "Sin editar" badge until it's
 * first saved. The whole card links to its settings at `/register/[id]`.
 *
 * ```tsx
 * <li key={business.id}>
 *   <BusinessCard business={business} />
 * </li>
 * ```
 *
 * **Styling**: BEM block `business-card`, styled by `BusinessCardWrapper` (a styled Next.js
 * `Link`).
 */
export default function BusinessCard({ business }: BusinessCardProps) {
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
