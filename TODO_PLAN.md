# Mobile Country Page Updates Plan

## Task Summary

1. Show packages for ALL countries EXCEPT India
2. Add Cart button and WhatsApp proceed button (right arrow) in one row
3. Cart button w-8 and proceed button w-4

## Implementation Steps

### Step 1: Modify SECTION 4 - Show packages for all countries except India

- Change condition from `{c.cca3 === "IND" && guide?.packages?.length ? (`
- To: `{c.cca3 !== "IND" && guide?.packages?.length ? (`

### Step 2: Update package card layout

- Replace single "Book" button with two-button row
- Cart button (ShoppingCart icon, w-8) - adds to cart
- Proceed button (ArrowRight icon, w-4) - redirects to WhatsApp

### Step 3: Add WhatsApp redirect functionality

- Use existing WhatsApp number: 918639888490
- Format message with package details
- Open wa.me link in new tab

## Files to Edit

- src/routes/mobile-view/countries.$code.tsx
