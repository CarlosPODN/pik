"use client";

import { useId, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { AUDIENCES, type Audience } from "./audiences";
import AudienceSwitch from "./components/AudienceSwitch";
import FlowPanel from "./components/FlowPanel";
import { LandingActionsWrapper } from "./LandingActions.styles";

// Entry point to the app: pick how you use PIK, then see that flow and start it.
export default function LandingActions() {
  const baseId = useId();
  const { startSession } = useSession();
  const [selectedId, setSelectedId] = useState<Audience["id"]>("client");
  const selected = AUDIENCES.find((audience) => audience.id === selectedId) ?? AUDIENCES[0];
  const tabId = (id: Audience["id"]) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;

  return (
    <LandingActionsWrapper className="landing-actions" aria-labelledby="landing-actions-title">
      <header className="landing-actions__header">
        <h2 id="landing-actions-title" className="landing-actions__title">
          Esto es lo que puedes hacer en PIK
        </h2>
        <p className="landing-actions__subtitle">
          Ya sea que tengas un negocio o busques tu próxima cita, empieza por aquí.
        </p>
      </header>
      <AudienceSwitch
        audiences={AUDIENCES}
        selectedId={selected.id}
        onSelect={setSelectedId}
        tabId={tabId}
        panelId={panelId}
      />
      <FlowPanel
        audience={selected}
        id={panelId}
        labelledBy={tabId(selected.id)}
        onStart={() => startSession(selected.id)}
      />
    </LandingActionsWrapper>
  );
}
