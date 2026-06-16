# Tour Packages Redesign Plan

## Task Overview

Remove existing region-based tour packages and create 5 new categories:

1. Individual Tours
2. Family Packages
3. Group Tours
4. Bike Riders
5. Backpacking

Each must have individual pages with impressive content and design.

## Information Gathered

### Current Structure:

- `src/routes/packages.tsx` - Main desktop packages page
- `src/routes/mobile-packages.tsx` - Mobile packages by region
- `src/routes/mobile-view/packages.tsx` - Mobile view packages
- `src/lib/tourist-data.ts` - Contains country guides and packages data
- Uses Tailwind CSS with custom animations in `src/styles.css`

### Key Components:

- Uses lucide-react icons
- MobileLayout and MobileViewLayout components
- Link from @tanstack/react-router
- Image generation: unsplash() function using picsum.photos

## Plan

### Step 1: Update Main Packages Page

Update `src/routes/packages.tsx` to feature 5 new package types with navigation to individual pages.

### Step 2: Create Individual Package Pages

Create separate pages for each package type:

- `src/routes/package-individual.tsx` - Solo traveler packages
- `src/routes/package-family.tsx` - Family vacation packages
- `src/routes/package-group.tsx` - Group tour packages
- `src/routes/package-bike.tsx` - Motorcycle/biking packages
- `src/routes/package-backpack.tsx` - Backpacking long-term packages

### Step 3: Update Mobile Packages

- Update `src/routes/mobile.packages.tsx` to show the 5 types
- Create corresponding mobile individual pages

### Step 4: Add Rich Content & Images

Each page should include:

- Hero section with background image
- Feature highlights
- Pricing packages
- Itinerary samples
- Gallery images
- CTA buttons

## Package Type Definitions

### Individual Tours

Solo adventures with flexible itineraries, personal guides, custom schedules

### Family Packages

Kid-friendly destinations, comfortable accommodations, fun activities for all ages

### Group Tours

Team building, corporate retreats, school trips, large group discounts

### Bike Riders

Motorcycle tours, cycling expeditions, bike-friendly routes

### Backpacking

Long-duration, budget-friendly, multiple destinations, local transport, flexible schedules
