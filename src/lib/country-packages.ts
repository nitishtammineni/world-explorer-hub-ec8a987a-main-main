// Custom Country Packages - Single premium packages with exact pricing
// This file contains the single package for each destination as requested

export type CustomPackage = {
  name: string;
  destination: string;
  duration: string;
  price: number;
  priceNote?: string; // e.g., "per person", "+5% Tax"
  inclusions: string[];
  highlights: string[];
  query: string; // Unsplash search query
  notes?: string; // Additional notes like "Without Flight"
};

export type CountryPackage = CustomPackage & {
  countryCode: string; // ISO 3166-1 alpha-3 code
};

// All custom packages with exact pricing from the provided table
export const CUSTOM_PACKAGES: Record<string, CountryPackage> = {
  // Thailand - ₹19,999 - Without Flight
  THA: {
    countryCode: "THA",
    name: "Thailand Escape",
    destination: "Thailand",
    duration: "3N / 4D",
    price: 19999,
    priceNote: "",
    inclusions: [
      "4-star hotel stay",
      "Daily breakfast",
      "Airport transfers",
      "City tour",
      "All taxes",
    ],
    highlights: ["Bangkok city tour", "Pattaya beaches", "Cultural show", "Shopping markets"],
    query: "thailand bangkok pattaya",
    notes: "Without Flight",
  },

  // Singapore & Malaysia - ₹29,000 - Standard Package - 5N/6D
  SGP: {
    countryCode: "SGP",
    name: "Singapore & Malaysia Explorer",
    destination: "Singapore & Malaysia",
    duration: "5N / 6D",
    price: 70000,
    priceNote: "per person",
    inclusions: [
      "4-star hotel stay",
      "Daily breakfast",
      "Private car transfers",
      "Guided city tours",
      "Sentosa Island entry",
      "All taxes",
    ],
    highlights: [
      "Marina Bay Sands",
      "Gardens by the Bay",
      "Petronas Towers",
      "Batu Caves",
      "Malacca tour",
    ],
    query: "singapore malaysia tour",
    notes: "Standard Package",
  },

  // Malaysia - ₹21,000 - Economy Package - 5N/6D
  MYS: {
    countryCode: "MYS",
    name: "Malaysia Budget Bliss",
    destination: "Malaysia",
    duration: "5N / 6D",
    price: 70000,
    priceNote: "per person",
    inclusions: [
      "3-star hotel stay",
      "Daily breakfast",
      "Bus transfers",
      "Group city tours",
      "Petronas Twin Towers",
      "All taxes",
    ],
    query: "malaysia kuala lumpur",
    notes: "Budget Friendly",
  },

  // Azerbaijan (Baku) - ₹45,000 - 5N/6D
  AZE: {
    countryCode: "AZE",
    name: "Baku Adventure",
    destination: "Azerbaijan (Baku)",
    duration: "5N / 6D",
    price: 99999,
    priceNote: "per person",
    inclusions: [
      "4-star hotel stay",
      "Daily breakfast",
      "Airport transfers",
      "City tour",
      "Gobustan tour",
      "All taxes",
    ],
    highlights: [
      "Flame Towers",
      "Old City Baku",
      "Fountain Square",
      "Maiden Tower",
      "Caravanserai",
    ],
    query: "baku azerbaijan",
  },

  // Indonesia (Bali) - ₹43,000
  IDN: {
    countryCode: "IDN",
    name: "Bali Paradise",
    destination: "Indonesia (Bali)",
    duration: "5N / 6D",
    price: 45000,
    priceNote: "per person",
    inclusions: [
      "Beach resort stay",
      "Daily breakfast",
      "Private car",
      "Temple tours",
      "Rice terrace visit",
      "All taxes",
    ],
    highlights: [
      "Uluwatu Temple",
      "Tegallalang Rice Terrace",
      "Ubud tour",
      "Kuta Beach",
      "Sunset cruise",
    ],
    query: "bali indonesia resort",
  },

  // Turkey - ₹1,99,999 - 5N/6D
  TUR: {
    countryCode: "TUR",
    name: "Turkey Grand Tour",
    destination: "Turkey",
    duration: "5N / 6D",
    price: 199999,
    priceNote: "per person",
    inclusions: [
      "5-star hotel stay",
      "All meals included",
      "Private transfers",
      "Hot air balloon",
      "Expert guide",
      "All entrance fees",
    ],
    highlights: [
      "Istanbul city tour",
      "Cappadocia balloon",
      "Pamukkale",
      "Ephesus ruins",
      "Bosphorus cruise",
    ],
    query: "cappadocia turkey balloon",
  },

  // Dubai - ₹69,500 - +5% Tax
  ARE: {
    countryCode: "ARE",
    name: "Dubai Luxury",
    destination: "Dubai",
    duration: "5N / 6D",
    price: 69500,
    priceNote: "per person +5% Tax",
    inclusions: [
      "5-star hotel stay",
      "Daily breakfast",
      "Private transfers",
      "Desert safari",
      "City tour",
      "Dhow cruise",
      "All taxes",
    ],
    highlights: ["Burj Khalifa", "Desert safari", "Palm Jumeirah", "Gold Souk", "Marina tour"],
    query: "dubai burj khalifa",
  },

  // Scotland & London - ₹2,00,000 - 6N/7D
  GBR: {
    countryCode: "GBR",
    name: "Britain Explorer",
    destination: "Scotland & London",
    duration: "6N / 7D",
    price: 200000,
    priceNote: "per person",
    inclusions: [
      "4-star hotel stay",
      "Daily breakfast",
      "Eurostar tickets",
      "Private car",
      "Guided tours",
      "All entrance fees",
    ],
    highlights: [
      "Big Ben",
      "Tower of London",
      "Edinburgh Castle",
      "Loch Ness",
      "Stonehenge",
      "Bath",
    ],
    query: "london big ben scotland",
  },

  // Andaman - ₹22,990 - 4N/5D
  ANDAMAN: {
    countryCode: "IND",
    name: "Andaman Getaway",
    destination: "Andaman",
    duration: "4N / 5D",
    price: 22999,
    priceNote: "per person",
    inclusions: [
      "Beach resort stay",
      "All meals",
      "Island transfers",
      "Snorkeling trip",
      "Cellular Jail tour",
    ],
    highlights: [
      "Havelock Island",
      "Radhanagar Beach",
      "Cellular Jail",
      "Corbyn's Cove",
      "Kalapathar Beach",
    ],
    query: "andaman havelock island",
  },

  // Maldives - ₹3,00,000 - 4N/5D
  MDV: {
    countryCode: "MDV",
    name: "Maldives Paradise",
    destination: "Maldives",
    duration: "4N / 5D",
    price: 300000,
    priceNote: "per person",
    inclusions: [
      "Overwater villa",
      "All meals",
      "Speedboat transfer",
      "Snorkeling gear",
      "Sunset cruise",
      "SPA credit",
    ],
    highlights: [
      "Private beach",
      "Underwater dining",
      "Coral reef",
      "Dolphin watch",
      "Island hopping",
    ],
    query: "maldives overwater villa",
  },

  // China - ₹1,99,999 - 9N/10D
  CHN: {
    countryCode: "CHN",
    name: "China Discovery",
    destination: "China",
    duration: "9N / 10D",
    price: 199999,
    priceNote: "per person",
    inclusions: [
      "5-star hotel stay",
      "All meals",
      "Bullet train",
      "Expert guide",
      "All entrance fees",
      "Visa assistance",
    ],
    highlights: [
      "Great Wall",
      "Forbidden City",
      "Terracotta Army",
      "Shanghai skyline",
      "Li River cruise",
      "Zhangjiajie",
    ],
    query: "great wall china beijing",
  },

  // Europe - ₹3,25,000 - 13N/14D
  EUROPE: {
    countryCode: "EUR",
    name: "Europe Grand Tour",
    destination: "Europe",
    duration: "13N / 14D",
    price: 325000,
    priceNote: "per person",
    inclusions: [
      "4-star hotels",
      "All breakfasts",
      "Eurostar passes",
      "Private transfers",
      "Expert guide",
      "Museum entries",
    ],
    highlights: [
      "Paris Eiffel Tower",
      "Venice canals",
      "Swiss Alps",
      "Amsterdam canals",
      "Barcelona Gaudi",
      "Rome Colosseum",
    ],
    query: "europe paris venice",
  },

  // Sri Lanka - ₹40,000 - 5D/6N
  LKA: {
    countryCode: "LKA",
    name: "Sri Lanka Express",
    destination: "Sri Lanka",
    duration: "5N / 6D",
    price: 40000,
    priceNote: "per person",
    inclusions: [
      "4-star hotel stay",
      "Daily breakfast",
      "Private car",
      "Safari tour",
      "All entrance fees",
      "All taxes",
    ],
    highlights: ["Sigiriya Rock", "Ella Nine Arches", "Yala Safari", "Galle Fort", "Kandy Temple"],
    query: "sigiriya sri lanka",
  },

  // Vietnam - ₹59,999 - 5N/6D
  VNM: {
    countryCode: "VNM",
    name: "Vietnam Delight",
    destination: "Vietnam",
    duration: "5N / 6D",
    price: 59999,
    priceNote: "per person",
    inclusions: [
      "4-star hotel stay",
      "Daily breakfast",
      "Private transfers",
      "Halong Bay cruise",
      "Guided tours",
      "All taxes",
    ],
    highlights: [
      "Ha Long Bay",
      "Hoi An Old Town",
      "Ho Chi Minh City",
      "Sapa Rice Terraces",
      "Mekong Delta",
    ],
    query: "ha long bay vietnam",
  },

  // Cambodia - ₹59,999 - 4N/5D
  KHM: {
    countryCode: "KHM",
    name: "Cambodia Explorer",
    destination: "Cambodia",
    duration: "4N / 5D",
    price: 59999,
    priceNote: "per person",
    inclusions: [
      "4-star hotel stay",
      "Daily breakfast",
      "Private transfers",
      "Temple guide",
      "All entrance fees",
    ],
    highlights: ["Angkor Wat", "Bayon Temple", "Ta Prohm", "Phnom Penh tour", "Tonle Sap"],
    query: "angkor wat cambodia",
  },

  // Cambodia - ₹75,000 - 5N/6D
  KHM_PREMIUM: {
    countryCode: "KHM",
    name: "Cambodia Premium",
    destination: "Cambodia",
    duration: "5N / 6D",
    price: 75000,
    priceNote: "per person",
    inclusions: [
      "5-star hotel stay",
      "All meals",
      "Private luxury car",
      "Expert archaeologist",
      "Private temple access",
      "VIP show",
    ],
    query: "cambodia luxury temple",
  },

  // Lakshadweep Island - ₹49,999 - 5N/6D
  LAKSHADWEEP: {
    countryCode: "IND",
    name: "Lakshadweep Escape",
    destination: "Lakshadweep Island",
    duration: "5N / 6D",
    price: 49999,
    priceNote: "",
    inclusions: [
      "Beach cottage",
      "All meals",
      "Boat transfers",
      "Scuba initiation",
      "Beach activities",
      "All taxes",
    ],
    highlights: ["Agatti Island", "Kavaratti", "Bangaram Beach", "Coral reefs", "Water sports"],
    query: "lakshadweep island beach",
  },

  // Egypt - ₹59,999 - 4N/5D
  EGY: {
    countryCode: "EGY",
    name: "Egypt Wonder",
    destination: "Egypt",
    duration: "4N / 5D",
    price: 59999,
    priceNote: "per person",
    inclusions: [
      "5-star Nile cruise",
      "All meals",
      "Expert Egyptologist",
      "All entrance fees",
      "Airport transfers",
    ],
    highlights: [
      "Pyramids of Giza",
      "Luxor Temple",
      "Valley of Kings",
      "Nile cruise",
      "Egyptian Museum",
    ],
    query: "pyramids egypt nile",
  },
};

// Get custom package by country code
export function getCustomPackage(cca3: string): CountryPackage | null {
  // First check direct match
  if (CUSTOM_PACKAGES[cca3]) {
    return CUSTOM_PACKAGES[cca3];
  }

  // Check special codes
  if (cca3 === "ANDAMAN" || cca3 === "IND_ANDAMAN") {
    return CUSTOM_PACKAGES.ANDAMAN;
  }
  if (cca3 === "LAKSHADWEEP" || cca3 === "IND_LAKSHADWEEP") {
    return CUSTOM_PACKAGES.LAKSHADWEEP;
  }
  if (cca3 === "SGP_MYS" || cca3 === "MYS_SGP") {
    return CUSTOM_PACKAGES.SGP;
  }
  if (cca3 === "EUR" || cca3 === "SCHENGEN") {
    return CUSTOM_PACKAGES.EUROPE;
  }

  return null;
}

// Get all custom packages for display
export function getAllCustomPackages(): CountryPackage[] {
  return Object.values(CUSTOM_PACKAGES);
}
