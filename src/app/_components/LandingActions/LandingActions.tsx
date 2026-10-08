"use client";

import { useId, useState } from "react";
import styled from "styled-components";
import { useSession } from "@/hooks/useSession";
import { AUDIENCES, type Audience } from "./audiences";
import AudienceSwitch from "./components/AudienceSwitch";
import FlowPanel from "./components/FlowPanel";

const Section = styled.section.attrs({ className: "landing-actions" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const Header = styled.header.attrs({ className: "landing-actions__header" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

const Title = styled.h2.attrs({ className: "landing-actions__title" })`
  font-size: 1.375rem;
  letter-spacing: -0.01em;

  ${({ theme }) => theme.media.md} {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p.attrs({ className: "landing-actions__subtitle" })`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

// Entry point to the app: pick how you use PIK, then see that flow and start it.
export default function LandingActions() {
  const baseId = useId();
  const { role, startSession } = useSession();
  // The tab the person clicked; until then, the role they picked before, or clients.
  const [pickedId, setPickedId] = useState<Audience["id"] | null>(null);
  const selectedId = pickedId ?? role ?? "client";
  const selected = AUDIENCES.find((audience) => audience.id === selectedId) ?? AUDIENCES[0];
  const tabId = (id: Audience["id"]) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;

  return (
    <Section aria-labelledby="landing-actions-title">
      <Header>
        <Title id="landing-actions-title">Esto es lo que puedes hacer en PIK</Title>
        <Subtitle>
          Ya sea que tengas un negocio o busques tu próxima cita, empieza por aquí.
        </Subtitle>
      </Header>
      <AudienceSwitch
        audiences={AUDIENCES}
        selectedId={selected.id}
        onSelect={setPickedId}
        tabId={tabId}
        panelId={panelId}
      />
      <FlowPanel
        audience={selected}
        id={panelId}
        labelledBy={tabId(selected.id)}
        onStart={() => startSession(selected.id)}
      />
    </Section>
  );
}
