"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import SelectField from "@/components/fields/SelectField";
import TextField from "@/components/fields/TextField";
import { roleOptions } from "@/lib/businesses";
import type { BusinessCategory, StaffMember, StaffRole } from "@/types/business";
import DeleteRow from "../DeleteRow/DeleteRow";
import { StaffMemberDialogWrapper } from "./StaffMemberDialog.styles";

interface Errors {
  name?: string;
  role?: string;
}

function validate(name: string, role: StaffRole | "", hasRoles: boolean): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Escribe el nombre.";
  else if (name.trim().length < 2) errors.name = "El nombre debe tener al menos 2 caracteres.";
  if (!role) {
    errors.role = hasRoles
      ? "Elige su puesto."
      : "Primero elige y guarda la categoría de tu negocio en Ajustes.";
  }
  return errors;
}

export interface StaffMemberDialogProps {
  /** The staff member to edit, with their saved values. */
  member: StaffMember;
  /** The saved business category, which sets the role options. */
  category: BusinessCategory | null;
  /** Whether the dialog is shown. */
  open: boolean;
  /** Closes the dialog: Cancelar, Escape, the backdrop, or after a save. */
  onClose: () => void;
  /** Saves the edited member. The dialog closes itself after. */
  onSave: (member: StaffMember) => void;
  /** Removes the member, after "¿Eliminar empleado?" is confirmed in place. */
  onRemove: () => void;
}

/**
 * Edits one staff member's name and role in a modal, with a row to remove them.
 *
 * ```tsx
 * <StaffMemberDialog key={`${member.id}-${openCount}`} member={member} category={category}
 *   open={open} onClose={close} onSave={save} onRemove={remove} />
 * ```
 *
 * **Remount on every open** (new `key`) so it starts from the saved values.
 *
 * **Roles**: the options depend on the business category. A role that doesn't fit the current
 * category has to be picked again; with no saved category, the select is disabled and the error
 * says to pick one in Ajustes first.
 *
 * **Styling**: BEM block `staff-member-dialog`, inside a `Dialog`.
 */
export default function StaffMemberDialog({
  member,
  category,
  open,
  onClose,
  onSave,
  onRemove,
}: StaffMemberDialogProps) {
  const [name, setName] = useState(member.name);
  const options = roleOptions(category);
  const [role, setRole] = useState<StaffRole | "">(
    options.some((option) => option.value === member.role) ? (member.role ?? "") : "",
  );
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? validate(name, role, options.length > 0) : {};

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(name, role, options.length > 0)).length > 0) {
      const form = event.currentTarget;
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    onSave({ ...member, name: name.trim(), role: role as StaffRole });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Editar empleado"
      onSubmit={submit}
      actions={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" size="sm">
            Guardar
          </Button>
        </>
      }
    >
      <StaffMemberDialogWrapper className="staff-member-dialog">
        <TextField
          label="Nombre"
          name="staff-name"
          autoComplete="off"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />
        <SelectField
          label="Puesto"
          name="staff-role"
          placeholder={options.length > 0 ? "Elige un puesto" : "Sin categoría del negocio"}
          options={options}
          disabled={options.length === 0}
          value={role}
          onChange={(event) => setRole(event.target.value as StaffRole)}
          error={errors.role}
        />
        <DeleteRow
          label="Eliminar empleado"
          buttonLabel={`Eliminar a ${member.name}`}
          confirmLabel="¿Eliminar empleado?"
          onClick={onRemove}
        />
      </StaffMemberDialogWrapper>
    </Dialog>
  );
}
