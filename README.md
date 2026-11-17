# IAE Global Agro-Exports — Phase 1 Exporter Platform

A cinematic, responsive B2B international exporter web platform designed for global food manufacturers, wholesalers, and supermarket import partners. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and data-driven commodity architectures.

---

## 1. Quick Start & Run Commands

```bash
# Install dependencies (Node.js >= 18.18 recommended)
npm install

# Run local development server
npm run dev

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

The application runs on `http://localhost:3000`.

---

## 2. Brand Design System Tokens

The application strictly implements the design token architecture defined in the specification brief:

### Color Palette (CSS Variables & Tailwind Config)
| Token | Hex Value | Semantic Usage |
|---|---|---|
| **Abyss** | `#061423` | Deepest water, footer, dark media scenes |
| **Navy** | `#0C1A2A` | Primary dark surface, root background, sticky navbar |
| **Deep** | `#152A40` | Cards, dark panels, divider borders |
| **Ocean** | `#12446B` | Mid-water accents and radial narrative gradients |
| **Teal** | `#1F7A8C` | Accents, active focus details, trade route lines |
| **Foam** | `#CFE8EF` | Light water highlights, high-contrast readable text |
| **Cream** | `#F7F3EC` | Editorial headline text, primary contrast surface |
| **Gold** | `#B8976A` | Premium accent, eyebrow labels (`0.18em` tracking), fine rules |

### Typography
- **Headings**: `Cormorant Garamond` (Weights: 300, 400, 500, 600, 700) — fluid clamp sizing.
- **Body & UI**: `Outfit` (Weights: 300, 400, 500, 600) — clean legibility.
- **Eyebrow Micro-labels**: `Outfit`, `11px`, `uppercase`, `tracking-eyebrow` (`0.18em`), gold.

---

## 3. Key Architectural Features & Implemented Routes

### Navigation & Global Shell
- **Three-Part Alignment Grid**: Left-aligned brand logo/wordmark, **strictly centered** navigation links (`Home · About · Products · Quality · Export Process · Contact`), and right-aligned **Download Portfolio** button.
- **Scroll Transition**: Header starts transparent over the hero and smoothly blurs to a frosted navy glass on scroll.
- **Substantial Abyss Footer**: Features brand positioning, dynamic category links, buyer resources, verified trade desk contacts, and back-to-top control.

### Entry Loader Experience (`src/components/motion/EntryLoader.tsx`)
- Full-screen nautical scene with animated container route progression.
- Rotating understated trade copy ("From origin to destination", "Quality handled with care at every milestone", etc.).
- Auto-skips on repeat navigation within the session via `sessionStorage` and honors `prefers-reduced-motion`. Includes a 3.5s safety fallback so users are never trapped.

### Homepage Flow (`src/app/page.tsx`)
1. **01 — Hero**: Cinematic ocean vessel video, poster fallback, visible play/pause toggle, dark scrim gradient, headline, and primary CTAs (*Explore Products*, *Download Portfolio*).
2. **02 — Category Tiles**: Three editorial tiles for Spices, Vegetables, and Fruits with direct routing.
3. **03 — From Origin to Port**: 6-stage interactive narrative showing sourcing, optical grading, cold packing, documentation, port cranes, and ocean transit.
4. **04 — Featured Products**: Data-driven product cards with specification snippets and direct quote triggers.
5. **05 — Quality & Trust**: Scientific testing pillars (HPLC, GC-MS/MS pesticide MRLs, continuous reefer datalogging) and audited standard cards (APEDA, FSSAI, GlobalGAP, US-FDA, ISO 22000, Phytosanitary).
6. **06 — Global Reach**: Interactive maritime discharge port selector (Rotterdam, Jebel Ali, Singapore, New York, London Gateway) displaying verified transit times and handling volumes.
7. **07 — Brand Film Showcase**: 52-second documentary viewer with play/pause, volume toggle, and synchronized captions.
8. **08 — Enquiry CTA**: Calm harbour backdrop with direct container quotation triggers.

### Complete Route Map
| Route | Content & Functionality |
|---|---|
| `/` | Homepage full narrative sequence |
| `/about` | Corporate background, ocean-first philosophy, physical packhouse & cold hub infrastructure |
| `/products` | Complete portfolio overview with real-time category filtering and live search |
| `/products/[category]` | Dedicated category landing pages (`/products/spices`, `/products/vegetables`, `/products/fruits`) |
| `/products/[category]/[slug]` | Detailed product specifications, packaging options, MOQ, seasonality calendar, and quote trigger |
| `/quality` | Multi-stage inspection protocol, laboratory assay thresholds, and audited certificate cards |
| `/export-process` | 6-stage operational timeline from farmgate procurement to port handover, including IncoTerms 2020 guide |
| `/contact` | Verified commercial contact channels and interactive quotation/sample request form |
| `/sitemap.xml` | Dynamically generated SEO sitemap covering all static & dynamic product routes |
| `/robots.txt` | Standard search crawler rules |

