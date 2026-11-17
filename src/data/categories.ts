export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortTagline: string;
  intro: string;
  heroImage: string;
  accent: string;
  sortOrder: number;
  active: boolean;
  featuredDescription: string;
  keyCommodities: string[];
}

export const CATEGORIES: ProductCategory[] = [
  {
    id: "cat-spices",
    slug: "spices",
    name: "Spices",
    shortTagline: "High-Curcumin & Essential Oil Rich",
    intro: "Hand-harvested and lab-calibrated whole and powdered spices sourced directly from fertile coastal and hillside belts, processed under stringent moisture and volatile oil standards.",
    heroImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=80",
    accent: "#B8976A", // Gold accent
    sortOrder: 1,
    active: true,
    featuredDescription: "Single-origin whole spices, pulverized blends, and steam-sterilized lots calibrated for international food service and extraction industries.",
    keyCommodities: ["Turmeric (Curcuma longa)", "Tellicherry Black Pepper", "Guntur Red Chilli", "Green Cardamom", "Cumin Seeds"],
  },
  {
    id: "cat-vegetables",
    slug: "vegetables",
    name: "Vegetables",
    shortTagline: "Hydro-Cooled & Controlled Atmosphere",
    intro: "Field-fresh vegetables graded within 4 hours of harvest, pre-cooled and packaged under modified atmosphere packaging (MAP) to preserve crispness and shelf life across long ocean transits.",
    heroImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80",
    accent: "#1F7A8C", // Teal accent
    sortOrder: 2,
    active: true,
    featuredDescription: "Uniformly graded farm-gate vegetables with monitored temperature trails from packing house to destination reefers.",
    keyCommodities: ["Fresh Red Onions", "Tender Okra (Ladyfinger)", "Premium Drumsticks (Moringa)", "Green Chillies", "G4 Garlic"],
  },
  {
    id: "cat-fruits",
    slug: "fruits",
    name: "Fruits",
    shortTagline: "Global-GAP Certified Orchards",
    intro: "Sun-ripened tropical and subtropical fruits packed with hot water immersion and ethylene-scrubbed sea containers ensuring optimal sugar-to-acid balance upon port arrival.",
    heroImage: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1600&q=80",
    accent: "#CFE8EF", // Foam accent
    sortOrder: 3,
    active: true,
    featuredDescription: "Export-grade tropical fruits with brix-level testing, residue monitoring, and protective palletisation.",
    keyCommodities: ["Alphonso & Kesar Mangoes", "Cavendish Bananas (G9)", "Bhagwa Pomegranates", "Table Grapes", "Fresh Papaya"],
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return CATEGORIES.find((cat) => cat.slug.toLowerCase() === slug.toLowerCase());
}
