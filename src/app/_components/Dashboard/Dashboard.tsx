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
  gap: ${({ theme }) => theme.space.xl};

  ${({ theme }) => theme.media.md} {
    gap: ${({ theme }) => theme.space.xxl};
  }
`;

const Welcome = styled.section.attrs({ className: "dashboard__welcome" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.xl};
    padding: ${({ theme }) => theme.space.xxl};
  }
`;

const WelcomeText = styled.div.attrs({ className: "dashboard__welcome-text" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const Title = styled.h1.attrs({ className: "dashboard__title" })`
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.02em;

  ${({ theme }) => theme.media.md} {
    font-size: 2.25rem;
  }
`;

// Second line of the title: the role, highlighted in a white box.
const RoleHighlight = styled.span.attrs({ className: "dashboard__role" })`
  display: inline-block;
  margin-top: ${({ theme }) => theme.space.xs};
  padding: 0 ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  transform: rotate(-1deg);
`;

const Description = styled.p.attrs({ className: "dashboard__description" })`
  max-width: 52ch;
  color: ${({ theme }) => theme.colors.onPrimaryMuted};
  line-height: 1.5;
`;

// White pill on the primary banner.
const WelcomeCta = styled(ButtonLink).attrs({ className: "dashboard__cta" })`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
`;

const ListSection = styled.section.attrs({ className: "dashboard__list-section" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const ListHeader = styled.div.attrs({ className: "dashboard__list-header" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const ListTitle = styled.h2.attrs({ className: "dashboard__list-title" })`
  font-size: 1.375rem;
  letter-spacing: -0.01em;
`;

const Count = styled.span.attrs({ className: "dashboard__count" })`
  min-width: 24px;
  padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8125rem;
  font-weight: 700;
  text-align: center;
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
        <WelcomeText>
          <Title id="dashboard-title">
            {copy.title}
            <br />
            <RoleHighlight>{copy.roleName}</RoleHighlight>
          </Title>
          <Description>{copy.description}</Description>
        </WelcomeText>
        <WelcomeCta href={copy.cta.href}>
          {copy.cta.label}
          <Icon name="arrow-right" />
        </WelcomeCta>
      </Welcome>

      <ListSection aria-labelledby="dashboard-list-title">
        <ListHeader>
          <ListTitle id="dashboard-list-title">{copy.listTitle}</ListTitle>
          {appointments.length > 0 && (
            <Count aria-label={`${appointments.length} citas`}>{appointments.length}</Count>
          )}
        </ListHeader>
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
