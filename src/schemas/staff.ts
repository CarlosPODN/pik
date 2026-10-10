import { z } from "zod";
import type { StaffRole } from "@/types/business";

/**
 * One staff member's **name and role**, as edited in `StaffMemberDialog`.
 *
 * ```ts
 * useForm<StaffMemberInput, unknown, StaffMemberOutput>({
 *   resolver: zodResolver(staffMemberSchema(options.length > 0)),
 * });
 * ```
 *
 * | Field  | Rules (first failing one shows)                                 | Output     |
 * | ------ | --------------------------------------------------------------- | ---------- |
 * | `name` | required, at least 2 characters                                 | trimmed    |
 * | `role` | required: `""` means not picked yet (as in a new placeholder)   | `StaffRole`|
 *
 * **`hasRoles`** (default `true`) picks the role's message: "Elige su puesto." when the
 * business has a category, or "Primero elige la categoría de tu negocio en Ajustes." when it
 * doesn't (there are no roles to pick).
 */
export const staffMemberSchema = (hasRoles = true) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, "Escribe el nombre.")
      .min(2, "El nombre debe tener al menos 2 caracteres."),
    role: z
      .string()
      .refine(
        (value) => value !== "",
        hasRoles ? "Elige su puesto." : "Primero elige la categoría de tu negocio en Ajustes.",
      )
      .transform((value) => value as StaffRole),
  });

/**
 * A staff member as the **business form** holds it, in its `staff` list: `staffMemberSchema`
 * extended with the stored `id` and `touched` (whether it has been edited).
 *
 * ```ts
 * staff: z.array(staffMemberValueSchema),
 * ```
 *
 * **Category checks** (still unedited, role doesn't fit the picked category) need the business's
 * category, so they live in `businessFormSchema`, not here.
 */
export const staffMemberValueSchema = staffMemberSchema().extend({
  id: z.string(),
  touched: z.boolean(),
});

/** A staff member in the business form, as its fields hold it: `role` is `""` until picked. */
export type StaffMemberValue = z.input<typeof staffMemberValueSchema>;

/** What `StaffMemberDialog`'s fields hold: `name` as typed, `role` as `""` or a role key. */
export type StaffMemberInput = z.input<ReturnType<typeof staffMemberSchema>>;
/** What the dialog hands back once valid: a trimmed `name` and a `StaffRole`. */
export type StaffMemberOutput = z.output<ReturnType<typeof staffMemberSchema>>;
