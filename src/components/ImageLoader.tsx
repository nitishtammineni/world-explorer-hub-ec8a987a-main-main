/**
 * Smart Image Loader Component
 * Handles lazy loading, fallbacks, and responsive images
 * Falls back to country flag if no image available
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ImageLoaderProps {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  countryCode?: string;
  countryFlag?: string;
  className?: string;
  imageClassName?: string;
  useLazyLoad?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
  aspectRatio?: "square" | "video" | "auto";
  priority?: boolean;
}

export const ImageLoader = ({
  src,
  alt = "Travel destination",
  fallbackSrc,
  countryCode,
  countryFlag,
  className,
  imageClassName,
  useLazyLoad = true,
  objectFit = "cover",
  aspectRatio = "video",
  priority = false,
}: ImageLoaderProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(src ?? null);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!useLazyLoad || priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get aspect ratio classes
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "auto":
      default:
        return "";
    }
  };

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (!useLazyLoad || !imgRef.current || priority || !imageSrc) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "50px" },
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [useLazyLoad, imageSrc, priority]);

  // Handle image load error
  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else if (countryFlag && imageSrc !== countryFlag) {
      setImageSrc(countryFlag);
    } else {
      setError(true);
    }
  };

  // Fallback UI when image fails and no alternatives
  if (error || !imageSrc) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden",
          getAspectRatioClass(),
          className,
        )}
      >
        {countryCode && (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            {countryFlag && (
              <img
                src={countryFlag}
                alt={`Flag of ${countryCode}`}
                className="h-16 w-24 object-cover rounded"
              />
            )}
            <span className="text-xs text-gray-600">{countryCode}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-gray-100", getAspectRatioClass(), className)}>
      {/* Loading skeleton */}
      {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      {/* Image */}
      {isLoaded && imageSrc && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            `object-${objectFit}`,
            imageClassName,
          )}
          onError={handleError}
          loading={useLazyLoad ? "lazy" : "eager"}
        />
      )}
    </div>
  );
};

/**
 * Country Image Card Component
 * Displays country image with optional flag and loading state
 */
export interface CountryImageCardProps {
  countryName: string;
  countryCode: string;
  imageSrc?: string;
  flagSrc?: string;
  showFlag?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  featured?: boolean;
  className?: string;
}

export const CountryImageCard = ({
  countryName,
  countryCode,
  imageSrc,
  flagSrc,
  showFlag = true,
  showBadge = false,
  badgeText,
  featured = false,
  className,
}: CountryImageCardProps) => {
  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow",
        className,
      )}
    >
      {/* Main Image */}
      <ImageLoader
        src={imageSrc}
        alt={countryName}
        countryCode={countryCode}
        countryFlag={flagSrc}
        className="w-full h-64 sm:h-80"
        objectFit="cover"
        useLazyLoad={true}
      />

      {/* Flag overlay (bottom) */}
      {showFlag && flagSrc && (
        <div className="absolute bottom-3 left-3 rounded-md overflow-hidden border-2 border-white shadow-md">
          <img src={flagSrc} alt={`Flag of ${countryName}`} className="h-8 w-12 object-cover" />
        </div>
      )}

      {/* Featured Badge */}
      {showBadge && featured && (
        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
          <span>⭐</span>
          <span>{badgeText || "Featured"}</span>
        </div>
      )}

      {/* Hover overlay with country name */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <h3 className="text-white font-semibold text-lg">{countryName}</h3>
      </div>
    </div>
  );
};

/**
 * Responsive Image Gallery Component
 * For displaying must-visit places or image collections
 */
export interface ResponsiveImageGalleryProps {
  images: Array<{
    src?: string;
    alt: string;
    title?: string;
    subtitle?: string;
  }>;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: "small" | "medium" | "large";
  className?: string;
}

export const ResponsiveImageGallery = ({
  images,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "medium",
  className,
}: ResponsiveImageGalleryProps) => {
  const gapClass = {
    small: "gap-2 sm:gap-3",
    medium: "gap-3 sm:gap-4",
    large: "gap-4 sm:gap-6",
  }[gap];

  // Build grid class dynamically
  const getGridClass = () => {
    const mobileClass = columns.mobile === 1 ? "grid-cols-1" : "grid-cols-2";
    const tabletMap: Record<number, string> = {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
    };
    const desktopMap: Record<number, string> = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
    };

    return `${mobileClass} ${tabletMap[columns.tablet ?? 2]} ${desktopMap[columns.desktop ?? 3]}`;
  };

  return (
    <div className={cn(`grid ${getGridClass()}`, gapClass, className)}>
      {images.map((image, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-2 group cursor-pointer overflow-hidden rounded-lg"
        >
          <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-200">
            <ImageLoader
              src={image.src}
              alt={image.alt}
              className="w-full h-full"
              objectFit="cover"
              useLazyLoad={true}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
          {image.title && <h4 className="font-semibold text-sm text-foreground">{image.title}</h4>}
          {image.subtitle && <p className="text-xs text-muted-foreground">{image.subtitle}</p>}
        </div>
      ))}
    </div>
  );
};

export default ImageLoader;
