"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import SelectField from "@/components/fields/SelectField";
import TextField from "@/components/fields/TextField";
import { roleOptions } from "@/lib/businesses";
import type { StaffMemberValue } from "@/schemas/staff";
import type { BusinessCategory } from "@/types/business";
import DeleteRow from "../DeleteRow/DeleteRow";
import { StaffMemberDialogWrapper } from "./StaffMemberDialog.styles";
import { staffMemberSchema, type StaffMemberInput, type StaffMemberOutput } from "@/schemas/staff";

export interface StaffMemberDialogProps {
  /** The staff member to edit, with their current values in the settings form. */
  member: StaffMemberValue;
  /** The category picked in the settings form (saved or not), which sets the role options. */
  category: BusinessCategory | null;
  /** Whether the dialog is shown. */
  open: boolean;
  /** Closes the dialog: Cancelar, Escape, the backdrop, or after a save. */
  onClose: () => void;
  /** Hands back the edited member (`StaffCard` puts it in the settings form). Then it closes. */
  onSave: (member: StaffMemberValue) => void;
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
 * **Remount on every open** (new `key`) so it starts from the member's current values.
 *
 * **Not stored here**: "Guardar" only updates the settings form; the business is stored with
 * "Guardar cambios".
 *
 * **Validation**: React Hook Form, with the rules and messages in `staffMemberSchema` (zod).
 *
 * **Roles**: the options depend on the business category. A role that doesn't fit the current
 * category has to be picked again; with no category picked, the select is disabled and the error
 * says to pick one in Ajustes first.
 *
 * **Styling**: BEM block `staff-member-dialog`, inside a `Dialog`.
 */
// The dialog's starting values: the member's name and role, unless the role doesn't fit the
// category (then it has to be picked again).
function startingValues(
  member: StaffMemberValue,
  category: BusinessCategory | null,
): StaffMemberInput {
  const fits = roleOptions(category).some((option) => option.value === member.role);
  return { name: member.name, role: fits ? member.role : "" };
}

export default function StaffMemberDialog({
  member,
  category,
  open,
  onClose,
  onSave,
  onRemove,
}: StaffMemberDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffMemberInput, unknown, StaffMemberOutput>({
    resolver: zodResolver(staffMemberSchema(roleOptions(category).length > 0)),
    defaultValues: startingValues(member, category),
  });

  const options = roleOptions(category);

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
