/**
 * Country to Image Path Mapping
 * Maps country names/codes to their local image paths
 */

export type CountryImagePaths = {
  [key: string]: {
    main?: string;
    card?: string;
    mustVisit?: string[];
  };
};

export const COUNTRY_IMAGE_MAP: CountryImagePaths = {
  // Thailand
  THA: {
    main: "/images/explore/thailand/Thailand-main-card.webp",
    mustVisit: [
      "/images/explore/thailand/must-visit/grand-palace-card-1.jpg",
      "/images/explore/thailand/must-visit/wat-arun-card-2.jpg",
      "/images/explore/thailand/must-visit/phi-phi-island-card-3.jpg",
      "/images/explore/thailand/must-visit/chiang-mai-old-city-card-4.webp",
      "/images/explore/thailand/must-visit/Phuket-beaches-card-5.webp",
      "/images/explore/thailand/must-visit/ayutthaya-card-6.jpg",
    ],
  },
  // Singapore
  SGP: {
    main: "/images/explore/singapore/singapore-main-image.webp",
    mustVisit: [
      "/images/explore/singapore/must visit/marina-bay-card-1.jpg",
      "/images/explore/singapore/must visit/gardens-by-the-bay-card-2.jpeg",
      "/images/explore/singapore/must visit/sentosa-island-card-3.jpeg",
      "/images/explore/singapore/must visit/china-town-card-4.webp",
    ],
  },
  // Malaysia
  MYS: {
    main: "/images/explore/malaysia/malasia-main-image.jpg",
    mustVisit: [
      "/images/explore/malaysia/must visit/petrona-towers-card-1.jpg",
      "/images/explore/malaysia/must visit/battu-caves-card-2.jpeg",
      "/images/explore/malaysia/must visit/langkawi-card-3.jpeg",
      "/images/explore/malaysia/must visit/george-town-card-4.jpeg",
    ],
  },
  // Azerbaijan
  AZE: {
    main: "/images/explore/azerbaijan/azerbaijan-main-image.jpeg",
    mustVisit: [
      "/images/explore/azerbaijan/must visit/flame-towers-card-1.jpeg",
      "/images/explore/azerbaijan/must visit/old-city-baku-card-2.jpeg",
      "/images/explore/azerbaijan/must visit/gobusthan-rock-art-card-3.jpg",
      "/images/explore/azerbaijan/must visit/heydar-mosque-card-4.jpeg",
    ],
  },
  // Indonesia
  IDN: {
    main: "/images/home page/feature-packages/Bali-card-3.jpg",
    card: "/images/home page/feature-packages/Bali-card-3.jpg",
    mustVisit: [
      "/images/explore/indonesia/must visit/thanah-lot-temple-card-1.jpeg",
      "/images/explore/indonesia/must visit/borobudur-card-2.jpeg",
      "/images/explore/indonesia/must visit/komodo-national-park-card-3.jpeg",
      "/images/explore/indonesia/must visit/tegalaland-rice-terrace-card-4.webp",
      "/images/explore/indonesia/must visit/mount-bromo-card-5.jpeg",
    ],
  },
  // Turkey
  TUR: {
    main: "/images/explore/turkey/turkey-main-images.avif",
    mustVisit: [
      "/images/explore/turkey/must visit/hagai-sophia-card-1.jpeg",
      "/images/explore/turkey/must visit/blue-mosque-card-2.jpeg",
      "/images/explore/turkey/must visit/capadosia-ballon-card-3.jpg",
      "/images/explore/turkey/must visit/pammukale-card-4.jpeg",
      "/images/explore/turkey/must visit/ephesus-card-5.jpeg",
    ],
  },
  // United Arab Emirates
  ARE: {
    main: "/images/home page/feature-packages/dubai-card-4.avif",
    card: "/images/home page/feature-packages/dubai-card-4.avif",
    mustVisit: [
      "/images/explore/dubai/must visit/burju-kalifa-card-1.jpeg",
      "/images/explore/dubai/must visit/sheikh-zayed-card-2.jpg",
      "/images/explore/dubai/must visit/palm-jumeirah-card-3.jpeg",
      "/images/explore/dubai/must visit/desert-safari-card-4.jpg",
      "/images/explore/dubai/must visit/malls-fountains-card-5.jpeg",
    ],
  },
  // United Kingdom
  GBR: {
    main: "/images/explore/united kingdom/images.jpeg",
    mustVisit: [
      "/images/explore/united kingdom/must visit/8-big-ben-min-card-1.jpg",
      "/images/explore/united kingdom/must visit/Tower-of-London-card-2.jpg",
      "/images/explore/united kingdom/must visit/stone-henge-card-3.jpg",
      "/images/explore/united kingdom/must visit/Edinburgh-Castle-card-4.webp",
      "/images/explore/united kingdom/must visit/LakeDistrict-card-5.jpg",
      "/images/explore/united kingdom/must visit/the-great-bath-card-6.jpg",
    ],
  },
  // India
  IND: {
    main: "/images/home page/India-card-1.webp",
  },
  // Maldives
  MDV: {
    main: "/images/explore/maldives/maldives-main-image.jpg",
    mustVisit: [
      "/images/explore/maldives/must visit/over-water-villas-card-1.jpeg",
      "/images/explore/maldives/must visit/hanifaru-bay-card-2.jpeg",
      "/images/explore/maldives/must visit/sea-of-stars-card-3.jpeg",
    ],
  },
  // Egypt
  EGY: {
    main: "/images/explore/egypt/egypt-main-image.jpeg",
    mustVisit: [
      "/images/explore/egypt/must visit/pyramids-giza-card-1.jpeg",
      "/images/explore/egypt/must visit/karnak-temple-card-2.webp",
      "/images/explore/egypt/must visit/valley-of-kings-card-3.jpeg",
      "/images/explore/egypt/must visit/abu-symbol-card-4.jpeg",
      "/images/explore/egypt/must visit/red-sea-coral-card-5.jpeg",
    ],
  },
  // Cambodia
  KHM: {
    main: "/images/explore/cambodia/cambodia-main-image.jpeg",
    mustVisit: [
      "/images/explore/cambodia/must visit/angkor-wat-card-1.jpeg",
      "/images/explore/cambodia/must visit/bayon-temple-card-2.jpeg",
      "/images/explore/cambodia/must visit/tuol-sleng-museum-card-3.jpeg",
      "/images/explore/cambodia/must visit/phnom-penh-card-4.jpeg",
    ],
  },
  // Vietnam
  VNM: {
    main: "/images/explore/vietnam/vietnam-main-image.jpeg",
    mustVisit: [
      "/images/explore/vietnam/must visit/ha-long-bay-card-1.jpeg",
      "/images/explore/vietnam/must visit/hoi-an-old-town-card-2.jpg",
      "/images/explore/vietnam/must visit/sapa-card-3.jpeg",
      "/images/explore/vietnam/must visit/phong-nha-caves-card-4.jpeg",
    ],
  },
  // China
  CHN: {
    // Requirement: card image should be used as main-image (place china page images for mobile & desktop)
    // Here we set `main` to the desired card image; `card` points to the same image.
    main: "/images/explore/china/must visit/great-wall-china-card-1.jpeg",
    card: "/images/explore/china/must visit/great-wall-china-card-1.jpeg",
    mustVisit: [
      "/images/explore/china/must visit/great-wall-china-card-1.jpeg",
      "/images/explore/china/must visit/forbidden-city-card-2.webp",
      "/images/explore/china/must visit/terracotta-army-card-3.jpg",
      "/images/explore/china/must visit/zhangjiajie-card-4.jpg",
      "/images/explore/china/must visit/li-river-card-5.jpeg",
    ],
  },
  // Sri Lanka
  LKA: {
    main: "/images/explore/sri lanka/sri-lanka-main-image.png",
    mustVisit: [
      "/images/explore/sri lanka/must visit/lion-rock-card-1.jpeg",
      "/images/explore/sri lanka/must visit/nine-arches-bridge-card-2.webp",
      "/images/explore/sri lanka/must visit/galle-fort-card-3.jpeg",
    ],
  },
// Europe - uses home page images
  EUR: {
    main: "/images/home page/switzerland-card-5.jpg",
  },
  // France (Featured Europe) - uses home page images
  FRA: {
    main: "/images/home page/feature-packages/paris-card-1.jpg",
    card: "/images/home page/feature-packages/paris-card-1.jpg",
    mustVisit: [
      "/images/home page/feature-packages/paris-card-1.jpg",
      "/images/home page/france-card-2.jpg",
    ],
  },
  // Switzerland (Featured Europe) - uses home page images
  CHE: {
    main: "/images/home page/feature-packages/swiss-card-2.jpg",
    card: "/images/home page/feature-packages/swiss-card-2.jpg",
    mustVisit: [
      "/images/home page/feature-packages/swiss-card-2.jpg",
      "/images/home page/switzerland-card-5.jpg",
    ],
  },
  // Note: Other European countries (Italy, Spain, Germany, Greece, Portugal, Netherlands, Austria,
  // Ireland, Iceland, Norway, Sweden, Denmark, Finland, Poland, Croatia, Czech Republic,
  // Hungary, Belgium) do not have local images - app will use flag fallbacks
};

