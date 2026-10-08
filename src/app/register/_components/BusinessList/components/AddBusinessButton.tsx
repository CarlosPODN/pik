"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import type { ButtonSize } from "@/components/buttonStyles";
import Dialog from "@/components/Dialog";
import Icon from "@/components/Icon/Icon";
import { useBusinesses } from "@/hooks/useBusinesses";

// Adds a placeholder business and opens its settings. While the newest business is still
// unedited, the button stays enabled but explains in a dialog why it can't add another yet.
export default function AddBusinessButton({ size = "md" }: { size?: ButtonSize }) {
  const router = useRouter();
  const { untouched, addBusiness } = useBusinesses();
  const [blocked, setBlocked] = useState(false);

  const add = () => {
    if (untouched) {
      setBlocked(true);
      return;
    }
    const business = addBusiness();
    router.push(`/register/${business.id}`);
  };

  return (
    <>
      <Button $size={size} onClick={add}>
        <Icon name="plus" />
        Agregar negocio
      </Button>
      <Dialog
        open={blocked}
        onClose={() => setBlocked(false)}
        title="Primero edita tu último negocio"
        actions={
          <>
            <Button $variant="secondary" $size="sm" onClick={() => setBlocked(false)}>
              Cerrar
            </Button>
            {untouched && (
              <ButtonLink href={`/register/${untouched.id}`} $size="sm">
                Editar ahora
              </ButtonLink>
            )}
          </>
        }
      >
        Antes de agregar otro negocio, completa y guarda la información de{" "}
        <strong>{untouched?.name}</strong>.
      </Dialog>
    </>
  );
}
