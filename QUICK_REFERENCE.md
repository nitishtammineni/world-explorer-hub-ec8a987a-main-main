# 🚀 IMAGE AUTOMATION SYSTEM - QUICK REFERENCE

## File Locations & Quick Access

### Core Utilities

```typescript
// Detect images from folders
import { detectAllImages, getCountryImages, hasMustVisitImages } from "@/lib/image-detector";

// Map countries to images
import { mapCountryImages, mapAllCountriesToImages } from "@/lib/image-mapper";

// Get image URLs
import { getImageUrl, getFlagUrl, getPlaceholderUrl } from "@/lib/image-service";
```

### React Components

```tsx
// Smart image loader with lazy loading
import { ImageLoader, CountryImageCard, ResponsiveImageGallery } from "@/components/ImageLoader";

// Home/Explore page components
import {
  HomeCountryCard,
  FeaturedCountriesGrid,
  AllCountriesGrid,
} from "@/components/HomeImageComponents";

// Country detail page components
import {
  CountryHeroImage,
  MustVisitSection,
  CountryIntroSection,
} from "@/components/CountryDetailImageComponents";
```

---

## Command Reference

```bash
# Generate image manifest (required at build time)
npm run generate:images

# Build with automatic manifest generation
npm run build

# Local development
npm run dev

# Preview production build
npm run preview
```

---

## Common Code Patterns

### Pattern 1: Home Page Featured Grid

```tsx
import { FeaturedCountriesGrid } from "@/components/HomeImageComponents";
import { detectAllImages } from "@/lib/image-detector";
import { mapAllCountriesToImages } from "@/lib/image-mapper";
import { FEATURED_CCA3 } from "@/lib/countries";

const collection = detectAllImages();
const mappings = mapAllCountriesToImages(countries, collection);

<FeaturedCountriesGrid
  countries={countries}
  imageMapping={mappings}
  featuredCountryCodes={FEATURED_CCA3}
  onCountryClick={(c) => navigate(`/countries/${c.cca3}`)}
/>;
```

### Pattern 2: Explore Page All Countries Grid

```tsx
import { AllCountriesGrid } from "@/components/HomeImageComponents";
import { FEATURED_CCA3 } from "@/lib/countries";

const collection = detectAllImages();
const mappings = mapAllCountriesToImages(filtered, collection);

<AllCountriesGrid
  countries={filtered}
  imageMapping={mappings}
  featuredCountryCodes={FEATURED_CCA3}
  columnsDesktop={4}
  columnsMobile={2}
/>;
```

### Pattern 3: Country Detail Hero Image

```tsx
import { CountryHeroImage } from "@/components/CountryDetailImageComponents";
import { mapCountryImages } from "@/lib/image-mapper";

const collection = detectAllImages();
const imageMap = mapCountryImages(country, collection);

<CountryHeroImage country={country} imageMap={imageMap} showFlag={true} />;
```

### Pattern 4: Must-Visit Section (Auto-Hides if No Images)

```tsx
import { MustVisitSection } from "@/components/CountryDetailImageComponents";

<MustVisitSection
  country={country}
  imageMap={imageMap}
  places={guide.places}
  onPlaceClick={(place) => console.log(place)}
/>;

// Returns null automatically if:
// - imageMap is null
// - imageMap.hasMustVisit is false
// - places is empty
```

### Pattern 5: Custom Image Loading

```tsx
import { ImageLoader } from "@/components/ImageLoader";
import { getImageUrl } from "@/lib/image-service";

<ImageLoader
  src={getImageUrl(imageMap.mainImage)}
  alt={country.name.common}
  countryCode={country.cca3}
  useLazyLoad={true}
  objectFit="cover"
  aspectRatio="video"
/>;
```

---

## Key APIs

### Image Detector

