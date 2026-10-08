"use client";

import ButtonLink from "@/components/ButtonLink";
import EmptyState from "@/components/EmptyState";
import Icon from "@/components/Icon/Icon";
import { useAppointments } from "@/hooks/useAppointments";
import AppointmentCard from "./AppointmentCard";
import CardGrid from "./CardGrid";
import DashboardLayout from "./DashboardLayout";

// Client home: their booked appointments, soonest first.
export default function ClientHome() {
  const { appointments } = useAppointments();

  return (
    <DashboardLayout
      roleName="Cliente"
      action={
        <ButtonLink href="/book" $size="sm">
          Agendar cita
          <Icon name="arrow-right" />
        </ButtonLink>
      }
      description="Aquí puedes ver tus citas agendadas y reservar una nueva cuando quieras."
      sectionLabel="Tus citas"
    >
      {appointments.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="Aún no tienes citas"
          description="Cuando agendes una cita, aparecerá aquí con su fecha, hora y precio."
          action={<ButtonLink href="/book">Agendar mi primera cita</ButtonLink>}
        />
      ) : (
        <CardGrid>
          {appointments.map((appointment) => (
            <li key={appointment.id} className="client-home__item">
              <AppointmentCard appointment={appointment} />
            </li>
          ))}
        </CardGrid>
      )}
    </DashboardLayout>
  );
}
