import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EntryLoader } from "@/components/motion/EntryLoader";
import { ScrollRevealProvider } from "@/components/motion/ScrollRevealProvider";
import { FloatingRFQDock } from "@/components/leads/FloatingRFQDock";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FullScreenNavigationTransition } from "@/components/motion/FullScreenNavigationTransition";
import { CorporateBackground } from "@/components/layout/CorporateBackground";
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Preload Entry Videos so they are already cached before React mounts */}
        <link
          rel="preload"
          href="/video/entry_video_horizontal.mp4"
          as="video"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          href="/video/entry_video_vertical.mp4"
          as="video"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  window.scrollTo(0, 0);
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Full-Page Radiant Corporate Maritime Background System */}
        <CorporateBackground />

        {/* Animated particles layer rendered server-side — pure CSS orbs */}
        <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="orb orb-teal  w-[700px] h-[700px] -top-48 -left-32  opacity-35" style={{ animationDelay: "0s", animationDuration: "18s" }} />
          <div className="orb orb-gold  w-[500px] h-[500px] top-1/3 -right-40  opacity-25" style={{ animationDelay: "-6s", animationDuration: "22s" }} />
          <div className="orb orb-ocean w-[600px] h-[600px] bottom-0  left-1/4  opacity-30" style={{ animationDelay: "-12s", animationDuration: "26s" }} />
        </div>

        {/* Ambient Floating Luxury Gold Particles & Drifting Diamonds */}
        <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="floating-particle" style={{ top: '12%', left: '10%', ['--particle-dur' as any]: '16s', ['--particle-delay' as any]: '0s' }} />
          <div className="floating-particle" style={{ top: '38%', left: '88%', ['--particle-dur' as any]: '21s', ['--particle-delay' as any]: '-4s' }} />
          <div className="floating-particle" style={{ top: '65%', left: '22%', ['--particle-dur' as any]: '18s', ['--particle-delay' as any]: '-8s' }} />
          <div className="floating-particle" style={{ top: '28%', left: '72%', ['--particle-dur' as any]: '23s', ['--particle-delay' as any]: '-2s' }} />
          <div className="floating-particle" style={{ top: '82%', left: '52%', ['--particle-dur' as any]: '15s', ['--particle-delay' as any]: '-6s' }} />
          <div className="floating-diamond" style={{ top: '18%', left: '58%', ['--diamond-dur' as any]: '24s', ['--diamond-delay' as any]: '0s' }} />
          <div className="floating-diamond" style={{ top: '50%', left: '12%', ['--diamond-dur' as any]: '20s', ['--diamond-delay' as any]: '-5s' }} />
          <div className="floating-diamond" style={{ top: '78%', left: '84%', ['--diamond-dur' as any]: '26s', ['--diamond-delay' as any]: '-10s' }} />
        </div>

        <EntryLoader />
        <ScrollRevealProvider />
        <CustomCursor />
        <FullScreenNavigationTransition />
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
