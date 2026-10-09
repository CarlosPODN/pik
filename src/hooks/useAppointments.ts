"use client";

import { useMemo } from "react";
import { addAppointment, appointmentsStore } from "@/lib/appointments";
import { useStoredValue } from "./useStoredValue";

// Appointments sorted by start time, soonest first.
export function useAppointments() {
  const stored = useStoredValue(appointmentsStore);
  const appointments = useMemo(
    () => [...stored].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)),
    [stored],
  );

  return { appointments, addAppointment };
}
