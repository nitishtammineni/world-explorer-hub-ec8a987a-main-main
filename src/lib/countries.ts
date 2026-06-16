export type Country = {
  cca3: string;
  cca2: string;
  name: { common: string; official: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  flags: { svg: string; png: string; alt?: string };
  coatOfArms?: { svg?: string; png?: string };
  maps: { googleMaps: string; openStreetMaps: string };
  timezones: string[];
  continents: string[];
  borders?: string[];
  latlng?: [number, number];
  car?: { side?: string };
  startOfWeek?: string;
  fifa?: string;
  tld?: string[];
  demonyms?: { eng?: { f?: string; m?: string } };
  idd?: { root?: string; suffixes?: string[] };
};

// restcountries.com v3.1 limits `fields` to 10 per request — fetch in two
// batches and merge by cca3.
const LIST_FIELDS_A = [
  "name",
  "cca2",
  "cca3",
  "capital",
  "region",
  "subregion",
  "population",
  "area",
  "flags",
  "continents",
].join(",");
const LIST_FIELDS_B = [
  "cca3",
  "languages",
  "currencies",
  "maps",
  "timezones",
  "borders",
  "latlng",
  "tld",
  "idd",
].join(",");
const LIST_FIELDS_C = ["cca3", "coatOfArms", "car", "startOfWeek", "fifa", "demonyms"].join(",");

// Use server-side API in production to avoid CORS issues
// In development: use Vite proxy which handles CORS
// In production: use our own server API or direct fetch (server-side)
const isDev = typeof window !== "undefined" && 
  window.location?.hostname?.includes("localhost");

// For server-side rendering/context, use direct API (no CORS)
// For client-side, use the proxy in dev, or server function in prod
const BASE = isDev 
  ? "/api/countries" 
  : (typeof window === "undefined" ? "https://restcountries.com/v3.1" : "/api/countries");

let cache: Country[] | null = null;
let inflight: Promise<Country[]> | null = null;

async function fetchBatch(fields: string): Promise<Partial<Country>[]> {
  const r = await fetch(`${BASE}/all?fields=${fields}`, {
    // Add no-cors mode for client-side requests to prevent CORS errors
    // This will cause an opaque response but we can handle errors gracefully
    mode: isDev ? "cors" : "cors",
  });
  if (!r.ok) throw new Error(`Failed to load countries (${r.status})`);
  return r.json();
}

// Fallback fetch using the static data when API fails
function getFallbackCountries(): Country[] {
  const filtered = FALLBACK_COUNTRIES.filter((c: any) => TOP_TOURIST_CCA3.has(c.cca3));
  // Add required fields that the type expects
  const mapped = filtered.map((c: any) => ({
    ...c,
    maps: c.maps || { googleMaps: "", openStreetMaps: "" },
    timezones: c.timezones || ["UTC"],
  })) as Country[];
  // Sort alphabetically by common name
  return mapped.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export async function getAllCountries(): Promise<Country[]> {
  if (cache) return cache;
  if (inflight) return inflight;
  
  inflight = (async () => {
    try {
      const [a, b, c] = await Promise.all([
        fetchBatch(LIST_FIELDS_A),
        fetchBatch(LIST_FIELDS_B),
        fetchBatch(LIST_FIELDS_C),
]);
      const map = new Map<string, Partial<Country>>();
      for (const x of a) if (x.cca3) map.set(x.cca3, { ...map.get(x.cca3), ...x });
      for (const x of b) if (x.cca3) map.set(x.cca3, { ...map.get(x.cca3), ...x });
      for (const x of c) if (x.cca3) map.set(x.cca3, { ...map.get(x.cca3), ...x });
      const merged = Array.from(map.values()) as Country[];
      const filtered = merged.filter((c) => TOP_TOURIST_CCA3.has(c.cca3));
      cache = filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
      return cache;
    } catch (error) {
      // API failed, use fallback data
      console.warn("Countries API failed, using fallback data:", error);
      cache = getFallbackCountries();
      return cache;
    }
  })();
  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const all = await getAllCountries();
  return all.find((x) => x.cca3.toLowerCase() === code.toLowerCase()) ?? null;
}

// Get all European countries
export async function getEuropeanCountries(): Promise<Country[]> {
  const all = await getAllCountries();
  return all.filter((c) => EUROPEAN_CCA3.has(c.cca3));
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n ?? 0);
}

// Convert USD to INR (approximate rate: 83 INR per USD)
const USD_TO_INR = 83;

export function formatPriceInRupees(usdPrice: number): string {
  const inrPrice = usdPrice * USD_TO_INR;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inrPrice);
}