/**
 * Get first must-visit image for a country
 * Returns the first must-visit image, or falls back to card/main image if no must-visit images exist
 */
export function getCountryFirstMustVisitImage(countryCode: string): string | null {
  const map = COUNTRY_IMAGE_MAP[countryCode];
  if (!map) return null;

  // Return first must-visit image if available
  if (map.mustVisit && map.mustVisit.length > 0) {
    return map.mustVisit[0];
  }

  // Fall back to card or main image
  return map.card ?? map.main ?? null;
}

/**
 * Get main image for a country
 */
export function getCountryMainImage(countryCode: string): string | null {
  return COUNTRY_IMAGE_MAP[countryCode]?.main ?? null;
}

/**
 * Get card image for a country (or main if no card)
 */
export function getCountryCardImage(countryCode: string): string | null {
  const map = COUNTRY_IMAGE_MAP[countryCode];
  return map?.card ?? map?.main ?? null;
}

/**
 * Get must-visit images for a country
 */
export function getCountryMustVisitImages(countryCode: string): string[] {
  return COUNTRY_IMAGE_MAP[countryCode]?.mustVisit ?? [];
}

/**
 * Check if country has images
 */
export function hasCountryImages(countryCode: string): boolean {
  return !!COUNTRY_IMAGE_MAP[countryCode];
}

export default {
  COUNTRY_IMAGE_MAP,
  getCountryMainImage,
  getCountryCardImage,
  getCountryMustVisitImages,
  getCountryFirstMustVisitImage,
  hasCountryImages,
};
