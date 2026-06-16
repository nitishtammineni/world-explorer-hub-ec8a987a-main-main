import fs from "fs";

const files = [
  "src/routes/mobile-view/contact.tsx",
  "src/routes/mobile-view/passport.tsx",
  "src/routes/mobile-view/visa.tsx",
];

const baseDir = "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main";

// Garbled patterns to fix (from analysis):
// The box line: U+00E2, U+2022, U+0090
const garbledBoxLine =
  String.fromCharCode(0x00e2) + String.fromCharCode(0x2022) + String.fromCharCode(0x0090);

// The garbled emoji patterns: various combinations of chars with code > 127
// that were double-encoded

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let modified = content;

  // Fix box line pattern - replace 3-char garbled sequence with clean line
  modified = modified.split(garbledBoxLine).join("─");

  // Fix double box lines (appears as two garbled patterns in sequence)
  modified = modified.split(garbledBoxLine + garbledBoxLine).join("──");

  // For other garbled emoji sequences:
  // These appear as weird chars - let's use regex for non-printable / high-value chars

  // Replace patterns that appear in WhatsApp messages
  const garbledPatterns = [
    // More patterns based on what appears in search results
  ];

  if (modified !== content) {
    fs.writeFileSync(filePath, modified, "utf8");
    console.log("Fixed:", filePath);
  } else {
    console.log("No changes:", filePath);
  }
}

console.log("Starting...");

files.forEach((file) => {
  fixFile(`${baseDir}/${file}`);
});

console.log("Done!");
