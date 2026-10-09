"use client";

import clsx from "clsx";
import { WEEKDAYS } from "@/lib/constants";
import type { DayHours, Weekday, WeeklyHours } from "@/types/business";
import { HoursEditorWrapper } from "./HoursEditor.styles";

export interface HoursEditorProps {
  /** The week's hours, Monday to Sunday. */
  hours: WeeklyHours;
  /** Called with a day and its new hours when its checkbox or a time changes. */
  onChange: (day: Weekday, value: DayHours) => void;
  /** Error for the week as a whole, e.g. no day open. The first checkbox carries it for focus. */
  error?: string;
  /** Errors for single days, e.g. closing before opening. */
  dayErrors: Partial<Record<Weekday, string>>;
}

/**
 * The weekly opening hours, as a `<fieldset>` with one row per weekday: a checkbox for open or
 * closed and, when open, its opening and closing time.
 *
 * ```tsx
 * <HoursEditor hours={values.hours} onChange={updateDay} error={errors.hours}
 *   dayErrors={dayErrors} />
 * ```
 *
 * **Layout**: on phones the times sit on their own line under the day; from `md`, on the same
 * row. Closed days show "Cerrado".
 *
 * **Styling**: BEM block `hours-editor`, modifier `hours-editor__day--closed`.
 */
export default function HoursEditor({ hours, onChange, error, dayErrors }: HoursEditorProps) {
  return (
    <HoursEditorWrapper
      className="hours-editor"
      aria-describedby={error ? "hours-editor-error" : undefined}
    >
      <legend className="hours-editor__legend">Horario de atención</legend>
      <ul className="hours-editor__days">
        {WEEKDAYS.map(({ value: day, label }, index) => {
          const dayHours = hours[day];
          const dayError = dayErrors[day];
          const errorId = `hours-editor-error-${day}`;
          const update = (changes: Partial<DayHours>) => onChange(day, { ...dayHours, ...changes });

          return (
            <li
              key={day}
              className={clsx("hours-editor__day", { "hours-editor__day--closed": !dayHours.open })}
            >
              <label className="hours-editor__toggle">
                <input
                  type="checkbox"
                  className="hours-editor__checkbox"
                  checked={dayHours.open}
                  onChange={(event) => update({ open: event.target.checked })}
                  // With no day open, the first checkbox carries the error so focus lands there.
                  aria-invalid={index === 0 && Boolean(error)}
                />
                {label}
              </label>
              {dayHours.open ? (
                <div className="hours-editor__times">
                  <div className="hours-editor__time-row">
                    <input
                      type="time"
                      className="hours-editor__time"
                      aria-label={`${label}, abre`}
                      value={dayHours.from}
                      onChange={(event) => update({ from: event.target.value })}
                      aria-invalid={Boolean(dayError)}
                    />
                    <span className="hours-editor__connector" aria-hidden="true" />
                    <input
                      type="time"
                      className="hours-editor__time"
                      aria-label={`${label}, cierra`}
                      value={dayHours.to}
                      onChange={(event) => update({ to: event.target.value })}
                      aria-invalid={Boolean(dayError)}
                      aria-describedby={dayError ? errorId : undefined}
                    />
                  </div>
                  {dayError && (
                    <p id={errorId} className="hours-editor__day-error">
                      {dayError}
                    </p>
                  )}
                </div>
              ) : (
                <div className="hours-editor__closed">Cerrado</div>
              )}
            </li>
          );
        })}
      </ul>
      {error && (
        <p className="hours-editor__error" id="hours-editor-error" role="alert">
          {error}
        </p>
      )}
    </HoursEditorWrapper>
  );
}
