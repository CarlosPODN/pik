import type { BusinessCategory, StaffRole, Weekday } from "@/types/business";
import type { Role } from "@/types/session";

// Formatting for UI text, in Spanish (Mexico) and Mexican pesos.
export const LOCALE = "es-MX";

export const ROLES: readonly Role[] = ["client", "business"];

// How the app names the person in each role ("Te damos la bienvenida, Profesional.", "Usas PIK
// como Cliente"). The business side is "Profesional", so it doesn't repeat "negocio", which names
// the businesses themselves.
export const ROLE_LABELS: Record<Role, string> = {
  client: "Cliente",
  business: "Profesional",
};

export const BUSINESS_CATEGORIES: { value: BusinessCategory; label: string }[] = [
  { value: "salon", label: "Salón de belleza" },
  { value: "barbershop", label: "Barbería" },
  { value: "spa", label: "Spa" },
];

export const STAFF_ROLES: Record<StaffRole, string> = {
  stylist: "Estilista",
  colorist: "Colorista",
  manicurist: "Manicurista",
  makeupArtist: "Maquillista",
  barber: "Barbero",
  massageTherapist: "Masajista",
  esthetician: "Esteticista",
  receptionist: "Recepción",
};

// The roles a staff member can have in each kind of business.
export const ROLES_BY_CATEGORY: Record<BusinessCategory, StaffRole[]> = {
  salon: ["stylist", "colorist", "manicurist", "makeupArtist", "receptionist"],
  barbershop: ["barber", "receptionist"],
  spa: ["massageTherapist", "esthetician", "manicurist", "receptionist"],
};

export const WEEKDAYS: { value: Weekday; label: string }[] = [
  { value: "monday", label: "Lunes" },
  { value: "tuesday", label: "Martes" },
  { value: "wednesday", label: "Miércoles" },
  { value: "thursday", label: "Jueves" },
  { value: "friday", label: "Viernes" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
];
