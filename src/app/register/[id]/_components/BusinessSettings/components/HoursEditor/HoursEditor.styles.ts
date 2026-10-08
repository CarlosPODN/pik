"use client";

import styled from "styled-components";
import { controlStyles, errorTextStyles } from "@/components/fields/Field.styles";

// Height of the times line and of "Cerrado", so both take the same space.
const TIME_SLOT_HEIGHT = "44px";

export const HoursEditorWrapper = styled.fieldset`
  grid-column: 1 / -1;
  min-width: 0;
  border: none;

  .hours-editor {
    &__legend {
      margin-bottom: ${({ theme }) => theme.space.sm};
      font-size: 0.875rem;
      font-weight: 600;
    }

    &__days {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.sm};
      list-style: none;
    }

    &__toggle {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.sm};
      min-height: 44px; /* comfortable touch target */
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
    }

    &__times {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: ${({ theme }) => theme.space.xs};
      flex-basis: 100%;

      ${({ theme }) => theme.media.md} {
        flex-basis: auto;
      }
    }

    &__time-row {
      display: flex;
      height: ${TIME_SLOT_HEIGHT};
      align-items: center;
      gap: ${({ theme }) => theme.space.sm};
      width: 100%;

      ${({ theme }) => theme.media.md} {
        width: auto;
      }
    }

    /* Short line joining the opening and closing time. */
    &__connector {
      flex-shrink: 0;
      width: 16px;
      height: 2px;
      border-radius: 1px;
      background: ${({ theme }) => theme.colors.muted};
    }

    /* A day's error (under its times) and the week's error (under the list). */
    &__day-error,
    &__error {
      ${errorTextStyles}
    }

    &__error {
      margin-top: ${({ theme }) => theme.space.xs};
    }

    /* Takes the times' place, at the same fixed height, so toggling a day doesn't shift the list.
       Phones: a dashed box on the times' line. From md: plain text on the right. */
    &__closed {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-basis: 100%;
      height: ${TIME_SLOT_HEIGHT};
      border: 1px dashed ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.radii.sm};
      color: ${({ theme }) => theme.colors.muted};

      ${({ theme }) => theme.media.md} {
        justify-content: flex-end;
        flex-basis: auto;
        border: none;
      }
    }

    /* Like the "Eliminar negocio" row: day on the left, its times on the right. On phones the
       times wrap under the day and fill the width. */
    &__day {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      column-gap: ${({ theme }) => theme.space.lg};
      row-gap: ${({ theme }) => theme.space.xs};
    }

    &__checkbox {
      width: 20px;
      height: 20px;
      accent-color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
    }

    &__time {
      ${controlStyles}
      flex: 1;
      height: 100%;
      min-width: 0;
      padding-inline: ${({ theme }) => theme.space.sm}; /* room for "09:00 a.m." on small phones */

      /* Chrome draws a clock icon inside the box; on narrow screens it pushes "a.m./p.m." out of
         view. Phones open their own picker on tap, so the icon only shows from md. */
      &::-webkit-calendar-picker-indicator {
        display: none;
      }

      ${({ theme }) => theme.media.md} {
        flex: none;
        width: 148px;

        &::-webkit-calendar-picker-indicator {
          display: block;
        }
      }
    }
  }
`;
