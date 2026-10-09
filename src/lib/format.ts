// Formatting for UI text, in Spanish (Mexico) and Mexican pesos.
import { LOCALE } from "./constants";

const priceFormat = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: "long" });
const dayFormat = new Intl.DateTimeFormat(LOCALE, { day: "numeric" });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: "short" });
const timeFormat = new Intl.DateTimeFormat(LOCALE, { hour: "numeric", minute: "2-digit" });

export const formatPrice = (pesos: number) => priceFormat.format(pesos);

export const formatWeekday = (date: Date) => weekdayFormat.format(date);

export const formatDay = (date: Date) => dayFormat.format(date);

export const formatMonth = (date: Date) => monthFormat.format(date).replace(".", "");

export const formatTime = (date: Date) => timeFormat.format(date);

// Non-breaking spaces keep a duration on one line ("1 h 30 min" never splits).
export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const text = hours === 0 ? `${rest} min` : rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
  return text.replaceAll(" ", "\u00a0");
}

// Mexican 10-digit phone, grouped for reading: "55 1234 5678". Other lengths are shown as-is.
export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10
    ? `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`
    : phone;
}
