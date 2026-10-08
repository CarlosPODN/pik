"use client";

import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Icon from "@/components/Icon/Icon";

const TrashButton = styled.button.attrs({ className: "delete-business__trigger" })`
  display: grid;
  place-items: center;
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

// Trash button that deletes the business after a confirmation dialog.
export default function DeleteBusinessButton({
  businessName,
  onDelete,
}: {
  businessName: string;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <TrashButton
        type="button"
        aria-label={`Eliminar ${businessName}`}
        title="Eliminar negocio"
        onClick={() => setConfirming(true)}
      >
        <Icon name="trash" />
      </TrashButton>
      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title={`¿Eliminar ${businessName}?`}
        actions={
          <>
            <Button $variant="secondary" $size="sm" onClick={() => setConfirming(false)}>
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
    </>
  );
}
