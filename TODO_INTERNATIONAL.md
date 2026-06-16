# International Destinations Implementation Plan

## Task

Add/update international travel destinations with INR pricing to make them attractive mobile-view pages.

## Destinations to Add/Update

### From Provided Data (prices in INR):

1. Thailand - ₹19,999 (3N/4D, Without Flight)
2. Singapore & Malaysia - ₹70,000 (5N/6D, Standard), ₹1,17,000 (7N/8D, With Cruise)
3. Azerbaijan (Baku) - ₹49,999 (5N/6D)
4. Indonesia (Bali) - ₹45,000 per person
5. Turkey - ₹1,99,999 per person (5N/6D)
6. Dubai - ₹69,500 per person +5% Tax (5N/6D)
7. Scotland & London - ₹2,00,000 per person (6N/7D)
8. Andaman - ₹22,999 per person (4N/5D)
9. Maldives - ₹3,00,000 per person (4N/5D)
10. China - ₹1,99,999 per person (9N/10D)
11. Europe - ₹3,25,000 per person (13N/14D)
12. Sri Lanka - ₹40,000 per person (5N/6D)
13. Vietnam - ₹59,999 per person (5N/6D)
14. Cambodia - ₹59,999 (4N/5D), ₹75,000 (5N/6D)
15. Lakshadweep Island - ₹49,999 (4N/5D)
16. Egypt - ₹59,999 per person (4N/5D)

## Files to Update:

1. src/lib/tourist-data.ts - Add complete destination data
2. src/routes/mobile-view/countries.index.tsx - Ensure featured section

## Implementation Steps:

- [x] 1. Update tourist-data.ts with all destinations
- [x] 2. Add proper Unsplash image queries for each destination
- [x] 3. Ensure mobile-view pages display packages attractively
- [x] 4. Test the implementation

## Files Created:

- src/lib/international-packages.ts - All international packages data with INR pricing
- src/routes/mobile-view/international.tsx - Mobile-view page for international packages

## Features:

- Hero section with attractive background
- Destination filter by region
- Package cards with price display (INR)
- Duration, highlights, and inclusions
- Book Now CTA buttons
- Why Choose Us section
