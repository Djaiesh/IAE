export interface NavItem {
  label: string;
  href: string;
}

export interface DestinationPort {
  id: string;
  name: string;
  city: string;
  country: string;
  region: "Europe" | "Middle East" | "Asia-Pacific" | "North America" | "United Kingdom";
  coordinates: { x: number; y: number }; // percentage on stylized world map
  typicalTransitDays: string;
  handlingVolume: string;
  primaryCommodities: string[];
}

export interface ExportProcessStep {
  stepNumber: string;
  title: string;
  shortDesc: string;
  details: string;
  iconName: string;
  verificationCheck: string;
}

export const SITE_CONFIG = {
  name: "JILO Global Agro-Exports",
  brandMark: "JILO",
  fullLegalName: "JILO International Exporters Pvt. Ltd.",
  tagline: "Direct Origin Agricultural Commodities, Sea Freight & Certified Provenance",
  editorialClosingLine: "From farmgate origin to global seaports.",
  portfolioPdfUrl: "/documents/company-portfolio.pdf",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Quality", href: "/quality" },
    { label: "Export Process", href: "/export-process" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  // Contact details
  contact: {
    email: "trade@jilo-exports.com",
    salesDesk: "+91 98765 43210 (JILO Trade Desk)",
    emergencyLogistics: "+91 98200 12345 (Port Operations)",
    registeredOffice: "JILO Export Tower, Maritime Logistics Quarter, Ballard Estate, Mumbai 400 001, India",
    packingFacility: "JILO Central Packhouse & Cold-Storage Terminal, MIDC Dindori, Nashik Agro-Export Zone, Maharashtra",
    businessHours: "Monday – Friday: 08:30 – 19:30 IST / 24/7 Reefer Telemetry Desk",
  },

  complianceCertifications: [
    {
      code: "APEDA",
      name: "APEDA Registration",
      authority: "Agricultural & Processed Food Products Export Development Authority",
      scope: "Registered Exporter of Fresh Horticulture & Processed Spices",
      status: "Active Verified Registry",
      isDemo: true,
    },
    {
      code: "FSSAI",
      name: "FSSAI Central Export License",
      authority: "Food Safety and Standards Authority of India",
      scope: "Export Category Food Business Operator (FBO)",
      status: "Central License Compliant",
      isDemo: true,
    },
    {
      code: "GlobalGAP",
      name: "GlobalG.A.P. Certified Supply Orchards",
      authority: "FoodPlus GmbH / Accredited Certification Body",
      scope: "Integrated Farm Assurance (IFA) for Fruits & Vegetables",
      status: "Orchard Chain of Custody",
      isDemo: true,
    },
    {
      code: "US-FDA",
      name: "US FDA Food Facility Registration",
      authority: "U.S. Food and Drug Administration",
      scope: "FSMA Compliant Foreign Supplier Verification",
      status: "Facility Registered Placeholder",
      isDemo: true,
    },
    {
      code: "ISO 22000:2018",
      name: "Food Safety Management System (FSMS)",
      authority: "Accredited Registrar",
      scope: "HACCP Principles, Receiving, Processing, Sorting, Packing & Cold Chain Dispatch",
      status: "Audited Protocol Placeholder",
      isDemo: true,
    },
    {
      code: "Phytosanitary",
      name: "NPPO Plant Quarantine & Fumigation Clearance",
      authority: "Directorate of Plant Protection, Quarantine & Storage",
      scope: "Consignment-wise Phytosanitary Certificates (PSC) and Methyl Bromide/AlP Fumigation",
      status: "Every Shipment Cleared",
      isDemo: true,
    }
  ],

  destinationPorts: [
    {
      id: "port-rotterdam",
      name: "Port of Rotterdam",
      city: "Rotterdam",
      country: "Netherlands",
      region: "Europe",
      coordinates: { x: 49.5, y: 31.0 },
      typicalTransitDays: "24 – 28 Days (Via Suez/Direct)",
      handlingVolume: "High-frequency Weekly Reefer Discharges",
      primaryCommodities: ["Grapes", "Bhagwa Pomegranates", "Tellicherry Black Pepper", "Curcumin Turmeric"],
    },
    {
      id: "port-jebelali",
      name: "Jebel Ali Port (DP World)",
      city: "Dubai",
      country: "United Arab Emirates",
      region: "Middle East",
      coordinates: { x: 63.5, y: 44.5 },
      typicalTransitDays: "4 – 6 Days (Direct Fast Lane)",
      handlingVolume: "Bi-weekly 40ft Reefer Schedules",
      primaryCommodities: ["Nashik Red Onions", "Tender Okra", "Fresh Drumsticks", "G9 Bananas"],
    },
    {
      id: "port-singapore",
      name: "Port of Singapore (PSA)",
      city: "Singapore",
      country: "Singapore",
      region: "Asia-Pacific",
      coordinates: { x: 78.5, y: 55.0 },
      typicalTransitDays: "7 – 9 Days",
      handlingVolume: "Scheduled Feeder & Direct Liner Lines",
      primaryCommodities: ["Guntur Dried Chillies", "Turmeric Fingers", "Fresh Vegetables"],
    },
    {
      id: "port-newyork",
      name: "Port of New York and New Jersey",
      city: "New York / Newark",
      country: "United States",
      region: "North America",
      coordinates: { x: 26.5, y: 37.0 },
      typicalTransitDays: "28 – 34 Days (Deep-Sea Express)",
      handlingVolume: "USDA-APHIS Approved Controlled Atmosphere",
      primaryCommodities: ["Irradiated Alphonso Mangoes", "Black Pepper TGSEB", "Curcumin 5% Turmeric"],
    },
    {
      id: "port-london",
      name: "London Gateway / Southampton",
      city: "London",
      country: "United Kingdom",
      region: "United Kingdom",
      coordinates: { x: 47.0, y: 30.0 },
      typicalTransitDays: "22 – 26 Days",
      handlingVolume: "Scheduled Multi-temperature Box Arrivals",
      primaryCommodities: ["Exotic Fruits", "Single-origin Spices", "Prepared Vegetables"],
    },
  ] as DestinationPort[],

  exportProcessSteps: [
    {
      stepNumber: "01",
      title: "Ethical Farmgate Procurement & Field Assay",
      shortDesc: "Harvested directly at calibrated physiological maturity.",
      details: "Our agronomists inspect crops at the farmgate, measuring Brix sweetness, diameter calipers, and checking pre-harvest intervals for pesticide stewardship.",
      iconName: "Sprout",
      verificationCheck: "Field Moisture & Residue Screen",
    },
    {
      stepNumber: "02",
      title: "Optical Grading, Lab Testing & Sorting",
      shortDesc: "Automated weight/diameter sorting and laser optical impurity detection.",
      details: "Produce enters automated grading lines where sub-standard pieces are culled. Spices undergo dual aspiration, magnetic separation, and HPLC active-compound analysis.",
      iconName: "Microscope",
      verificationCheck: "ISO 17025 Accredited Lab Certificate",
    },
    {
      stepNumber: "03",
      title: "Atmosphere-Controlled & Protective Packing",
      shortDesc: "Food-grade ventilated boxes, Banavac liners, and custom vacuum pouches.",
      details: "Vegetables receive forced-air hydro-cooling within 3 hours. Spices are vacuum-sealed with desiccant sachets in tamper-proof export bales to eliminate moisture migration.",
      iconName: "PackageCheck",
      verificationCheck: "Telescopic Burst-Strength Certification",
    },
    {
      stepNumber: "04",
      title: "Customs Documentation, Phytosanitary & APEDA Seals",
      shortDesc: "Complete regulatory papers prepared with zero margin for demurrage.",
      details: "Consignment-specific Phytosanitary Certificate (PSC), Certificate of Origin (COO), Bill of Lading (BL), and Fumigation clearance are processed digitally ahead of arrival.",
      iconName: "FileCheck2",
      verificationCheck: "Electronic Plant Quarantine Clearance",
    },
    {
      stepNumber: "05",
      title: "Reefer Pre-Cooling & Vessel Containerization",
      shortDesc: "Precision cold-chain unbroken from packhouse to vessel deck.",
      details: "Containers are pre-cooled to exact commodity setpoints (e.g. 13.5°C for bananas, 0°C for onions). Continuous GPS dataloggers track pulp temperature and RH every 15 minutes.",
      iconName: "Truck",
      verificationCheck: "GPS Live Reefer Telemetry Log",
    },
    {
      stepNumber: "06",
      title: "Ocean Transit & Destination Port Consignee Handover",
      shortDesc: "Seamless delivery with full traceability to destination berths worldwide.",
      details: "Real-time vessel tracking, transshipment notifications, and swift release documentation delivered to the importing broker for immediate customs clearance.",
      iconName: "Anchor",
      verificationCheck: "Clean Bill of Lading & Destination Release",
    },
  ] as ExportProcessStep[],
};
