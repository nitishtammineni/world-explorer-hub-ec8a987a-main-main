/**
 * Image Detector - Recursively scans image folders and collects metadata
 * Supports: .jpg, .jpeg, .png, .webp, .svg, .avif
 */

import * as fs from "fs";
import * as path from "path";

export type ImageMetadata = {
  filename: string;
  fullPath: string;
  relativePath: string;
  extension: string;
  size: number;
  category: "home" | "country" | "must-visit" | "other";
  country?: string;
  type?: string;
};

export type ImageCollection = {
  homePageImages: ImageMetadata[];
  countryImages: Map<string, ImageMetadata[]>;
  mustVisitImages: Map<string, ImageMetadata[]>;
  allImages: ImageMetadata[];
};

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".avif"];
const IMAGES_ROOT = path.resolve(process.cwd(), "public", "images");

/**
 * Normalize country name to uppercase code (China -> CHINA, china -> CHINA)
 */
function normalizeCountryName(name: string): string {
  return name.toUpperCase().replace(/\s+/g, "");
}

/**
 * Recursively scan directory for image files
 */
function scanDirectory(dirPath: string, baseRoot: string): ImageMetadata[] {
  const images: ImageMetadata[] = [];

  if (!fs.existsSync(dirPath)) {
    return images;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(baseRoot, fullPath);

    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      images.push(...scanDirectory(fullPath, baseRoot));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        const stats = fs.statSync(fullPath);
        images.push({
          filename: entry.name,
          fullPath,
          relativePath,
          extension: ext,
          size: stats.size,
          category: determinateCategory(relativePath),
          country: extractCountry(relativePath),
          type: extractType(relativePath),
        });
      }
    }
  }

  return images;
}

/**
 * Determine image category based on path
 */
function determinateCategory(relativePath: string): ImageMetadata["category"] {
  const pathLower = relativePath.toLowerCase();
  if (pathLower.includes("home page")) return "home";
  if (pathLower.includes("must visit") || pathLower.includes("must-visit")) return "must-visit";
  if (pathLower.includes("explore")) return "country";
  return "other";
}

/**
 * Extract country name from path
 */
function extractCountry(relativePath: string): string | undefined {
  const parts = relativePath.split(path.sep);

  // For paths like explore/china/... or explore/China/...
  if (parts.includes("explore") && parts.length > 1) {
    const idx = parts.indexOf("explore");
    if (idx + 1 < parts.length) {
      const potentialCountry = parts[idx + 1];
      if (!potentialCountry.toLowerCase().includes("must")) {
        return normalizeCountryName(potentialCountry);
      }
    }
  }

  // For home page images, extract country code from filename
  // e.g., India-card-1.webp, thailand-card-3.jpg
  const filename = path.basename(relativePath, path.extname(relativePath)).toLowerCase();
  const match = filename.match(/^([a-z]+)-/);
  if (match) {
    return normalizeCountryName(match[1]);
  }

  return undefined;
}

/**
 * Extract image type from path/filename
 */
function extractType(relativePath: string): string | undefined {
  const pathLower = relativePath.toLowerCase();
  if (pathLower.includes("main")) return "main";
  if (pathLower.includes("card")) return "card";
  if (pathLower.includes("must-visit") || pathLower.includes("must visit")) return "must-visit";
  if (pathLower.includes("hero")) return "hero";

  const filename = path.basename(relativePath).toLowerCase();
  if (filename.includes("main")) return "main";
  if (filename.includes("card")) return "card";
  if (filename.includes("hero")) return "hero";

  return undefined;
}

/**
 * Organize images by country and category
 */
