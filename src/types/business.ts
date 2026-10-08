export type BusinessCategory = "salon" | "barbershop" | "spa";

// A business the person manages. New businesses start as a placeholder ("Negocio 2") with
// touched = false; saving its settings once sets touched, which unlocks adding the next one.
export interface Business {
  id: string;
  name: string;
  category: BusinessCategory | null;
  phone: string;
  touched: boolean;
  createdAt: string;
}
