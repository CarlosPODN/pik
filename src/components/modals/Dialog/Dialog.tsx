"use client";

import { useEffect, useId, useRef, type FormEvent, type ReactNode } from "react";
import { DialogWrapper } from "./Dialog.styles";

export interface DialogProps {
  /** Whether the dialog is shown. The parent owns this state. */
  open: boolean;
  /** Called on Escape, a backdrop click, or the browser closing it. Set `open` to false here. */
  onClose: () => void;
  /** Heading, also the dialog's accessible name. */
  title: string;
  /** The body: a message, or the form fields. */
  children: ReactNode;
  /** The buttons at the bottom, e.g. "Cancelar" and the confirm button. */
  actions: ReactNode;
  /**
   * Makes the body and actions a `<form>`: Enter submits, and a `type="submit"` action calls
   * this. Pass React Hook Form's `handleSubmit(...)` here.
   */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

/**
 * Modal built on the native `<dialog>`: the browser traps focus, closes it on Escape, makes the
 * page behind inert and returns focus to the trigger. Clicking the backdrop also closes it.
 *
 * ```tsx
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Tienes cambios sin guardar"
 *   actions={
 *     <>
 *       <Button variant="secondary" size="sm" onClick={stay}>Quedarme</Button>
 *       <Button variant="danger" size="sm" onClick={leave}>Salir</Button>
 *     </>
 *   }
 * >
 *   Si sales ahora, perderás los cambios que hiciste en este negocio.
 * </Dialog>
 * ```
 *
 * **Styling**: BEM block `dialog`, styled by `DialogWrapper`.
 */
export default function Dialog({ open, onClose, title, children, actions, onSubmit }: DialogProps) {
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
