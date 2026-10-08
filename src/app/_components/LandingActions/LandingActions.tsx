"use client";

import styled from "styled-components";
import { LANDING_ACTIONS } from "./actions";
import ActionCard from "./components/ActionCard";

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

const Grid = styled.ul.attrs({ className: "landing-actions__grid" })`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  list-style: none;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.space.xl};
  }
`;

// Entry points to the two flows: business sign-up and appointment booking.
export default function LandingActions() {
  return (
    <Section aria-labelledby="landing-actions-title">
      <Header>
        <Title id="landing-actions-title">Esto es lo que puedes hacer en PIK</Title>
        <Subtitle>
          Ya sea que tengas un negocio o busques tu próxima cita, empieza por aquí.
        </Subtitle>
      </Header>
      <Grid>
        {LANDING_ACTIONS.map((action) => (
          <li key={action.href} className="landing-actions__item">
            <ActionCard action={action} />
          </li>
        ))}
      </Grid>
    </Section>
  );
}
