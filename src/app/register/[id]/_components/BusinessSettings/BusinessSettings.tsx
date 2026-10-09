"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonLink from "@/components/buttons/ButtonLink";
import EmptyState from "@/components/feedback/EmptyState/EmptyState";
import Icon from "@/components/Icon/Icon";
import PageSkeleton from "@/components/feedback/PageSkeleton/PageSkeleton";
import { useAppointments } from "@/hooks/useAppointments";
import { useBusinesses } from "@/hooks/useBusinesses";
import { countPendingAppointments } from "@/lib/appointments";
import { useHydrated } from "@/hooks/useHydrated";
import BusinessForm from "./components/BusinessForm/BusinessForm";
import DeleteBusiness from "./components/DeleteBusiness";
import StaffCard from "./components/StaffCard/StaffCard";
import { BusinessSettingsWrapper } from "./BusinessSettings.styles";

// Settings for one business. Waits for localStorage before deciding the business doesn't exist.
export default function BusinessSettings({ id }: { id: string }) {
  const hydrated = useHydrated();
  const router = useRouter();
  const { businesses, updateBusiness, deleteBusiness } = useBusinesses();
  const { appointments } = useAppointments();
  const [deleting, setDeleting] = useState(false);
  // Read once per visit: "pending" means starting after the page opened.
  const [now] = useState(() => Date.now());
  const business = businesses.find((item) => item.id === id);

  // Keep the skeleton up while leaving after a delete, instead of flashing "not found".
  if (!hydrated || deleting) return <PageSkeleton tone="neutral" />;

  if (!business) {
    return (
      <EmptyState
        icon="store"
        title="No encontramos este negocio"
        description="Puede que se haya borrado o que el enlace esté incompleto."
        action={<ButtonLink href="/register">Volver a mis negocios</ButtonLink>}
      />
    );
  }

  return (
    <BusinessSettingsWrapper className="business-settings">
      <Link className="business-settings__back" href="/register">
        <Icon name="arrow-left" />
        Mis negocios
      </Link>
      <h1 className="business-settings__title">{business.name}</h1>
      {/* key: a different business starts the form from its own values */}
      <BusinessForm
        key={business.id}
        business={business}
        onSave={updateBusiness}
        staffSection={
          <StaffCard businessId={business.id} category={business.category} staff={business.staff} />
        }
        deleteAction={
          <DeleteBusiness
            businessName={business.name}
            pendingAppointments={countPendingAppointments(appointments, business.id, now)}
            onDelete={() => {
              setDeleting(true);
              deleteBusiness(business.id);
              router.replace("/register");
            }}
          />
        }
      />
    </BusinessSettingsWrapper>
  );
}
