"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { ROLE_LABELS } from "@/lib/session";
import { SessionCardWrapper } from "./SessionCard.styles";

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
