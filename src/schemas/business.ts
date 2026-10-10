import { z } from "zod";
import { BUSINESS_CATEGORIES, ROLES_BY_CATEGORY, WEEKDAYS } from "@/lib/constants";
import { formatPhone } from "@/lib/format";
import { staffMemberValueSchema } from "./staff";
import type { Business, BusinessCategory, StaffRole, Weekday } from "@/types/business";

/**
 * Whether a string is one of the business categories (`"salon"`, `"barbershop"`, `"spa"`).
 * The form's category field holds `""` until one is picked.
 *
 * ```ts
 * const category = isCategory(picked) ? picked : null;
 * ```
 */
export const isCategory = (value: string): value is BusinessCategory =>
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

/**
 * The **business settings form**: general info, location, opening hours and staff.
 *
 * ```ts
 * useForm<BusinessFormInput, unknown, BusinessFormOutput>({
 *   resolver: zodResolver(businessFormSchema),
 *   defaultValues: toFormValues(business),
 * });
 * ```
 *
 * **Input vs. output**: the input is what the fields hold (a formatted phone, `""` for no
 * category); the output is what gets saved (trimmed text, the phone's digits, a real category).
 *
 * | Field      | Rules (first failing one shows)                                       |
 * | ---------- | --------------------------------------------------------------------- |
 * | `name`     | required, 2 to 60 characters                                          |
 * | `category` | one of the categories                                                 |
 * | `phone`    | required, 10 digits (spaces and dashes are ignored)                   |
 * | `address`  | required, at least 5 characters                                       |
 * | `city`     | required                                                              |
 * | `hours`    | at least one open day; on open days, both times, closing after opening |
 * | `staff`    | each member edited, and its role fits the picked category             |
 *
 * **Staff errors** land on `staff.<index>` (still unedited) or `staff.<index>.role` (role
 * doesn't fit); `StaffCard` shows them under the person's row.
 */
export const businessFormSchema = z
  .object({
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
    staff: z.array(staffMemberValueSchema),
  })
  // Staff: an added placeholder has to be edited before saving, and each role has to fit the
  // category picked in the form (it may have just changed).
  .superRefine(({ category, staff }, ctx) => {
    const allowed: readonly StaffRole[] = isCategory(category) ? ROLES_BY_CATEGORY[category] : [];
    staff.forEach((member, index) => {
      if (!member.touched) {
        ctx.addIssue({
          code: "custom",
          path: ["staff", index],
          message: "Completa sus datos antes de guardar los cambios.",
        });
      } else if (!allowed.includes(member.role)) {
        ctx.addIssue({
          code: "custom",
          path: ["staff", index, "role"],
          message: "Su puesto no corresponde a la categoría. Edítalo para elegir otro.",
        });
      }
    });
  });

/** What the settings form's fields hold (see `businessFormSchema`). */
export type BusinessFormInput = z.input<typeof businessFormSchema>;
/** What the settings form hands to `handleSubmit` once valid: the values ready to save. */
export type BusinessFormOutput = z.output<typeof businessFormSchema>;

/**
 * A saved business as the form's starting values: the phone formatted for reading
 * (`"55 1234 5678"`) and `""` for no category.
 *
 * ```ts
 * defaultValues: toFormValues(business),
 * // after a save, the saved values become the new baseline:
 * reset(toFormValues({ ...business, ...changes }));
 * ```
 */
export function toFormValues(business: Business): BusinessFormInput {
  return {
    name: business.name,
    category: business.category ?? "",
    phone: business.phone && formatPhone(business.phone),
    address: business.location.address,
    city: business.location.city,
    hours: business.hours,
    staff: business.staff,
  };
}

/**
 * The form's valid output as changes for `updateBusiness`: everything as is, with `address` and
 * `city` nested back under `location`.
 *
 * ```ts
 * const save = handleSubmit((values) => onSave(business.id, toBusinessChanges(values)));
 * ```
 */
export function toBusinessChanges({ address, city, ...values }: BusinessFormOutput) {
  return { ...values, location: { address, city } };
}
