"use client";

import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";
import Icon from "@/components/Icon/Icon";

const Row = styled.div.attrs({ className: "delete-row" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};
`;

const Text = styled.div.attrs({ className: "delete-row__text" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  min-width: 0;
`;

const Label = styled.p.attrs({ className: "delete-row__label" })`
  font-size: 0.9375rem;
  font-weight: 600;
`;

const Hint = styled.p.attrs({ className: "delete-row__hint" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8125rem;
  line-height: 1.4;
`;

const Buttons = styled.div.attrs({ className: "delete-row__buttons" })`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  flex-shrink: 0;
`;

// Square icon button. "trash" and "cancel" are outlined; "confirm" is filled red.
const IconAction = styled.button.attrs<{ $tone: "trash" | "cancel" | "confirm" }>(({ $tone }) => ({
  type: "button",
  className: clsx("delete-row__action", {
    "delete-row__action--trash": $tone === "trash",
    "delete-row__action--cancel": $tone === "cancel",
    "delete-row__action--confirm": $tone === "confirm",
  }),
}))<{ $tone: "trash" | "cancel" | "confirm" }>`
  display: grid;
  place-items: center;
  width: 44px; /* comfortable touch target */
  height: 44px;
  border: 1px solid
    ${({ $tone, theme }) => ($tone === "confirm" ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $tone, theme }) =>
    $tone === "confirm" ? theme.colors.danger : theme.colors.background};
  color: ${({ $tone, theme }) =>
    $tone === "confirm"
      ? theme.colors.onPrimary
      : $tone === "trash"
        ? theme.colors.danger
        : theme.colors.foreground};
  cursor: pointer;

  &:hover {
    border-color: ${({ $tone, theme }) =>
      $tone === "cancel" ? theme.colors.foreground : theme.colors.danger};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
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
    <Row>
      <Text>
        <Label aria-live="polite">{armed ? confirmLabel : label}</Label>
        {hint && !armed && <Hint>{hint}</Hint>}
      </Text>
      <Buttons>
        {armed ? (
          <>
            <IconAction $tone="cancel" aria-label="Cancelar" onClick={cancel}>
              <Icon name="close" />
            </IconAction>
            <IconAction
              $tone="confirm"
              aria-label={`Confirmar: ${buttonLabel}`}
              ref={confirmRef}
              onClick={onClick}
            >
              <Icon name="check" />
            </IconAction>
          </>
        ) : (
          <IconAction
            ref={trashRef}
            $tone="trash"
            aria-label={buttonLabel}
            onClick={confirmLabel ? () => setArmed(true) : onClick}
          >
            <Icon name="trash" />
          </IconAction>
        )}
      </Buttons>
    </Row>
  );
}
