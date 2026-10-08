"use client";

import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import Icon from "@/components/Icon/Icon";
import { useBusinesses } from "@/hooks/useBusinesses";
import type { StaffMember } from "@/types/business";
import FormCard from "./FormCard";
import StaffMemberDialog from "./StaffMemberDialog";

const List = styled.ul.attrs({ className: "staff-card__list" })`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  list-style: none;
`;

// Like the other settings rows: who on the left, the edit cue on the right.
const Row = styled.button.attrs({ type: "button", className: "staff-card__row" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};
  min-height: 56px;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  margin-inline: -${({ theme }) => theme.space.md}; /* text lines up with the card content */
  width: calc(100% + 2 * ${({ theme }) => theme.space.md});
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

const Person = styled.span.attrs({ className: "staff-card__person" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  min-width: 0;
`;

const Name = styled.span.attrs({ className: "staff-card__name" })`
  font-size: 0.9375rem;
  font-weight: 600;
`;

const Role = styled.span.attrs({ className: "staff-card__role" })`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8125rem;
`;

const EditCue = styled.span.attrs({ className: "staff-card__edit" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 600;
`;

const Empty = styled.p.attrs({ className: "staff-card__empty" })`
  grid-column: 1 / -1;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;

// The business's staff. "Agregar empleado" adds a placeholder ("Empleado 2") and opens it in a
// modal to edit its name and role; tapping a row opens the same modal. Changes save right away.
export default function StaffCard({
  businessId,
  staff,
}: {
  businessId: string;
  staff: StaffMember[];
}) {
  const { addStaffMember, updateStaffMember, removeStaffMember } = useBusinesses();
  // Kept after closing, so the modal closes in place (and focus returns) before it changes.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const editing = staff.find((member) => member.id === editingId);

  const edit = (id: string) => {
    setEditingId(id);
    setOpen(true);
  };

  return (
    <FormCard
      heading="Staff"
      intro="Las personas que atienden en tu negocio. Los cambios se guardan al momento."
      action={
        <Button $size="sm" onClick={() => edit(addStaffMember(businessId).id)}>
          <Icon name="plus" />
          Agregar empleado
        </Button>
      }
    >
      {staff.length === 0 ? (
        <Empty>Aún no agregas a nadie de tu staff.</Empty>
      ) : (
        <List>
          {staff.map((member) => (
            <li key={member.id} className="staff-card__item">
              <Row onClick={() => edit(member.id)} aria-label={`Editar a ${member.name}`}>
                <Person>
                  <Name>{member.name}</Name>
                  <Role>{member.role || "Sin puesto"}</Role>
                </Person>
                <EditCue aria-hidden="true">
                  Editar
                  <Icon name="arrow-right" />
                </EditCue>
              </Row>
            </li>
          ))}
        </List>
      )}

      {editing && (
        <StaffMemberDialog
          key={editing.id}
          member={editing}
          open={open}
          onClose={() => setOpen(false)}
          onSave={(member) => updateStaffMember(businessId, member)}
          onRemove={() => {
            setOpen(false);
            removeStaffMember(businessId, editing.id);
          }}
        />
      )}
    </FormCard>
  );
}
