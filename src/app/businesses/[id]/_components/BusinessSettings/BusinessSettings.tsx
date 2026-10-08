"use client";

import Link from "next/link";
import styled from "styled-components";
import ButtonLink from "@/components/ButtonLink";
import EmptyState from "@/components/EmptyState";
import Icon from "@/components/Icon/Icon";
import PageSkeleton from "@/components/PageSkeleton";
import { useBusinesses } from "@/hooks/useBusinesses";
import { useHydrated } from "@/hooks/useHydrated";
import BusinessForm from "./components/BusinessForm";

const Wrapper = styled.div.attrs({ className: "business-settings" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  max-width: 640px;
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

const Header = styled.header.attrs({ className: "business-settings__header" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  margin-top: -${({ theme }) => theme.space.md}; /* sit closer to the back link */
`;

const Title = styled.h1.attrs({ className: "business-settings__title" })`
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.02em;

  ${({ theme }) => theme.media.md} {
    font-size: 2.25rem;
  }
`;

const Subtitle = styled.p.attrs({ className: "business-settings__subtitle" })`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

// Settings for one business. Waits for localStorage before deciding the business doesn't exist.
export default function BusinessSettings({ id }: { id: string }) {
  const hydrated = useHydrated();
  const { businesses, updateBusiness } = useBusinesses();
  const business = businesses.find((item) => item.id === id);

  if (!hydrated) return <PageSkeleton />;

  if (!business) {
    return (
      <EmptyState
        icon="store"
        title="No encontramos este negocio"
        description="Puede que se haya borrado o que el enlace esté incompleto."
        action={<ButtonLink href="/">Volver a mis negocios</ButtonLink>}
      />
    );
  }

  return (
    <Wrapper>
      <BackLink href="/">
        <Icon name="arrow-left" />
        Mis negocios
      </BackLink>
      <Header>
        <Title>{business.name}</Title>
        <Subtitle>
          {business.touched
            ? "Actualiza la información de tu negocio."
            : "Completa la información de tu negocio para poder agregar otro."}
        </Subtitle>
      </Header>
      {/* key: a different business starts the form from its own values */}
      <BusinessForm key={business.id} business={business} onSave={updateBusiness} />
    </Wrapper>
  );
}
