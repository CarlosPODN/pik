"use client";

import styled from "styled-components";

// The form holds the first two cards. The staff card sits between it and the footer but outside
// it (its modal has its own form, and forms can't nest), so the buttons use form={formId}.
export const BusinessFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  .business-form {
    &__form {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.lg};
    }

    /* Full-width row under the phone for the delete action. */
    &__danger {
      grid-column: 1 / -1;
    }

    &__success {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.sm};
      margin-bottom: ${({ theme }) => theme.space.lg};
      padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
      border-radius: ${({ theme }) => theme.radii.sm};
      background: ${({ theme }) => theme.colors.success};
      color: ${({ theme }) => theme.colors.onSuccess};
      font-size: 0.875rem;
      font-weight: 600;
    }

    &__actions {
      display: flex;
      flex-direction: column-reverse;
      gap: ${({ theme }) => theme.space.sm};

      ${({ theme }) => theme.media.md} {
        flex-direction: row;
        justify-content: flex-end;
      }
    }
  }
`;
