"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { FormCardWrapper } from "./FormCard.styles";

export default function FormCard({
  heading,
  intro,
  action,
  className,
  children,
}: {
  heading: string;
  intro: string;
  action?: ReactNode;
  // Lets a card that adds its own parts (like StaffCard) style them by wrapping FormCard.
  className?: string;
  children: ReactNode;
}) {
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