export function getPriceDisplay(usdPrice: number, tier: string): string {
  if (tier === "budget") {
    return `Starting from ${formatPriceInRupees(usdPrice)}`;
  }
  return "Custom Price";
}

// Format INR price directly (no USD conversion)
export function formatINRPrice(inrPrice: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inrPrice);
}

// Display package price with INR (direct)
export function getPriceDisplayINR(
  priceInINR: number,
  tier: string,
  isPerPerson: boolean = false,
): string {
  const perPersonText = isPerPerson ? " per person" : "";
  if (tier === "budget") {
    return `Starting from ${formatINRPrice(priceInINR)}${perPersonText}`;
  }
  return `${formatINRPrice(priceInINR)}${perPersonText}`;
}

export const FEATURED_CCA3 = [
  "THA",
  "SGP",
  "MYS",
  "AZE",
  "IDN",
  "TUR",
  "ARE",
  "GBR",
  "IND",
  "MDV",
  "CHN",
  "LKA",
  "VNM",
  "KHM",
  "EGY",
  "FRA",
  "ITA",
  "CHE",
  "ESP",
  "AUT",
  "NLD",
];

// European countries for dedicated Europe section
export const EUROPEAN_CCA3 = new Set<string>([
  "FRA", // France
  "ITA", // Italy
  "ESP", // Spain
  "GBR", // United Kingdom
  "DEU", // Germany
  "GRC", // Greece
  "PRT", // Portugal
  "NLD", // Netherlands
  "CHE", // Switzerland
  "AUT", // Austria
  "IRL", // Ireland
  "ISL", // Iceland
  "NOR", // Norway
  "SWE", // Sweden
  "DNK", // Denmark
  "HRV", // Croatia
  "CZE", // Czech Republic
  "HUN", // Hungary
  "TUR", // Turkey
  "RUS", // Russia
  "POL", // Poland
  "BEL", // Belgium
  "FIN", // Finland
  "SVK", // Slovakia
  "SVN", // Slovenia
  "LUX", // Luxembourg
  "EST", // Estonia
  "LVA", // Latvia
  "LTU", // Lithuania
]);

