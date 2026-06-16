import fs from "fs";

const filePath =
  "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main/src/routes/mobile-view/contact.tsx";

const content = fs.readFileSync(filePath, "utf8");

// Find the actual garbled sequence by looking at patterns around the whatsappMsg
const idx = content.indexOf("const whatsappMsg");
if (idx >= 0) {
  const snippet = content.substring(idx, idx + 200);

  // Print each char with its code
  console.log("Found whatsappMsg. First 50 chars:");
  for (let i = 0; i < Math.min(50, snippet.length); i++) {
    const c = snippet[i];
    if (c.charCodeAt(0) > 127) {
      console.log(`Index ${i}: '${c}' = ${c.charCodeAt(0)}`);
    }
  }

  // Find all non-ASCII chars in the first 100 chars
  console.log("\nAll non-ASCII in snippet:");
  for (let i = 0; i < snippet.length; i++) {
    const code = snippet.charCodeAt(i);
    if (code > 127) {
      console.log(
        `Pos ${i}: U+${code.toString(16).toUpperCase().padStart(4, "0")} ('${snippet[i]}')`,
      );
    }
  }
}
