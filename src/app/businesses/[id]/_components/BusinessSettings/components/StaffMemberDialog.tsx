"use client";

import { useState, type FormEvent } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import TextField from "@/components/TextField";
import type { StaffMember } from "@/types/business";

const Fields = styled.div.attrs({ className: "staff-member-dialog__fields" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  margin-top: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.foreground};
`;

const RemoveButton = styled.button.attrs({
  type: "button",
  className: "staff-member-dialog__remove",
})`
  align-self: flex-start;
  min-height: 44px; /* comfortable touch target */
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.danger};
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: none;
    border-radius: ${({ theme }) => theme.radii.sm};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

interface Errors {
  name?: string;
  role?: string;
}

function validate(name: string, role: string): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Escribe el nombre.";
  else if (name.trim().length < 2) errors.name = "El nombre debe tener al menos 2 caracteres.";
  if (!role.trim()) errors.role = "Escribe su puesto.";
  return errors;
}

// Edits one staff member's name and role in a modal. Mount it with key={member.id} so each
// member starts from their own saved values.
export default function StaffMemberDialog({
  member,
  open,
  onClose,
  onSave,
  onRemove,
}: {
  member: StaffMember;
  open: boolean;
  onClose: () => void;
  onSave: (member: StaffMember) => void;
  onRemove: () => void;
}) {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? validate(name, role) : {};

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(name, role)).length > 0) {
      const form = event.currentTarget;
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    onSave({ ...member, name: name.trim(), role: role.trim() });
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
        <TextField
          label="Puesto"
          name="staff-role"
          autoComplete="off"
          placeholder="Ej. Estilista, barbero, manicurista"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          error={errors.role}
        />
        <RemoveButton onClick={onRemove}>Eliminar empleado</RemoveButton>
      </Fields>
    </Dialog>
  );
}
