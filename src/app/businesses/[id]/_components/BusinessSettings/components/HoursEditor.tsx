"use client";

import clsx from "clsx";
import styled from "styled-components";
import { controlStyles, FieldError } from "@/components/fieldStyles";
import { WEEKDAYS } from "@/lib/businesses";
import type { DayHours, Weekday, WeeklyHours } from "@/types/business";

// Height of the times line and of "Cerrado", so both take the same space.
const TIME_SLOT_HEIGHT = "44px";

const Fieldset = styled.fieldset.attrs({ className: "hours-editor" })`
  grid-column: 1 / -1;
  min-width: 0;
  border: none;
`;

const Legend = styled.legend.attrs({ className: "hours-editor__legend" })`
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: 0.875rem;
  font-weight: 600;
`;

const Days = styled.ul.attrs({ className: "hours-editor__days" })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  list-style: none;
`;

// Like the "Eliminar negocio" row: day on the left, its times on the right. On phones the
// times wrap under the day and fill the width.
const Day = styled.li.attrs<{ $open: boolean }>(({ $open }) => ({
  className: clsx("hours-editor__day", { "hours-editor__day--closed": !$open }),
}))<{ $open: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  column-gap: ${({ theme }) => theme.space.lg};
  row-gap: ${({ theme }) => theme.space.xs};
`;

const Toggle = styled.label.attrs({ className: "hours-editor__toggle" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 44px; /* comfortable touch target */
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({ type: "checkbox", className: "hours-editor__checkbox" })`
  width: 20px;
  height: 20px;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const Times = styled.div.attrs({ className: "hours-editor__times" })`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.space.xs};
  flex-basis: 100%;

  ${({ theme }) => theme.media.md} {
    flex-basis: auto;
  }
`;

const TimeRow = styled.div.attrs({ className: "hours-editor__time-row" })`
  display: flex;
  height: ${TIME_SLOT_HEIGHT};
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  width: 100%;

  ${({ theme }) => theme.media.md} {
    width: auto;
  }
`;

const TimeInput = styled.input.attrs({ type: "time", className: "hours-editor__time" })<{
  $invalid: boolean;
}>`
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
`;

// Short line joining the opening and closing time.
const Connector = styled.span.attrs({ className: "hours-editor__connector" })`
  flex-shrink: 0;
  width: 16px;
  height: 2px;
  border-radius: 1px;
  background: ${({ theme }) => theme.colors.muted};
`;

const WeekError = styled(FieldError).attrs({ className: "hours-editor__error" })`
  margin-top: ${({ theme }) => theme.space.xs};
`;

// Takes the times' place, at the same fixed height, so toggling a day doesn't shift the list.
// Phones: a dashed box on the times' line. From md: plain text on the right.
const Closed = styled.div.attrs({ className: "hours-editor__closed" })`
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
`;

// One row per weekday: a checkbox for open/closed and, when open, its opening and closing time.
export default function HoursEditor({
  hours,
  onChange,
  error,
  dayErrors,
}: {
  hours: WeeklyHours;
  onChange: (day: Weekday, value: DayHours) => void;
  // For the week as a whole (no day open).
  error?: string;
  dayErrors: Partial<Record<Weekday, string>>;
}) {
  return (
    <Fieldset aria-describedby={error ? "hours-editor-error" : undefined}>
      <Legend>Horario de atención</Legend>
      <Days>
        {WEEKDAYS.map(({ value: day, label }, index) => {
          const dayHours = hours[day];
          const dayError = dayErrors[day];
          const errorId = `hours-editor-error-${day}`;
          const update = (changes: Partial<DayHours>) => onChange(day, { ...dayHours, ...changes });

          return (
            <Day key={day} $open={dayHours.open}>
              <Toggle>
                <Checkbox
                  checked={dayHours.open}
                  onChange={(event) => update({ open: event.target.checked })}
                  // With no day open, the first checkbox carries the error so focus lands there.
                  aria-invalid={index === 0 && Boolean(error)}
                />
                {label}
              </Toggle>
              {dayHours.open ? (
                <Times>
                  <TimeRow>
                    <TimeInput
                      aria-label={`${label}, abre`}
                      value={dayHours.from}
                      onChange={(event) => update({ from: event.target.value })}
                      $invalid={Boolean(dayError)}
                    />
                    <Connector aria-hidden="true" />
                    <TimeInput
                      aria-label={`${label}, cierra`}
                      value={dayHours.to}
                      onChange={(event) => update({ to: event.target.value })}
                      $invalid={Boolean(dayError)}
                      aria-invalid={Boolean(dayError)}
                      aria-describedby={dayError ? errorId : undefined}
                    />
                  </TimeRow>
                  {dayError && <FieldError id={errorId}>{dayError}</FieldError>}
                </Times>
              ) : (
                <Closed>Cerrado</Closed>
              )}
            </Day>
          );
        })}
      </Days>
      {error && (
        <WeekError id="hours-editor-error" role="alert">
          {error}
        </WeekError>
      )}
    </Fieldset>
  );
}
