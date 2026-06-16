# TODO: Mobile Individual Country Page Enhancement

## Goal

Enhance the mobile-view individual country page (src/routes/mobile-view/countries.$code.tsx) to match and exceed the desktop version with all sections that exist in the desktop (src/routes/countries.$code.tsx).

## Analysis Summary

### Desktop Sections (countries.$code.tsx)

1. Hero with cinematic image & flag
2. Stats (8 stats: Capital, Population, Region, Languages, Currency, Timezone, Driving side, Dial code)
3. Travel Packages (with tier badges, pricing, highlights, inclusions, add to cart + WhatsApp)
4. Tourist Places (clickable with gallery - opens photos in fullscreen)
5. Details Section:
   - Location map (OpenStreetMap embed)
   - Experiences we craft
   - Time zones
   - Quick links (Google Maps, Wikipedia, OpenStreetMap)
   - Travel Tips (Best time, Currency, Power plugs, Language)
6. Full-screen Gallery with keyboard navigation, thumbnails

### Mobile Current Sections (mobile-view/countries.$code.tsx)

1. Hero with hero image ✅
2. Quick stats (4 stats - incomplete: only Capital, Population, Currency, Language)
3. Discover/About section ✅
4. Packages (less detailed)
5. Must Visit (carousel but NO full gallery/lightbox)
6. Why Choose Us ✅
7. Travel Tips ✅
8. Essential Info ✅
9. Reviews ✅
10. Final CTA ✅

### Missing Sections in Mobile

- Full 8 Stats (missing: Timezone, Driving side, Dial code)
- Full Location Map with OpenStreetMap embed
- Time zones section (appears separately)
- Quick links (Google Maps, Wikipedia, OpenStreetMap)
- Full-screen gallery with keyboard navigation for tourist places
- More detailed packages (need tier badges, inclusions list, more highlights)
- "Experiences we craft" section

---

## Implementation Plan

### Step 1: Enhanced Hero Section

- Add cinematic zoom animation similar to desktop
- Better gradient and overlay styling

### Step 2: Enhanced Stats (8 stats)

Add these missing stats:

- Timezone
- Driving side
- Dial code
- Make it 8 stats grid like desktop

### Step 3: Enhanced Packages Section

- Add tier badges (Premium/Popular/Value)
- Add full inclusions list with checkmarks
- Add pricing with "From" label
- Better card design matching desktop

### Step 4: Enhanced Tourist Places with Gallery

- Make cards clickable
- Add fullscreen gallery modal (like desktop's FullScreenGallery component)
- Add keyboard navigation support
- Add thumbnail strip with current indicator

### Step 5: Add Map Section

- Add OpenStreetMap embed
- Add link to open in Google Maps

### Step 6: Add Experiences Section

- "Experiences we craft in {country}" section similar to desktop

### Step 7: Enhanced Time Zones & Quick Links

- Add time zones section with chips
- Add quick links section (Google Maps, Wikipedia, OpenStreetMap)

### Step 8: Enhanced Travel Tips

- Make it more comprehensive (Best time, Currency, Power plugs, Language)

---

## File to Edit

- `src/routes/mobile-view/countries.$code.tsx`

## Dependencies

- Uses existing icons from lucide-react (already imported)
- Uses existing MobileViewLayout component
- Uses existing utilities (getAllCountries, formatNumber, etc.)
- Uses existing tourist-data (getGuide, unsplash, getGalleryImages)

---

## Estimated Complexity

- Major enhancement requiring rewrite of the MobileCountryView component
- Adding ~300 lines of new features
- Will create a more advanced, powerful, and attractive mobile page
