"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import ButtonLink from "@/components/buttons/ButtonLink";
import EmptyState from "@/components/feedback/EmptyState";
import Icon from "@/components/Icon/Icon";
import PageSkeleton from "@/components/feedback/PageSkeleton";
import { useAppointments } from "@/hooks/useAppointments";
import { useBusinesses } from "@/hooks/useBusinesses";
import { countPendingAppointments } from "@/lib/appointments";
import { useHydrated } from "@/hooks/useHydrated";
import BusinessForm from "./components/BusinessForm";
import DeleteBusiness from "./components/DeleteBusiness";
import StaffCard from "./components/StaffCard";

const Wrapper = styled.div.attrs({ className: "business-settings" })`
  display: flex;
  flex-direction: column;
`;

const BackLink = styled(Link).attrs({ className: "business-settings__back" })`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: ${({ theme }) => theme.space.xs};
  min-height: 44px; /* comfortable touch target */
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }

  &:focus-visible {
    outline: none;
    border-radius: ${({ theme }) => theme.radii.sm};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

const Title = styled.h1.attrs({ className: "business-settings__title" })`
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.02em;

  ${({ theme }) => theme.media.md} {
    font-size: 2.25rem;
  }
`;

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
  if (!hydrated || deleting) return <PageSkeleton />;

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
    <Wrapper>
      <BackLink href="/register">
        <Icon name="arrow-left" />
        Mis negocios
      </BackLink>
      <Title>{business.name}</Title>
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
    </Wrapper>
  );
}
