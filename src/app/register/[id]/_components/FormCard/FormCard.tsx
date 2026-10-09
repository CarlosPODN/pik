"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { FormCardWrapper } from "./FormCard.styles";

export interface FormCardProps {
  /** The card's `<h2>`. */
  heading: string;
  /** One sentence under the heading on what the section is for. */
  intro: string;
  /** Optional button at the end of the heading's row, e.g. "Agregar empleado". */
  action?: ReactNode;
  /** Lets a card that adds its own parts (like `StaffCard`) style them by wrapping `FormCard`. */
  className?: string;
  /** The fields. Each is a grid item; give a child `grid-column: 1 / -1` to span both columns. */
  children: ReactNode;
}

/**
 * A white card for one section of the settings form: heading, intro and its fields in a grid
 * (one column on phones, two from `md`).
 *
 * ```tsx
 * <FormCard heading="Ajustes" intro="Edita el nombre, la categoría y el teléfono de tu negocio.">
 *   <TextField label="Nombre del negocio" … />
 *   <SelectField label="Categoría" … />
 * </FormCard>
 * ```
 *
 * **Styling**: BEM block `form-card`, styled by `FormCardWrapper`.
 */
export default function FormCard({ heading, intro, action, className, children }: FormCardProps) {
  return (
    <FormCardWrapper className={clsx("form-card", className)}>
      <div className="form-card__header">
        <div className="form-card__title-row">
          <h2 className="form-card__heading">{heading}</h2>
          {action}
        </div>
        <p className="form-card__intro">{intro}</p>
      </div>
      {children}
    </FormCardWrapper>
  );
}
