"use client";

import { useEffect, useId, useRef, type FormEvent, type ReactNode } from "react";
import styled from "styled-components";

const DialogWrapper = styled.dialog`
  width: min(420px, calc(100vw - 32px));
  margin: auto;
  padding: ${({ theme }) => theme.space.xl};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  box-shadow: 0 24px 48px -12px rgba(45, 45, 45, 0.35);

  &::backdrop {
    background: ${({ theme }) => theme.colors.overlay};
  }

  .dialog {
    &__title {
      font-size: 1.125rem;
      line-height: 1.3;
    }

    &__body {
      margin-top: ${({ theme }) => theme.space.sm};
      color: ${({ theme }) => theme.colors.muted};
      line-height: 1.5;
    }

    /* Buttons split the width evenly, on every screen size. Long labels wrap instead of
       overflowing. */
    &__actions {
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      gap: ${({ theme }) => theme.space.sm};
      margin-top: ${({ theme }) => theme.space.xl};

      & > * {
        min-width: 0;
        white-space: normal;
        text-align: center;
      }
    }
  }
`;

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
