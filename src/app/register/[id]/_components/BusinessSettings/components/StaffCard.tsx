"use client";

import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/buttons/Button";
import Dialog from "@/components/modals/Dialog";
import Icon from "@/components/Icon/Icon";
import { useBusinesses } from "@/hooks/useBusinesses";
import { findUntouched, roleLabel } from "@/lib/businesses";
import type { BusinessCategory, StaffMember } from "@/types/business";
import FormCard from "./FormCard";
import StaffMemberDialog from "./StaffMemberDialog";

// Just the "+" on phones; the label shows from md.
const AddButton = styled(Button).attrs({ className: "staff-card__add" })`
  width: 40px;
  padding: 0;

  ${({ theme }) => theme.media.md} {
    width: auto;
    padding: 0 ${({ theme }) => theme.space.lg};
  }
`;

const AddLabel = styled.span.attrs({ className: "staff-card__add-label" })`
  display: none;

  ${({ theme }) => theme.media.md} {
    display: inline;
  }
`;

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

const NameRow = styled.span.attrs({ className: "staff-card__name-row" })`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const Pending = styled.span.attrs({ className: "staff-card__pending" })`
  padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.attention};
  color: ${({ theme }) => theme.palette.white}; /* by design choice; ~3.2:1 on flama */
  font-size: 0.75rem;
  font-weight: 600;
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
// While the newest member is still unedited, the add button explains that instead of adding.
export default function StaffCard({
  businessId,
  category,
  staff,
}: {
  businessId: string;
  // The saved business category, which sets the role options.
  category: BusinessCategory | null;
  staff: StaffMember[];
}) {
  const { addStaffMember, updateStaffMember, removeStaffMember } = useBusinesses();
  // Kept after closing, so the modal closes in place (and focus returns) before it changes.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // Bumped on every open, so the modal always starts from the saved values (the role options
  // may have changed since it was last open, e.g. after a category change).
  const [openCount, setOpenCount] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const editing = staff.find((member) => member.id === editingId);
  const untouched = findUntouched(staff);

  const edit = (id: string) => {
    setEditingId(id);
    setOpen(true);
    setOpenCount((count) => count + 1);
  };

  const add = () => {
    if (untouched) {
      setBlocked(true);
      return;
    }
    edit(addStaffMember(businessId).id);
  };

  return (
    <FormCard
      heading="Staff"
      intro="Las personas que atienden en tu negocio. Los cambios se guardan al momento."
      action={
        <AddButton $size="sm" onClick={add} aria-label="Agregar empleado">
          <Icon name="plus" />
          <AddLabel>Agregar empleado</AddLabel>
        </AddButton>
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
                  <NameRow>
                    <Name>{member.name}</Name>
                    {!member.touched && <Pending>Sin editar</Pending>}
                  </NameRow>
                  <Role>{roleLabel(member.role) ?? "Sin puesto"}</Role>
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

      {/* Before the edit dialog: when "Editar ahora" swaps one for the other, this one closes
          (returning focus to the add button) before the edit dialog opens and takes focus. */}
      <Dialog
        open={blocked}
        onClose={() => setBlocked(false)}
        title="Primero edita a tu último empleado"
        actions={
          <>
            <Button $variant="secondary" $size="sm" onClick={() => setBlocked(false)}>
              Cerrar
            </Button>
            {untouched && (
              <Button
                $size="sm"
                onClick={() => {
                  setBlocked(false);
                  edit(untouched.id);
                }}
              >
                Editar ahora
              </Button>
            )}
          </>
        }
      >
        Antes de agregar a alguien más, completa y guarda los datos de{" "}
        <strong>{untouched?.name}</strong>.
      </Dialog>

      {editing && (
        <StaffMemberDialog
          key={`${editing.id}-${openCount}`}
          member={editing}
          category={category}
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
