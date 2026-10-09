"use client";

import {
  formatDay,
  formatDuration,
  formatMonth,
  formatPrice,
  formatTime,
  formatWeekday,
} from "@/lib/format";
import type { Appointment } from "@/types/appointment";
import { AppointmentCardWrapper } from "./AppointmentCard.styles";

export interface AppointmentCardProps {
  /** The appointment to show. */
  appointment: Appointment;
  /**
   * Who's looking: `"client"` shows the business it's at; `"business"` shows the client who
   * booked it.
   */
  perspective: "client" | "business";
}

/**
 * One appointment as a card: the date badge, the service, where or who, the staff member, the
 * time and duration, and the price.
 *
 * ```tsx
 * <AppointmentCard appointment={appointment} perspective="client" />
 * ```
 *
 * **Formatting**: dates, times, durations and prices come from `src/lib/format.ts` (Spanish,
 * Mexico; Mexican pesos).
 *
 * **Styling**: BEM block `appointment-card`.
 */
export default function AppointmentCard({ appointment, perspective }: AppointmentCardProps) {
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
