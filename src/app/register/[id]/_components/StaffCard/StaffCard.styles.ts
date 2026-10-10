"use client";

import styled from "styled-components";
import { errorTextStyles } from "@/components/fields/Field.styles";
import FormCard from "../FormCard/FormCard";

// Wraps FormCard so the staff parts below (and the add button in the card's title row) can be
// styled from one place.
export const StaffCardWrapper = styled(FormCard)`
  .staff-card {
    /* Just the "+" on phones; the label shows from md. */
    &__add {
      width: 40px;
      padding: 0;

      ${({ theme }) => theme.media.md} {
        width: auto;
        padding: 0 ${({ theme }) => theme.space.lg};
      }
    }

    &__add-label {
      display: none;

      ${({ theme }) => theme.media.md} {
        display: inline;
      }
    }

    &__list {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xs};
      list-style: none;
    }

    /* Like the other settings rows: who on the left, the edit cue on the right. */
    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.space.lg};
      min-height: 56px;
      padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
      margin-inline: -${({ theme }) => theme.space.md}; /* text lines up with the card content */
      width: calc(100% + 2 * ${({ theme }) => theme.space.md});
      border: none;
      border-radius: ${({ theme }) => theme.radii.sm};
      background: none;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;

      &:hover {
        background: ${({ theme }) => theme.colors.surface};
      }

      &:focus-visible {
        outline: none;
        box-shadow: ${({ theme }) => theme.shadows.focusRing};
      }
    }

    &__person {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.xxs};
      min-width: 0;
    }

    &__name-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: ${({ theme }) => theme.space.sm};
    }

    &__pending {
      padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.attention};
      color: ${({ theme }) => theme.palette.white}; /* by design choice; ~3.2:1 on flama */
      font-size: 0.75rem;
      font-weight: 600;
    }

    &__name {
      font-size: 0.9375rem;
      font-weight: 600;
    }

    &__role {
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.8125rem;
    }

    &__edit {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.xs};
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 0.875rem;
      font-weight: 600;
    }

    /* Under a row: an unedited member, or a role that doesn't fit the picked category. */
    &__error {
      ${errorTextStyles}
      padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md} 0`};
    }

    &__empty {
      grid-column: 1 / -1;
      color: ${({ theme }) => theme.colors.muted};
      font-size: 0.875rem;
    }
  }
`;
