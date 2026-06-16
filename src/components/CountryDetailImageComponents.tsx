/**
 * Country Detail Page Image Components
 * Handles:
 * - Hero image display
 * - Conditional must-visit section rendering
 * - Must-visit place image gallery
 * - Responsive image layout
 * - Automatic empty section removal
 */

"use client";

import { useMemo } from "react";
import type { Country } from "@/lib/countries";
import type { TouristPlace } from "@/lib/tourist-data";
import type { CountryImageMap } from "@/lib/image-mapper";
import { ImageLoader, ResponsiveImageGallery } from "@/components/ImageLoader";
import { getImageUrl, getFlagUrl } from "@/lib/image-service";

export interface CountryHeroImageProps {
  country: Country;
  imageMap: CountryImageMap | null;
  className?: string;
  showFlag?: boolean;
}

/**
 * Hero image section for country page
 * Displays main country image with flag badge
 */
export const CountryHeroImage = ({
  country,
  imageMap,
  className,
  showFlag = true,
}: CountryHeroImageProps) => {
  const imageSrc = useMemo(() => {
    if (imageMap?.mainImage) {
      return getImageUrl(imageMap.mainImage);
    }
    return null;
  }, [imageMap]);

  const flagSrc = useMemo(() => {
    return getFlagUrl(country.cca3);
  }, [country.cca3]);

  return (
    <div className={`relative w-full overflow-hidden rounded-lg shadow-lg ${className || ""}`}>
      <div className="aspect-video w-full">
        <ImageLoader
          src={imageSrc}
          alt={country.name.common}
          countryCode={country.cca3}
          countryFlag={flagSrc}
          className="w-full h-full"
          objectFit="cover"
          useLazyLoad={true}
          priority={true}
        />
      </div>

      {/* Flag badge - positioned bottom-left */}
      {showFlag && (
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-lg overflow-hidden border-4 border-white shadow-lg">
          <img
            src={flagSrc}
            alt={`Flag of ${country.name.common}`}
            className="h-12 w-20 sm:h-16 sm:w-24 object-cover"
          />
        </div>
      )}

      {/* Country name overlay */}
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {country.name.common}
          </h1>
          <p className="text-blue-100 text-sm mt-2">{country.capital?.[0] ?? ""}</p>
        </div>
      </div>
    </div>
  );
};

export interface MustVisitSectionProps {
  country: Country;
  imageMap: CountryImageMap | null;
  places: TouristPlace[];
  onPlaceClick?: (place: TouristPlace, imageUrl?: string) => void;
  className?: string;
}

/**
 * Must-visit section with conditional rendering
 * Only shows if country has must-visit images AND tourist places
 * Removes layout gaps automatically if no content
 */
export const MustVisitSection = ({
  country,
  imageMap,
  places,
  onPlaceClick,
  className,
}: MustVisitSectionProps) => {
  // Only render if we have must-visit images or places
  if (!imageMap?.hasMustVisit || !places || places.length === 0) {
    return null;
  }

  const mustVisitImages = useMemo(() => {
    return (imageMap?.mustVisitImages ?? []).slice(0, places.length);
  }, [imageMap]);

  // If no must-visit images, don't render section
  if (mustVisitImages.length === 0) {
    return null;
  }

  const placesWithImages = useMemo(() => {
    return places.slice(0, mustVisitImages.length).map((place, idx) => {
      const image = mustVisitImages[idx];
      return {
        place,
        imageUrl: image ? getImageUrl(image) : null,
      };
    });
  }, [places, mustVisitImages]);

  return (
    <section className={`py-12 sm:py-16 ${className || ""}`}>
      <div className="container-app">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Must-Visit Places</h2>
          <p className="text-muted-foreground">
            Explore the top attractions in {country.name.common}
          </p>
        </div>

        {/* Image Gallery */}
        <ResponsiveImageGallery
          images={placesWithImages.map((item) => ({
            src: item.imageUrl ?? undefined,
            alt: item.place.name,
            title: item.place.name,
            subtitle: item.place.city ?? item.place.blurb,
          }))}
          columns={{ mobile: 1, tablet: 2, desktop: 3 }}
          gap="medium"
        />

        {/* Places List */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placesWithImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onPlaceClick?.(item.place, item.imageUrl ?? undefined)}
              className="cursor-pointer p-4 rounded-lg border border-border hover:border-primary hover:bg-secondary/40 transition-all"
            >
              <h3 className="font-semibold text-lg mb-1">{item.place.name}</h3>
              {item.place.city && (
                <p className="text-sm text-muted-foreground mb-2">📍 {item.place.city}</p>
              )}
              <p className="text-sm text-foreground/80">{item.place.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Country intro section with statistics
 */
export interface CountryIntroSectionProps {
  country: Country;
  intro: string;
  imageMap: CountryImageMap | null;
  className?: string;
}

export const CountryIntroSection = ({
  country,
  intro,
  imageMap,
  className,
}: CountryIntroSectionProps) => {
  return (
    <section className={`py-8 sm:py-12 border-b border-border ${className || ""}`}>
      <div className="container-app">
        <div className="prose max-w-none">
          <p className="text-lg text-foreground/90 leading-relaxed">{intro}</p>
        </div>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {country.population && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Population</p>
              <p className="text-lg font-semibold">
                {(country.population / 1_000_000).toFixed(1)}M
              </p>
            </div>
          )}
          {country.area && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Area</p>
              <p className="text-lg font-semibold">{(country.area / 1_000).toFixed(0)}K km²</p>
            </div>
          )}
          {country.capital && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Capital</p>
              <p className="text-lg font-semibold">{country.capital[0]}</p>
            </div>
          )}
          {imageMap?.hasMustVisit && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Places</p>
              <p className="text-lg font-semibold">{imageMap.mustVisitImages.length}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * Placeholder for countries without must-visit images
 * Shows a message instead of empty section
 */
export interface EmptySectionProps {
  countryName: string;
  type: "must-visit" | "gallery";
  className?: string;
}

export const EmptySection = ({ countryName, type, className }: EmptySectionProps) => {
  if (type === "must-visit") {
    return null; // Don't show anything for must-visit
  }

  return (
    <section className={`py-12 text-center text-muted-foreground ${className || ""}`}>
      <p>
        No {type} content available for {countryName}
      </p>
    </section>
  );
};

export default {
  CountryHeroImage,
  MustVisitSection,
  CountryIntroSection,
  EmptySection,
};
