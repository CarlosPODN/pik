"use client";

import { useState, type FormEvent } from "react";
import styled from "styled-components";
import Button from "@/components/buttons/Button";
import Dialog from "@/components/modals/Dialog";
import SelectField from "@/components/fields/SelectField";
import TextField from "@/components/fields/TextField";
import { roleOptions } from "@/lib/businesses";
import type { BusinessCategory, StaffMember, StaffRole } from "@/types/business";
import DeleteRow from "./DeleteRow";

const Fields = styled.div.attrs({ className: "staff-member-dialog__fields" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.foreground};
`;

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

// Edits one staff member's name and role in a modal. Remount it (new key) on every open so it
// starts from the saved values. The roles to pick from depend on the business category; a role
// that doesn't fit the current category has to be picked again.
export default function StaffMemberDialog({
  member,
  category,
  open,
  onClose,
  onSave,
  onRemove,
}: {
  member: StaffMember;
  // The saved business category, which sets the role options.
  category: BusinessCategory | null;
  open: boolean;
  onClose: () => void;
  onSave: (member: StaffMember) => void;
  onRemove: () => void;
}) {
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
          <Button $variant="secondary" $size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" $size="sm">
            Guardar
          </Button>
        </>
      }
    >
      <Fields>
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
      </Fields>
    </Dialog>
  );
}
