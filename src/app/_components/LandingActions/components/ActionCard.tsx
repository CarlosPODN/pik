"use client";

import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import styled from "styled-components";
import type { LandingAction } from "../actions";

const Card = styled.article.attrs({ className: "action-card" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  height: 100%;
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.div.attrs({ className: "action-card__header" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

const IconBadge = styled.span.attrs({ className: "action-card__icon" })`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
`;

const Audience = styled.p.attrs({ className: "action-card__audience" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Title = styled.h3.attrs({ className: "action-card__title" })`
  font-size: 1.25rem;
  letter-spacing: -0.01em;
`;

const Description = styled.p.attrs({ className: "action-card__description" })`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const Steps = styled.ol.attrs({ className: "action-card__steps" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  list-style: none;
  counter-reset: step;
`;

const Step = styled.li.attrs({ className: "action-card__step" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: 0.9375rem;
  counter-increment: step;

  &::before {
    content: counter(step);
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

const Cta = styled(Link).attrs({ className: "action-card__cta" })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 48px; /* comfortable touch target */
  margin-top: auto; /* keeps both cards' buttons aligned at the bottom */
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.xl}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 600;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  ${({ theme }) => theme.media.md} {
    align-self: flex-start;
  }
`;

export default function ActionCard({ action }: { action: LandingAction }) {
  return (
    <Card>
      <Header>
        <IconBadge>
          <Icon name={action.icon} size={24} />
        </IconBadge>
        <div className="action-card__heading">
          <Audience>{action.audience}</Audience>
          <Title>{action.title}</Title>
        </div>
      </Header>
      <Description>{action.description}</Description>
      <Steps aria-label="Pasos">
        {action.steps.map((step) => (
          <Step key={step}>{step}</Step>
        ))}
      </Steps>
      <Cta href={action.href}>
        {action.cta}
        <Icon name="arrow-right" />
      </Cta>
    </Card>
  );
}
