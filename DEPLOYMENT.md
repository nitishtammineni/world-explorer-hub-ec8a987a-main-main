# World Explorer Hub - Netlify Deployment Guide

## Project Summary

**Framework**: TanStack Start (Full-stack React framework with SSR)
**Routing**: TanStack React Router  
**Build Tool**: Vite
**UI**: Radix UI + TailwindCSS v4

## ✅ Issues Fixed

1. **netlify.toml function path** - Changed from `dist/server` to `functions`
2. **functions/server.js** - Fixed import to use @tanstack/react-start
3. **SPA redirects** - Properly configured in \_redirects file
4. **Postbuild script** - Simplified to copy \_redirects and public assets

## Final Folder Structure

```
dist/
└── client/                    # Client-side static assets
    ├── index.html            # Main HTML entry point
    ├── _redirects          # SPA redirects (for client-side routing)
    └── assets/             # JS/CSS bundles

functions/
└── server.js               # Netlify SSR Function handler
    └── assets/            # Server bundle
```

## Build Commands

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

**Build command**: `npm run build`
**Expected output**:

- Client assets: `dist/client/`
- Functions: `functions/`

## Netlify Configuration (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist/client"
  functions = "functions"

[build.environment]
  NODE_VERSION = "22"

[dev]
  command = "npm run dev"
  port = 3000
  targetPort = 3000

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.headers]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## SPA Routing (\_redirects)

```
# SPA Routing Redirects for Netlify
# All routes should serve index.html for client-side routing
/* /index.html 200
```

## Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Push to Git

```bash
git add .
git commit -m "Fix Netlify deployment configuration"
git push
```

### 4. Connect to Netlify

- Go to https://app.netlify.com
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repository
- Netlify auto-detects settings from netlify.toml

### 5. Deploy

- Netlify runs: `npm run build`
- Publish directory: `dist/client`
- Functions: `functions`

## Routes Supported

The application has these routes:

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/services` - Services page
- `/countries` - Countries list
- `/countries/:code` - Country details
- `/visa` - Visa information
- `/passport` - Passport services
- `/cart` - Shopping cart

## Troubleshooting

### Blank Page After Deployment

1. ✅ Verify `dist/client/` directory exists after build
2. ✅ Check that `_redirects` is in `dist/client/`
3. ✅ Ensure netlify.toml has `publish = "dist/client"`

### 404 on Refresh

1. ✅ Verify SPA redirects are configured in \_redirects file
2. ✅ Ensure redirect rule: `/* /index.html 200`

### Assets Not Loading

1. ✅ Check that assets are in `dist/client/assets/`
2. ✅ Verify relative paths are correct
3. ✅ Check browser console for 404 errors

### Function Errors

1. ✅ Verify functions path is `functions` in netlify.toml
2. ✅ Check Netlify Functions log in dashboard

## Environment Variables

If your app uses environment variables, add them in Netlify dashboard:

- Site settings → Environment Variables

Common variables:

- VITE_API_URL - API endpoint (if needed)

## Performance Notes

- The build uses Vite for fast bundling
- TanStack Start provides SSR/SSG capabilities
- Assets are optimized and hashed for caching
- TailwindCSS is purged in production
