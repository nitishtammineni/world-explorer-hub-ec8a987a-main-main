# Image Automation System - Integration Guide

## Overview

This guide explains how to integrate the advanced image automation system into your existing pages and components.

## Core Architecture

### 1. **Image Detection Layer** (`src/lib/image-detector.ts`)

Automatically scans the `images/` folder recursively to find all images.

**Key Functions:**

- `detectAllImages()` - Scans all folders and returns organized image collection
- `getCountryImages(code, collection)` - Get images for a specific country
- `getMustVisitImages(code, collection)` - Get must-visit place images
- `hasMustVisitImages(code, collection)` - Check if must-visit section should display

### 2. **Image Mapper** (`src/lib/image-mapper.ts`)

Maps countries to their images using fuzzy matching.

**Key Functions:**

- `mapCountryImages(country, collection)` - Map single country
- `mapAllCountriesToImages(countries, collection)` - Map all countries
- `findImageMatch(country, collection)` - Fuzzy matching logic

### 3. **Image Service** (`src/lib/image-service.ts`)

Provides URL generation and utility functions.

**Key Functions:**

- `getImageUrl(image)` - Get public path for image
- `getFlagUrl(countryCode)` - Get flag image URL
- `selectImage(images, priority)` - Select best image for purpose

### 4. **React Components**

#### Home Page Components (`src/components/HomeImageComponents.tsx`)

- `HomeCountryCard` - Single country card with image and flag
- `FeaturedCountriesGrid` - Grid for featured countries (with star badges)
- `AllCountriesGrid` - Grid for all countries (explore page)
- `HomePackageCard` - Package feature card with image

#### Country Detail Page Components (`src/components/CountryDetailImageComponents.tsx`)

- `CountryHeroImage` - Hero image with flag badge
- `MustVisitSection` - Conditional must-visit gallery (auto-hidden if no images)
- `CountryIntroSection` - Country info with stats
- `EmptySection` - Fallback for missing sections

### 5. **Image Loader Component** (`src/components/ImageLoader.tsx`)

Smart image component with lazy loading and fallbacks.

**Features:**

- Lazy loading with Intersection Observer
- Automatic fallback chains (local → flag → placeholder)
- Responsive aspect ratios
- Loading skeletons

## Integration Steps

### Step 1: Generate Image Manifest (Build Time)

Add to your build process:

```bash
npm run generate:images
```

This creates `images/manifest.json` with all available images.

**Updated in `package.json`:**

```json
{
  "scripts": {
    "build": "node scripts/generate-image-manifest.js && vite build && ...",
    "generate:images": "node scripts/generate-image-manifest.js"
  }
}
```

### Step 2: Update Home Page (`src/routes/index.tsx`)

Replace hardcoded image imports with dynamic components:

```tsx
import { FeaturedCountriesGrid } from "@/components/HomeImageComponents";
import { detectAllImages } from "@/lib/image-detector";
import { mapAllCountriesToImages } from "@/lib/image-mapper";
import { getAllCountries, FEATURED_CCA3 } from "@/lib/countries";

export function HomePage() {
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
  });

  const imageCollection = detectAllImages(); // Run at build time or cache
  const imageMappings = mapAllCountriesToImages(countries ?? [], imageCollection);

  return (
    <>
      {/* Featured section */}
      <FeaturedCountriesGrid
        countries={countries ?? []}
        imageMapping={imageMappings}
        featuredCountryCodes={FEATURED_CCA3}
        onCountryClick={(country) => navigate({ to: `/countries/${country.cca3.toLowerCase()}` })}
      />
    </>
  );
}
```

### Step 3: Update Explore Countries Page (`src/routes/countries.index.tsx`)

Replace grid with dynamic component:

```tsx
import { AllCountriesGrid } from "@/components/HomeImageComponents";
import { detectAllImages } from "@/lib/image-detector";
import { mapAllCountriesToImages } from "@/lib/image-mapper";
import { FEATURED_CCA3 } from "@/lib/countries";

function CountriesPage() {
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
  });

  const imageCollection = detectAllImages();
  const imageMappings = mapAllCountriesToImages(countries ?? [], imageCollection);

  return (
    <AllCountriesGrid
      countries={filtered} // Your filtered list
      imageMapping={imageMappings}
      featuredCountryCodes={FEATURED_CCA3}
      onCountryClick={(country) => navigate({ to: `/countries/${country.cca3.toLowerCase()}` })}
      columnsDesktop={4}
      columnsMobile={2}
    />
  );
}
```

### Step 4: Update Country Detail Page (`src/routes/countries.$code.tsx`)

Replace existing content with new components:

```tsx
import { CountryHeroImage, MustVisitSection } from "@/components/CountryDetailImageComponents";
import { detectAllImages } from "@/lib/image-detector";
import { mapCountryImages } from "@/lib/image-mapper";

function CountryDetailPage() {
  const { code } = useParams();
  const { data: country } = useQuery({
    queryKey: ["country", code],
    queryFn: () => getCountryByCode(code),
  });

  const { data: guide } = useQuery({
    queryKey: ["guide", code],
    queryFn: () => getGuide(code),
  });

  const imageCollection = detectAllImages();
  const imageMap = country ? mapCountryImages(country, imageCollection) : null;

  return (
    <>
      {/* Hero section - replaces existing image */}
      {country && <CountryHeroImage country={country} imageMap={imageMap} />}

      {/* Must-visit section - auto-hidden if no images */}
      {country && guide && (
        <MustVisitSection
          country={country}
          imageMap={imageMap}
          places={guide.places}
          onPlaceClick={(place, imageUrl) => console.log(place, imageUrl)}
        />
      )}
    </>
  );
}
```

