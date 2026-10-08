import { WEEKDAYS } from "@/lib/businesses";
import { formatPhone } from "@/lib/format";
import type { Business, BusinessCategory, Weekday, WeeklyHours } from "@/types/business";

export interface BusinessFormValues {
  name: string;
  category: BusinessCategory | "";
  phone: string;
  address: string;
  city: string;
  hours: WeeklyHours;
}

// Error messages by field: "name", "category", "phone", "address", "city", "hours" (the week as
// a whole) and "hours.<weekday>" (one day's times).
export type BusinessFormErrors = Partial<Record<string, string>>;

export const dayErrorKey = (day: Weekday) => `hours.${day}`;

export function toFormValues(business: Business): BusinessFormValues {
  return {
    name: business.name,
    category: business.category ?? "",
    phone: business.phone && formatPhone(business.phone),
    address: business.location.address,
    city: business.location.city,
    hours: business.hours,
  };
}

// Only call after validate() returns no errors.
export function toBusinessChanges(values: BusinessFormValues) {
  return {
    name: values.name.trim(),
    category: values.category as BusinessCategory,
    phone: values.phone.replace(/\D/g, ""),
    location: { address: values.address.trim(), city: values.city.trim() },
    hours: values.hours,
  };
}

export function validate(values: BusinessFormValues): BusinessFormErrors {
  const errors: BusinessFormErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Escribe el nombre de tu negocio.";
  else if (name.length < 2) errors.name = "El nombre debe tener al menos 2 caracteres.";
  else if (name.length > 60) errors.name = "El nombre puede tener hasta 60 caracteres.";

  if (!values.category) errors.category = "Elige una categoría.";

  const digits = values.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Escribe un teléfono de contacto.";
  else if (digits.length !== 10) errors.phone = "El teléfono debe tener 10 dígitos.";

  const address = values.address.trim();
  if (!address) errors.address = "Escribe la dirección de tu negocio.";
  else if (address.length < 5) errors.address = "La dirección debe tener al menos 5 caracteres.";

  if (!values.city.trim()) errors.city = "Escribe la ciudad.";

  const openDays = WEEKDAYS.filter(({ value }) => values.hours[value].open);
  if (openDays.length === 0) errors.hours = "Elige al menos un día de atención.";
  for (const { value: day } of openDays) {
    const { from, to } = values.hours[day];
    if (!from || !to) errors[dayErrorKey(day)] = "Indica la hora de apertura y de cierre.";
    else if (from >= to)
      errors[dayErrorKey(day)] = "La hora de cierre debe ser después de la de apertura.";
  }

  return errors;
}

// Whether the form differs from the saved business, comparing the values as they'd be saved
// (so "5512345678" and "55 1234 5678" count as the same phone).
export function hasUnsavedChanges(values: BusinessFormValues, business: Business) {
  return (
    JSON.stringify(toBusinessChanges(values)) !==
    JSON.stringify(toBusinessChanges(toFormValues(business)))
  );
}
