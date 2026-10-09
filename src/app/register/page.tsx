"use client";

import CardGrid from "@/components/layout/CardGrid/CardGrid";
import EmptyState from "@/components/feedback/EmptyState/EmptyState";
import Panel from "@/components/layout/Panel/Panel";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import PageSkeleton from "@/components/feedback/PageSkeleton/PageSkeleton";
import { useBusinesses } from "@/hooks/useBusinesses";
import { useHydrated } from "@/hooks/useHydrated";
import AddBusinessButton from "./_components/AddBusinessButton";
import BusinessCard from "./_components/BusinessCard/BusinessCard";

// The businesses the person manages, each linking to its settings at /register/[id]. Waits for
// localStorage so it never flashes the empty state before the list.
export default function RegisterPage() {
  const hydrated = useHydrated();
  const { businesses } = useBusinesses();

  if (!hydrated) return <PageSkeleton />;

  return (
    <PageLayout
      title="Registra tu negocio."
      action={<AddBusinessButton size="sm" />}
      description="Aquí puedes agregar tus negocios y editar su información."
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
        <Panel heading="Tus negocios">
          <CardGrid layout="rows">
            {businesses.map((business) => (
              <li key={business.id}>
                <BusinessCard business={business} />
              </li>
            ))}
          </CardGrid>
        </Panel>
      )}
    </PageLayout>
  );
}
