"use client";

import { useId, useState } from "react";
import styled from "styled-components";
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
  const [selectedId, setSelectedId] = useState<Audience["id"]>("clients");
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
        onSelect={setSelectedId}
        tabId={tabId}
        panelId={panelId}
      />
      <FlowPanel audience={selected} id={panelId} labelledBy={tabId(selected.id)} />
    </Section>
  );
}
