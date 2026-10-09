"use client";

import ButtonLink from "@/components/buttons/ButtonLink";
import Icon from "@/components/Icon/Icon";
import type { Audience } from "../../audiences";
import { FlowPanelWrapper } from "./FlowPanel.styles";

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
    <FlowPanelWrapper className="flow-panel" role="tabpanel" id={id} aria-labelledby={labelledBy}>
      <div className="flow-panel__header">
        <span className="flow-panel__icon">
          <Icon name={audience.icon} size={24} />
        </span>
        <div className="flow-panel__heading">
          <h3 className="flow-panel__title">{audience.title}</h3>
          <p className="flow-panel__description">{audience.description}</p>
        </div>
      </div>
      <ol className="flow-panel__steps" aria-label="Pasos">
        {audience.steps.map((step) => (
          <li className="flow-panel__step" key={step.title}>
            <span className="flow-panel__step-title">{step.title}</span>
            <span className="flow-panel__step-description">{step.description}</span>
          </li>
        ))}
      </ol>
      <ButtonLink className="flow-panel__cta" href={audience.href} onClick={onStart}>
        {audience.cta}
        <Icon name="arrow-right" />
      </ButtonLink>
    </FlowPanelWrapper>
  );
}
