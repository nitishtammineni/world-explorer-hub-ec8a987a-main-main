#!/usr/bin/env node

/**
 * Build script: Generate image manifest at build time
 * Run this before building the app to create images/manifest.json
 *
 * Usage: node scripts/generate-image-manifest.js
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { detectAllImages, generateManifest } from "../src/lib/image-detector.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const manifestPath = path.join(projectRoot, "public", "images", "manifest.json");

function generateImageManifest() {
  console.log("🖼️  Generating image manifest...");

  try {
    // Change to project root for proper path resolution
    process.chdir(projectRoot);

    // Detect all images
    const collection = detectAllImages();

    // Generate manifest
    const manifest = generateManifest(collection);

    // Create images directory if it doesn't exist
    const imagesDir = path.dirname(manifestPath);
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Write manifest
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log("✅ Image manifest generated successfully!");
    console.log(`📁 Manifest location: ${manifestPath}`);
    console.log(`📊 Total images: ${manifest.totalImages}`);
    console.log(`🌍 Countries with images: ${manifest.homePageImageCount} (home page)`);
    console.log(`🎯 Countries with must-visit: ${manifest.countriesWithMustVisit?.length ?? 0}`);
    console.log(JSON.stringify(manifest, null, 2));

    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating image manifest:");
    console.error(error);
    process.exit(1);
  }
}

generateImageManifest();