---

## 4. How to Add New Products & Categories (Data-First Architecture)

All product and category data is centralized in typed data files. **No layout or UI code needs to be modified when adding new commodities.**

### Adding a New Product
Open `src/data/products.ts` and append a new record to the `PRODUCTS` array:

```typescript
{
  id: "prod-cardamom",
  slug: "green-cardamom",
  name: "Alleppey Green Extra Bold Cardamom (AGEB)",
  category: "spices", // "spices" | "vegetables" | "fruits"
  shortDescription: "8mm+ hand-picked deep green pods with high volatile oil concentration.",
  description: "Detailed description of the botanical origin, curing process, and export grading...",
  image: "https://images.unsplash.com/...", // Or local path /images/products/...
  origin: "Idukki Hills, Kerala, India",
  grade: "AGEB (>8mm diameter)",
  packaging: "10kg master cartons with food-grade vacuum poly liner",
  moq: "1 x 20ft FCL (~10 Metric Tonnes) or Air shipment",
  seasonMonths: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  storageTemp: "Cool dry warehouse (15°C - 20°C, <65% RH)",
  shelfLife: "24 months in vacuum seal",
  containerLoading: "10 MT in 20ft dry container",
  downloadableSheet: "/documents/specs/green-cardamom-spec-sheet.pdf",
  featured: true, // Will automatically show on Homepage Featured section
  status: "available",
  isDemo: false,
  specification: {
    "Volatile Oil": "6.0% – 8.0% v/w min",
    "Moisture": "< 11.0% max",
    "Color Value": "Uniform Deep Emerald",
    "Empty Pods": "< 1.0% max",
  },
}
```

Once saved:
- The product automatically appears on `/products`.
- It appears under its category page `/products/spices`.
- Its individual detail page `/products/spices/green-cardamom` is generated automatically.
- It appears in the quotation dropdown on `/contact`.

### Adding a New Category
Open `src/data/categories.ts` and add a new entry to `CATEGORIES`:

```typescript
{
  id: "cat-pulses",
  slug: "pulses",
  name: "Grains & Pulses",
  shortTagline: "Machine Cleaned & De-stoned",
  intro: "Export-grade whole pulses, chickpeas, and non-GMO grains...",
  heroImage: "https://images.unsplash.com/...",
  accent: "#B8976A",
  sortOrder: 4,
  active: true,
  featuredDescription: "Bulk agri-commodities...",
  keyCommodities: ["Kabuli Chickpeas", "Pigeon Peas", "Mung Beans"],
}
```

The category page `/products/pulses` will resolve automatically, appear in the navigation, category tiles, and footer.

---

## 5. Replacing Media Assets & Portfolio Document

### Replacing the Company Portfolio PDF
Place your final corporate brochure PDF at:
```
public/documents/company-portfolio.pdf
```
Both the top navbar "Download Portfolio" button and the footer link point directly to this file. A clean sample PDF is currently in place.

### Replacing Hero Video and Poster
1. Place your MP4 video in `public/video/hero-ocean.mp4`.
2. Place the video poster in `public/images/hero-poster.jpg`.
3. In `src/components/media/CinematicHeroVideo.tsx`, update the `<video>` `src` and `poster` attributes.

---

## 6. Business Content & Verification Checklist (Pending Client Data)

As stipulated in the design brief, demo records and placeholder addresses are clearly marked so that no unverified claims or fake statistics are presented:

- [ ] **Official Company Name & Legal Registration**: Confirm registered legal entity name and corporate identification number (CIN/IEC).
- [ ] **Corporate Logo Vector**: Replace the default `IAE` monogram with the client's official SVG vector brand mark.
- [ ] **Confirmed Portfolio PDF**: Replace `public/documents/company-portfolio.pdf` with the client's signed corporate marketing dossier.
- [ ] **Verified Contact Information**: Update phone numbers, sales desk emails, registered corporate address, and packhouse address in `src/data/site.ts`.
- [ ] **Official Registration Certificates**: Confirm APEDA, FSSAI, GlobalGAP, US-FDA, and ISO registration numbers and validity periods.
- [ ] **Real Production Footage**: Replace stock video clips with client-recorded sorting, packing, and container loading footage.
- [ ] **Production Email Integration**: Connect Resend or SMTP credentials to `/api/enquiry` when email distribution is activated.
