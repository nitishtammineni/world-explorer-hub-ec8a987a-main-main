# Europe Images 404 Fix Plan

## Problem
Multiple European country image references in `country-images.ts` point to images that don't exist in `public/images/explore`, causing
404 errors in the browser console and broken image displays.

## Affected Countries (with non-existent image paths)
- Italy (ITA) - `/images/explore/italy/colosseum-card.jpg`
- Spain (ESP) - `/images/explore/spain/sagrada-familia-card.jpg`
- Germany (DEU) - `/images/explore/germany/brandenburg-gate-card.jpg`
- Greece (GRC) - `/images/explore/greece/santorini-card.jpg`
- Portugal (PRT) - `/images/explore/portugal/lisbon-guide-card.jpg`
- Netherlands (NLD) - `/images/explore/netherlands/amsterdam-canals-card.jpg`
- Austria (AUT) - `/images/explore/austria/vienna-opera-card.jpg`
- Ireland (IRL) - `/images/explore/ireland/cliffs-of-moher-card.jpg`
- Iceland (ISL) - `/images/explore/iceland/aurora-borealis-card.jpg`
- Norway (NOR) - `/images/explore/norway/fjords-card.jpg`
- Sweden (SWE) - `/images/explore/sweden/stockholm-card.jpg`
- Denmark (DNK) - `/images/explore/denmark/copenhagen-card.jpg`
- Finland (FIN) - `/images/explore/finland/helsinki-card.jpg`
- Poland (POL) - `/images/explore/poland/krakow-card.jpg`
- Croatia (HRV) - `/images/explore/croatia/dubrovnik-card.jpg`
- Czech Republic (CZE) - `/images/explore/czech-republic/prague-card.jpg`
- Hungary (HUN) - `/images/explore/hungary/budapest-card.jpg`
- Belgium (BEL) - `/images/explore/belgium/brussels-card.jpg`

## Current Image Folders That DO Exist
- azerbaijan/
- cambodia/
- china/
- dubai/
- egypt/
- indonesia/
- malaysia/
- maldives/
- singapore/
- sri lanka/
- thailand/
- turkey/
- united kingdom/
- vietnam/

## Solution
Remove the image entries for European countries that don't have actual image files. The app's fallback mechanism (country
flags from flagcdn.com) will automatically be used instead.

## Keep These Countries (they have valid image paths)
- THA (Thailand) - ✓
- SGP (Singapore) - ✓
- MYS (Malaysia) - ✓
- AZE (Azerbaijan) - ✓
- IDN (Indonesia) - ✓
- TUR (Turkey) - ✓
- ARE (UAE) - ✓
- GBR (United Kingdom) - ✓
- IND (India) - ✓
- MDV (Maldives) - ✓
- EGY (Egypt) - ✓
- KHM (Cambodia) - ✓
- VNM (Vietnam) - ✓
- CHN (China) - ✓
- LKA (Sri Lanka) - ✓
- CHE (Switzerland) - uses feature-packages (valid)
- FRA (France) - uses feature-packages (valid)

## Steps
1. Edit `src/lib/country-images.ts`
2. Remove all European country entries that reference non-existent `/images/explore/xxx/` paths
3. Keep entries only for countries that have actual image files in public/images/explore
