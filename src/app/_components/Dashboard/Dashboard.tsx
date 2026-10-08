"use client";

import styled from "styled-components";
import ButtonLink from "@/components/ButtonLink";
import EmptyState from "@/components/EmptyState";
import Icon from "@/components/Icon/Icon";
import { useAppointments } from "@/hooks/useAppointments";
import type { Role } from "@/types/session";
import AppointmentCard from "./components/AppointmentCard";
import { DASHBOARD_COPY } from "./dashboardCopy";

const Wrapper = styled.div.attrs({ className: "dashboard" })`
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.section.attrs({ className: "dashboard__welcome" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.xl};
  }
`;

const Title = styled.h1.attrs({ className: "dashboard__title" })`
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.02em;

  ${({ theme }) => theme.media.md} {
    font-size: 2.25rem;
  }
`;

// The role ends the title in the accent color. inline-block keeps it in one piece when the
// title wraps.
const RoleAccent = styled.span.attrs({ className: "dashboard__role" })`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p.attrs({ className: "dashboard__description" })`
  max-width: 52ch;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const WelcomeCta = styled(ButtonLink).attrs({ className: "dashboard__cta" })`
  flex-shrink: 0;
`;

const ListSection = styled.section.attrs({ className: "dashboard__list-section" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

// Separates the welcome from the appointments, in place of a visible list heading.
const Divider = styled.hr.attrs({ className: "dashboard__divider" })`
  margin: ${({ theme }) => `${theme.space.xxs} 0 ${theme.space.lg}`};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const List = styled.ul.attrs({ className: "dashboard__list" })`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  list-style: none;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: ${({ theme }) => theme.space.lg};
  }
`;

// Home once a role is picked: a welcome for that role and its appointments.
export default function Dashboard({ role }: { role: Role }) {
  const copy = DASHBOARD_COPY[role];
  const { appointments } = useAppointments();

  return (
    <Wrapper>
      <Welcome aria-labelledby="dashboard-title">
        <Title id="dashboard-title">
          {copy.title} <RoleAccent>{copy.roleName}.</RoleAccent>
        </Title>
        <WelcomeCta href={copy.cta.href}>
          {copy.cta.label}
          <Icon name="arrow-right" />
        </WelcomeCta>
      </Welcome>

      <Divider />

      {/* No visible heading: the divider marks the section, and the label names it for screen readers */}
      <ListSection aria-label={copy.listTitle}>
        <Description>{copy.description}</Description>
        {appointments.length === 0 ? (
          <EmptyState
            icon="calendar"
            title={copy.empty.title}
            description={copy.empty.description}
            action={<ButtonLink href={copy.cta.href}>{copy.empty.action}</ButtonLink>}
          />
        ) : (
          <List>
            {appointments.map((appointment) => (
              <li key={appointment.id} className="dashboard__item">
                <AppointmentCard appointment={appointment} role={role} />
              </li>
            ))}
          </List>
        )}
      </ListSection>
    </Wrapper>
  );
}