// Fallback countries data when API is unavailable
// Note: This is a minimal fallback with essential fields only.
// The API normally returns more complete data, so this is used as backup.
// Using 'any' to allow the partial country objects.
const FALLBACK_COUNTRIES: any[] = [
  {
    cca3: "THA", cca2: "TH", name: { common: "Thailand", official: "Kingdom of Thailand" }, capital: ["Bangkok"], region: "Asia", population: 71603050, area: 513120, flags: { svg: "https://flagcdn.com/w320/th.png", png: "https://flagcdn.com/w640/th.png" }, continents: ["Asia"]
  },
  {
    cca3: "SGP", cca2: "SG", name: { common: "Singapore", official: "Republic of Singapore" }, capital: ["Singapore"], region: "Asia", population: 5850342, area: 710, flags: { svg: "https://flagcdn.com/w320/sg.png", png: "https://flagcdn.com/w640/sg.png" }, continents: ["Asia"]
  },
  {
    cca3: "MYS", cca2: "MY", name: { common: "Malaysia", official: "Malaysia" }, capital: ["Kuala Lumpur"], region: "Asia", population: 32730000, area: 330803, flags: { svg: "https://flagcdn.com/w320/my.png", png: "https://flagcdn.com/w640/my.png" }, continents: ["Asia"]
  },
  {
    cca3: "IDN", cca2: "ID", name: { common: "Indonesia", official: "Republic of Indonesia" }, capital: ["Jakarta"], region: "Asia", population: 273523615, area: 1904569, flags: { svg: "https://flagcdn.com/w320/id.png", png: "https://flagcdn.com/w640/id.png" }, continents: ["Asia"]
  },
  {
    cca3: "VNM", cca2: "VN", name: { common: "Vietnam", official: "Socialist Republic of Vietnam" }, capital: ["Hanoi"], region: "Asia", population: 98168833, area: 331212, flags: { svg: "https://flagcdn.com/w320/vn.png", png: "https://flagcdn.com/w640/vn.png" }, continents: ["Asia"]
  },
  {
    cca3: "IND", cca2: "IN", name: { common: "India", official: "Republic of India" }, capital: ["New Delhi"], region: "Asia", population: 1407563842, area: 3287263, flags: { svg: "https://flagcdn.com/w320/in.png", png: "https://flagcdn.com/w640/in.png" }, continents: ["Asia"]
  },
  {
    cca3: "ARE", cca2: "AE", name: { common: "United Arab Emirates", official: "United Arab Emirates" }, capital: ["Abu Dhabi"], region: "Asia", population: 9890402, area: 83600, flags: { svg: "https://flagcdn.com/w320/ae.png", png: "https://flagcdn.com/w640/ae.png" }, continents: ["Asia"]
  },
  {
    cca3: "TUR", cca2: "TR", name: { common: "Turkey", official: "Republic of Turkey" }, capital: ["Ankara"], region: "Asia", population: 84339067, area: 783562, flags: { svg: "https://flagcdn.com/w320/tr.png", png: "https://flagcdn.com/w640/tr.png" }, continents: ["Europe", "Asia"]
  },
  {
    cca3: "GBR", cca2: "GB", name: { common: "United Kingdom", official: "United Kingdom of Great Britain and Northern Ireland" }, capital: ["London"], region: "Europe", population: 67530172, area: 242495, flags: { svg: "https://flagcdn.com/w320/gb.png", png: "https://flagcdn.com/w640/gb.png" }, continents: ["Europe"]
  },
  {
    cca3: "FRA", cca2: "FR", name: { common: "France", official: "French Republic" }, capital: ["Paris"], region: "Europe", population: 67391582, area: 643801, flags: { svg: "https://flagcdn.com/w320/fr.png", png: "https://flagcdn.com/w640/fr.png" }, continents: ["Europe"]
  },
  {
    cca3: "CHE", cca2: "CH", name: { common: "Switzerland", official: "Swiss Confederation" }, capital: ["Bern"], region: "Europe", population: 8654622, area: 41284, flags: { svg: "https://flagcdn.com/w320/ch.png", png: "https://flagcdn.com/w640/ch.png" }, continents: ["Europe"]
  },
  {
    cca3: "ITA", cca2: "IT", name: { common: "Italy", official: "Italian Republic" }, capital: ["Rome"], region: "Europe", population: 60461826, area: 301340, flags: { svg: "https://flagcdn.com/w320/it.png", png: "https://flagcdn.com/w640/it.png" }, continents: ["Europe"]
  },
  {
    cca3: "ESP", cca2: "ES", name: { common: "Spain", official: "Kingdom of Spain" }, capital: ["Madrid"], region: "Europe", population: 47351567, area: 505990, flags: { svg: "https://flagcdn.com/w320/es.png", png: "https://flagcdn.com/w640/es.png" }, continents: ["Europe"]
  },
  {
    cca3: "EGY", cca2: "EG", name: { common: "Egypt", official: "Arab Republic of Egypt" }, capital: ["Cairo"], region: "Africa", population: 102334403, area: 1002450, flags: { svg: "https://flagcdn.com/w320/eg.png", png: "https://flagcdn.com/w640/eg.png" }, continents: ["Africa"]
  },
  {
    cca3: "MDV", cca2: "MV", name: { common: "Maldives", official: "Republic of Maldives" }, capital: ["Male"], region: "Asia", population: 540542, area: 300, flags: { svg: "https://flagcdn.com/w320/mv.png", png: "https://flagcdn.com/w640/mv.png" }, continents: ["Asia"]
  },
  {
    cca3: "CHN", cca2: "CN", name: { common: "China", official: "People's Republic of China" }, capital: ["Beijing"], region: "Asia", population: 1411778724, area: 9596961, flags: { svg: "https://flagcdn.com/w320/cn.png", png: "https://flagcdn.com/w640/cn.png" }, continents: ["Asia"]
  },
  {
    cca3: "JPN", cca2: "JP", name: { common: "Japan", official: "Japan" }, capital: ["Tokyo"], region: "Asia", population: 125584838, area: 377975, flags: { svg: "https://flagcdn.com/w320/jp.png", png: "https://flagcdn.com/w640/jp.png" }, continents: ["Asia"]
  },
  {
    cca3: "AUS", cca2: "AU", name: { common: "Australia", official: "Commonwealth of Australia" }, capital: ["Canberra"], region: "Oceania", population: 25499884, area: 7692024, flags: { svg: "https://flagcdn.com/w320/au.png", png: "https://flagcdn.com/w640/au.png" }, continents: ["Oceania"]
  },
  {
    cca3: "USA", cca2: "US", name: { common: "United States", official: "United States of America" }, capital: ["Washington, D.C."], region: "Americas", population: 331002651, area: 9833520, flags: { svg: "https://flagcdn.com/w320/us.png", png: "https://flagcdn.com/w640/us.png" }, continents: ["North America"]
  },
  {
    cca3: "CAN", cca2: "CA", name: { common: "Canada", official: "Canada" }, capital: ["Ottawa"], region: "Americas", population: 38005238, area: 9984670, flags: { svg: "https://flagcdn.com/w320/ca.png", png: "https://flagcdn.com/w640/ca.png" }, continents: ["North America"]
  },
  {
    cca3: "AZE", cca2: "AZ", name: { common: "Azerbaijan", official: "Republic of Azerbaijan" }, capital: ["Baku"], region: "Asia", population: 10139285, area: 86600, flags: { svg: "https://flagcdn.com/w320/az.png", png: "https://flagcdn.com/w640/az.png" }, continents: ["Europe"]
  },
  {
    cca3: "KHM", cca2: "KH", name: { common: "Cambodia", official: "Kingdom of Cambodia" }, capital: ["Phnom Penh"], region: "Asia", population: 16718965, area: 181035, flags: { svg: "https://flagcdn.com/w320/kh.png", png: "https://flagcdn.com/w640/kh.png" }, continents: ["Asia"]
  },
  {
    cca3: "LKA", cca2: "LK", name: { common: "Sri Lanka", official: "Democratic Socialist Republic of Sri Lanka" }, capital: ["Sri Jayawardenepura Kotte"], region: "Asia", population: 21919000, area: 65610, flags: { svg: "https://flagcdn.com/w320/lk.png", png: "https://flagcdn.com/w640/lk.png" }, continents: ["Asia"]
  },
];

