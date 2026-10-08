"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import styled from "styled-components";
import Button from "@/components/buttons/Button";
import Dialog from "@/components/modals/Dialog";
import ButtonLink from "@/components/buttons/ButtonLink";
import Icon from "@/components/Icon/Icon";
import SelectField from "@/components/fields/SelectField";
import TextField from "@/components/fields/TextField";
import { useLeaveGuard } from "@/hooks/useLeaveGuard";
import { BUSINESS_CATEGORIES } from "@/lib/businesses";
import type { Business, DayHours, Weekday } from "@/types/business";
import {
  dayErrorKey,
  hasUnsavedChanges,
  toBusinessChanges,
  toFormValues,
  validate,
  type BusinessFormValues,
} from "../businessFormValues";
import FormCard from "./FormCard";
import HoursEditor from "./HoursEditor";

// The form holds the first two cards. The staff card sits between it and the footer but outside
// it (its modal has its own form, and forms can't nest), so the buttons use form={formId}.
const Wrapper = styled.div.attrs({ className: "business-form" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const Form = styled.form.attrs({ className: "business-form__form" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

// Full-width row under the phone for the delete action.
const DangerRow = styled.div.attrs({ className: "business-form__danger" })`
  grid-column: 1 / -1;
`;

const Success = styled.p.attrs({ className: "business-form__success" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.onSuccess};
  font-size: 0.875rem;
  font-weight: 600;
`;

const Actions = styled.div.attrs({ className: "business-form__actions" })`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.space.sm};

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

type BusinessChanges = Pick<Business, "name" | "category" | "phone" | "location" | "hours">;

// The business settings in two cards (general info; location and hours) with one save for
// both. Validates on submit, then live as the person fixes each field. A successful save marks
// the business as touched.
export default function BusinessForm({
  business,
  onSave,
  deleteAction,
  staffSection,
}: {
  business: Business;
  onSave: (id: string, changes: BusinessChanges) => void;
  // Rendered in its own full-width row under the phone.
  deleteAction: ReactNode;
  // Rendered after the form's cards, above the save buttons; it saves on its own.
  staffSection: ReactNode;
}) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<BusinessFormValues>(() => toFormValues(business));
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const errors = submitted ? validate(values) : {};
  const leaveGuard = useLeaveGuard(hasUnsavedChanges(values, business));

  const update = (changes: Partial<BusinessFormValues>) => {
    setValues((current) => ({ ...current, ...changes }));
    setSaved(false);
  };

  const updateDay = (day: Weekday, dayHours: DayHours) =>
    update({ hours: { ...values.hours, [day]: dayHours } });

  const dayErrors = Object.fromEntries(
    Object.keys(values.hours).map((day) => [day, errors[dayErrorKey(day as Weekday)]]),
  ) as Partial<Record<Weekday, string>>;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(values)).length > 0) {
      // Move focus to the first invalid field once the errors render.
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    onSave(business.id, toBusinessChanges(values));
    setSaved(true);
  };

  return (
    <Wrapper>
      <Form
        id={formId}
        ref={formRef}
        noValidate
        onSubmit={submit}
        aria-label="Información del negocio"
      >
        <FormCard
          heading="Ajustes"
          intro="Edita el nombre, la categoría y el teléfono de tu negocio."
        >
          <TextField
            label="Nombre del negocio"
            name="name"
            autoComplete="organization"
            value={values.name}
            onChange={(event) => update({ name: event.target.value })}
            error={errors.name}
          />
          <SelectField
            label="Categoría"
            name="category"
            placeholder="Elige una categoría"
            options={BUSINESS_CATEGORIES}
            value={values.category}
            onChange={(event) =>
              update({ category: event.target.value as BusinessFormValues["category"] })
            }
            error={errors.category}
          />
          <TextField
            label="Teléfono de contacto"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="55 1234 5678"
            value={values.phone}
            onChange={(event) => update({ phone: event.target.value })}
            error={errors.phone}
          />
          <DangerRow>{deleteAction}</DangerRow>
        </FormCard>

        <FormCard
          heading="Ubicación y horario de atención"
          intro="Indica dónde está tu negocio y en qué días y horas atiendes."
        >
          <TextField
            label="Dirección"
            name="address"
            autoComplete="street-address"
            placeholder="Calle, número y colonia"
            value={values.address}
            onChange={(event) => update({ address: event.target.value })}
            error={errors.address}
          />
          <TextField
            label="Ciudad"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => update({ city: event.target.value })}
            error={errors.city}
          />
          <HoursEditor
            hours={values.hours}
            onChange={updateDay}
            error={errors.hours}
            dayErrors={dayErrors}
          />
        </FormCard>
      </Form>

      {staffSection}

      <div className="business-form__footer">
        <div role="status" className="business-form__status">
          {saved && (
            <Success>
              <Icon name="check" />
              Guardamos los cambios.
            </Success>
          )}
        </div>
        <Actions>
          <ButtonLink href="/register" $variant="secondary">
            Volver
          </ButtonLink>
          <Button type="submit" form={formId}>
            Guardar cambios
          </Button>
        </Actions>
      </div>

      <Dialog
        open={leaveGuard.pendingHref !== null}
        onClose={leaveGuard.cancelLeave}
        title="Tienes cambios sin guardar"
        actions={
          <>
            <Button $variant="secondary" $size="sm" onClick={leaveGuard.cancelLeave}>
              Quedarme
            </Button>
            <Button $variant="danger" $size="sm" onClick={leaveGuard.confirmLeave}>
              Salir
            </Button>
          </>
        }
      >
        Si sales ahora, perderás los cambios que hiciste en este negocio.
      </Dialog>
    </Wrapper>
  );
}
