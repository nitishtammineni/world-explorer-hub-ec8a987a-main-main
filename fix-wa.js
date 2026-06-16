import fs from "fs";

const filePath =
  "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main/src/routes/mobile-view/contact.tsx";

let content = fs.readFileSync(filePath, "utf8");
let modified = content;

// Fix the box line pattern: â•" repeating (U+00E2, U+2022, U+0090)
// This appears 40 times for the decorative line
const garbledBoxLine =
  String.fromCharCode(0x00e2) + String.fromCharCode(0x2022) + String.fromCharCode(0x0090);
const cleanLine = "─".repeat(40);
modified = modified.split(garbledBoxLine).join(cleanLine);

// Fix the globe emoji (ðŸŒ) + something
// The garbled sequence: 0xF0, 0x0178, 0x0152, 0x008D
const garbledGlobe =
  String.fromCharCode(0x00f0) +
  String.fromCharCode(0x0178) +
  String.fromCharCode(0x0152) +
  String.fromCharCode(0x008d);
const cleanGlobe = "🌍"; // Properly encoded globe emoji
modified = modified.split(garbledGlobe).join(cleanGlobe);

// Fix the envelope/email emoji pattern: 0xF0, 0x0178, 0x201C, 0x2039
const garbledEmail =
  String.fromCharCode(0x00f0) +
  String.fromCharCode(0x0178) +
  String.fromCharCode(0x201c) +
  String.fromCharCode(0x2039);
const cleanEmail = "✉️";
modified = modified.split(garbledEmail).join(cleanEmail);

// Fix more patterns shown in analysis: 0xF0 0x0178 0x201C
const garbledEmail2 =
  String.fromCharCode(0x00f0) + String.fromCharCode(0x0178) + String.fromCharCode(0x201c);
modified = modified.split(garbledEmail2).join("📧");

// Fix box line alternate: just the repeating pattern should also be replaced
// The pattern in the file shows as "â•" + "â•" etc

console.log("Before:", modified !== content);

if (modified !== content) {
  fs.writeFileSync(filePath, modified, "utf8");
  console.log("Fixed WhatsApp message characters!");
} else {
  console.log("No changes - trying different patterns");
}

console.log("Done");
