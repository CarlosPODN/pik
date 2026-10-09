import type {
  Business,
  BusinessCategory,
  DayHours,
  StaffMember,
  StaffRole,
  WeeklyHours,
} from "@/types/business";
import { BUSINESS_CATEGORIES, ROLES_BY_CATEGORY, STAFF_ROLES, WEEKDAYS } from "./constants";
import { createId } from "./id";
import { createLocalStore } from "./localStore";

export function roleOptions(category: BusinessCategory | null) {
  return (category ? ROLES_BY_CATEGORY[category] : []).map((role) => ({
    value: role,
    label: STAFF_ROLES[role],
  }));
}

export const roleLabel = (role: StaffRole | null) => (role ? STAFF_ROLES[role] : null);

export function categoryLabel(category: BusinessCategory | null) {
  return BUSINESS_CATEGORIES.find((option) => option.value === category)?.label ?? null;
}

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

// Reads a stored role: a role key, or free text from before roles were a fixed list ("Estilista"),
// matched to its key. Anything else becomes null, to be picked again.
function parseRole(value: unknown): StaffRole | null {
  if (typeof value !== "string") return null;
  if (value in STAFF_ROLES) return value as StaffRole;
  const entry = Object.entries(STAFF_ROLES).find(
    ([, label]) => label.toLowerCase() === value.trim().toLowerCase(),
  );
  return entry ? (entry[0] as StaffRole) : null;
}

// Checks a stored staff member. Ones saved before `touched` existed count as edited once they
// have a role.
function normalizeStaffMember(value: unknown): StaffMember | null {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.name !== "string") {
    return null;
  }
  const role = parseRole(value.role);
  return {
    id: value.id,
    name: value.name,
    role,
    touched: typeof value.touched === "boolean" ? value.touched : role !== null,
  };
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
    staff: Array.isArray(v.staff)
      ? v.staff.map(normalizeStaffMember).filter((member) => member !== null)
      : [],
    touched: v.touched,
    createdAt: v.createdAt,
  };
}

const readBusinesses = () => businessesStore.parse(businessesStore.readRaw());

// The newest business (or staff member) that hasn't been edited yet, if any. While it exists,
// no new one can be added.
export function findUntouched<T extends { touched: boolean }>(items: T[]): T | null {
  const last = items.at(-1);
  return last && !last.touched ? last : null;
}

// Next placeholder number for names like "Negocio N" or "Empleado N": one past both the count
// and the highest number in use, so a deletion never produces a duplicate name.
function nextPlaceholderNumber(names: string[], prefix: string) {
  const pattern = new RegExp(`^${prefix} (\\d+)$`);
  const used = names.map((name) => Number(pattern.exec(name)?.[1] ?? 0));
  return Math.max(names.length, ...used) + 1;
}

// Adds a placeholder business ("Negocio 3") and returns it.
export function addBusiness(): Business {
  const businesses = readBusinesses();
  const business: Business = {
    id: createId(),
    name: `Negocio ${nextPlaceholderNumber(
      businesses.map((item) => item.name),
      "Negocio",
    )}`,
    category: null,
    phone: "",
    location: { address: "", city: "" },
    hours: defaultHours(),
    staff: [],
    touched: false,
    createdAt: new Date().toISOString(),
  };
  businessesStore.write([...businesses, business]);
  return business;
}

// Saves edited settings. Any save marks the business as touched.
export function updateBusiness(
  id: string,
  changes: Pick<Business, "name" | "category" | "phone" | "location" | "hours">,
) {
  businessesStore.write(
    readBusinesses().map((business) =>
      business.id === id ? { ...business, ...changes, touched: true } : business,
    ),
  );
}

export function deleteBusiness(id: string) {
  businessesStore.write(readBusinesses().filter((business) => business.id !== id));
}

// Staff changes save right away and don't affect `touched`: staff is optional for a business.
function updateStaff(businessId: string, update: (staff: StaffMember[]) => StaffMember[]) {
  businessesStore.write(
    readBusinesses().map((business) =>
      business.id === businessId ? { ...business, staff: update(business.staff) } : business,
    ),
  );
}

// Adds a placeholder staff member ("Empleado 2") to the business and returns it.
export function addStaffMember(businessId: string): StaffMember {
  const business = readBusinesses().find((item) => item.id === businessId);
  const names = business?.staff.map((member) => member.name) ?? [];
  const member: StaffMember = {
    id: createId(),
    name: `Empleado ${nextPlaceholderNumber(names, "Empleado")}`,
    role: null,
    touched: false,
  };
  updateStaff(businessId, (staff) => [...staff, member]);
  return member;
}

// Saves edited values. Any save marks the staff member as touched.
export function updateStaffMember(businessId: string, member: StaffMember) {
  updateStaff(businessId, (staff) =>
    staff.map((current) => (current.id === member.id ? { ...member, touched: true } : current)),
  );
}

export function removeStaffMember(businessId: string, memberId: string) {
  updateStaff(businessId, (staff) => staff.filter((member) => member.id !== memberId));
}
