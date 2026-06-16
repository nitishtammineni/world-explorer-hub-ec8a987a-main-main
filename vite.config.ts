import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Set public directory for static assets
  publicDir: "public",

// Development server proxy configuration
  // This fixes CORS issues when fetching from restcountries.com API during development
  // Note: restcountries.com redirects to files-* subdomains which don't include CORS headers
  // The proxy prevents client-side CORS issues by forwarding requests server-side
  server: {
    proxy: {
      "/api/countries": {
        target: "https://restcountries.com/v3.1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/countries/, ""),
        secure: false,
      },
    },
  },

  // Build options for client-side output
  build: {
    // Output to dist for Vercel - will be split into dist/client by TanStack
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Ensure proper asset naming with hashes
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },

  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Prerender for static site generation - generates index.html with hashed assets
      // This is CRITICAL for Vercel SPA compatibility
      prerender: {
        crawlLinks: true,
      },
    }),
  ],

  // SSR settings
  ssr: {
    noExternal: ["tailwindcss"],
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
