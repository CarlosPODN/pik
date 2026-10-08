"use client";

import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Icon from "@/components/Icon/Icon";

const Row = styled.div.attrs({ className: "delete-business" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};
`;

const Text = styled.div.attrs({ className: "delete-business__text" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  min-width: 0;
`;

const Label = styled.p.attrs({ className: "delete-business__label" })`
  font-size: 0.9375rem;
  font-weight: 600;
`;

const Hint = styled.p.attrs({ className: "delete-business__hint" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8125rem;
  line-height: 1.4;
`;

const TrashButton = styled.button.attrs({ className: "delete-business__trigger" })`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px; /* comfortable touch target */
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.danger};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

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
    <Row>
      <Text>
        <Label>Eliminar negocio</Label>
        <Hint>
          {blocked
            ? `Tiene ${pendingText(pendingAppointments)}. Podrás eliminarlo cuando ya no tenga citas por atender.`
            : "Se borrará con toda su información."}
        </Hint>
      </Text>
      <TrashButton
        type="button"
        aria-label={`Eliminar ${businessName}`}
        onClick={() => setDialog(blocked ? "blocked" : "confirm")}
      >
        <Icon name="trash" />
      </TrashButton>

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
    </Row>
  );
}
