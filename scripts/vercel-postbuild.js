import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const distClientDir = path.join(rootDir, "dist", "client");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

console.log("Starting Vercel postbuild process...");

// Find the client entry JS file (the main bundle)
function findClientEntry() {
  const assetsDir = path.join(distClientDir, "assets");
  if (!fs.existsSync(assetsDir)) {
    return null;
  }
  
  const files = fs.readdirSync(assetsDir);
  
  // Look for the main index entry file
  const entryFile = files.find(f => f.startsWith("index-") && f.endsWith(".js"));
  return entryFile ? `/assets/${entryFile}` : null;
}

// Find the CSS file
function findCSS() {
  const assetsDir = path.join(distClientDir, "assets");
  if (!fs.existsSync(assetsDir)) {
    return null;
  }
  
  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find(f => f.startsWith("styles-") && f.endsWith(".css"));
  return cssFile ? `/assets/${cssFile}` : null;
}

// Generate index.html for Vercel SPA
const clientEntry = findClientEntry();
const cssFile = findCSS();

if (clientEntry) {
  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="World Explorer Hub - Your gateway to global travel adventures, visa information, passport services, and more." />
    <title>World Explorer Hub</title>
    ${cssFile ? `<link rel="stylesheet" href="${cssFile}" />` : ""}
    <script type="module" crossorigin src="${clientEntry}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  ensureDir(distClientDir);
  fs.writeFileSync(path.join(distClientDir, "index.html"), indexHtml);
  console.log("✓ Generated dist/client/index.html with hashed assets");
  console.log(`  - Entry: ${clientEntry}`);
  console.log(`  - CSS: ${cssFile || "none"}`);
} else {
  console.log("⚠ Client entry not found, skipping index.html generation");
}

// Copy public folder contents to dist/client (excluding index.html in public)
const publicDir = path.join(rootDir, "public");

if (fs.existsSync(publicDir)) {
  ensureDir(distClientDir);

  const files = fs.readdirSync(publicDir);
  for (const file of files) {
    if (file === "index.html") continue; // Skip the template

    const srcFile = path.join(publicDir, file);
    const destFile = path.join(distClientDir, file);

    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✓ Copied ${file} from public/ to dist/client`);
    } else if (fs.statSync(srcFile).isDirectory()) {
      ensureDir(destFile);
      copyDirRecursive(srcFile, destFile);
      console.log(`✓ Copied ${file}/ from public/ to dist/client`);
    }
  }
}

function copyDirRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      ensureDir(destPath);
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("✓ Vercel postbuild completed successfully");
console.log("");
console.log("Build output summary:");
console.log("  - Client assets: dist/client/");
console.log("  - SSR server: dist/server/ (for Vercel SSR)");
