import type { Metadata } from "next";
import BusinessSettings from "./_components/BusinessSettings";

export const metadata: Metadata = {
  title: "Configuración del negocio · PIK",
};

// Reads the business id from the URL and hands it to the client component, which loads the
// business from localStorage.
export default async function BusinessSettingsPage({ params }: PageProps<"/register/[id]">) {
  const { id } = await params;

  return <BusinessSettings id={id} />;
}
