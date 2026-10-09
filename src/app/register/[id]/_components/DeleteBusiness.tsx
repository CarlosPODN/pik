"use client";

import { useState } from "react";
import Button from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import DeleteRow from "./DeleteRow/DeleteRow";

const pendingText = (count: number) =>
  count === 1 ? "1 cita pendiente" : `${count} citas pendientes`;

export interface DeleteBusinessProps {
  /** Shown in the dialogs and the trash button's accessible name. */
  businessName: string;
  /** Appointments still to come at this business. More than 0 blocks the delete. */
  pendingAppointments: number;
  /** Deletes the business. Called only after the person confirms. */
  onDelete: () => void;
}

/**
 * The "Eliminar negocio" row in a business's settings, with a trash button.
 *
 * ```tsx
 * <DeleteBusiness businessName={business.name} pendingAppointments={pending}
 *   onDelete={remove} />
 * ```
 *
 * **Flow**: with no pending appointments, the button asks for confirmation in a dialog first.
 * With pending ones, it stays clickable but opens a dialog explaining why it can't delete yet,
 * and the row's hint says how many there are.
 */
export default function DeleteBusiness({
  businessName,
  pendingAppointments,
  onDelete,
}: DeleteBusinessProps) {
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
            <Button variant="secondary" size="sm" onClick={close}>
              Cancelar
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete}>
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
          <Button size="sm" onClick={close}>
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
