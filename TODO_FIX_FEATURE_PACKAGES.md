# TODO: Fix Feature Packages, Images and Countries Not Loading

## Status: CANCELLED (UNDONE)

## Information Gathered:
1. Main index.tsx gets countries from external API (restcountries.com) via getAllCountries()
2. tourist-data.ts contains GUIDES with detailed country data (places, packages) - NOT being used
3. international-packages.ts has INTERNATIONAL_PACKAGES - NOT being displayed
4. mobile-view uses hardcoded featuredPackages with incomplete image data

## Root Cause:
The tourist-data.ts (GUIDES) and international-packages.ts are not integrated into the home page.

## Plan:
1. [IN PROGRESS] Modify src/routes/index.tsx to:
   - Import GUIDES from tourist-data.ts
   - Import INTERNATIONAL_PACKAGES from international-packages.ts  
   - Add Featured Packages section using international packages
   - Add countries from tourist-data.ts alongside external API data

2. [PENDING] Update mobile-view/index.tsx to use international-packages.ts data

3. [PENDING] Fix image paths for featured packages

## Dependent Files:
- src/routes/index.tsx
- src/routes/mobile-view/index.tsx
- src/lib/country-images.ts

## Followup Steps:
- Test the changes
- Verify packages display correctly
- Check images load properly
