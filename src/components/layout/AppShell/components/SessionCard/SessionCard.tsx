"use client";

import { ROLE_LABELS } from "@/lib/constants";
import { endSession } from "@/lib/sessionActions";
import type { Role } from "@/types/session";
import { SessionCardWrapper } from "./SessionCard.styles";

export interface SessionCardProps {
  /** The session's role; `null` while logged out, when the card renders nothing. */
  role: Role | null;
  /** Runs when "Cambiar de perfil" is clicked, so the drawer can close. */
  onNavigate: () => void;
}

/**
 * The sidebar card that says which side of PIK the person picked ("Usas PIK como
 * **Profesional**") with a "Cambiar de perfil" button to pick again.
 *
 * ```tsx
 * <SessionCard role={role} onNavigate={closeDrawer} />
 * ```
 *
 * **Changing profile**: the button submits a form to the `endSession` server action, which
 * clears the session cookie and redirects to the landing.
 *
 * **Styling**: BEM block `session-card`.
 */
export default function SessionCard({ role, onNavigate }: SessionCardProps) {
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
