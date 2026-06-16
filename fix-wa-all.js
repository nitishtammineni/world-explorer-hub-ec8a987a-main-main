import fs from "fs";

const files = ["src/routes/mobile-view/passport.tsx", "src/routes/mobile-view/visa.tsx"];

const baseDir = "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main";

// Analyze each file and extract the garbled patterns

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Find all non-ASCII chars in the file
  const garbledChars = [];
  for (let i = 0; i < content.length; i++) {
    const code = content.charCodeAt(i);
    if (code > 127 && code < 65534) {
      // Non-ASCII but not surrogate
      const c = content[i];
      if (!garbledChars.includes(c)) {
        garbledChars.push(c);
      }
    }
  }

  console.log(`\n=== ${filePath} ===`);
  console.log("Garbled chars found:", garbledChars.length);
  garbledChars.forEach((c) => {
    console.log(`  '${c}' = ${c.charCodeAt(0)} (U+${c.charCodeAt(0).toString(16).toUpperCase()})`);
  });

  return garbledChars;
}

files.forEach((file) => {
  processFile(`${baseDir}/${file}`);
});

console.log("\n=== Done analyzing ===");
