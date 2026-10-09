"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BackLink from "@/components/buttons/BackLink/BackLink";
import ButtonLink from "@/components/buttons/ButtonLink";
import EmptyState from "@/components/feedback/EmptyState/EmptyState";
import PageSkeleton from "@/components/feedback/PageSkeleton/PageSkeleton";
import { useAppointments } from "@/hooks/useAppointments";
import { useBusinesses } from "@/hooks/useBusinesses";
import { countPendingAppointments } from "@/lib/appointments";
import { useHydrated } from "@/hooks/useHydrated";
import BusinessForm from "./BusinessForm/BusinessForm";
import DeleteBusiness from "./DeleteBusiness";
import StaffCard from "./StaffCard/StaffCard";
import { BusinessSettingsWrapper } from "./BusinessSettings.styles";

export interface BusinessSettingsProps {
  /** The business's id, read from the URL by the page on the server. */
  id: string;
}

/**
 * The settings page for one business: a back link, its name, the settings form, the staff card
 * and the delete action.
 *
 * ```tsx
 * // app/register/[id]/page.tsx (Server Component)
 * const { id } = await params;
 * return <BusinessSettings id={id} />;
 * ```
 *
 * **Loading**: the business lives in localStorage, so this shows the gray skeleton until it's
 * read, then the form or "No encontramos este negocio". After a delete it keeps the skeleton up
 * while leaving, instead of flashing "not found".
 *
 * **Styling**: BEM block `business-settings`.
 */
export default function BusinessSettings({ id }: BusinessSettingsProps) {
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
      <BackLink label="Mis negocios" />
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
