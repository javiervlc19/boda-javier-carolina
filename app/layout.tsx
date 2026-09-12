import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { wedding } from "@/data/wedding";
import "./globals.css";

const dateShort = wedding.weddingDate
  .split("-")
  .reverse()
  .join(".");
const pageTitle = `${wedding.couple.groom} & ${wedding.couple.bride} | ${dateShort}`;

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://javierycarol.com"),
  title: pageTitle,
  description:
    "Nos casamos. Aquí encontrarás toda la información sobre nuestra boda.",
  openGraph: {
    title: pageTitle,
    description:
      "Nos casamos. Aquí encontrarás toda la información sobre nuestra boda.",
    images: ["/images/og-image.jpg"],
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Nos casamos. Aquí encontrarás toda la información sobre nuestra boda.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