```typescript
// Returns all detected images organized by category
detectAllImages(): ImageCollection

// Get images for a country
getCountryImages(code: string, collection: ImageCollection): ImageMetadata[]

// Get must-visit place images
getMustVisitImages(code: string, collection: ImageCollection): ImageMetadata[]

// Check if must-visit should show
hasMustVisitImages(code: string, collection: ImageCollection): boolean

// Get main hero image for country
getCountryMainImage(code: string, collection: ImageCollection): ImageMetadata | undefined
```

### Image Mapper

```typescript
// Map single country to images
mapCountryImages(country: Country, collection: ImageCollection): CountryImageMap

// Map multiple countries
mapAllCountriesToImages(countries: Country[], collection: ImageCollection): Map<string, CountryImageMap>

// Check coverage
getImageCoverageStats(mapping: Map<string, CountryImageMap>): Stats

// Get countries without images
getCountriesWithoutImages(mapping: Map<string, CountryImageMap>): CountryImageMap[]
```

### Image Service

```typescript
// Get public image URL
getImageUrl(image: ImageMetadata | undefined): string | null

// Get country flag URL
getFlagUrl(countryCode: string): string

// Build responsive srcset
buildImageSrcset(imagePath: string, sizes?: number[]): string

// Validate image exists
validateImageExists(imagePath: string): Promise<boolean>
```

---

## Component Props

### ImageLoader

```tsx
<ImageLoader
  src={string}                    // Image URL
  alt={string}                    // Alt text
  fallbackSrc={string}            // Fallback image URL
  countryCode={string}            // For fallback text
  countryFlag={string}            // Flag image URL
  className={string}              // Outer container class
  imageClassName={string}         // Image element class
  useLazyLoad={boolean}           // Default: true
  objectFit="cover" | "contain"   // Default: "cover"
  aspectRatio="square" | "video"  // Default: "video"
  priority={boolean}              // Default: false (disables lazy load)
/>
```

### CountryImageCard

```tsx
<CountryImageCard
  countryName={string} // "Thailand"
  countryCode={string} // "THA"
  imageSrc={string} // Image URL
  flagSrc={string} // Flag image URL
  showFlag={boolean} // Default: true
  showBadge={boolean} // Default: false
  badgeText={string} // "Featured"
  featured={boolean} // Shows star badge
  className={string} // Outer wrapper class
/>
```

### FeaturedCountriesGrid

```tsx
<FeaturedCountriesGrid
  countries={Country[]}                    // All countries
  imageMapping={Map<string, CountryImageMap> | null}  // Image mappings
  featuredCountryCodes={string[]}          // ["THA", "SGP", ...]
  onCountryClick={(country) => void}       // Click handler
  className={string}                       // Grid wrapper class
/>
```

### AllCountriesGrid

```tsx
<AllCountriesGrid
  countries={Country[]}
  imageMapping={Map<string, CountryImageMap> | null}
  featuredCountryCodes={string[]}
  onCountryClick={(country) => void}
  className={string}
  columnsDesktop={number}  // Default: 4
  columnsMobile={number}   // Default: 2
/>
```

### CountryHeroImage

```tsx
<CountryHeroImage
  country={Country}
  imageMap={CountryImageMap | null}
  className={string}
  showFlag={boolean} // Default: true
/>
```

### MustVisitSection

```tsx
<MustVisitSection
  country={Country}
  imageMap={CountryImageMap | null}
  places={TouristPlace[]}
  onPlaceClick={(place, imageUrl) => void}
  className={string}
/>
```

### ResponsiveImageGallery

```tsx
<ResponsiveImageGallery
  images={Array<{ src?, alt, title?, subtitle? }>}
  columns={{
    mobile: number,   // Default: 1
    tablet: number,   // Default: 2
    desktop: number,  // Default: 3
  }}
  gap="small" | "medium" | "large"  // Default: "medium"
  className={string}
/>
```

---

## Data Types

