import type { Metadata } from "next";
import BusinessList from "./_components/BusinessList/BusinessList";

export const metadata: Metadata = { title: "Registra tu negocio · PIK" };

export default function RegisterPage() {
  return <BusinessList />;
}
