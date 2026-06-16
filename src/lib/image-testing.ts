/**
 * Image Detection & Mapping Test Utility
 * Use this to verify image detection is working correctly
 */

import {
  detectAllImages,
  getCountryImages,
  getMustVisitImages,
  hasMustVisitImages,
  getCountryMainImage,
} from "@/lib/image-detector";
import {
  mapCountryImages,
  mapAllCountriesToImages,
  getImageCoverageStats,
} from "@/lib/image-mapper";
import type { Country } from "@/lib/countries";

/**
 * Test image detection
 */
export async function testImageDetection() {
  console.log("🖼️  Testing Image Detection...");

  const collection = detectAllImages();

  console.log("📊 Detection Results:");
  console.log(`  • Total images: ${collection.allImages.length}`);
  console.log(`  • Home page images: ${collection.homePageImages.length}`);
  console.log(`  • Countries with images: ${collection.countryImages.size}`);
  console.log(`  • Countries with must-visit: ${collection.mustVisitImages.size}`);

  // Sample countries
  const sampleCountries = ["CHINA", "INDIA", "THAILAND", "DUBAI"];
  for (const country of sampleCountries) {
    const images = getCountryImages(country, collection);
    const mustVisit = getMustVisitImages(country, collection);
    const main = getCountryMainImage(country, collection);

    console.log(`\n  🌍 ${country}:`);
    console.log(`     Images: ${images.length}, Main: ${main?.filename ?? "N/A"}`);
    console.log(`     Must-visit: ${mustVisit.length}`);
  }

  return collection;
}

/**
 * Test image mapping with sample countries
 */
export async function testImageMapping(countries: Country[]) {
  console.log("\n🗺️  Testing Image Mapping...");

  const collection = detectAllImages();
  const mapping = mapAllCountriesToImages(countries, collection);
  const stats = getImageCoverageStats(mapping);

  console.log("📈 Coverage Statistics:");
  console.log(`  • Total countries: ${stats.totalCountries}`);
  console.log(`  • Countries with images: ${stats.countriesWithImages} (${stats.coverage}%)`);
  console.log(
    `  • Countries with must-visit: ${stats.countriesWithMustVisit} (${stats.coverageWithMustVisit}%)`,
  );

  // Sample mappings
  console.log("\n📍 Sample Mappings:");
  let count = 0;
  for (const [countryCode, map] of mapping) {
    if (map.hasImages && count < 5) {
      console.log(`  • ${countryCode}: ${map.countryName}`);
      console.log(`    - Main image: ${map.mainImage?.filename ?? "None"}`);
      console.log(`    - Must-visit: ${map.mustVisitImages.length} places`);
      count++;
    }
  }

  return { mapping, stats };
}

/**
 * Display countries without images (will use flags)
 */
export function testFallbacks(mapping: Map<string, any>) {
  console.log("\n🚩 Countries without images (will use flags):");

  let count = 0;
  for (const [countryCode, map] of mapping) {
    if (!map.hasImages) {
      console.log(`  • ${countryCode}: ${map.countryName}`);
      count++;
      if (count >= 10) {
        console.log(`  ... and ${mapping.size - 10} more`);
        break;
      }
    }
  }
}

export default {
  testImageDetection,
  testImageMapping,
  testFallbacks,
};
