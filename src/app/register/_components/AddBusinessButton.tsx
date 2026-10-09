"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/buttons/Button/Button";
import ButtonLink from "@/components/buttons/ButtonLink";
import type { ButtonSize } from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import Icon from "@/components/Icon/Icon";
import { useBusinesses } from "@/hooks/useBusinesses";

export interface AddBusinessButtonProps {
  /** Button size: `"md"` (default) or `"sm"` for the page header. */
  size?: ButtonSize;
}

/**
 * "Agregar negocio": adds a placeholder business ("Negocio 2") and opens its settings.
 *
 * ```tsx
 * <AddBusinessButton size="sm" />
 * ```
 *
 * **One at a time**: while the newest business is still unedited (never saved), the button stays
 * enabled but opens a dialog explaining why it can't add another yet, with a link to edit it.
 */
export default function AddBusinessButton({ size = "md" }: AddBusinessButtonProps) {
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
      <Button size={size} onClick={add}>
        <Icon name="plus" />
        Agregar negocio
      </Button>
      <Dialog
        open={blocked}
        onClose={() => setBlocked(false)}
        title="Primero edita tu último negocio"
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => setBlocked(false)}>
              Cerrar
            </Button>
            {untouched && (
              <ButtonLink href={`/register/${untouched.id}`} size="sm">
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
