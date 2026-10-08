import type { Metadata } from "next";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import BusinessSettings from "./_components/BusinessSettings/BusinessSettings";

export const metadata: Metadata = {
  title: "Configuración del negocio · PIK",
};

// The id is only known at request time, so it's read inside Suspense: the page shell
// prerenders and the settings stream in. The business itself lives in localStorage, so the
// client component loads it.
export default function BusinessSettingsPage({ params }: PageProps<"/register/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ id }) => (
        <BusinessSettings id={id} />
      ))}
    </Suspense>
  );
}
