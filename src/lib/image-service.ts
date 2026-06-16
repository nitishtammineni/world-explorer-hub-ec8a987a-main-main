/**
 * Image Service Utility
 * Provides methods to get image paths and serve them with fallbacks
 * Client-side image URL generation
 */

import type { ImageMetadata } from "./image-detector";

export type ImageServeOptions = {
  priority?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  format?: "jpg" | "webp" | "avif";
};

/**
 * Get image URL with optional parameters
 * For local images, returns relative path
 * Supports lazy loading and optimization hints
 */
export function getImageUrl(
  image: ImageMetadata | undefined,
  options?: ImageServeOptions,
): string | null {
  if (!image) return null;

  // Return relative path from public root
  // Images are served from /images/ public path
  const relativePath = image.relativePath.replace(/\\/g, "/");
  return `/images/${relativePath}`;
}

/**
 * Get fallback image URL (country flag from restcountries)
 */
export function getFlagUrl(countryCode: string): string {
  // Use flag emoji or flag image from CDN
  return `https://flagcdn.com/w320/${countryCode.toLowerCase().substring(0, 2)}.png`;
}

/**
 * Get placeholder image URL
 * Uses picsum as fallback
 */
export function getPlaceholderUrl(seed: string, width = 1200, height = 800): string {
  const seedHash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seedHash}/${width}/${height}`;
}

/**
 * Build responsive image srcset
 */
export function buildImageSrcset(
  imagePath: string,
  sizes: number[] = [320, 640, 1024, 1920],
): string {
  // For static images, we can't really resize, so we return the same path
  // In production, you'd use an image optimization service
  return sizes.map((size) => `${imagePath} ${size}w`).join(", ");
}

/**
 * Generate image metadata object for component consumption
 */
export function createImageMeta(
  image: ImageMetadata | undefined,
  country?: { name: string; cca3: string },
) {
  if (!image) {
    return {
      src: null,
      fallback: country ? getFlagUrl(country.cca3) : null,
      alt: country?.name ?? "Image",
      srcset: null,
    };
  }

  const url = getImageUrl(image);
  return {
    src: url,
    fallback: country ? getFlagUrl(country.cca3) : null,
    alt: country?.name ?? image.filename,
    srcset: url ? buildImageSrcset(url) : null,
  };
}

/**
 * Validate if image file exists (client-side check)
 * Uses HEAD request
 */
export async function validateImageExists(imagePath: string): Promise<boolean> {
  try {
    const response = await fetch(imagePath, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Preload image
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Get best image from collection for specific purpose
 */
export function selectImage(
  images: ImageMetadata[],
  priority: "main" | "card" | "any" = "any",
): ImageMetadata | undefined {
  if (!images.length) return undefined;

  if (priority === "main") {
    return (
      images.find(
        (img) =>
          img.filename.toLowerCase().includes("main") ||
          img.filename.toLowerCase().includes("hero"),
      ) ?? images[0]
    );
  }

  if (priority === "card") {
    return (
      images.find(
        (img) =>
          img.filename.toLowerCase().includes("card") ||
          !img.filename.toLowerCase().includes("main"),
      ) ?? images[0]
    );
  }

  return images[0];
}

export default {
  getImageUrl,
  getFlagUrl,
  getPlaceholderUrl,
  buildImageSrcset,
  createImageMeta,
  validateImageExists,
  preloadImage,
  selectImage,
};
