"use client";

import { ROLE_LABELS } from "@/lib/constants";
import { endSession } from "@/lib/sessionActions";
import type { Role } from "@/types/session";
import { SessionCardWrapper } from "./SessionCard.styles";

// Shows which side of PIK the person picked and lets them go back and pick again: the form
// clears the session cookie on the server, which then sends them to the landing.
// Renders nothing while logged out.
export default function SessionCard({
  role,
  onNavigate,
}: {
  role: Role | null;
  onNavigate: () => void;
}) {
  if (!role) return null;

  return (
    <SessionCardWrapper className="session-card">
      <p className="session-card__label">
        Usas PIK como
        <strong className="session-card__role">{ROLE_LABELS[role]}</strong>
      </p>
      <form action={endSession}>
        <button type="submit" className="session-card__switch" onClick={onNavigate}>
          Cambiar de perfil
        </button>
      </form>
    </SessionCardWrapper>
  );
}
