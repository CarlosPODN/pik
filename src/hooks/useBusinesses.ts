"use client";

import {
  addBusiness,
  addStaffMember,
  businessesStore,
  deleteBusiness,
  findUntouched,
  removeStaffMember,
  updateBusiness,
  updateStaffMember,
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
    addStaffMember,
    updateStaffMember,
    removeStaffMember,
  };
}
