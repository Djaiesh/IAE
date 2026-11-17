export interface ProductSpecification {
  [key: string]: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: "spices" | "vegetables" | "fruits";
  shortDescription: string;
  description: string;
  image: string;
  origin?: string;
  grade?: string;
  packaging?: string;
  moq?: string;
  seasonMonths?: string[];
  specification?: ProductSpecification;
  downloadableSheet?: string;
  featured: boolean;
  status: "available" | "seasonal" | "booking_open";
  isDemo: boolean;
  storageTemp?: string;
  shelfLife?: string;
  containerLoading?: string;
}

export const PRODUCTS: ProductItem[] = [
  // --- SPICES ---
  {
    id: "prod-turmeric",
    slug: "turmeric",
    name: "Alleppey Finger Turmeric",
    category: "spices",
    shortDescription: "High-curcumin whole fingers with golden-orange interior and polished outer cuticle.",
    description: "Alleppey Finger Turmeric is celebrated internationally for its elevated curcumin percentage (typically 4.5% to 5.5%), vibrant deep saffron hue, and rich oleoresin yield. Harvested from nutrient-rich coastal soil, mechanically cleaned, double-polished, and vacuum-sealed for maximum color and aroma retention.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80",
    origin: "Alleppey / Erode, India (Sample Data)",
    grade: "Grade A Polished Bulbs & Fingers",
    packaging: "25kg / 50kg PP bags with food-grade inner liner, or custom 500g vacuum pouches",
    moq: "1 x 20ft FCL (~18 Metric Tonnes)",
    seasonMonths: ["Jan", "Feb", "Mar", "Apr", "May"],
    storageTemp: "Ambient dry storage (18°C - 24°C, <60% RH)",
    shelfLife: "24 months when stored in original sealed packaging",
    containerLoading: "18 MT in 20ft dry container / 26 MT in 40ft container",
    downloadableSheet: "/documents/specs/turmeric-spec-sheet.pdf",
    featured: true,
    status: "available",
    isDemo: true,
    specification: {
      "Curcumin Content": "4.5% – 5.5% min by HPLC",
      "Moisture": "< 10.0% max",
      "Total Ash": "< 7.0% max",
      "Acid Insoluble Ash": "< 1.0% max",
      "Volatile Oil": "3.5% – 4.5% v/w min",
      "Extraneous Matter": "Nil / < 0.5% max",
      "Aflatoxin (B1+B2+G1+G2)": "< 10 ppb (EU standard)",
      "Pesticide Residue": "Conforms to EU / FDA MRL limits",
    },
  },
  {
    id: "prod-black-pepper",
    slug: "black-pepper",
    name: "Tellicherry Garbled Black Pepper (TGSEB)",
    category: "spices",
    shortDescription: "Hand-picked Tellicherry Extra Bold whole peppercorns (>4.75mm) with intense piperine aroma.",
    description: "Harvested from the Malabar coast, Tellicherry Garbled Special Extra Bold (TGSEB) represents the top tier of international pepper grading. Peppercorns are left to mature on the vine until yellow-orange ripeness, yielding an intricate floral pungency and deep black sun-dried texture.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80",
    origin: "Malabar Coast, India (Sample Data)",
    grade: "TGSEB (> 4.75 mm pinhead diameter)",
    packaging: "25kg multi-wall paper bags or jute sacks with poly liner",
    moq: "1 x 20ft FCL (~14 Metric Tonnes)",
    seasonMonths: ["Dec", "Jan", "Feb", "Mar"],
    storageTemp: "Cool, dry, shaded warehouse (<20°C, <65% RH)",
    shelfLife: "36 months in sealed dry packaging",
    containerLoading: "14 MT in 20ft container / 27 MT in 40ft container",
    downloadableSheet: "/documents/specs/black-pepper-spec-sheet.pdf",
    featured: true,
    status: "available",
    isDemo: true,
    specification: {
      "Bulk Density": "580 – 600 g/L",
      "Piperine Content": "5.0% – 6.5% min",
      "Volatile Oil": "2.0% – 3.0% v/w",
      "Moisture": "< 11.5% max",
      "Light Berries": "< 1.5% max",
      "Foreign Matter": "< 0.2% max",
    },
  },
  {
    id: "prod-chilli",
    slug: "chilli",
    name: "Guntur S4 / Sannam Dried Red Chilli",
    category: "spices",
    shortDescription: "Stemmed or stemless fiery red chillies with high ASTA color value and balanced capsaicin heat.",
    description: "Guntur Sannam (S4) chillies are prized across Southeast Asia, Europe, and the Middle East for their intense natural ruby red skin and consistent pungency ranging from 25,000 to 35,000 SHU. Cleaned, sorted by laser optical sorters, and fumigated under phytosanitary oversight.",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80",
    origin: "Guntur, Andhra Pradesh (Sample Data)",
    grade: "Grade 1 Stemless / With Stem, S4",
    packaging: "10kg / 25kg compressed jute bales or corrugated cartons",
    moq: "1 x 40ft HC FCL (~14 Metric Tonnes compressed)",
    seasonMonths: ["Feb", "Mar", "Apr", "May", "Jun"],
    storageTemp: "Cold storage maintained at 4°C - 8°C for color retention",
    shelfLife: "18 months cold stored",
    containerLoading: "14 MT in 40ft HC container",
    downloadableSheet: "/documents/specs/red-chilli-spec-sheet.pdf",
    featured: false,
    status: "available",
    isDemo: true,
    specification: {
      "Heat Level": "25,000 – 35,000 SHU (Scoville)",
      "Color Value (ASTA)": "60 – 80 ASTA units",
      "Moisture": "< 11.0% max",
      "Damaged & Discolored": "< 2.0% max",
      "Loose Seeds": "< 1.0% max",
      "Aflatoxin": "< 10 ppb (EU conformant)",
    },
  },

  // --- VEGETABLES ---
  {
    id: "prod-onion",
    slug: "onion",
    name: "Nashik Fresh Red Onions",
    category: "vegetables",
    shortDescription: "Firm, globe-shaped red onions with dry, tight outer papery skin and long shelf durability.",
    description: "Sourced directly from Nashik's renowned volcanic soil basin, these red onions are cured in ventilated farm sheds before mechanical size sorting. They feature strong pungency, high dry matter, and natural dormancy suited for 30-day ocean transit.",
    image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=1200&q=80",
    origin: "Nashik, Maharashtra (Sample Data)",
    grade: "45mm - 55mm / 55mm+ Export Select",
    packaging: "10kg, 20kg, 25kg Red Mesh leno bags or ventilated cartons",
    moq: "1 x 40ft Reefer Container (~28 Metric Tonnes)",
    seasonMonths: ["All Year", "Peak: Nov - Jun"],
    storageTemp: "0°C - 2°C in reefer with 65-70% RH and ventilation",
    shelfLife: "45 - 60 days under controlled reefer airflow",
    containerLoading: "28 MT on Euro-pallets in 40ft Reefer container",
    downloadableSheet: "/documents/specs/red-onion-spec-sheet.pdf",
    featured: true,
    status: "available",
    isDemo: true,
    specification: {
      "Diameter Sizing": "45mm - 55mm / 55mm - 65mm calibrated",
      "Total Soluble Solids": "12.0 - 14.5% Brix",
      "Dry Skin Layers": "Minimum 2 intact outer skins",
      "Decay / Soft Rots": "0.0% at packing",
      "Sprouting": "0.0% guaranteed dormancy",
    },
  },
  {
    id: "prod-okra",
    slug: "okra",
    name: "Tender Green Okra (Ladyfinger)",
    category: "vegetables",
    shortDescription: "Bright green, tender pods harvested before dawn, hydro-cooled and packed within 4 hours.",
    description: "Export-grade okra selected for tenderness, slender straight pods (7cm to 10cm), and absence of fibrous spine hardening. Pre-cooled immediately post-harvest to arrest respiration and packed in breathable micro-perforated food cartons.",
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=1200&q=80",
    origin: "Gujarat / Maharashtra, India (Sample Data)",
    grade: "Grade A Tender Export Quality (7 - 10 cm)",
    packaging: "4kg / 5kg telescopic corrugated boxes with foam sheet lining",
    moq: "Air freight: 1,000 kg / Reefer Sea: 1 x 20ft Reefer",
    seasonMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    storageTemp: "7°C - 9°C with 90-95% RH (Never below 7°C to prevent chilling injury)",
    shelfLife: "14 - 18 days under cold chain protocol",
    containerLoading: "Air LD3 containers or 40ft Reefer at 8°C",
    downloadableSheet: "/documents/specs/okra-spec-sheet.pdf",
    featured: false,
    status: "available",
    isDemo: true,
    specification: {
      "Pod Length": "7 cm to 10 cm uniform size",
      "Color": "Uniform deep emerald green",
      "Texture": "Crisp snap, zero fibrous stiffness",
      "Surface Blemish": "< 1% visual tolerance",
      "Pre-Cooling": "Forced air hydro-cooling to 8°C within 3 hrs",
    },
  },
  {
    id: "prod-drumstick",
    slug: "drumstick",
    name: "Moringa Oleifera Drumsticks",
    category: "vegetables",
    shortDescription: "Slender, dark green nutrient-dense pods rich in pulp, straight-graded without seed bulging.",
    description: "Cultivated from high-yield PKM-1 varieties, our Moringa pods are harvested at peak tender stage when the internal pulp is thick and seeds remain unhardened. Ideal for gourmet and ethnic retail shelves across Europe, the Gulf, and North America.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
    origin: "Tamil Nadu / Andhra Pradesh (Sample Data)",
    grade: "Grade 1 Slender Long (45cm - 60cm)",
    packaging: "5kg / 10kg ventilated corrugated cartons with protective paper wraps",
    moq: "1 x 20ft Reefer (~8 Metric Tonnes) or Air shipment",
    seasonMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Oct", "Nov", "Dec"],
    storageTemp: "10°C - 12°C with 85% RH",
    shelfLife: "21 days in controlled atmosphere packaging",
    containerLoading: "Custom palletised cartons in ventilated reefers",
    downloadableSheet: "/documents/specs/moringa-spec-sheet.pdf",
    featured: false,
    status: "available",
    isDemo: true,
    specification: {
      "Pod Length": "45 cm to 60 cm uniform",
      "Diameter": "1.5 cm to 2.2 cm",
      "Seed Development": "Tender, immature soft seeds",
      "Fiber Content": "Low pulp fiber ratio",
    },
  },

  // --- FRUITS ---
  {
    id: "prod-mango",
    slug: "mango",
    name: "GI Ratnagiri Alphonso Mango",
    category: "fruits",
    shortDescription: "The King of Mangoes: Golden-yellow saffron skin, fibreless velvety pulp, and intoxicating floral bouquet.",
    description: "Geographical Indication (GI) certified Alphonso mangoes from coastal laterite soil orchards. Every batch undergoes hot water treatment (HWT) or irradiation per importing nation phytosanitary protocol (US-APHIS, EU, Australia). Inspected individually for brix count and specific gravity.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80",
    origin: "Ratnagiri / Devgad, Maharashtra (Sample Data)",
    grade: "Export Class 1, Calibrated 220g - 260g",
    packaging: "3kg presentation box (9 to 12 pieces) with individual foam netting",
    moq: "Air freight: 1,500 kg / Reefer Sea: 1 x 40ft CA container",
    seasonMonths: ["Mar", "Apr", "May", "Jun"],
    storageTemp: "12°C - 13°C (Ripening delayed during transit)",
    shelfLife: "21 days under controlled CA transit (O2: 3%, CO2: 5%)",
    containerLoading: "Palletised boxes loaded in Controlled Atmosphere 40ft Reefer",
    downloadableSheet: "/documents/specs/alphonso-mango-spec-sheet.pdf",
    featured: true,
    status: "booking_open",
    isDemo: true,
    specification: {
      "Brix (Sweetness)": "18.0° – 22.0° Brix at eating ripeness",
      "Weight Range": "220g - 250g (Size 10) / 250g - 280g (Size 9)",
      "Phytosanitary Treatment": "Hot Water Immersion (48°C / 60 min) or Vapour Heat",
      "Flesh Texture": "100% fibreless, saffron orange",
      "Pesticide Residue": "EU & USDA MRL certified zero-tolerance compliance",
    },
  },
  {
    id: "prod-banana",
    slug: "banana",
    name: "Grand Nain (G9) Cavendish Bananas",
    category: "fruits",
    shortDescription: "Uniform green Cavendish clusters with high calipre thickness, vacuum-bagged for 35-day sea transit.",
    description: "Cultivated under drip irrigation and harvested at calibrated pulp maturity (grade 39 to 46 caliper). De-handed in chlorinated wash tanks, treated with food-grade alum against crown rot, and vacuum-sealed in Banavac polybags before pre-cooling.",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&q=80",
    origin: "Jalgaon / Gujarat, India (Sample Data)",
    grade: "Export Premium Grade A (4, 5, 6 Hands)",
    packaging: "13.5kg / 18.14kg Telescopic telescopic cartons with Banavac liner",
    moq: "1 x 40ft Reefer Container (~1,540 boxes / ~20.8 MT)",
    seasonMonths: ["All Year Round"],
    storageTemp: "13.2°C - 13.5°C constant temperature",
    shelfLife: "35 - 42 days green life in reefer transit",
    containerLoading: "1,540 boxes (13.5kg) on 20 pallets in 40ft High Cube Reefer",
    downloadableSheet: "/documents/specs/cavendish-banana-spec-sheet.pdf",
    featured: false,
    status: "available",
    isDemo: true,
    specification: {
      "Calibration (Thickness)": "39 mm – 46 mm",
      "Finger Length": "Minimum 18 cm (7 inches) outside curve",
      "Hands per Carton": "4, 5, 6 hands or cluster packed",
      "Pulp Temperature": "13.5°C set point",
      "Defects Tolerance": "Zero thrips marks, zero mechanical scars",
    },
  },
  {
    id: "prod-pomegranate",
    slug: "pomegranate",
    name: "Bhagwa Deep Red Pomegranates",
    category: "fruits",
    shortDescription: "Glossy deep-crimson rinds filled with soft-seeded, ruby-red juicy arils of high antioxidant density.",
    description: "Bhagwa is celebrated worldwide for its glossy cardinal red rind, soft edible seeds, and rich sweet juice devoid of bitter tannins. Sourced from Global-GAP certified orchards, washed, sorted by automatic weight-sorters, and packed in ventilated master cartons.",
    image: "https://images.unsplash.com/photo-1541344999736-83eca872f242?auto=format&fit=crop&w=1200&q=80",
    origin: "Solapur / Nashik, Maharashtra (Sample Data)",
    grade: "Grade Super / Grade A (200g - 350g+)",
    packaging: "3.5kg / 4.0kg net weight cartons with cell trays",
    moq: "1 x 40ft Reefer Container (~3,800 cartons / ~15 MT)",
    seasonMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    storageTemp: "5°C - 6°C with 90-95% RH",
    shelfLife: "60 - 75 days in refrigerated storage",
    containerLoading: "3,800 cartons in 40ft Reefer container",
    downloadableSheet: "/documents/specs/bhagwa-pomegranate-spec-sheet.pdf",
    featured: true,
    status: "available",
    isDemo: true,
    specification: {
      "Individual Weight": "200g - 250g (Count 14-16) / 250g - 300g (Count 12) / 300g+ (Count 10)",
      "TSS (Brix)": "15.5° – 16.5° Brix",
      "Acidity": "0.3% – 0.5% citric acid equivalent",
      "Aril Color": "Deep ruby red with tender soft seeds",
      "Disorders": "Free from internal browning and bacterial blight",
    },
  },
];

export function getProductBySlug(categorySlug: string, productSlug: string): ProductItem | undefined {
  return PRODUCTS.find(
    (prod) => prod.category.toLowerCase() === categorySlug.toLowerCase() && prod.slug.toLowerCase() === productSlug.toLowerCase()
  );
}

export function getProductsByCategory(categorySlug: string): ProductItem[] {
  return PRODUCTS.filter((prod) => prod.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getFeaturedProducts(): ProductItem[] {
  return PRODUCTS.filter((prod) => prod.featured);
}