// Top 55 most famous travel & tourism destinations worldwide
export const TOP_TOURIST_CCA3 = new Set<string>([
  // New additions from provided data
  "AZE", // Azerbaijan (Baku)
  "KHM", // Cambodia
  // Europe
  "FRA",
  "ITA",
  "ESP",
  "GBR",
  "DEU",
  "GRC",
  "PRT",
  "NLD",
  "CHE",
  "AUT",
  "IRL",
  "ISL",
  "NOR",
  "SWE",
  "DNK",
  "HRV",
  "CZE",
  "HUN",
  "TUR",
  "RUS",
  // Asia
  "JPN",
  "THA",
  "IDN",
  "VNM",
  "SGP",
  "MYS",
  "CHN",
  "KOR",
  "IND",
  "NPL",
  "LKA",
  "MDV",
  "PHL",
  "ARE",
  "QAT",
  "SAU",
  "ISR",
  "JOR",
  // Africa
  "EGY",
  "MAR",
  "ZAF",
  "KEN",
  "TZA",
  "MUS",
  "SYC",
  // Americas
  "USA",
  "CAN",
  "MEX",
  "BRA",
  "ARG",
  "PER",
  "CHL",
  "CRI",
  "CUB",
  "JAM",
  // Oceania
  "AUS",
  "NZL",
  "FJI",
]);
