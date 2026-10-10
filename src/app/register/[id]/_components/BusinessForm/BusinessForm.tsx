"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState, type ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Button from "@/components/buttons/Button/Button";
import Dialog from "@/components/modals/Dialog/Dialog";
import ButtonLink from "@/components/buttons/ButtonLink";
import Icon from "@/components/Icon/Icon";
import SelectField from "@/components/fields/SelectField";
import TextField from "@/components/fields/TextField";
import { useLeaveGuard } from "@/hooks/useLeaveGuard";
import { BUSINESS_CATEGORIES, WEEKDAYS } from "@/lib/constants";
import type { Business, Weekday } from "@/types/business";
import {
  businessFormSchema,
  isCategory,
  toBusinessChanges,
  toFormValues,
  type BusinessFormInput,
  type BusinessFormOutput,
} from "@/schemas/business";
import FormCard from "../FormCard/FormCard";
import StaffCard from "../StaffCard/StaffCard";
import HoursEditor from "../HoursEditor/HoursEditor";
import { BusinessFormWrapper } from "./BusinessForm.styles";

type BusinessChanges = Pick<
  Business,
  "name" | "category" | "phone" | "location" | "hours" | "staff"
>;

export interface BusinessFormProps {
  /** The saved business, the form's starting values. Remount (`key`) for another business. */
  business: Business;
  /** Saves the validated changes. Marks the business as touched. */
  onSave: (id: string, changes: BusinessChanges) => void;
  /** Rendered in its own full-width row under the phone (`DeleteBusiness`). */
  deleteAction: ReactNode;
}

/**
 * The business settings form: general info, location and hours, and the staff, with one save
 * for all of it.
 *
 * ```tsx
 * <BusinessForm key={business.id} business={business} onSave={updateBusiness}
 *   deleteAction={<DeleteBusiness … />} />
 * ```
 *
 * **Validation**: React Hook Form runs the form and `businessFormSchema` (zod) holds the rules
 * and messages. It validates on submit, then live as the person fixes each field, and focuses
 * the first invalid one. "Los cambios han sido guardados." shows after a save, until the next edit.
 *
 * **Unsaved changes**: `formState.isDirty` feeds `useLeaveGuard`, which holds in-app link clicks
 * behind a "Tienes cambios sin guardar" dialog and arms the browser's reload/close warning.
 * After a save, the form resets to the saved values (trimmed, phone formatted).
 *
 * **Staff**: `staff` is a field of this form. `StaffCard` edits it in place (adding, editing in
 * a dialog, removing) and nothing is stored until "Guardar cambios". Roles come from the
 * category picked in the form, saved or not, and each must fit it to save.
 *
 * **Saving from outside**: `StaffCard` and the save buttons sit outside the `<form>` (the staff
 * dialog has its own form, and forms can't nest); the buttons submit through `form={formId}`.
 *
 * **Styling**: BEM block `business-form`.
 */
export default function BusinessForm({ business, onSave, deleteAction }: BusinessFormProps) {
  const formId = useId();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<BusinessFormInput, unknown, BusinessFormOutput>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: toFormValues(business),
  });
  const pickedCategory = useWatch({ control, name: "category" });
  const leaveGuard = useLeaveGuard(isDirty);

  const [saved, setSaved] = useState(false);

  const category = isCategory(pickedCategory) ? pickedCategory : null;
  const dayErrors = Object.fromEntries(
    WEEKDAYS.map(({ value }) => [value, errors.hours?.[value]?.message]),
  ) as Partial<Record<Weekday, string>>;

  const save = handleSubmit((values) => {
    const changes = toBusinessChanges(values);
    onSave(business.id, changes);
    // The saved values become the new baseline, shown as saved (trimmed, phone formatted).
    reset(toFormValues({ ...business, ...changes }));
    setSaved(true);
  });

  return (
    <BusinessFormWrapper className="business-form">
      <form
        className="business-form__form"
        id={formId}
        noValidate
        onSubmit={save}
        aria-label="Información del negocio"
      >
        <FormCard
          heading="Ajustes"
          intro="Edita el nombre, la categoría y el teléfono de tu negocio."
        >
          <TextField
            label="Nombre del negocio"
            autoComplete="organization"
            error={errors.name?.message}
            {...register("name")}
          />
          <SelectField
            label="Categoría"
            placeholder="Elige una categoría"
            options={BUSINESS_CATEGORIES}
            error={errors.category?.message}
            {...register("category")}
          />
          <TextField
            label="Teléfono de contacto"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="55 1234 5678"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <div className="business-form__danger">{deleteAction}</div>
        </FormCard>

        <FormCard
          heading="Ubicación y horario de atención"
          intro="Indica dónde está tu negocio y en qué días y horas atiendes."
        >
          <TextField
            label="Dirección"
            autoComplete="street-address"
            placeholder="Calle, número y colonia"
            error={errors.address?.message}
            {...register("address")}
          />
          <TextField
            label="Ciudad"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city")}
          />
          <Controller
            control={control}
            name="hours"
            render={({ field }) => (
              <HoursEditor
                ref={field.ref}
                hours={field.value}
                onChange={(day, dayHours) => field.onChange({ ...field.value, [day]: dayHours })}
                error={errors.hours?.message}
                dayErrors={dayErrors}
              />
            )}
          />
        </FormCard>
      </form>

      <StaffCard control={control} category={category} />

      <div className="business-form__footer">
        <div role="status" className="business-form__status">
          {saved && !isDirty && (
            <p className="business-form__success">
              <Icon name="check" />
              Los cambios han sido guardados.
            </p>
          )}
        </div>
        <div className="business-form__actions">
          <ButtonLink href="/register" variant="secondary">
            Volver
          </ButtonLink>
          <Button type="submit" form={formId}>
            Guardar cambios
          </Button>
        </div>
      </div>

      <Dialog
        open={leaveGuard.pendingHref !== null}
        onClose={leaveGuard.cancelLeave}
        title="Tienes cambios sin guardar"
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={leaveGuard.cancelLeave}>
              Quedarme
            </Button>
            <Button variant="danger" size="sm" onClick={leaveGuard.confirmLeave}>
              Salir
            </Button>
          </>
        }
      >
        Si sales ahora, perderás los cambios que hiciste en este negocio.
      </Dialog>
    </BusinessFormWrapper>
  );
}
