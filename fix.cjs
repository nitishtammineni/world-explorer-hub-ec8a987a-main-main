const fs = require("fs");
const data = fs.readFileSync("src/lib/tourist-data.ts", "utf8");
const lines = data.split("\n").filter((line) => !line.match(/^\s+states:/));
fs.writeFileSync("src/lib/tourist-data.ts", lines.join("\n"));
console.log("Done");
