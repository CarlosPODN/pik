import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./_components/Providers";
import SessionAppShell from "./_components/SessionAppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIK",
  description: "Reservas y pagos para negocios de belleza y bienestar",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <SessionAppShell>{children}</SessionAppShell>
        </Providers>
      </body>
    </html>
  );
}
