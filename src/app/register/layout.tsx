import type { Metadata } from "next";

// The /register page is a client component (its businesses live in localStorage), and only
// Server Components can export metadata, so its title lives here. /register/[id] sets its own.
export const metadata: Metadata = { title: "Registra tu negocio · PIK" };

export default function RegisterLayout({ children }: LayoutProps<"/register">) {
  return children;
}
