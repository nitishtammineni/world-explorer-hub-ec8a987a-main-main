# Mobile View Implementation TODO

## Task: Update all tour package pages to use MobileViewLayout

Steps completed:

- [x] Analyzed codebase structure and understood requirements
- [x] Confirmed MobileViewLayout already has showBack/onBack support

Steps to do:

- [ ] Update packages.tsx to use MobileViewLayout
- [ ] Update package-individual.tsx to use MobileViewLayout
- [ ] Update package-family.tsx to use MobileViewLayout
- [ ] Update package-group.tsx to use MobileViewLayout
- [ ] Update package-bike.tsx to use MobileViewLayout
- [ ] Update package-backpack.tsx to use MobileViewLayout

## Implementation Notes:

- MobileViewLayout from `/mobile-view/-MobileViewLayout.tsx` already supports:
  - showBack: boolean - shows back button in header
  - onBack: () => void - custom back click handler
  - title: string - page title in header
  - Built-in bottom navigation bar
- Each package page will:
  1. Import MobileViewLayout
  2. Wrap content in MobileViewLayout with appropriate props
  3. Remove custom header and bottom nav code
  4. Keep existing package data and UI components
