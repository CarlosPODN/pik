import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Book an appointment · PIK" };

export default function BookPage() {
  return (
    <PagePlaceholder
      title="Book an appointment"
      description="Choose a service, a professional and a time that works for you."
    />
  );
}
