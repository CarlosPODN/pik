"use client";

import { useState } from "react";
import { useController, type Control } from "react-hook-form";
import Button from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import Icon from "@/components/Icon/Icon";
import { findUntouched, newStaffMember, roleLabel } from "@/lib/businesses";
import type { BusinessFormInput, BusinessFormOutput } from "@/schemas/business";
import type { StaffMemberValue } from "@/schemas/staff";
import type { BusinessCategory } from "@/types/business";
import StaffMemberDialog from "../StaffMemberDialog/StaffMemberDialog";
import { StaffCardWrapper } from "./StaffCard.styles";

export interface StaffCardProps {
  /** The settings form's `control`: the card reads and edits its `staff` field. */
  control: Control<BusinessFormInput, unknown, BusinessFormOutput>;
  /** The category picked in the settings form (saved or not), which sets the role options. */
  category: BusinessCategory | null;
}

/**
 * The business's staff, as a card in the settings: one row per person with their role and a
 * "Sin editar" badge until edited.
 *
 * ```tsx
 * <StaffCard control={control} category={pickedCategory} />
 * ```
 *
 * **Part of the settings form**: it edits the form's `staff` field. "Agregar empleado" adds a
 * placeholder ("Empleado 2") and opens it in `StaffMemberDialog` to edit its name and role;
 * tapping a row opens the same dialog. Nothing is stored until "Guardar cambios".
 *
 * **Errors**: the form won't save while someone added is still unedited ("Sin editar") or has a
 * role that doesn't fit the picked category; the error shows under their row.
 *
 * **One at a time**: while the newest member is still unedited, the add button opens a dialog
 * explaining that instead of adding.
 *
 * **Placement**: it renders outside the settings `<form>`, because forms can't nest.
 *
 * **Styling**: BEM block `staff-card`; `StaffCardWrapper` wraps `FormCard`.
 */
export default function StaffCard({ control, category }: StaffCardProps) {
  const {
    field: { value, onChange: setStaff },
    formState: { errors },
  } = useController({ control, name: "staff" });

  // Kept after closing, so the modal closes in place (and focus returns) before it changes.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // Bumped on every open, so the modal always starts from the current values (the role options
  // may have changed since it was last open, e.g. after a category change).
  const [openCount, setOpenCount] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const staff = value;
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
    const member = newStaffMember(staff);
    setStaff([...staff, member]);
    edit(member.id);
  };

  const editUntouched = (id: string) => {
    setBlocked(false);
    edit(id);
  };

  // The dialog's save: the edited member replaces the old one, marked as edited.
  const saveMember = (member: StaffMemberValue) =>
    setStaff(
      staff.map((current) => (current.id === member.id ? { ...member, touched: true } : current)),
    );

  const removeMember = (id: string) => {
    setOpen(false);
    setStaff(staff.filter((member) => member.id !== id));
  };

  return (
    <StaffCardWrapper
      className="staff-card"
      heading="Staff"
      intro="Las personas que atienden en tu negocio."
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
          {staff.map((member, index) => {
            // An unedited placeholder, or a role that doesn't fit the picked category.
            const error = errors.staff?.[index]?.message ?? errors.staff?.[index]?.role?.message;
            return (
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
                    <span className="staff-card__role">
                      {roleLabel(member.role) ?? "Sin puesto"}
                    </span>
                  </span>
                  <span className="staff-card__edit" aria-hidden="true">
                    Editar
                    <Icon name="arrow-right" />
                  </span>
                </button>
                {error && (
                  <p className="staff-card__error" role="alert">
                    {error}
                  </p>
                )}
              </li>
            );
          })}
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
              <Button size="sm" onClick={() => editUntouched(untouched.id)}>
                Editar ahora
              </Button>
            )}
          </>
        }
      >
        Antes de agregar a alguien más, completa los datos de <strong>{untouched?.name}</strong>.
      </Dialog>

      {editing && (
        <StaffMemberDialog
          key={`${editing.id}-${openCount}`}
          member={editing}
          category={category}
          open={open}
          onClose={() => setOpen(false)}
          onSave={saveMember}
          onRemove={() => removeMember(editing.id)}
        />
      )}
    </StaffCardWrapper>
  );
}
