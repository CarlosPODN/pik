"use client";

import EmptyState from "@/components/EmptyState";
import { useBusinesses } from "@/hooks/useBusinesses";
import AddBusinessButton from "./AddBusinessButton";
import BusinessCard from "./BusinessCard";
import CardGrid from "./CardGrid";
import DashboardLayout from "./DashboardLayout";

// Business home: the businesses they manage, each linking to its settings.
export default function BusinessHome() {
  const { businesses } = useBusinesses();

  return (
    <DashboardLayout
      roleName="Negocio"
      action={<AddBusinessButton size="sm" />}
      description="Aquí puedes ver tus negocios y editar su información."
      sectionLabel="Tus negocios"
    >
      {businesses.length === 0 ? (
        <EmptyState
          icon="store"
          title="Aún no tienes negocios"
          description="Agrega tu primer negocio y completa su información para empezar a recibir reservas."
          action={<AddBusinessButton />}
        />
      ) : (
        <CardGrid>
          {businesses.map((business) => (
            <li key={business.id} className="business-home__item">
              <BusinessCard business={business} />
            </li>
          ))}
        </CardGrid>
      )}
    </DashboardLayout>
  );
}
