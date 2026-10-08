import type { Business, BusinessCategory, DayHours, Weekday, WeeklyHours } from "@/types/business";
import { createId } from "./id";
import { createLocalStore } from "./localStore";

export const BUSINESS_CATEGORIES: { value: BusinessCategory; label: string }[] = [
  { value: "salon", label: "Salón de belleza" },
  { value: "barbershop", label: "Barbería" },
  { value: "spa", label: "Spa" },
];

export function categoryLabel(category: BusinessCategory | null) {
  return BUSINESS_CATEGORIES.find((option) => option.value === category)?.label ?? null;
}

export const WEEKDAYS: { value: Weekday; label: string }[] = [
  { value: "monday", label: "Lunes" },
  { value: "tuesday", label: "Martes" },
  { value: "wednesday", label: "Miércoles" },
  { value: "thursday", label: "Jueves" },
  { value: "friday", label: "Viernes" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
];

// Starting hours for a new business: weekdays 9 to 7, Saturday morning, Sunday closed.
export function defaultHours(): WeeklyHours {
  const weekday: DayHours = { open: true, from: "09:00", to: "19:00" };
  return {
    monday: { ...weekday },
    tuesday: { ...weekday },
    wednesday: { ...weekday },
    thursday: { ...weekday },
    friday: { ...weekday },
    saturday: { open: true, from: "09:00", to: "14:00" },
    sunday: { open: false, from: "09:00", to: "14:00" },
  };
}

// The businesses managed in this browser, oldest first.
export const businessesStore = createLocalStore<Business[]>({
  key: "pik:businesses",
  empty: [],
  validate: (value) =>
    Array.isArray(value)
      ? value.map(normalizeBusiness).filter((business) => business !== null)
      : null,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isTime = (value: unknown): value is string =>
  typeof value === "string" && /^\d{2}:\d{2}$/.test(value);

function normalizeHours(value: unknown): WeeklyHours {
  const hours = defaultHours();
  if (!isRecord(value)) return hours;
  for (const { value: day } of WEEKDAYS) {
    const stored = value[day];
    if (
      isRecord(stored) &&
      typeof stored.open === "boolean" &&
      isTime(stored.from) &&
      isTime(stored.to)
    ) {
      hours[day] = { open: stored.open, from: stored.from, to: stored.to };
    }
  }
  return hours;
}

// Checks a stored business and fills fields added after it was saved (location, hours), so
// older data keeps working. Returns null when the core fields are missing or wrong.
function normalizeBusiness(value: unknown): Business | null {
  if (!isRecord(value)) return null;
  const v = value;
  if (
    typeof v.id !== "string" ||
    typeof v.name !== "string" ||
    !(v.category === null || BUSINESS_CATEGORIES.some((option) => option.value === v.category)) ||
    typeof v.phone !== "string" ||
    typeof v.touched !== "boolean" ||
    typeof v.createdAt !== "string"
  ) {
    return null;
  }
  const location = isRecord(v.location) ? v.location : {};
  return {
    id: v.id,
    name: v.name,
    category: v.category as BusinessCategory | null,
    phone: v.phone,
    location: {
      address: typeof location.address === "string" ? location.address : "",
      city: typeof location.city === "string" ? location.city : "",
    },
    hours: normalizeHours(v.hours),
    touched: v.touched,
    createdAt: v.createdAt,
  };
}

const readBusinesses = () => businessesStore.parse(businessesStore.readRaw());

// The newest business that hasn't been edited yet, if any. While it exists, no new business
// can be added.
export function findUntouched(businesses: Business[]) {
  const last = businesses.at(-1);
  return last && !last.touched ? last : null;
}

// Next placeholder number: one past both the count and the highest "Negocio N" in use, so a
// deletion never produces a duplicate name.
function nextPlaceholderNumber(businesses: Business[]) {
  const used = businesses.map((business) =>
    Number(/^Negocio (\d+)$/.exec(business.name)?.[1] ?? 0),
  );
  return Math.max(businesses.length, ...used) + 1;
}

// Adds a placeholder business ("Negocio 3") and returns it.
export function addBusiness(): Business {
  const businesses = readBusinesses();
  const business: Business = {
    id: createId(),
    name: `Negocio ${nextPlaceholderNumber(businesses)}`,
    category: null,
    phone: "",
    location: { address: "", city: "" },
    hours: defaultHours(),
    touched: false,
    createdAt: new Date().toISOString(),
  };
  businessesStore.write([...businesses, business]);
  return business;
}

// Saves edited settings. Any save marks the business as touched.
export function updateBusiness(id: string, changes: Pick<Business, "name" | "category" | "phone">) {
  businessesStore.write(
    readBusinesses().map((business) =>
      business.id === id ? { ...business, ...changes, touched: true } : business,
    ),
  );
}

export function deleteBusiness(id: string) {
  businessesStore.write(readBusinesses().filter((business) => business.id !== id));
}
