import { z } from "zod";
import type { StaffRole } from "@/types/business";

// The staff member form. The role's message depends on whether the business has a saved
// category (without one there are no roles to pick).
export const staffMemberSchema = (hasRoles: boolean) =>
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
        hasRoles
          ? "Elige su puesto."
          : "Primero elige y guarda la categoría de tu negocio en Ajustes.",
      )
      .transform((value) => value as StaffRole),
  });

export type StaffMemberInput = z.input<ReturnType<typeof staffMemberSchema>>;
export type StaffMemberOutput = z.output<ReturnType<typeof staffMemberSchema>>;