## File Organization

```
src/
├── lib/
│   ├── image-detector.ts        # Image scanning
│   ├── image-mapper.ts          # Country ↔ image mapping
│   ├── image-service.ts         # URL generation
│   └── image-testing.ts         # Testing utilities
├── components/
│   ├── ImageLoader.tsx          # Smart image component
│   ├── HomeImageComponents.tsx  # Home page components
│   └── CountryDetailImageComponents.tsx # Detail page components
├── hooks/
│   └── useImageManager.tsx      # Image context & hooks
└── routes/
    ├── index.tsx                # Home page (to update)
    ├── countries.index.tsx      # Explore page (to update)
    └── countries.$code.tsx      # Detail page (to update)

images/
├── home page/                   # Home page country cards
│   ├── India-card-1.webp
│   ├── france-card-2.jpg
│   └── ...
├── explore/
│   ├── china/
│   │   ├── china-main-image.webp
│   │   └── must visit/
│   │       ├── great-wall-china-card-1.jpeg
│   │       └── ...
│   └── ...
└── manifest.json (generated at build time)
```

## Key Features

### ✅ Auto Image Detection

- Automatically discovers images in folder structure
- No manual configuration needed
- Supports .jpg, .jpeg, .png, .webp, .svg, .avif

### ✅ Smart Matching

- Fuzzy matches country names to folders
- Handles variations (China, china, CHINA, CHN, etc.)
- Extracts country from image filenames

### ✅ Conditional Must-Visit

- Only shows Must-Visit section if folder and images exist
- Auto-hides sections with no content
- Removes layout gaps automatically

### ✅ Fallback Chain

1. Local image (if folder exists)
2. Country flag (if no local image)
3. Placeholder API (if flag not available)

### ✅ Star Badges

- Only FEATURED_CCA3 countries show star/featured badges
- All other countries display as regular entries
- No stars for non-featured countries on explore page

### ✅ Responsive & Lazy

- Lazy loading with Intersection Observer
- Responsive breakpoints (mobile, tablet, desktop)
- Aspect ratio classes (square, video, auto)
- Preserves existing animations and layouts

### ✅ Scalability

- Add new countries: just create folder with images
- Add new images: drop files in appropriate folder
- No code changes needed for new countries
- Automatic detection and mapping

## Customization

### Changing Featured Countries

Edit `src/lib/countries.ts`:

```ts
export const FEATURED_CCA3 = [
  "THA", // Thailand
  "SGP", // Singapore
  // Add or remove country codes
];
```

### Adjusting Image Selection Priority

Edit `src/lib/image-mapper.ts`:

```ts
// In mapCountryImages function:
const mainImage =
  countryImages.find(
    (img) =>
      img.filename.toLowerCase().includes("main") || img.filename.toLowerCase().includes("hero"),
  ) ?? countryImages[0];
```

### Customizing Fallback Behavior

Edit `src/components/ImageLoader.tsx`:

```tsx
const handleError = () => {
  if (fallbackSrc && imageSrc !== fallbackSrc) {
    setImageSrc(fallbackSrc);
  } else if (countryFlag && imageSrc !== countryFlag) {
    setImageSrc(countryFlag);
  } else {
    setError(true);
  }
};
```

## Testing

### Test Image Detection

```ts
import { testImageDetection, testImageMapping, testFallbacks } from "@/lib/image-testing";

// In console or test file:
const collection = await testImageDetection();
const { mapping, stats } = await testImageMapping(countries);
testFallbacks(mapping);
```

### Manual Testing Checklist

- [ ] Home page shows featured countries with images
- [ ] Explore page shows all countries with images or flags
- [ ] Country detail page displays hero image
- [ ] Must-visit section only shows for countries with images
- [ ] Star badges only on FEATURED_CCA3 countries
- [ ] Lazy loading works (scroll, images load)
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1920px)
- [ ] No broken image links
- [ ] Flags display for countries without images

## Performance Notes

- Image detection runs at build time (for manifest)
- Mapping runs at page load (cached if possible)
- Lazy loading defers image loading until visible
- Flag images are lightweight SVG/PNGs from CDN
- Total JS payload: ~30KB for all utilities

## Troubleshooting

### Images not showing

1. Check `images/manifest.json` was generated
2. Verify folder structure matches country names
3. Ensure image files have supported extensions
4. Check browser console for 404 errors

### Must-Visit not showing

1. Verify `images/explore/{country}/must visit/` folder exists
2. Check folder is named exactly "must visit" or "must-visit"
3. Ensure images are in that folder
4. Check `hasMustVisitImages()` returns true

### Star badges showing for non-featured

1. Verify country code in FEATURED_CCA3
2. Check spelling of country code
3. Review featured badge logic in components

## Next Steps

1. Run `npm run generate:images` to create manifest
2. Update home page with `FeaturedCountriesGrid`
3. Update explore page with `AllCountriesGrid`
4. Update detail page with hero and must-visit components
5. Test all pages on mobile and desktop
6. Deploy with new build script

## Support

For issues or questions:

1. Check console for errors
2. Verify folder structure matches examples
3. Review test utilities output
4. Check component props match your data
