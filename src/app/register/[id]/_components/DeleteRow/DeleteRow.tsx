"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { DeleteRowWrapper } from "./DeleteRow.styles";

export interface DeleteRowProps {
  /** The row's text, e.g. `"Eliminar negocio"`. */
  label: string;
  /** Optional second line under the label. Hidden while confirming. */
  hint?: ReactNode;
  /** Accessible name of the trash button, e.g. `"Eliminar Estudio Lumi"`. */
  buttonLabel: string;
  /**
   * Turns on confirming in place: the label shown while asking, e.g. `"¿Eliminar empleado?"`.
   * Without it, `onClick` runs on the first tap.
   */
  confirmLabel?: string;
  /** The delete itself. With `confirmLabel`, only the ✓ button calls it. */
  onClick: () => void;
}

/**
 * A delete action as a row: label and hint on the left, a red trash button on the right. Used
 * for deleting a business and for removing a staff member.
 *
 * ```tsx
 * // The caller confirms (DeleteBusiness opens a dialog):
 * <DeleteRow label="Eliminar negocio" buttonLabel="Eliminar Estudio Lumi" onClick={ask} />
 * // Confirms in place, inside another dialog:
 * <DeleteRow label="Eliminar empleado" buttonLabel="Eliminar a Ana"
 *   confirmLabel="¿Eliminar empleado?" onClick={remove} />
 * ```
 *
 * **Confirming in place** (with `confirmLabel`, for places where a second dialog can't open):
 * the first tap swaps the trash for cancel (✕) and confirm (✓) buttons and the label for
 * `confirmLabel`, and moves focus to ✓. Cancel puts focus back on the trash button.
 *
 * **Styling**: BEM block `delete-row`, with `delete-row__action--trash`, `--cancel` and
 * `--confirm`.
 */
export default function DeleteRow({
  label,
  hint,
  buttonLabel,
  confirmLabel,
  onClick,
}: DeleteRowProps) {
  const [armed, setArmed] = useState(false);
  const trashRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Once armed, focus the confirm button so keyboard users land on the next step.
  useEffect(() => {
    if (armed) confirmRef.current?.focus();
  }, [armed]);

  const cancel = () => {
    setArmed(false);
    requestAnimationFrame(() => trashRef.current?.focus());
  };

  return (
    <DeleteRowWrapper className="delete-row">
      <div className="delete-row__text">
        <p className="delete-row__label" aria-live="polite">
          {armed ? confirmLabel : label}
        </p>
        {hint && !armed && <p className="delete-row__hint">{hint}</p>}
      </div>
      <div className="delete-row__buttons">
        {armed ? (
          <>
            <button
              type="button"
              className="delete-row__action delete-row__action--cancel"
              aria-label="Cancelar"
              onClick={cancel}
            >
              <Icon name="close" />
            </button>
            <button
              type="button"
              className="delete-row__action delete-row__action--confirm"
              aria-label={`Confirmar: ${buttonLabel}`}
              ref={confirmRef}
              onClick={onClick}
            >
              <Icon name="check" />
            </button>
          </>
        ) : (
          <button
            type="button"
            ref={trashRef}
            className="delete-row__action delete-row__action--trash"
            aria-label={buttonLabel}
            onClick={confirmLabel ? () => setArmed(true) : onClick}
          >
            <Icon name="trash" />
          </button>
        )}
      </div>
    </DeleteRowWrapper>
  );
}
