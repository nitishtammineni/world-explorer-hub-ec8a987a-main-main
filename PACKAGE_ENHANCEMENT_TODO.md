# Package Enhancement TODO

## Task Status: IN PROGRESS

Replace individual country packages with ONE single package per country with custom prices and details.

## Files Created

- ✅ src/lib/country-packages.ts - Contains all custom packages with exact pricing (DONE package per destination)

## Next Steps

- [ ] 1. Import getCustomPackage in desktop countries.$code.tsx
- [ ] 2. Import getCustomPackage in mobile countries.$code.tsx
- [ ] 3. Update packages section to use custom packages when available
- [ ] 4. Ensure enhanced card displays correctly

## Provided Data (Already in country-packages.ts)

| Destination          | Duration  | Price                | Details / Notes  |
| -------------------- | --------- | -------------------- | ---------------- |
| Thailand             | 3N / 4D   | ₹19,999              | Without Flight   |
| Singapore & Malaysia | 5N / 6D   | ₹70,000              | Standard Package |
| Singapore & Malaysia | 7N / 8D   | ₹1,17,000            | With Cruise      |
| Azerbaijan (Baku)    | 5N / 6D   | ₹49,999 per person   | —                |
| Indonesia (Bali)     | 5N / 6D   | ₹45,000 per person   | —                |
| Turkey               | 5N / 6D   | ₹1,99,999 per person | —                |
| Dubai                | 5N / 6D   | ₹69,500 per person   | +5% Tax          |
| Scotland & London    | 6N / 7D   | ₹2,00,000 per person | —                |
| Andaman              | 4N / 5D   | ₹22,999 per person   | —                |
| Maldives             | 4N / 5D   | ₹3,00,000 per person | —                |
| China                | 9N / 10D  | ₹1,99,999 per person | —                |
| Europe               | 13N / 14D | ₹3,25,000 per person | —                |
| Sri Lanka            | 5N / 6D   | ₹40,000 per person   | —                |
| Vietnam              | 5N / 6D   | ₹59,999 per person   | —                |
| Cambodia             | 4N / 5D   | ₹59,999 per person   | —                |
| Cambodia             | 5N / 6D   | ₹75,000 per person   | —                |
| Lakshadweep Island   | 4N / 5D   | ₹49,999              | —                |
| Egypt                | 4N / 5D   | ₹59,999 per person   | —                |
