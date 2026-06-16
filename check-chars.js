import fs from "fs";

// Read visa.tsx and show exact bytes around the problematic area
const content = fs.readFileSync(
  "c:/Users/DELL/Desktop/world-explorer-hub-ec8a987a-main/src/routes/visa.tsx",
  "utf8",
);

// Find the title line
const lines = content.split("\n");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("Visa Services")) {
    console.log(`Line ${i + 1}:`);
    console.log(lines[i]);
    console.log("\nCharacter codes:");
    for (let j = 0; j < lines[i].length; j++) {
      console.log(`  ${j}: '${lines[i][j]}' = ${lines[i].charCodeAt(j)}`);
    }
    break;
  }
}
