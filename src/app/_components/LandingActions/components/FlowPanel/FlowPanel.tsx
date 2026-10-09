"use client";

import Button from "@/components/buttons/Button/Button";
import Icon from "@/components/Icon/Icon";
import { startSession } from "@/lib/sessionActions";
import type { Audience } from "../../audiences";
import { FlowPanelWrapper } from "./FlowPanel.styles";

export interface FlowPanelProps {
  /** The selected audience, whose flow to show. */
  audience: Audience;
  /** The panel's element id, which the tabs point at. */
  id: string;
  /** The selected tab's element id, the panel's accessible name. */
  labelledBy: string;
}

/**
 * The selected audience's flow, as the tab panel under `AudienceSwitch`: what it's for, its
 * numbered steps, and the button that starts it.
 *
 * ```tsx
 * <FlowPanel audience={selected} id={panelId} labelledBy={tabId(selected.id)} />
 * ```
 *
 * **Starting**: the button submits a form to the `startSession` server action, which saves the
 * audience as the session's role and opens that role's page (`ROLE_HOME`).
 *
 * **Styling**: BEM block `flow-panel`.
 */
export default function FlowPanel({ audience, id, labelledBy }: FlowPanelProps) {
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
      {/* Starting a flow is what picks the role: the server saves it and opens the role's page. */}
      <form className="flow-panel__cta" action={startSession.bind(null, audience.id)}>
        <Button type="submit">
          {audience.cta}
          <Icon name="arrow-right" />
        </Button>
      </form>
    </FlowPanelWrapper>
  );
}
