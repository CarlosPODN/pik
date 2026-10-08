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

const AppointmentCardWrapper = styled.article`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  height: 100%;
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  .appointment-card {
    &__date {
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
    }

    &__day {
      font-size: 1.375rem;
      font-weight: 800;
      line-height: 1;
    }

    &__month {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xs};
      flex: 1;
      min-width: 0;
    }

    &__service {
      font-size: 1rem;
    }

    &__meta {
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.875rem;
    }

    &__footer {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: ${({ theme }) => theme.space.sm};
      margin-top: ${({ theme }) => theme.space.xs};
      font-size: 0.875rem;
    }

    &__time {
      &::first-letter {
        text-transform: uppercase;
      }
    }

    &__price {
      font-weight: 700;
    }
  }
`;

// One appointment: when, with whom and how much. Clients see where it is; businesses see who
// booked it.
export default function AppointmentCard({
  appointment,
  perspective,
}: {
  appointment: Appointment;
  perspective: "client" | "business";
}) {
  const startsAt = new Date(appointment.startsAt);

  return (
    <AppointmentCardWrapper className="appointment-card">
      <div className="appointment-card__date" aria-hidden="true">
        <span className="appointment-card__day">{formatDay(startsAt)}</span>
        <span className="appointment-card__month">{formatMonth(startsAt)}</span>
      </div>
      <div className="appointment-card__body">
        <h3 className="appointment-card__service">{appointment.serviceName}</h3>
        <p className="appointment-card__meta">
          {perspective === "client" ? appointment.businessName : appointment.clientName} · con{" "}
          {appointment.staffName}
        </p>
        <div className="appointment-card__footer">
          <span className="appointment-card__time">
            <time dateTime={appointment.startsAt}>
              {formatWeekday(startsAt)} {formatDay(startsAt)} de {formatMonth(startsAt)},{" "}
              {formatTime(startsAt)}
            </time>{" "}
            · {formatDuration(appointment.durationMinutes)}
          </span>
          <span className="appointment-card__price">{formatPrice(appointment.price)}</span>
        </div>
      </div>
    </AppointmentCardWrapper>
  );
}
