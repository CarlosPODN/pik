"use client";

import Icon from "@/components/Icon/Icon";
import { LandingHeroWrapper } from "./LandingHero.styles";

const CATEGORIES = ["Salones", "Barberías", "Spas"];

const HIGHLIGHTS = [
  "Reserva en minutos, desde tu celular",
  "Solo ves los horarios que siguen libres",
  "Servicios, precios y staff a la vista",
];

// Explains what PIK is: who it's for and what it solves.
export default function LandingHero() {
  return (
    <LandingHeroWrapper className="landing-hero" aria-labelledby="landing-hero-title">
      <p className="landing-hero__eyebrow">Belleza y bienestar</p>
      <h1 id="landing-hero-title" className="landing-hero__title">
        Reserva y cobra sin complicaciones
      </h1>
      <p className="landing-hero__intro">
        PIK es un marketplace de reservas y pagos para negocios de belleza y bienestar. Los negocios
        publican sus servicios, su staff y su horario; sus clientes eligen y reservan su cita en
        unos minutos.
      </p>
      <ul className="landing-hero__categories" aria-label="Tipos de negocio">
        {CATEGORIES.map((category) => (
          <li key={category} className="landing-hero__category">
            {category}
          </li>
        ))}
      </ul>
      <ul className="landing-hero__highlights">
        {HIGHLIGHTS.map((highlight) => (
          <li key={highlight} className="landing-hero__highlight">
            <Icon name="check" className="landing-hero__check" />
            <span className="landing-hero__highlight-text">{highlight}</span>
          </li>
        ))}
      </ul>
    </LandingHeroWrapper>
  );
}
