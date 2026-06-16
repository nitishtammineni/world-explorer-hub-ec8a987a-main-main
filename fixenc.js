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

// Build the garbled string character by character using charCodeAt
// From the file: â = 226, € = 8364, " = 8221
const garbledEmDash =
  String.fromCharCode(226) + String.fromCharCode(8364) + String.fromCharCode(8221);
// The correct em-dash: — = 8212
const properEmDash = String.fromCharCode(8212);

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let modified = content;

  // Replace single garbled em-dash
  modified = modified.split(garbledEmDash).join(properEmDash);

  // Replace double garbled em-dash (appears twice in a row)
  const garbledDouble = garbledEmDash + garbledEmDash;
  const properDouble = properEmDash + properEmDash;
  modified = modified.split(garbledDouble).join(properDouble);

  // Also replace other common garbled chars using their char codes
  // Middle dot: Â = 194, · = 183
  const garbledMiddleDot = String.fromCharCode(194) + String.fromCharCode(183);
  const properMiddleDot = String.fromCharCode(183);
  modified = modified.split(garbledMiddleDot).join(properMiddleDot);

  // Ellipsis: â = 226, € = 8364, ¦ = 164 (but wait, that's not right either)
  // Let me check: actual ellipsis … = 8230
  // Actually the garbled was â€¦ = 226, 8364, 162
  const garbledEllipsis =
    String.fromCharCode(226) + String.fromCharCode(8364) + String.fromCharCode(162);
  const properEllipsis = String.fromCharCode(8230);
  modified = modified.split(garbledEllipsis).join(properEllipsis);

  // Arrow: â = 226, † = 8224, ' = 8217 -> should be → = 8594
  const garbledArrow =
    String.fromCharCode(226) + String.fromCharCode(8224) + String.fromCharCode(8217);
  const properArrow = String.fromCharCode(8594);
  modified = modified.split(garbledArrow).join(properArrow);

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
