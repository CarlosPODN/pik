"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import SelectField from "@/components/fields/SelectField";
import TextField from "@/components/fields/TextField";
import { roleOptions } from "@/lib/businesses";
import type { BusinessCategory, StaffMember } from "@/types/business";
import DeleteRow from "../DeleteRow/DeleteRow";
import { StaffMemberDialogWrapper } from "./StaffMemberDialog.styles";
import { staffMemberSchema, type StaffMemberInput, type StaffMemberOutput } from "@/schemas/staff";

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
 * **Validation**: React Hook Form, with the rules and messages in `staffMemberSchema` (zod).
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
  const options = roleOptions(category);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffMemberInput, unknown, StaffMemberOutput>({
    resolver: zodResolver(staffMemberSchema(options.length > 0)),
    defaultValues: {
      name: member.name,
      role: options.some((option) => option.value === member.role) ? (member.role ?? "") : "",
    },
  });

  const save = handleSubmit((values) => {
    onSave({ ...member, ...values });
    onClose();
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Editar empleado"
      onSubmit={save}
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
          autoComplete="off"
          error={errors.name?.message}
          {...register("name")}
        />
        <SelectField
          label="Puesto"
          placeholder={options.length > 0 ? "Elige un puesto" : "Sin categoría del negocio"}
          options={options}
          disabled={options.length === 0}
          error={errors.role?.message}
          {...register("role")}
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
