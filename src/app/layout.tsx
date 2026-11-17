import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EntryLoader } from "@/components/motion/EntryLoader";
import { ScrollRevealProvider } from "@/components/motion/ScrollRevealProvider";
import { FloatingRFQDock } from "@/components/leads/FloatingRFQDock";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | International Agro-Commodity Exporter`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "B2B international exporter of laboratory-calibrated spices, hydro-cooled fresh vegetables, and Global-GAP certified tropical fruits with end-to-end cold chain sea freight.",
  keywords: [
    "spice exporter", "agricultural commodities export", "turmeric curcumin export",
    "black pepper TGSEB", "fresh onion sea freight", "alphonso mango exporter",
    "cavendish banana reefer", "B2B agro trading", "APEDA registered exporter",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} | Precision Agro-Exports`,
    description: "Direct origin provenance and certified ocean freight for global food manufacturing, wholesale, and supermarket import partners.",
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Animated particles layer rendered server-side — pure CSS orbs */}
        <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="orb orb-teal  w-[700px] h-[700px] -top-48 -left-32  opacity-60" style={{ animationDelay: "0s", animationDuration: "18s" }} />
          <div className="orb orb-gold  w-[500px] h-[500px] top-1/3 -right-40  opacity-40" style={{ animationDelay: "-6s", animationDuration: "22s" }} />
          <div className="orb orb-ocean w-[600px] h-[600px] bottom-0  left-1/4  opacity-50" style={{ animationDelay: "-12s", animationDuration: "26s" }} />
        </div>

        <EntryLoader />
        <ScrollRevealProvider />
        <Navbar />

        <main className="relative z-10 flex flex-col">
          {children}
        </main>

        <FloatingRFQDock />
        <Footer />
      </body>
    </html>
  );
}
