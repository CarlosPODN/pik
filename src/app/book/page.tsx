import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Agenda una cita · PIK" };

export default function BookPage() {
  return (
    <PagePlaceholder
      title="Agenda una cita"
      description="Elige un servicio, quién te atiende y el horario que te acomode."
    />
  );
}
