# Implementation Plan: International Travel Packages

## Task Summary

Add attractive and impressive web pages for international destinations with the provided pricing data.

## Provided Data

| Destination          | Duration  | Price                | Details / Notes  |
| -------------------- | --------- | -------------------- | ---------------- |
| Thailand             | 3N / 4D   | ₹19,999              | Without Flight   |
| Singapore & Malaysia | 5N / 6D   | ₹70,000              | Standard Package |
| Singapore & Malaysia | 7N / 8D   | ₹1,17,000            | With Cruise      |
| Azerbaijan (Baku)    | 5N / 6D   | ₹49,999 per person   | —                |
| Indonesia (Bali)     | —         | ₹45,000 per person   | —                |
| Turkey               | 5N / 6D   | ₹1,99,999 per person | —                |
| Dubai                | 5N / 6D   | ₹69,500 per person   | +5% Tax          |
| Scotland & London    | 6N / 7D   | ₹2,00,000 per person | —                |
| Andaman              | 4N / 5D   | ₹22,999 per person   | —                |
| Maldives             | 4N / 5D   | ₹3,00,000 per person | —                |
| China                | 9N / 10D  | ₹1,99,999 per person | —                |
| Europe               | 13N / 14D | ₹3,25,000 per person | —                |
| Sri Lanka            | 5D / 6N   | ₹40,000 per person   | —                |
| Vietnam              | 5N / 6D   | ₹59,999 per person   | —                |
| Cambodia             | 4N / 5D   | ₹59,999 per person   | —                |
| Cambodia             | 5N / 6D   | ₹75,000 per person   | —                |
| Lakshadweep Island   | 4N / 5D   | ₹49,999              | —                |
| Egypt                | 4N / 5D   | ₹59,999 per person   | —                |

## Implementation Steps

### Step 1: Update tourist-data.ts

- Add new destinations (Azerbaijan, Cambodia, Scotland)
- Update existing country packages with new pricing (THA, IDN, SGP, MYS, TUR, ARE, CHN, LKA, VNM, MDV, EGY)
- Add India packages for Andaman and Lakshadweep

### Step 2: Update country pages

- Ensure packages display correctly in countries.$code.tsx
- Add hero images and gallery sections
- Style with attractive gradients and animations

### Step 3: Fix currency conversion (INR vs USD)

- Current system converts USD prices: price \* 83 = INR
- New prices are already in INR, need to handle this differently
- Need to update getPriceDisplay function to handle INR prices

### Countries to Update/Add:

1. **Thailand (THA)** - Already exists, update packages
2. **Indonesia (IDN)** - Already exists, update packages
3. **Singapore (SGP)** - Already exists, add Malaysia combo
4. **Malaysia (MYS)** - Already exists, add combo package
5. **Turkey (TUR)** - Already exists, update packages
6. **Dubai (ARE)** - Already exists, update packages
7. **China (CHN)** - Already exists, update packages
8. **Sri Lanka (LKA)** - Already exists, update packages
9. **Vietnam (VNM)** - Already exists, update packages
10. **Maldives (MDV)** - Already exists, update packages
11. **Egypt (EGY)** - Already exists, update packages
12. **Azerbaijan (AZE)** - New, add entry
13. **Cambodia (KHM)** - New, add entry
14. **Scotland (GBR)** - Part of UK, create special entry

### India Destinations to Add:

- Andaman (IND)
- Lakshadweep (IND)

## File Changes Required

### 1. src/lib/tourist-data.ts

- Add new country guides with packages
- Update existing packages with new pricing
- Handle INR vs USD pricing

### 2. src/lib/countries.ts (if needed)

- Add new country entries (AZE, KHM)

## Notes

- Prices are in Indian Rupees (₹)
- Need to modify price display logic to not multiply by 83
- Packages should show "per person" where applicable
- Some destinations have flight exclusions noted
- Dubai has 5% tax to add to displayed price
