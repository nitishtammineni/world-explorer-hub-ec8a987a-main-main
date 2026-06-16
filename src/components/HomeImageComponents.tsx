/**
 * Home Page Image Integration Component
 * Replaces hardcoded images with dynamic local images + fallbacks
 *
 * This component handles:
 * - Dynamic country card images
 * - Featured country indicators (star badges)
 * - Lazy loading and responsiveness
 * - Flag fallbacks for countries without images
 */

"use client";

import { useMemo } from "react";
import type { Country } from "@/lib/countries";
import { ImageLoader, CountryImageCard } from "@/components/ImageLoader";
import { getImageUrl, getFlagUrl } from "@/lib/image-service";
import type { CountryImageMap } from "@/lib/image-mapper";

export interface HomeCountryCardProps {
  country: Country;
  imageMap: CountryImageMap | null;
  featured: boolean;
  onCardClick?: (country: Country) => void;
  className?: string;
}

/**
 * Individual country card for home/explore page
 * Shows image with fallback to flag, includes featured badge
 */
export const HomeCountryCard = ({
  country,
  imageMap,
  featured,
  onCardClick,
  className,
}: HomeCountryCardProps) => {
  const imageSrc = useMemo(() => {
    if (imageMap?.mainImage) {
      return getImageUrl(imageMap.mainImage);
    }
    return null;
  }, [imageMap]);

  const flagSrc = useMemo(() => {
    return getFlagUrl(country.cca3);
  }, [country.cca3]);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(country);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transform transition-transform hover:scale-105 ${className || ""}`}
    >
      <CountryImageCard
        countryName={country.name.common}
        countryCode={country.cca3}
        imageSrc={imageSrc ?? undefined}
        flagSrc={flagSrc}
        showFlag={!imageMap?.hasImages}
        showBadge={featured}
        badgeText="Featured"
        featured={featured}
        className="w-full"
      />
    </div>
  );
};

/**
 * Featured countries grid for home page
 * Shows 6 featured countries with images and badges
 */
export interface FeaturedCountriesGridProps {
  countries: Country[];
  imageMapping: Map<string, CountryImageMap> | null;
  featuredCountryCodes: string[];
  onCountryClick?: (country: Country) => void;
  className?: string;
}

export const FeaturedCountriesGrid = ({
  countries,
  imageMapping,
  featuredCountryCodes,
  onCountryClick,
  className,
}: FeaturedCountriesGridProps) => {
  const featuredCountries = useMemo(() => {
    return countries.filter((c) => featuredCountryCodes.includes(c.cca3)).slice(0, 6);
  }, [countries, featuredCountryCodes]);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${className || ""}`}
    >
      {featuredCountries.map((country) => {
        const imageMap = imageMapping?.get(country.cca3) ?? null;
        return (
          <HomeCountryCard
            key={country.cca3}
            country={country}
            imageMap={imageMap}
            featured={true}
            onCardClick={onCountryClick}
          />
        );
      })}
    </div>
  );
};

/**
 * All countries grid for explore/countries page
 * Shows all countries, with featured badges only for specified countries
 */
export interface AllCountriesGridProps {
  countries: Country[];
  imageMapping: Map<string, CountryImageMap> | null;
  featuredCountryCodes: string[];
  onCountryClick?: (country: Country) => void;
  className?: string;
  columnsDesktop?: number;
  columnsMobile?: number;
}

export const AllCountriesGrid = ({
  countries,
  imageMapping,
  featuredCountryCodes,
  onCountryClick,
  className,
  columnsDesktop = 4,
  columnsMobile = 2,
}: AllCountriesGridProps) => {
  // Build grid class dynamically
  const getGridClass = () => {
    const mobileClass = columnsMobile === 1 ? "grid-cols-1" : "grid-cols-2";
    const desktopClass =
      columnsDesktop === 3
        ? "lg:grid-cols-3"
        : columnsDesktop === 4
          ? "lg:grid-cols-4"
          : "lg:grid-cols-6";
    return `${mobileClass} sm:grid-cols-3 ${desktopClass}`;
  };

  return (
    <div className={`grid ${getGridClass()} gap-3 sm:gap-4 lg:gap-6 ${className || ""}`}>
      {countries.map((country) => {
        const imageMap = imageMapping?.get(country.cca3) ?? null;
        const isFeatured = featuredCountryCodes.includes(country.cca3);

        return (
          <HomeCountryCard
            key={country.cca3}
            country={country}
            imageMap={imageMap}
            featured={isFeatured}
            onCardClick={onCountryClick}
            className="h-full"
          />
        );
      })}
    </div>
  );
};

/**
 * Home page feature packages section with images
 * Shows curated package images
 */
export interface HomePackageCardProps {
  title: string;
  imageSrc?: string;
  fallbackSrc?: string;
  price?: string;
  badge?: string;
  featured?: boolean;
  onClick?: () => void;
}

export const HomePackageCard = ({
  title,
  imageSrc,
  fallbackSrc,
  price,
  badge,
  featured,
  onClick,
}: HomePackageCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <ImageLoader
        src={imageSrc}
        alt={title}
        fallbackSrc={fallbackSrc}
        className="w-full h-80 sm:h-96"
        objectFit="cover"
        useLazyLoad={true}
      />

      {/* Badge */}
      {badge && (
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {badge}
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-end justify-end p-6">
        <div className="text-right">
          <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
          {price && <p className="text-blue-100 text-sm">{price}</p>}
        </div>
      </div>
    </div>
  );
};

export default {
  HomeCountryCard,
  FeaturedCountriesGrid,
  AllCountriesGrid,
  HomePackageCard,
};
