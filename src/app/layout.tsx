import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const display = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.plocka.waw.pl"),
  // Keep Safari from modifying text nodes before React hydrates them.
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  title: "Przychodnia Weterynaryjna Płocka | Warszawa Wola",
  description:
    "Przychodnia Weterynaryjna Płocka, ul. Płocka 17/U5, 01-231 Warszawa. Telefon: 22 412 54 24.",
  openGraph: {
    title: "Przychodnia Weterynaryjna Płocka",
    description:
      "Przychodnia Weterynaryjna Płocka, Warszawa Wola. ul. Płocka 17/U5.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/assets/illustrations/hero-vet.webp",
        alt: "Przychodnia Weterynaryjna Płocka",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}