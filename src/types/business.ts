export type BusinessCategory = "salon" | "barbershop" | "spa";

export interface BusinessLocation {
  address: string;
  city: string;
}

export type Weekday =
  "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

// Opening hours for one day. Times are "HH:MM" (24 h), so they compare as strings.
export interface DayHours {
  open: boolean;
  from: string;
  to: string;
}

export type WeeklyHours = Record<Weekday, DayHours>;

export interface StaffMember {
  id: string;
  name: string;
  role: string;
}

// A business the person manages. New businesses start as a placeholder ("Negocio 2") with
// touched = false; saving its settings once sets touched, which unlocks adding the next one.
export interface Business {
  id: string;
  name: string;
  category: BusinessCategory | null;
  phone: string;
  location: BusinessLocation;
  hours: WeeklyHours;
  staff: StaffMember[];
  touched: boolean;
  createdAt: string;
}
