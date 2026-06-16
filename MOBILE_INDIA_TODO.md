# Mobile India Page Implementation TODO

## Task: Change mobile-view India individual country page to match large device page (packages only)

### Steps Completed:

- [x] 1. Modify mobile-view countries.$code.tsx to add special India handling
- [x] 2. Import INDIA_REGIONS from india-data.ts
- [x] 3. Create impressive region selection view (North, South, East, West, Island)
- [x] 4. Create state-level pages for each region
- [x] 5. Add package cards with pricing
- [x] 6. Test and verify

### Implementation Details:

- Use INDIA_REGIONS from src/lib/india-data.ts
- Show 5 regions: South, North, East, West, Island
- Each region has states with multiple packages
- Make it attractive with modern mobile UI
- Add hero images, gradients, animations

### Key Features:

- Hero section with India image and "Incredible India" title
- Quick stats (5 Regions, 28+ States, 100+ Packages)
- 5 attractive region cards with gradients and icons
- Region → State → Package navigation flow
- State-level packages with images, highlights, pricing
- Add to cart functionality
- "Why Choose Vicky Ryoko?" section
- CTA buttons for booking
