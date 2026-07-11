import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Varela_Round } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { SealDefs } from "@/components/Seal";
import { BRAND } from "@/data/site";

// Three roles, no defaults (brand STD-001 §04).
const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });
const hebrew = Varela_Round({ subsets: ["hebrew", "latin"], weight: "400", variable: "--font-varela" });

export const metadata: Metadata = {
  title: `${BRAND.name} — The ${BRAND.descriptor}`,
  description: `${BRAND.tagline} ${BRAND.positioning}`,
  openGraph: {
    title: `${BRAND.name} — The ${BRAND.descriptor}`,
    description: BRAND.tagline,
    locale: "en",
    type: "website",
  },
};

export const viewport = { themeColor: "#ECEFE8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${display.variable} ${mono.variable} ${hebrew.variable}`}>
      <body>
        <SealDefs />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
