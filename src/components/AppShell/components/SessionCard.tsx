"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useSession } from "@/hooks/useSession";
import { ROLE_LABELS } from "@/lib/session";

const Card = styled.div.attrs({ className: "session-card" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
`;

const Label = styled.p.attrs({ className: "session-card__label" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.75rem;
`;

const RoleName = styled.strong.attrs({ className: "session-card__role" })`
  display: block;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.875rem;
`;

const SwitchButton = styled.button.attrs({ className: "session-card__switch" })`
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
    <Card>
      <Label>
        Usas PIK como
        <RoleName>{ROLE_LABELS[role]}</RoleName>
      </Label>
      <SwitchButton type="button" onClick={switchProfile}>
        Cambiar de perfil
      </SwitchButton>
    </Card>
  );
}
