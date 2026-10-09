import type { Appointment } from "@/types/appointment";
import { createLocalStore } from "./localStore";

// Appointments booked in this browser. Starts empty; the booking flow adds to it.
export const appointmentsStore = createLocalStore<Appointment[]>({
  key: "pik:appointments",
  empty: [],
  validate: (value) => (Array.isArray(value) ? value.filter(isAppointment) : null),
});

function isAppointment(value: unknown): value is Appointment {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.businessId === "string" &&
    typeof v.businessName === "string" &&
    typeof v.serviceName === "string" &&
    typeof v.staffName === "string" &&
    typeof v.clientName === "string" &&
    typeof v.startsAt === "string" &&
    !Number.isNaN(Date.parse(v.startsAt)) &&
    typeof v.durationMinutes === "number" &&
    typeof v.price === "number"
  );
}

export function addAppointment(appointment: Appointment) {
  const current = appointmentsStore.parse(appointmentsStore.readRaw());
  appointmentsStore.write([...current, appointment]);
}

// Appointments at a business that haven't started yet. A business with any can't be deleted.
export function countPendingAppointments(
  appointments: Appointment[],
  businessId: string,
  now: number,
) {
  return appointments.filter(
    (appointment) =>
      appointment.businessId === businessId && Date.parse(appointment.startsAt) > now,
  ).length;
}
