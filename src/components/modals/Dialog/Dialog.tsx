"use client";

import { useEffect, useId, useRef, type FormEvent, type ReactNode } from "react";
import { DialogWrapper } from "./Dialog.styles";

// Modal built on the native <dialog>: the browser traps focus, closes it on Escape, makes the
// page behind inert and returns focus to the trigger. Clicking the backdrop also closes it.
export default function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions: ReactNode;
  // Makes the body and actions a form: Enter submits, and a type="submit" action calls this.
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <DialogWrapper
      ref={ref}
      className="dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      // A click whose target is the <dialog> itself landed on the backdrop, outside the panel.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <h2 id={titleId} className="dialog__title">
        {title}
      </h2>
      {onSubmit ? (
        <form noValidate onSubmit={onSubmit} className="dialog__form">
          <div className="dialog__body">{children}</div>
          <div className="dialog__actions">{actions}</div>
        </form>
      ) : (
        <>
          <div className="dialog__body">{children}</div>
          <div className="dialog__actions">{actions}</div>
        </>
      )}
    </DialogWrapper>
  );
}
