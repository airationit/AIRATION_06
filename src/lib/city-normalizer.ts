/**
 * Comprehensive Indian City Normalizer & Location Matcher
 * Resolves spelling variations, official vs colloquial names, and regional clusters.
 */

// 1. Dictionary of Indian City Aliases & Variations
export const CITY_ALIASES_MAP: Record<string, string[]> = {
  bangalore: ["bangalore", "bengaluru", "blr"],
  bengaluru: ["bengaluru", "bangalore", "blr"],
  
  gurgaon: ["gurgaon", "gurugram", "ggn"],
  gurugram: ["gurugram", "gurgaon", "ggn"],
  
  delhi: ["delhi", "new delhi", "delhi ncr", "ncr", "dcr"],
  "delhi-ncr": ["delhi-ncr", "delhi ncr", "delhi", "new delhi", "noida", "greater noida", "gurgaon", "gurugram", "ghaziabad", "faridabad", "ncr"],
  
  noida: ["noida", "greater noida", "delhi ncr", "ncr"],
  "greater-noida": ["greater noida", "greater-noida", "noida", "delhi ncr", "ncr"],
  ghaziabad: ["ghaziabad", "delhi ncr", "ncr"],
  faridabad: ["faridabad", "delhi ncr", "ncr"],
  
  mumbai: ["mumbai", "bombay", "navi mumbai", "thane", "mmr"],
  "navi-mumbai": ["navi mumbai", "navi-mumbai", "mumbai", "thane"],
  thane: ["thane", "mumbai", "navi mumbai"],
  
  hyderabad: ["hyderabad", "secunderabad", "cyberabad", "hitec city", "gachibowli", "hyd"],
  secunderabad: ["secunderabad", "hyderabad", "hyd"],
  
  chennai: ["chennai", "madras", "mas"],
  kolkata: ["kolkata", "calcutta", "ccu"],
  pune: ["pune", "poona", "pnq"],
  ahmedabad: ["ahmedabad", "amdavad", "adi"],
  
  kochi: ["kochi", "cochin", "ernakulam", "cok"],
  trivandrum: ["trivandrum", "thiruvananthapuram", "trv"],
  thiruvananthapuram: ["thiruvananthapuram", "trivandrum", "trv"],
  calicut: ["calicut", "kozhikode"],
  kozhikode: ["kozhikode", "calicut"],
  
  jaipur: ["jaipur", "pink city", "jai"],
  lucknow: ["lucknow", "lko"],
  chandigarh: ["chandigarh", "mohali", "panchkula", "tricity", "ixc"],
  indore: ["indore", "idr"],
  bhopal: ["bhopal", "bho"],
  patna: ["patna", "pat"],
  kanpur: ["kanpur", "knp"],
  
  varanasi: ["varanasi", "banaras", "kashi", "vns"],
  prayagraj: ["prayagraj", "allahabad", "ald"],
  allahabad: ["allahabad", "prayagraj", "ald"],
  
  vadodara: ["vadodara", "baroda", "bdq"],
  surat: ["surat", "stv"],
  nagpur: ["nagpur", "nag"],
  visakhapatnam: ["visakhapatnam", "vizag", "vtz"],
  coimbatore: ["coimbatore", "kovai", "cjb"],
  bhubaneswar: ["bhubaneswar", "bhubaneshwar", "bbi"],
  
  mysore: ["mysore", "mysuru", "myq"],
  mysuru: ["mysuru", "mysore", "myq"],
  
  belgaum: ["belgaum", "belagavi"],
  belagavi: ["belagavi", "belgaum"],
  
  aurangabad: ["aurangabad", "chhatrapati sambhajinagar", "sambhajinagar"],
  "chhatrapati-sambhajinagar": ["chhatrapati sambhajinagar", "aurangabad", "sambhajinagar"],
  
  pondicherry: ["pondicherry", "puducherry", "pondy"],
  puducherry: ["puducherry", "pondicherry", "pondy"],
  
  remote: ["remote", "work from home", "wfh", "anywhere in india", "all india", "virtual", "telecommute"],
};

/**
 * Sanitize a location string to clean lowercase tokens
 */
export function sanitizeLocationString(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ") // replace slashes, commas, brackets with spaces
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize any city input (slug, name, code) to its canonical primary slug
 */
export function normalizeCitySlug(input: string): string {
  if (!input) return "all";
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  
  if (cleaned === "all" || cleaned === "") return "all";
  
  // Direct match in alias dictionary
  for (const [canonical, aliases] of Object.entries(CITY_ALIASES_MAP)) {
    if (canonical === cleaned) return canonical;
    if (aliases.some((a) => a.replace(/[^a-z0-9]+/g, "-") === cleaned)) {
      return canonical;
    }
  }

  return cleaned;
}

/**
 * Get all known aliases and spelling variations for a city
 */
export function getCityAliases(citySlugOrName: string): string[] {
  if (!citySlugOrName || citySlugOrName === "all") return [];
  const normalized = normalizeCitySlug(citySlugOrName);
  
  const registeredAliases = CITY_ALIASES_MAP[normalized] || [];
  return Array.from(new Set([normalized, normalized.replace(/-/g, " "), ...registeredAliases]));
}

/**
 * Smart matching algorithm: Checks if a job's location/city matches a search target city
 */
export function isCityMatch(
  jobLocation: string | undefined | null,
  jobCityName: string | undefined | null,
  jobCityId: string | undefined | null,
  targetSlugOrId: string
): boolean {
  if (!targetSlugOrId || targetSlugOrId === "all") return true;

  // Direct ID check
  if (jobCityId && jobCityId === targetSlugOrId) return true;

  const targetNormalized = normalizeCitySlug(targetSlugOrId);
  const targetAliases = getCityAliases(targetNormalized);

  const cleanLoc = sanitizeLocationString(jobLocation || "");
  const cleanCity = sanitizeLocationString(jobCityName || "");

  // Check remote
  if (targetNormalized === "remote") {
    return (
      cleanLoc.includes("remote") ||
      cleanLoc.includes("work from home") ||
      cleanLoc.includes("wfh") ||
      cleanCity.includes("remote") ||
      cleanCity.includes("work from home")
    );
  }

  // Check against all known aliases
  for (const alias of targetAliases) {
    const cleanAlias = sanitizeLocationString(alias);
    if (!cleanAlias) continue;

    if (cleanLoc.includes(cleanAlias) || cleanCity.includes(cleanAlias)) {
      return true;
    }

    // Slugified match (e.g. "delhi-ncr" vs "delhi ncr")
    const slugAlias = alias.replace(/\s+/g, "-");
    const locSlug = cleanLoc.replace(/\s+/g, "-");
    const citySlug = cleanCity.replace(/\s+/g, "-");

    if (locSlug.includes(slugAlias) || citySlug.includes(slugAlias)) {
      return true;
    }
  }

  return false;
}
