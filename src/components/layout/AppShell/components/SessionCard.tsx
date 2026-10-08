"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useSession } from "@/hooks/useSession";
import { ROLE_LABELS } from "@/lib/session";

const SessionCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  .session-card__label {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.75rem;
  }

  .session-card__role {
    display: block;
    color: ${({ theme }) => theme.colors.foreground};
    font-size: 0.875rem;
  }

  .session-card__switch {
    align-self: flex-start;
    min-height: 32px;
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.primarySoft};
    }

    &:focus-visible {
      outline: none;
      box-shadow: ${({ theme }) => theme.shadows.focusRing};
    }
  }
`;

// Shows which side of PIK the person picked and lets them go back and pick again.
// Renders nothing while logged out.
export default function SessionCard({ onNavigate }: { onNavigate: () => void }) {
  const { role, endSession } = useSession();
  const router = useRouter();

  if (!role) return null;

  const switchProfile = () => {
    endSession();
    onNavigate();
    router.push("/");
  };

  return (
    <SessionCardWrapper className="session-card">
      <p className="session-card__label">
        Usas PIK como
        <strong className="session-card__role">{ROLE_LABELS[role]}</strong>
      </p>
      <button type="button" className="session-card__switch" onClick={switchProfile}>
        Cambiar de perfil
      </button>
    </SessionCardWrapper>
  );
}
