"use client";

import styled from "styled-components";
import {
  formatDay,
  formatDuration,
  formatMonth,
  formatPrice,
  formatTime,
  formatWeekday,
} from "@/lib/format";
import type { Appointment } from "@/types/appointment";
import type { Role } from "@/types/session";

const Card = styled.article.attrs({ className: "appointment-card" })`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  height: 100%;
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
`;

const DateBlock = styled.div.attrs({ className: "appointment-card__date" })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
`;

const Day = styled.span.attrs({ className: "appointment-card__day" })`
  font-size: 1.375rem;
  font-weight: 800;
  line-height: 1;
`;

const Month = styled.span.attrs({ className: "appointment-card__month" })`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Body = styled.div.attrs({ className: "appointment-card__body" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  flex: 1;
  min-width: 0;
`;

const Service = styled.h3.attrs({ className: "appointment-card__service" })`
  font-size: 1rem;
`;

const Meta = styled.p.attrs({ className: "appointment-card__meta" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;

const Footer = styled.div.attrs({ className: "appointment-card__footer" })`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space.xs};
  font-size: 0.875rem;
`;

const Time = styled.span.attrs({ className: "appointment-card__time" })`
  &::first-letter {
    text-transform: uppercase;
  }
`;

const Price = styled.span.attrs({ className: "appointment-card__price" })`
  font-weight: 700;
`;

// One appointment. Clients see where it is; businesses see who booked it.
export default function AppointmentCard({
  appointment,
  role,
}: {
  appointment: Appointment;
  role: Role;
}) {
  const startsAt = new Date(appointment.startsAt);
  const who = role === "client" ? appointment.businessName : appointment.clientName;

  return (
    <Card>
      <DateBlock aria-hidden="true">
        <Day>{formatDay(startsAt)}</Day>
        <Month>{formatMonth(startsAt)}</Month>
      </DateBlock>
      <Body>
        <Service>{appointment.serviceName}</Service>
        <Meta>
          {who} · con {appointment.staffName}
        </Meta>
        <Footer>
          <Time>
            <time dateTime={appointment.startsAt}>
              {formatWeekday(startsAt)} {formatDay(startsAt)} de {formatMonth(startsAt)},{" "}
              {formatTime(startsAt)}
            </time>{" "}
            · {formatDuration(appointment.durationMinutes)}
          </Time>
          <Price>{formatPrice(appointment.price)}</Price>
        </Footer>
      </Body>
    </Card>
  );
}
