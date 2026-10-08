import type { Business, BusinessCategory } from "@/types/business";
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

// The businesses managed in this browser, oldest first.
export const businessesStore = createLocalStore<Business[]>({
  key: "pik:businesses",
  empty: [],
  validate: (value) => (Array.isArray(value) ? value.filter(isBusiness) : null),
});

function isBusiness(value: unknown): value is Business {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    (v.category === null || BUSINESS_CATEGORIES.some((option) => option.value === v.category)) &&
    typeof v.phone === "string" &&
    typeof v.touched === "boolean" &&
    typeof v.createdAt === "string"
  );
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
