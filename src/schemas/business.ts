import { z } from "zod";
import { BUSINESS_CATEGORIES, WEEKDAYS } from "@/lib/constants";
import { formatPhone } from "@/lib/format";
import type { Business, BusinessCategory, Weekday } from "@/types/business";

const isCategory = (value: string): value is BusinessCategory =>
  BUSINESS_CATEGORIES.some((option) => option.value === value);

// One day's hours. Times are only checked on open days.
const dayHoursSchema = z
  .object({ open: z.boolean(), from: z.string(), to: z.string() })
  .superRefine((day, ctx) => {
    if (!day.open) return;
    if (!day.from || !day.to) {
      ctx.addIssue({ code: "custom", message: "Indica la hora de apertura y de cierre." });
    } else if (day.from >= day.to) {
      ctx.addIssue({
        code: "custom",
        message: "La hora de cierre debe ser después de la de apertura.",
      });
    }
  });

const weeklyHoursSchema = z
  .object(
    Object.fromEntries(WEEKDAYS.map(({ value }) => [value, dayHoursSchema])) as Record<
      Weekday,
      typeof dayHoursSchema
    >,
  )
  .refine((hours) => WEEKDAYS.some(({ value }) => hours[value].open), {
    message: "Elige al menos un día de atención.",
  });

// The settings form. The input is what the fields hold (a formatted phone, "" for no category);
// the output is what gets saved (trimmed text, the phone's digits, a real category). Each field
// shows its first failing rule, so the "empty" check comes first.
export const businessFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Escribe el nombre de tu negocio.")
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(60, "El nombre puede tener hasta 60 caracteres."),
  category: z
    .string()
    .refine(isCategory, "Elige una categoría.")
    .transform((value) => value as BusinessCategory),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .min(1, "Escribe un teléfono de contacto.")
        .length(10, "El teléfono debe tener 10 dígitos."),
    ),
  address: z
    .string()
    .trim()
    .min(1, "Escribe la dirección de tu negocio.")
    .min(5, "La dirección debe tener al menos 5 caracteres."),
  city: z.string().trim().min(1, "Escribe la ciudad."),
  hours: weeklyHoursSchema,
});

export type BusinessFormInput = z.input<typeof businessFormSchema>;
export type BusinessFormOutput = z.output<typeof businessFormSchema>;

export function toFormValues(business: Business): BusinessFormInput {
  return {
    name: business.name,
    category: business.category ?? "",
    phone: business.phone && formatPhone(business.phone),
    address: business.location.address,
    city: business.location.city,
    hours: business.hours,
  };
}

export function toBusinessChanges({ address, city, ...values }: BusinessFormOutput) {
  return { ...values, location: { address, city } };
}
