"use client";

import type { Role } from "@/types/session";
import BusinessHome from "./components/BusinessHome";
import ClientHome from "./components/ClientHome";

// Home once a role is picked: clients see their appointments, businesses their businesses.
export default function Dashboard({ role }: { role: Role }) {
  return role === "client" ? <ClientHome /> : <BusinessHome />;
}
