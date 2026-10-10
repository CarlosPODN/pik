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

// A saved staff member. New ones start in the settings form as an unedited placeholder
// ("Empleado 2", no role yet) and can only be saved once edited, so a saved one always has a
// role; editing sets touched.
export interface StaffMember {
  id: string;
  name: string;
  // From the roles for the business category.
  role: StaffRole;
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
