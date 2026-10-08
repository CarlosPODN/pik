"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import Icon from "@/components/Icon/Icon";
import SelectField from "@/components/SelectField";
import TextField from "@/components/TextField";
import { BUSINESS_CATEGORIES } from "@/lib/businesses";
import { formatPhone } from "@/lib/format";
import type { Business, BusinessCategory } from "@/types/business";

interface Values {
  name: string;
  category: BusinessCategory | "";
  phone: string;
}

type Errors = Partial<Record<keyof Values, string>>;

function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  if (!name) errors.name = "Escribe el nombre de tu negocio.";
  else if (name.length < 2) errors.name = "El nombre debe tener al menos 2 caracteres.";
  else if (name.length > 60) errors.name = "El nombre puede tener hasta 60 caracteres.";

  if (!values.category) errors.category = "Elige una categoría.";

  const digits = values.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Escribe un teléfono de contacto.";
  else if (digits.length !== 10) errors.phone = "El teléfono debe tener 10 dígitos.";

  return errors;
}

// One column on phones. From md: name | category, then phone in the left column.
const Form = styled.form.attrs({ className: "business-form" })`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.lg};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: ${({ theme }) => theme.space.xl};
  }

  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
`;

// Full-width row under the phone, with the delete button at the right.
const DangerRow = styled.div.attrs({ className: "business-form__danger" })`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
`;

// Full-width footer: the saved message (when shown) and the buttons.
const Footer = styled.div.attrs({ className: "business-form__footer" })`
  grid-column: 1 / -1;
`;

const Success = styled.p.attrs({ className: "business-form__success" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.onSuccess};
  margin-bottom: ${({ theme }) => theme.space.lg};
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

// Name, category and phone. Validates on submit, then live as the person fixes each field.
// A successful save marks the business as touched.
export default function BusinessForm({
  business,
  onSave,
  deleteAction,
}: {
  business: Business;
  onSave: (id: string, changes: Pick<Business, "name" | "category" | "phone">) => void;
  // Rendered in its own row under the phone, aligned right.
  deleteAction: ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({
    name: business.name,
    category: business.category ?? "",
    phone: business.phone && formatPhone(business.phone),
  });
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const errors = submitted ? validate(values) : {};

  const change = (field: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

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
    onSave(business.id, {
      name: values.name.trim(),
      category: values.category as BusinessCategory,
      phone: values.phone.replace(/\D/g, ""),
    });
    setSaved(true);
  };

  return (
    <Form ref={formRef} noValidate onSubmit={submit} aria-label="Información del negocio">
      <TextField
        label="Nombre del negocio"
        name="name"
        autoComplete="organization"
        value={values.name}
        onChange={(event) => change("name")(event.target.value)}
        error={errors.name}
      />
      <SelectField
        label="Categoría"
        name="category"
        placeholder="Elige una categoría"
        options={BUSINESS_CATEGORIES}
        value={values.category}
        onChange={(event) => change("category")(event.target.value)}
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
        onChange={(event) => change("phone")(event.target.value)}
        error={errors.phone}
      />

      <DangerRow>{deleteAction}</DangerRow>

      <Footer>
        <div role="status" className="business-form__status">
          {saved && (
            <Success>
              <Icon name="check" />
              Guardamos los cambios.
            </Success>
          )}
        </div>
        <Actions>
          <ButtonLink href="/" $variant="secondary">
            Volver
          </ButtonLink>
          <Button type="submit">Guardar cambios</Button>
        </Actions>
      </Footer>
    </Form>
  );
}
