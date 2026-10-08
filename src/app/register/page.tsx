import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Register your business · PIK" };

export default function RegisterPage() {
  return (
    <PagePlaceholder
      title="Register your business"
      description="Set up your business, location, hours, services and staff."
    />
  );
}
