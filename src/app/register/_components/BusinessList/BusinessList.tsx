"use client";

import CardGrid from "@/components/layout/CardGrid";
import EmptyState from "@/components/feedback/EmptyState";
import PageLayout, { TitleAccent } from "@/components/layout/PageLayout";
import PageSkeleton from "@/components/feedback/PageSkeleton";
import { useBusinesses } from "@/hooks/useBusinesses";
import { useHydrated } from "@/hooks/useHydrated";
import AddBusinessButton from "./components/AddBusinessButton";
import BusinessCard from "./components/BusinessCard";

// The businesses the person manages, each linking to its settings at /register/[id]. Waits for
// localStorage so it never flashes the empty state before the list.
export default function BusinessList() {
  const hydrated = useHydrated();
  const { businesses } = useBusinesses();

  if (!hydrated) return <PageSkeleton />;

  return (
    <PageLayout
      title={
        <>
          Registra tu <TitleAccent>negocio.</TitleAccent>
        </>
      }
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
        <CardGrid>
          {businesses.map((business) => (
            <li key={business.id} className="business-list__item">
              <BusinessCard business={business} />
            </li>
          ))}
        </CardGrid>
      )}
    </PageLayout>
  );
}
