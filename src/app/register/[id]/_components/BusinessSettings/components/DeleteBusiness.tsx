"use client";

import { useState } from "react";
import Button from "@/components/buttons/Button";
import Dialog from "@/components/modals/Dialog";
import DeleteRow from "./DeleteRow";

const pendingText = (count: number) =>
  count === 1 ? "1 cita pendiente" : `${count} citas pendientes`;

// "Eliminar negocio" row with a trash button. With pending appointments the button stays
// clickable but explains why it can't delete; otherwise it asks for confirmation first.
export default function DeleteBusiness({
  businessName,
  pendingAppointments,
  onDelete,
}: {
  businessName: string;
  pendingAppointments: number;
  onDelete: () => void;
}) {
  const [dialog, setDialog] = useState<"confirm" | "blocked" | null>(null);
  const close = () => setDialog(null);
  const blocked = pendingAppointments > 0;

  return (
    <>
      <DeleteRow
        label="Eliminar negocio"
        hint={
          blocked
            ? `Tiene ${pendingText(pendingAppointments)}. Podrás eliminarlo cuando ya no tenga citas por atender.`
            : "Se borrará con toda su información."
        }
        buttonLabel={`Eliminar ${businessName}`}
        onClick={() => setDialog(blocked ? "blocked" : "confirm")}
      />

      <Dialog
        open={dialog === "confirm"}
        onClose={close}
        title={`¿Eliminar ${businessName}?`}
        actions={
          <>
            <Button $variant="secondary" $size="sm" onClick={close}>
              Cancelar
            </Button>
            <Button $variant="danger" $size="sm" onClick={onDelete}>
              Eliminar
            </Button>
          </>
        }
      >
        Se borrará con toda su información. Esta acción no se puede deshacer.
      </Dialog>

      <Dialog
        open={dialog === "blocked"}
        onClose={close}
        title="No puedes eliminar este negocio"
        actions={
          <Button $size="sm" onClick={close}>
            Entendido
          </Button>
        }
      >
        <strong>{businessName}</strong> tiene {pendingText(pendingAppointments)}. Podrás eliminarlo
        cuando ya no tenga citas por atender.
      </Dialog>
    </>
  );
}
