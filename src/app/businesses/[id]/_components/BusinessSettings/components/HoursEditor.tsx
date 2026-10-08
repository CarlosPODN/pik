"use client";

import clsx from "clsx";
import styled from "styled-components";
import { controlStyles, FieldError } from "@/components/fieldStyles";
import { WEEKDAYS } from "@/lib/businesses";
import type { DayHours, Weekday, WeeklyHours } from "@/types/business";

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
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

// Phones: the day toggle, then its times below. From md: toggle and times on one line.
const Day = styled.li.attrs<{ $open: boolean }>(({ $open }) => ({
  className: clsx("hours-editor__day", { "hours-editor__day--closed": !$open }),
}))<{ $open: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.sm}`};

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => theme.space.md};
    grid-template-columns: 160px minmax(0, 1fr);
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const Toggle = styled.label.attrs({ className: "hours-editor__toggle" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 44px; /* comfortable touch target */
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
  gap: ${({ theme }) => theme.space.xs};
`;

const TimeRow = styled.div.attrs({ className: "hours-editor__time-row" })`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  max-width: 340px;
`;

const TimeInput = styled.input.attrs({ type: "time", className: "hours-editor__time" })<{
  $invalid: boolean;
}>`
  ${controlStyles}
  min-width: 0;
  padding-inline: ${({ theme }) => theme.space.sm}; /* room for "09:00 a.m." on small phones */

  /* Chrome draws a clock icon inside the box; on narrow screens it pushes "a.m./p.m." out of
     view. Phones open their own picker on tap, so the icon only shows from md. */
  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    &::-webkit-calendar-picker-indicator {
      display: block;
    }
  }
`;

const Separator = styled.span.attrs({ className: "hours-editor__separator" })`
  color: ${({ theme }) => theme.colors.muted};
`;

const WeekError = styled(FieldError).attrs({ className: "hours-editor__error" })`
  margin-top: ${({ theme }) => theme.space.xs};
`;

const Closed = styled.span.attrs({ className: "hours-editor__closed" })`
  color: ${({ theme }) => theme.colors.muted};
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
                    <Separator>a</Separator>
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
