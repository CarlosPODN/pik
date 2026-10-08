"use client";

import type { ReactNode } from "react";
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

const TrashButton = styled.button.attrs({ type: "button", className: "delete-row__trigger" })`
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

// A delete action as a row: label and hint on the left, a red trash button on the right.
// Used for deleting a business and for removing a staff member.
export default function DeleteRow({
  label,
  hint,
  buttonLabel,
  onClick,
}: {
  label: string;
  hint?: ReactNode;
  // Accessible name of the trash button, e.g. "Eliminar Estudio Lumi".
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <Row>
      <Text>
        <Label>{label}</Label>
        {hint && <Hint>{hint}</Hint>}
      </Text>
      <TrashButton aria-label={buttonLabel} onClick={onClick}>
        <Icon name="trash" />
      </TrashButton>
    </Row>
  );
}
