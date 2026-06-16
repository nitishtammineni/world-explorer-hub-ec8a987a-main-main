# India Images Update TODO

## Task Summary
Replace broken Wikimedia image URLs with working Unsplash URLs in the India travel data.

## Status: ✅ COMPLETED

## Images Replaced
The following Wikimedia URLs were replaced with working Unsplash URLs:

### South India Region
- [x] Amaravati Stupa
- [x] Tirumala Temple
- [x] Vijayawada (Prakasam Barrage)
- [x] Srisailam Temple
- [x] Konda Reddy Fort (Kurnool)
- [x] Rajahmundry (Godavari Bridge)
- [x] Yanam French Colony
- [x] Telangana (Charminar)
- [x] Puducherry Beach

### North India Region
- [x] Delhi (India Gate)
- [x] Uttar Pradesh (Taj Mahal)
- [x] Agra (Taj Mahal)
- [x] Rajasthan (Hawa Mahal)
- [x] Punjab (Golden Temple)
- [x] Uttarakhand (Kedarnath)
- [x] Bihar (Mahabodhi Temple)

### East India Region
- [x] Odisha (Konark Sun Temple)
- [x] West Bengal (Victoria Memorial)
- [x] Sikkim (Gurudongmar Lake)
- [x] Arunachal Pradesh (Tawang Monastery)
- [x] Assam & Meghalaya (Living root bridge)
- [x] Nagaland Hills
- [x] Manipur (Loktak Lake)
- [x] Mizoram (Aizawl)
- [x] Tripura (Ujjayanta Palace)

### West India Region
- [x] Gujarat (Statue of Unity)
- [x] Madhya Pradesh (Khajuraho)
- [x] Chhattisgarh (Chitrakote Falls)

### Island Region
- [x] Andaman & Nicobar (Radhanagar Beach)
- [x] Lakshadweep Islands

## Changes Made
- File: `src/lib/india-data.ts`
- All 41+ broken Wikimedia URLs replaced with working Unsplash URLs
- Images optimized for web with proper width parameters (w=800 for packages, w=1200 for state images)

## Verification
- Searched for remaining Wikimedia URLs: 0 results found
- All images now use images.unsplash.com CDN
