/**
 * Image Mapper - Maps countries to their images using multiple strategies
 * Fuzzy matches country names, codes, and folder names
 */

import type { Country } from "./countries";
import type { ImageCollection, ImageMetadata } from "./image-detector";

export type CountryImageMap = {
  countryCode: string;
  countryName: string;
  mainImage?: ImageMetadata;
  cardImages: ImageMetadata[];
  mustVisitImages: ImageMetadata[];
  hasImages: boolean;
  hasMustVisit: boolean;
};

/**
 * Normalize string for fuzzy matching
 */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\s-_]/g, "")
    .trim();
}

/**
 * Calculate similarity score between two strings (0-100)
 * Uses Levenshtein distance concepts
 */
function similarityScore(str1: string, str2: string): number {
  const s1 = normalize(str1);
  const s2 = normalize(str2);

  if (s1 === s2) return 100;
  if (s1.length === 0 || s2.length === 0) return 0;

  // Check if one contains the other
  if (s1.includes(s2) || s2.includes(s1)) return 85;

  // Calculate Levenshtein distance
  const matrix: number[][] = [];

  for (let i = 0; i <= s2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= s1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        );
      }
    }
  }

  const maxLen = Math.max(s1.length, s2.length);
  const distance = matrix[s2.length][s1.length];
  return Math.round(((maxLen - distance) / maxLen) * 100);
}

/**
 * Find best matching country in image collection for a given country
 */
export function findImageMatch(
  country: Country,
  collection: ImageCollection,
): { countryKey: string; score: number } | null {
  const candidates = [
    { key: country.name.common, weight: 100 },
    { key: country.name.official, weight: 95 },
    { key: country.cca3, weight: 90 },
    { key: country.cca2, weight: 85 },
  ];

  let bestMatch: { countryKey: string; score: number } | null = null;

  for (const { key, weight } of candidates) {
    for (const imageCountry of collection.countryImages.keys()) {
      const score = similarityScore(key, imageCountry);
      const weightedScore = score * (weight / 100);

      if (!bestMatch || weightedScore > bestMatch.score) {
        bestMatch = { countryKey: imageCountry, score: weightedScore };
      }
    }
  }

  // Accept match if score is at least 70%
  if (bestMatch && bestMatch.score >= 70) {
    return bestMatch;
  }

  return null;
}

/**
 * Map a single country to its images
 */
export function mapCountryImages(country: Country, collection: ImageCollection): CountryImageMap {
  const match = findImageMatch(country, collection);

  if (!match) {
    return {
      countryCode: country.cca3,
      countryName: country.name.common,
      mainImage: undefined,
      cardImages: [],
      mustVisitImages: [],
      hasImages: false,
      hasMustVisit: false,
    };
  }

  const countryImages = collection.countryImages.get(match.countryKey) ?? [];
  const mustVisitImages = collection.mustVisitImages.get(match.countryKey) ?? [];

  // Find main image (prefer one with "main" in filename)
  const mainImage =
    countryImages.find(
      (img) =>
        img.filename.toLowerCase().includes("main") || img.filename.toLowerCase().includes("hero"),
    ) ?? countryImages[0];

  // Get card images (exclude main)
  const cardImages = countryImages.filter((img) => img.filename !== mainImage?.filename);

  return {
    countryCode: country.cca3,
    countryName: country.name.common,
    mainImage,
    cardImages: cardImages.slice(0, 1), // Usually just one card per country on home page
    mustVisitImages: mustVisitImages.slice(0, 6), // Limit to 6 must-visit places
    hasImages: countryImages.length > 0,
    hasMustVisit: mustVisitImages.length > 0,
  };
}

/**
 * Map all countries to their images
 */
export function mapAllCountriesToImages(
  countries: Country[],
  collection: ImageCollection,
): Map<string, CountryImageMap> {
  const map = new Map<string, CountryImageMap>();

  for (const country of countries) {
    const mapping = mapCountryImages(country, collection);
    map.set(country.cca3, mapping);
  }

  return map;
}

/**
 * Get statistics about image coverage
 */
export function getImageCoverageStats(mapping: Map<string, CountryImageMap>): {
  totalCountries: number;
  countriesWithImages: number;
  countriesWithMustVisit: number;
  coverage: number;
  coverageWithMustVisit: number;
} {
  let countriesWithImages = 0;
  let countriesWithMustVisit = 0;

  for (const m of mapping.values()) {
    if (m.hasImages) countriesWithImages++;
    if (m.hasMustVisit) countriesWithMustVisit++;
  }

  return {
    totalCountries: mapping.size,
    countriesWithImages,
    countriesWithMustVisit,
    coverage: Math.round((countriesWithImages / mapping.size) * 100),
    coverageWithMustVisit: Math.round((countriesWithMustVisit / mapping.size) * 100),
  };
}

/**
 * Get countries without images (will need flag fallback)
 */
export function getCountriesWithoutImages(
  mapping: Map<string, CountryImageMap>,
): CountryImageMap[] {
  return Array.from(mapping.values()).filter((m) => !m.hasImages);
}

/**
 * Get countries with must-visit images
 */
export function getCountriesWithMustVisit(
  mapping: Map<string, CountryImageMap>,
): CountryImageMap[] {
  return Array.from(mapping.values()).filter((m) => m.hasMustVisit);
}

export default {
  findImageMatch,
  mapCountryImages,
  mapAllCountriesToImages,
  getImageCoverageStats,
  getCountriesWithoutImages,
  getCountriesWithMustVisit,
  similarityScore,
};
