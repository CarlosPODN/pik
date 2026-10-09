"use client";

import { useMemo, useState } from "react";
import ButtonLink from "@/components/buttons/ButtonLink";
import CardGrid from "@/components/layout/CardGrid/CardGrid";
import EmptyState from "@/components/feedback/EmptyState/EmptyState";
import Icon from "@/components/Icon/Icon";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import { useAppointments } from "@/hooks/useAppointments";
import { useBusinesses } from "@/hooks/useBusinesses";
import { ROLE_LABELS } from "@/lib/constants";
import AppointmentCard from "./AppointmentCard/AppointmentCard";

// Business home: the upcoming appointments across all their businesses, soonest first. Managing
// the businesses themselves happens at /register.
export default function BusinessHome() {
  const { appointments } = useAppointments();
  const { businesses } = useBusinesses();
  // Read once per visit: "upcoming" means starting after the page opened.
  const [now] = useState(() => Date.now());

  const upcoming = useMemo(() => {
    const ids = new Set(businesses.map((business) => business.id));
    return appointments.filter(
      (appointment) => ids.has(appointment.businessId) && Date.parse(appointment.startsAt) > now,
    );
  }, [appointments, businesses, now]);

  return (
    <PageLayout
      title={
        <>
          Te damos la bienvenida,{" "}
          <span className="page-layout__accent">{ROLE_LABELS.business}.</span>
        </>
      }
      action={
        <ButtonLink href="/register" size="sm">
          Mis negocios
          <Icon name="arrow-right" />
        </ButtonLink>
      }
      description="Aquí puedes ver las próximas citas en tus negocios."
      sectionLabel="Próximas citas"
    >
      {upcoming.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="Aún no tienes citas"
          description="Cuando tus clientes reserven en tus negocios, verás aquí cada cita con su fecha, hora y staff."
          action={<ButtonLink href="/register">Ver mis negocios</ButtonLink>}
        />
      ) : (
        <CardGrid>
          {upcoming.map((appointment) => (
            <li key={appointment.id} className="business-home__item">
              <AppointmentCard appointment={appointment} perspective="business" />
            </li>
          ))}
        </CardGrid>
      )}
    </PageLayout>
  );
}
