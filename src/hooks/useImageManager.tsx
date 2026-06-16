/**
 * Image Manager Hook and Context
 * Provides cached access to image mappings and collections
 */

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Country } from "@/lib/countries";
import type { ImageCollection, ImageMetadata } from "@/lib/image-detector";
import type { CountryImageMap } from "@/lib/image-mapper";

export type ImageContextType = {
  collection: ImageCollection | null;
  countryMappings: Map<string, CountryImageMap> | null;
  isLoading: boolean;
  error: string | null;
  getCountryImages: (countryCode: string) => CountryImageMap | null;
  getImageUrl: (image: ImageMetadata | undefined) => string | null;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [collection, setCollection] = useState<ImageCollection | null>(null);
  const [countryMappings, setCountryMappings] = useState<Map<string, CountryImageMap> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load image manifest from JSON file generated at build time
    async function loadImages() {
      try {
        // Try to load pre-generated manifest first
        const response = await fetch("/images/manifest.json");
        if (response.ok) {
          const data = await response.json();
          console.log("📊 Image manifest loaded:", data);
        }
      } catch (err) {
        console.warn("Could not load image manifest:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, []);

  const getCountryImages = (countryCode: string): CountryImageMap | null => {
    if (!countryMappings) return null;
    return countryMappings.get(countryCode) ?? null;
  };

  const getImageUrl = (image: ImageMetadata | undefined): string | null => {
    if (!image) return null;
    const relativePath = image.relativePath.replace(/\\/g, "/");
    return `/images/${relativePath}`;
  };

  const value: ImageContextType = {
    collection,
    countryMappings,
    isLoading,
    error,
    getCountryImages,
    getImageUrl,
  };

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
}

export function useImages(): ImageContextType {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within ImageProvider");
  }
  return context;
}

/**
 * Hook to get image for a specific country
 */
export function useCountryImage(country: Country | undefined) {
  const { getCountryImages, getImageUrl } = useImages();
  const [imageMap, setImageMap] = useState<CountryImageMap | null>(null);

  useEffect(() => {
    if (country) {
      const map = getCountryImages(country.cca3);
      setImageMap(map);
    }
  }, [country, getCountryImages]);

  return {
    imageMap,
    mainImageUrl: imageMap?.mainImage ? getImageUrl(imageMap.mainImage) : null,
    cardImageUrls: imageMap?.cardImages.map((img) => getImageUrl(img)).filter(Boolean) ?? [],
    mustVisitImageUrls:
      imageMap?.mustVisitImages.map((img) => getImageUrl(img)).filter(Boolean) ?? [],
    hasImages: imageMap?.hasImages ?? false,
    hasMustVisit: imageMap?.hasMustVisit ?? false,
  };
}

/**
 * Hook to get multiple country images
 */
export function useCountriesImages(countries: Country[] | undefined) {
  const { getCountryImages, getImageUrl } = useImages();
  const [mappings, setMappings] = useState<Map<string, CountryImageMap>>(new Map());

  useEffect(() => {
    if (countries) {
      const newMappings = new Map<string, CountryImageMap>();
      for (const country of countries) {
        const map = getCountryImages(country.cca3);
        if (map) {
          newMappings.set(country.cca3, map);
        }
      }
      setMappings(newMappings);
    }
  }, [countries, getCountryImages]);

  return {
    mappings,
    getImageUrl,
  };
}

export default {
  ImageProvider,
  useImages,
  useCountryImage,
  useCountriesImages,
};
