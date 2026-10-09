"use client";

import Icon from "@/components/Icon/Icon";
import { categoryLabel } from "@/lib/businesses";
import type { Business } from "@/types/business";
import { BusinessCardWrapper } from "./BusinessCard.styles";

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
