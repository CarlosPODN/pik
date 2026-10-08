"use client";

import ButtonLink from "@/components/buttons/ButtonLink";
import Icon from "@/components/Icon/Icon";
import styled from "styled-components";
import type { Audience } from "../audiences";

const Panel = styled.div.attrs({ className: "flow-panel" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space.xxl};
  }
`;

const Header = styled.div.attrs({ className: "flow-panel__header" })`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
`;

const IconBadge = styled.span.attrs({ className: "flow-panel__icon" })`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
`;

const Heading = styled.div.attrs({ className: "flow-panel__heading" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Title = styled.h3.attrs({ className: "flow-panel__title" })`
  font-size: 1.25rem;
  letter-spacing: -0.01em;
`;

const Description = styled.p.attrs({ className: "flow-panel__description" })`
  max-width: 60ch;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

// Steps as a connected timeline: vertical on phones, horizontal from lg.
const Steps = styled.ol.attrs({ className: "flow-panel__steps" })`
  display: flex;
  flex-direction: column;
  list-style: none;
  counter-reset: step;

  ${({ theme }) => theme.media.lg} {
    flex-direction: row;
  }
`;

const Step = styled.li.attrs({ className: "flow-panel__step" })`
  position: relative;
  display: grid;
  grid-template-columns: 32px 1fr;
  column-gap: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.lg};
  counter-increment: step;

  /* Step number */
  &::before {
    content: counter(step);
    grid-row: span 2;
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    font-size: 0.875rem;
    font-weight: 700;
  }

  /* Connector to the next step */
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 36px;
    bottom: 4px;
    left: 15px;
    width: 2px;
    border-radius: 1px;
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  &:last-child {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.media.lg} {
    flex: 1;
    grid-template-columns: 1fr;
    row-gap: ${({ theme }) => theme.space.xs};
    padding: 0 ${({ theme }) => theme.space.md} 0 0;

    &::before {
      grid-row: auto;
      margin-bottom: ${({ theme }) => theme.space.sm};
    }

    &:not(:last-child)::after {
      top: 15px;
      bottom: auto;
      left: 40px;
      right: 8px;
      width: auto;
      height: 2px;
    }
  }
`;

const StepTitle = styled.span.attrs({ className: "flow-panel__step-title" })`
  align-self: center;
  font-weight: 600;
  line-height: 1.3;
`;

const StepDescription = styled.span.attrs({ className: "flow-panel__step-description" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  line-height: 1.4;
`;

const Cta = styled(ButtonLink).attrs({ className: "flow-panel__cta" })`
  ${({ theme }) => theme.media.md} {
    align-self: flex-start;
  }
`;

// The selected audience's flow: what it's for, its steps and the button that starts it.
export default function FlowPanel({
  audience,
  id,
  labelledBy,
  onStart,
}: {
  audience: Audience;
  id: string;
  labelledBy: string;
  // Starting a flow is what picks the role: it saves the session before navigating.
  onStart: () => void;
}) {
  return (
    <Panel role="tabpanel" id={id} aria-labelledby={labelledBy}>
      <Header>
        <IconBadge>
          <Icon name={audience.icon} size={24} />
        </IconBadge>
        <Heading>
          <Title>{audience.title}</Title>
          <Description>{audience.description}</Description>
        </Heading>
      </Header>
      <Steps aria-label="Pasos">
        {audience.steps.map((step) => (
          <Step key={step.title}>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Step>
        ))}
      </Steps>
      <Cta href={audience.href} onClick={onStart}>
        {audience.cta}
        <Icon name="arrow-right" />
      </Cta>
    </Panel>
  );
}
