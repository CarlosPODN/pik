"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import styled from "styled-components";

const Panel = styled.dialog.attrs({ className: "dialog" })`
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
`;

const Title = styled.h2.attrs({ className: "dialog__title" })`
  font-size: 1.125rem;
  line-height: 1.3;
`;

const Body = styled.div.attrs({ className: "dialog__body" })`
  margin-top: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

// Buttons split the width evenly, on every screen size. Long labels wrap instead of overflowing.
const Actions = styled.div.attrs({ className: "dialog__actions" })`
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
`;

// Modal built on the native <dialog>: the browser traps focus, closes it on Escape, makes the
// page behind inert and returns focus to the trigger. Clicking the backdrop also closes it.
export default function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions: ReactNode;
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
    <Panel
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click whose target is the <dialog> itself landed on the backdrop, outside the panel.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Title id={titleId}>{title}</Title>
      <Body>{children}</Body>
      <Actions>{actions}</Actions>
    </Panel>
  );
}
