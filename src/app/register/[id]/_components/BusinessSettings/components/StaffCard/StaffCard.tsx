"use client";

import { useState } from "react";
import Button from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import Icon from "@/components/Icon/Icon";
import { useBusinesses } from "@/hooks/useBusinesses";
import { findUntouched, roleLabel } from "@/lib/businesses";
import type { BusinessCategory, StaffMember } from "@/types/business";
import StaffMemberDialog from "../StaffMemberDialog/StaffMemberDialog";
import { StaffCardWrapper } from "./StaffCard.styles";

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
    <StaffCardWrapper
      className="staff-card"
      heading="Staff"
      intro="Las personas que atienden en tu negocio. Los cambios se guardan al momento."
      action={
        <Button className="staff-card__add" size="sm" onClick={add} aria-label="Agregar empleado">
          <Icon name="plus" />
          <span className="staff-card__add-label">Agregar empleado</span>
        </Button>
      }
    >
      {staff.length === 0 ? (
        <p className="staff-card__empty">Aún no agregas a nadie de tu staff.</p>
      ) : (
        <ul className="staff-card__list">
          {staff.map((member) => (
            <li key={member.id} className="staff-card__item">
              <button
                type="button"
                className="staff-card__row"
                onClick={() => edit(member.id)}
                aria-label={`Editar a ${member.name}`}
              >
                <span className="staff-card__person">
                  <span className="staff-card__name-row">
                    <span className="staff-card__name">{member.name}</span>
                    {!member.touched && <span className="staff-card__pending">Sin editar</span>}
                  </span>
                  <span className="staff-card__role">{roleLabel(member.role) ?? "Sin puesto"}</span>
                </span>
                <span className="staff-card__edit" aria-hidden="true">
                  Editar
                  <Icon name="arrow-right" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Before the edit dialog: when "Editar ahora" swaps one for the other, this one closes
          (returning focus to the add button) before the edit dialog opens and takes focus. */}
      <Dialog
        open={blocked}
        onClose={() => setBlocked(false)}
        title="Primero edita a tu último empleado"
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => setBlocked(false)}>
              Cerrar
            </Button>
            {untouched && (
              <Button
                size="sm"
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
    </StaffCardWrapper>
  );
}
