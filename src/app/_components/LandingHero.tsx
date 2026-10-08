"use client";

import Icon from "@/components/Icon/Icon";
import styled from "styled-components";

const CATEGORIES = ["Salones", "Barberías", "Spas"];

const HIGHLIGHTS = [
  "Reserva en minutos, desde tu celular",
  "Solo ves los horarios que siguen libres",
  "Servicios, precios y staff a la vista",
];

const LandingHeroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};

  ${({ theme }) => theme.media.md} {
    gap: ${({ theme }) => theme.space.xl};
    padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.xxl}`};
  }

  .landing-hero {
    &__eyebrow {
      color: ${({ theme }) => theme.colors.onPrimaryMuted};
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    &__title {
      max-width: 18ch;
      font-size: 1.875rem;
      line-height: 1.15;
      letter-spacing: -0.02em;

      ${({ theme }) => theme.media.md} {
        font-size: 2.75rem;
      }
    }

    &__intro {
      max-width: 60ch;
      color: ${({ theme }) => theme.colors.onPrimaryMuted};
      font-size: 1rem;
      line-height: 1.6;

      ${({ theme }) => theme.media.md} {
        font-size: 1.125rem;
      }
    }

    &__categories {
      display: flex;
      flex-wrap: wrap;
      gap: ${({ theme }) => theme.space.sm};
      list-style: none;
    }

    &__category {
      padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.onPrimarySubtle};
      font-size: 0.875rem;
      font-weight: 500;
    }

    &__highlights {
      display: grid;
      gap: ${({ theme }) => theme.space.md};
      padding-top: ${({ theme }) => theme.space.lg};
      border-top: 1px solid ${({ theme }) => theme.colors.onPrimarySubtle};
      list-style: none;

      ${({ theme }) => theme.media.md} {
        grid-template-columns: repeat(3, 1fr);
        padding-top: ${({ theme }) => theme.space.xl};
      }
    }

    &__highlight {
      display: flex;
      align-items: flex-start;
      gap: ${({ theme }) => theme.space.sm};
      font-size: 0.9375rem;
      line-height: 1.4;
    }

    &__check {
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.success};
    }
  }
`;

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
