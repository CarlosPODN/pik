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

export type StaffRole =
  | "stylist"
  | "colorist"
  | "manicurist"
  | "makeupArtist"
  | "barber"
  | "massageTherapist"
  | "esthetician"
  | "receptionist";

// Like businesses, a new staff member starts as an unedited placeholder ("Empleado 2");
// saving it once sets touched, which unlocks adding the next one.
export interface StaffMember {
  id: string;
  name: string;
  // null until picked; the options depend on the business category.
  role: StaffRole | null;
  touched: boolean;
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
