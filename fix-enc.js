import fs from "fs";

const files = [
  "src/routes/contact.tsx",
  "src/routes/mobile-view/contact.tsx",
  "src/routes/visa.tsx",
  "src/routes/passport.tsx",
  "src/routes/countries.$code.tsx",
  "src/routes/index.tsx",
  "src/routes/about.tsx",
  "src/routes/services.tsx",
  "src/routes/mobile-view/about.tsx",
  "src/routes/mobile-view/services.tsx",
  "src/routes/mobile-view/visa.tsx",
  "src/routes/mobile-view/passport.tsx",
];

const baseDir = "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main";

// Build garbled strings from characters using charCodeAt
// Em-dash garbled: â€" = 226, 8364, 8221
const garbledEmDash =
  String.fromCharCode(226) + String.fromCharCode(8364) + String.fromCharCode(8221);
const properEmDash = String.fromCharCode(8212);

// Double em-dash
const garbledDoubleEmDash = garbledEmDash + garbledEmDash;
const properDoubleEmDash = properEmDash + properEmDash;

// Middle dot: Â· = 194, 183
const garbledMiddleDot = String.fromCharCode(194) + String.fromCharCode(183);
const properMiddleDot = String.fromCharCode(183);

// Now for the mobile-view/contact.tsx WhatsApp message chars
// These are different garbled sequences:
// The WhatsApp message has decorations made of: â• = 226, 8224, 162 (box drawing chars incorrectly encoded)
// And: â" = 226, 8220, 8239 (quotes incorrectly encoded)
// And emojis: ð" = 240, 159, 152 (four byte sequences incorrectly encoded)

// Let me create patterns for each type using their actual char codes
const boxDraw = String.fromCharCode(226) + String.fromCharCode(8224) + String.fromCharCode(162); // â•
const boxDrawAlt = String.fromCharCode(226) + String.fromCharCode(8220) + String.fromCharCode(8239); // â"
const boxDrawAlt2 =
  String.fromCharCode(226) + String.fromCharCode(8212) + String.fromCharCode(8221); // â"
const boxDrawAlt3 =
  String.fromCharCode(226) + String.fromCharCode(8212) + String.fromCharCode(8221); // â"

// Emojis: Need to handle four-byte UTF-8 sequences differently
// The garbled sequence in file for emoji is actually multiple chars because of encoding issues

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let modified = content;

  // Fix em-dash variations (single and double)
  modified = modified.split(garbledEmDash).join(properEmDash);
  modified = modified.split(garbledDoubleEmDash).join(properDoubleEmDash);

  // Middle dot
  modified = modified.split(garbledMiddleDot).join(properMiddleDot);

  // Fix the various box-drawing style garbled chars
  const cleanLine = "───────────────────────────────────────"; // Em dash line
  modified = modified.split(boxDraw).join(cleanLine);
  modified = modified.split(boxDrawAlt).join("-".repeat(40));
  modified = modified.split(boxDrawAlt2).join("-".repeat(40));
  modified = modified.split(boxDrawAlt3).join("—");

  // Now handle the WhatsApp message - need to replace the whole template
  // Pattern for emoji blocks: they start with 4-char sequences
  // Let's do targeted replacements for key patterns

  // First: the globe emoji garbled at start
  // In the string it's: "ðŸŒ""
  const emojiGlobeGarbled =
    String.fromCharCode(240) +
    String.fromCharCode(159) +
    String.fromCharCode(152) +
    String.fromCharCode(141);
  const emojiGlobe = "🌍"; // Proper globe emoji

  // Emoji person: "ðŸ'" - multiple chars
  // Fix the contact meta description lines

  if (modified !== content) {
    fs.writeFileSync(filePath, modified, "utf8");
    console.log("Fixed:", filePath);
  } else {
    console.log("No changes:", filePath);
  }
}

console.log("Starting fix...");

files.forEach((file) => {
  const filePath = file.startsWith(baseDir) ? file : `${baseDir}/${file}`;
  fixFile(filePath);
});

console.log("Done!");
