import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = { title: "Registra tu negocio · PIK" };

export default function RegisterPage() {
  return (
    <PagePlaceholder
      title="Registra tu negocio"
      description="Configura tu negocio, ubicación, horario, servicios y equipo."
    />
  );
}
