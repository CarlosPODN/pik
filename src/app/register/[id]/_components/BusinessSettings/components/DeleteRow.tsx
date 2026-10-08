"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";
import Icon from "@/components/Icon/Icon";

const DeleteRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};

  .delete-row {
    &__text {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xxs};
      min-width: 0;
    }

    &__label {
      font-size: 0.9375rem;
      font-weight: 600;
    }

    &__hint {
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.8125rem;
      line-height: 1.4;
    }

    &__buttons {
      display: flex;
      gap: ${({ theme }) => theme.space.sm};
      flex-shrink: 0;
    }

    /* Square icon buttons. Trash and cancel are outlined; confirm is filled red. */
    &__action {
      display: grid;
      place-items: center;
      width: 44px; /* comfortable touch target */
      height: 44px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.radii.md};
      background: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.foreground};
      cursor: pointer;

      &:hover {
        border-color: ${({ theme }) => theme.colors.foreground};
      }

      &:focus-visible {
        outline: none;
        box-shadow: ${({ theme }) => theme.shadows.focusRing};
      }
    }

    &__action--trash {
      color: ${({ theme }) => theme.colors.danger};

      &:hover {
        border-color: ${({ theme }) => theme.colors.danger};
      }
    }

    &__action--confirm {
      border-color: ${({ theme }) => theme.colors.danger};
      background: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.onPrimary};

      &:hover {
        border-color: ${({ theme }) => theme.colors.danger};
      }
    }
  }
`;

// A delete action as a row: label and hint on the left, a red trash button on the right.
// Used for deleting a business and for removing a staff member.
//
// With confirmLabel, it confirms in place (for places where a second dialog can't open, like
// inside another dialog): the first tap swaps the trash for cancel (✕) and confirm (✓) buttons
// and the label for confirmLabel; only ✓ calls onClick. Without it, onClick runs on the first
// tap (the caller confirms some other way).
export default function DeleteRow({
  label,
  hint,
  buttonLabel,
  confirmLabel,
  onClick,
}: {
  label: string;
  hint?: ReactNode;
  // Accessible name of the trash button, e.g. "Eliminar Estudio Lumi".
  buttonLabel: string;
  confirmLabel?: string;
  onClick: () => void;
}) {
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
