# TODO: Block Mobile-View on Medium and Large Devices

## Task

Prevent mobile-view from displaying on medium (tablet) and large (desktop) devices. Redirect users to desktop versions.

## Implementation Steps

### Step 1: Modify MobileViewLayout ✅

- Added device detection using useIsMobile hook
- Added redirection logic for medium/large devices
- File: `src/routes/mobile-view/-MobileViewLayout.tsx`

### Route Mapping:

- `/mobile-view` → `/`
- `/mobile-view/about` → `/about`
- `/mobile-view/contact` → `/contact`
- `/mobile-view/cart` → `/cart`
- `/mobile-view/countries` → `/countries`
- `/mobile-view/packages` → `/packages`
- `/mobile-view/passport` → `/passport`
- `/mobile-view/visa` → `/visa`
- `/mobile-view/services` → `/services`
- `/mobile-view/international` → `/packages`

## Status: COMPLETED ✅
