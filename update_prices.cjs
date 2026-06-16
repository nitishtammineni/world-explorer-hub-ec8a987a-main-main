const fs = require("fs");
const path = require("path");

const imagePrices = {
  THA: 19999,
  SGP: 70000,
  MYS: 70000, // Singapore & Malaysia 70000
  AZE: 99999,
  IDN: 45000,
  TUR: 199999,
  ARE: 69500,
  GBR: 200000,
  ANDAMAN: 22999,
  MDV: 300000,
  CHN: 199999,
  EUROPE: 325000,
  LKA: 40000,
  VNM: 59999,
  KHM: 59999,
  KHM_PREMIUM: 75000,
  LAKSHADWEEP: 49999,
  EGY: 59999,
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // For country-packages.ts which uses an object structure
  if (filePath.endsWith("country-packages.ts")) {
    for (const [code, price] of Object.entries(imagePrices)) {
      const regex = new RegExp(`${code}: \\{[^}]*price: \\d+,`, "g");
      content = content.replace(regex, (match) => {
        return match.replace(/price: \d+,/, `price: ${price},`);
      });
    }

    // Update all other countries to 69999 if not in imagePrices
    const allCountryCodes = content.match(/[A-Z_]+: \{/g) || [];
    allCountryCodes.forEach((match) => {
      const code = match.replace(": {", "").trim();
      if (!imagePrices[code]) {
        const regex = new RegExp(`${code}: \\{[^}]*price: \\d+,`, "g");
        content = content.replace(regex, (m) => {
          return m.replace(/price: \d+,/, "price: 69999,");
        });
      }
    });
  } else if (filePath.endsWith("international-packages.ts")) {
    // Already mostly correct but let's be sure
    for (const [code, price] of Object.entries(imagePrices)) {
      // Here we match by destination or id
      // id: "thailand-3n-4d", destination: "Thailand", ... priceINR: 19999
    }
  } else if (filePath.endsWith("tourist-data.ts")) {
    // Global update for tourist-data.ts (excluding image countries is harder here)
    // My previous script already did a good job.
  }

  fs.writeFileSync(filePath, content);
}

const countryPackagesPath = path.join(__dirname, "src", "lib", "country-packages.ts");
updateFile(countryPackagesPath);

console.log("Updated country-packages.ts");
