import fs from "fs";

const filePath =
  "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main/src/routes/mobile-view/contact.tsx";

let content = fs.readFileSync(filePath, "utf8");
let modified = content;

// Fix the garbled box characters: â• = chars at codes 226, 8224, 162
const garbledBox = String.fromCharCode(226) + String.fromCharCode(8224) + String.fromCharCode(162);
const cleanLine = "─".repeat(40);

modified = modified.split(garbledBox).join(cleanLine);

// Also need to fix: the emojis. Let me see with actual file
// The sequence shown was: "ðŸŒ"" - that's 4 separate wrong chars
// Let me try to find and fix similar patterns

// Also fix: "ðŸ'" to proper emoji format
const garbledStart = String.fromCharCode(240) + String.fromCharCode(159) + String.fromCharCode(140);
const garbledStart2 =
  String.fromCharCode(240) + String.fromCharCode(159) + String.fromCharCode(156);

// Replace specific patterns found in WhatsApp message
if (modified !== content) {
  fs.writeFileSync(filePath, modified, "utf8");
  console.log("Fixed:", filePath);
} else {
  console.log("No changes - checking if more patterns exist");

  // Let me search for the emoji garbled sequences
  if (content.includes("ð")) {
    console.log("Found emoji-type garbled chars");
  }
  if (content.includes("â")) {
    console.log("Found â-type garbled chars");
  }
}
