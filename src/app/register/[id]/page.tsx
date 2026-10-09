import type { Metadata } from "next";
import BusinessSettings from "./_components/BusinessSettings";

export const metadata: Metadata = {
  title: "Configuración del negocio · PIK",
};

// The id is only known at request time, so awaiting it suspends; loading.tsx is the Suspense
// boundary that lets the page shell prerender while the settings stream in.
export default async function BusinessSettingsPage({ params }: PageProps<"/register/[id]">) {
  const { id } = await params;

  return <BusinessSettings id={id} />;
}