function organizeImages(allImages: ImageMetadata[]): ImageCollection {
  const collection: ImageCollection = {
    homePageImages: [],
    countryImages: new Map(),
    mustVisitImages: new Map(),
    allImages,
  };

  for (const image of allImages) {
    if (image.category === "home") {
      collection.homePageImages.push(image);
    } else if (image.category === "must-visit" && image.country) {
      const countryCode = image.country;
      if (!collection.mustVisitImages.has(countryCode)) {
        collection.mustVisitImages.set(countryCode, []);
      }
      collection.mustVisitImages.get(countryCode)!.push(image);
    } else if (image.category === "country" && image.country) {
      const countryCode = image.country;
      if (!collection.countryImages.has(countryCode)) {
        collection.countryImages.set(countryCode, []);
      }
      collection.countryImages.get(countryCode)!.push(image);
    }
  }

  return collection;
}

/**
 * Main function to detect all images
 */
export function detectAllImages(): ImageCollection {
  if (!fs.existsSync(IMAGES_ROOT)) {
    console.warn(`Images root not found: ${IMAGES_ROOT}`);
    return {
      homePageImages: [],
      countryImages: new Map(),
      mustVisitImages: new Map(),
      allImages: [],
    };
  }

  const allImages = scanDirectory(IMAGES_ROOT, IMAGES_ROOT);
  const collection = organizeImages(allImages);

  return collection;
}

/**
 * Get images for a specific country
 */
export function getCountryImages(
  countryCode: string,
  collection: ImageCollection,
): ImageMetadata[] {
  const normalized = normalizeCountryName(countryCode);
  return collection.countryImages.get(normalized) ?? [];
}

/**
 * Get must-visit images for a country
 */
export function getMustVisitImages(
  countryCode: string,
  collection: ImageCollection,
): ImageMetadata[] {
  const normalized = normalizeCountryName(countryCode);
  return collection.mustVisitImages.get(normalized) ?? [];
}

/**
 * Check if country has must-visit images
 */
export function hasMustVisitImages(countryCode: string, collection: ImageCollection): boolean {
  return getMustVisitImages(countryCode, collection).length > 0;
}

/**
 * Get main image for country (first one with "main" in name, or first image)
 */
export function getCountryMainImage(
  countryCode: string,
  collection: ImageCollection,
): ImageMetadata | undefined {
  const images = getCountryImages(countryCode, collection);
  const mainImage = images.find((img) => img.type === "main");
  return mainImage ?? images[0];
}

/**
 * Generate image manifest for build time
 */
export function generateManifest(collection: ImageCollection): Record<string, unknown> {
  const manifest: Record<string, unknown> = {
    generated: new Date().toISOString(),
    homePageImageCount: collection.homePageImages.length,
    countriesWithImages: Array.from(collection.countryImages.keys()),
    countriesWithMustVisit: Array.from(collection.mustVisitImages.keys()),
    totalImages: collection.allImages.length,
    byCountry: {} as Record<string, unknown>,
  };

  for (const [country, images] of collection.countryImages) {
    const mustVisit = collection.mustVisitImages.get(country) ?? [];
    (manifest.byCountry as Record<string, unknown>)[country] = {
      total: images.length + mustVisit.length,
      mainImages: images.filter((i) => i.type === "main").length,
      cardImages: images.filter((i) => i.type === "card").length,
      hasMustVisit: mustVisit.length > 0,
      images: images.map((i) => ({
        filename: i.filename,
        relativePath: i.relativePath,
        type: i.type,
      })),
      mustVisit: mustVisit.map((i) => ({
        filename: i.filename,
        relativePath: i.relativePath,
        type: i.type,
      })),
    };
  }

  // Also add countries that ONLY have must-visit images but no main country images
  for (const [country, mustVisit] of collection.mustVisitImages) {
    if (!(manifest.byCountry as Record<string, unknown>)[country]) {
      (manifest.byCountry as Record<string, unknown>)[country] = {
        total: mustVisit.length,
        mainImages: 0,
        cardImages: 0,
        hasMustVisit: true,
        images: [],
        mustVisit: mustVisit.map((i) => ({
          filename: i.filename,
          relativePath: i.relativePath,
          type: i.type,
        })),
      };
    }
  }

  return manifest;
}

export default {
  detectAllImages,
  getCountryImages,
  getMustVisitImages,
  hasMustVisitImages,
  getCountryMainImage,
  generateManifest,
  normalizeCountryName,
};
