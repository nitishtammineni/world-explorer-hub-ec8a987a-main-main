# Undo Today - Plan

## Status: COMPLETED

## Plan
1. [COMPLETED] Edit src/routes/index.tsx to:
   - Removed import of INTERNATIONAL_PACKAGES
   - Removed Featured Packages section
   - Removed GUIDES import
   - Removed unused imports (getPackageById)
   
2. [SKIPPED] Edit src/routes/mobile-view/index.tsx to:
   - Kept as-is (uses its own hardcoded packages data)

3. [COMPLETED] Updated TODO_FIX_FEATURE_PACKAGES.md status to CANCELLED (UNDONE)

## Summary of Changes in src/routes/index.tsx:
- Removed INTERNATIONAL_PACKAGES import
- Removed GUIDES/getGuide import from tourist-data
- Removed getPackageById import
- Removed Featured Packages section
- Removed Plane icon from imports (then added back for CTA)

## Followup Steps
- Verify pages render correctly
- No reference errors
