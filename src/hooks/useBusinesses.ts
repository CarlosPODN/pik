"use client";

import {
  addBusiness,
  businessesStore,
  deleteBusiness,
  findUntouched,
  updateBusiness,
} from "@/lib/businesses";
import { useStoredValue } from "./useStoredValue";

export function useBusinesses() {
  const businesses = useStoredValue(businessesStore);

  return {
    businesses,
    untouched: findUntouched(businesses),
    addBusiness,
    updateBusiness,
    deleteBusiness,
  };
}
