# TODO - Folder-based Image Automation Enhancements

## Step 1

- [ ] Fix `src/hooks/useImageManager.tsx` to actually load `/images/manifest.json`
- [ ] Populate context state:
  - [ ] `collection`
  - [ ] `countryMappings` (mainImage, cardImages, mustVisitImages, hasMustVisit)
- [ ] Ensure `getImageUrl()` works for all mapped images

## Step 2

- [ ] Add strict Star allowlist (actual countries only)
- [ ] Implement allowlist check using exact match against `country.name.common` (case-insensitive)
- Allowlisted countries:
  - Thailand
  - China
  - Turkey
  - Vietnam
  - Indonesia
  - Singapore & Malaysia
  - Azerbaijan (Baku)
  - Dubai
  - Scotland & London
  - Andaman
  - Maldives
  - Lakshadweep Island
  - Sri Lanka
  - Cambodia
  - Europe
  - Egypt

## Step 3

- [ ] Update Explore Countries page: `src/routes/countries.index.tsx`
- [ ] Remove star badge for all countries by default
- [ ] Show star only for allowlisted exact matches

## Step 4

- [ ] Update Home (desktop): `src/components/home/DesktopHome.tsx`
- [ ] Replace featured card image sources:
  - [ ] use folder-based main country image via image mappings
  - [ ] keep layout wrappers/classes unchanged
- [ ] Add flag below the main country image (not overlay), while preserving sizing
- [ ] Star badge only for allowlisted exact matches

## Step 5

- [ ] Update Home (mobile): `src/components/home/MobileHome.tsx`
- [ ] Replace featured card image sources with folder-based main country images
- [ ] Star badge only for allowlisted exact matches

## Step 6

- [ ] Update Country detail page: `src/routes/countries.$code.tsx`
- [ ] Replace Must-visit section logic:
  - [ ] If `hasMustVisit` is false => remove section entirely (no gaps/placeholders)
  - [ ] If `hasMustVisit` is true => render must-visit cards/images from mapping
- [ ] Add flag below main country image (DOM change only; preserve responsive classes)