```typescript
// Image file metadata
type ImageMetadata = {
  filename: string;
  fullPath: string;
  relativePath: string;
  extension: string;
  size: number;
  category: "home" | "country" | "must-visit" | "other";
  country?: string;
  type?: string;
};

// Organized image collection
type ImageCollection = {
  homePageImages: ImageMetadata[];
  countryImages: Map<string, ImageMetadata[]>;
  mustVisitImages: Map<string, ImageMetadata[]>;
  allImages: ImageMetadata[];
};

// Country ↔ image mapping
type CountryImageMap = {
  countryCode: string;
  countryName: string;
  mainImage?: ImageMetadata;
  cardImages: ImageMetadata[];
  mustVisitImages: ImageMetadata[];
  hasImages: boolean;
  hasMustVisit: boolean;
};
```

---

## Folder Structure Expected

```
images/
├── home page/
│   ├── India-card-1.webp
│   ├── france-card-2.jpg
│   └── ...
├── explore/
│   ├── china/
│   │   ├── china-main-image.webp
│   │   └── must visit/  (note: "must visit" with space)
│   │       ├── great-wall-card-1.jpeg
│   │       └── ...
│   ├── thailand/
│   │   ├── thailand-main-image.webp
│   │   └── must-visit/  (or "must-visit" with dash)
│   │       └── ...
│   └── ...
└── manifest.json (generated)
```

---

## Featured Countries Configuration

```typescript
// src/lib/countries.ts
export const FEATURED_CCA3 = [
  "THA", // Thailand ⭐
  "SGP", // Singapore ⭐
  "MYS", // Malaysia ⭐
  "AZE", // Azerbaijan ⭐
  "IDN", // Indonesia ⭐
  "TUR", // Turkey ⭐
  "ARE", // UAE ⭐
  "GBR", // UK ⭐
  "IND", // India ⭐
  "MDV", // Maldives ⭐
];
```

Only countries in this array show star badges. Edit to customize.

---

## Debugging Commands

```typescript
// In browser console

// Test image detection
import { testImageDetection } from "@/lib/image-testing";
await testImageDetection(); // See all detected images

// Test image mapping
import { testImageMapping } from "@/lib/image-testing";
const { mapping, stats } = await testImageMapping(countries);
console.log(stats); // Coverage statistics

// Test fallbacks
import { testFallbacks } from "@/lib/image-testing";
testFallbacks(mapping); // Countries without images

// Get image for country
import { detectAllImages } from "@/lib/image-detector";
import { mapCountryImages } from "@/lib/image-mapper";
const collection = detectAllImages();
const map = mapCountryImages(countryObject, collection);
console.log(map);
```

---

## Performance Tips

1. **Lazy Loading**: Always set `useLazyLoad={true}` (default) for below-fold images
2. **Build Manifest**: Run `npm run generate:images` before production build
3. **Flag CDN**: Flag images are ~5KB, served from fast CDN
4. **Bundle Size**: System adds ~30KB to bundle (one-time)
5. **Intersection Observer**: Automatically falls back for older browsers

---

## Common Issues & Solutions

| Issue                  | Solution                                      |
| ---------------------- | --------------------------------------------- |
| Images blank           | Run `npm run generate:images`                 |
| Must-visit not showing | Check folder is `must visit` or `must-visit`  |
| Wrong stars appearing  | Verify FEATURED_CCA3 array country codes      |
| Not responsive         | Check Tailwind config includes new classNames |
| Slow loading           | Verify lazy loading enabled (check DevTools)  |
| Flags not showing      | Check flagcdn.com is accessible               |

---

## External Resources

- **Flag Images**: https://flagcdn.com/
- **Fallback API**: Unsplash (built-in)
- **Lazy Loading**: Intersection Observer API
- **Responsive**: Tailwind CSS grid utilities

---

## Version Info

```
System: Advanced Image Automation v1.0
Stack: React 19 + TypeScript 5.8 + Tailwind 4
Browsers: 80+ (with graceful fallbacks)
Bundle: ~30KB (gzipped)
```

---

**Last Updated**: May 23, 2026  
**Status**: Production Ready ✅
