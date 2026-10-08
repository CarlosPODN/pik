"use client";

import ButtonLink from "@/components/buttons/ButtonLink";
import CardGrid from "@/components/layout/CardGrid";
import EmptyState from "@/components/feedback/EmptyState";
import Icon from "@/components/Icon/Icon";
import PageLayout from "@/components/layout/PageLayout";
import { useAppointments } from "@/hooks/useAppointments";
import { ROLE_LABELS } from "@/lib/session";
import AppointmentCard from "./AppointmentCard";

// Client home: their booked appointments, soonest first.
export default function ClientHome() {
  const { appointments } = useAppointments();

  return (
    <PageLayout
      title={
        <>
          Te damos la bienvenida, <span className="page-layout__accent">{ROLE_LABELS.client}.</span>
        </>
      }
      action={
        <ButtonLink href="/book" size="sm">
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
              <AppointmentCard appointment={appointment} perspective="client" />
            </li>
          ))}
        </CardGrid>
      )}
    </PageLayout>
  );
}
