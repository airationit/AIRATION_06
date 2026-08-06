// Partnering companies shown in the Trusted By section.
// Data comes from companies.json (name + website URL + logo).
// A generated monogram is used as a graceful fallback if a logo fails to load.

import companiesData from "./companies.json";

export interface Company {
  name: string;
  logoUrl: string;
  url: string;
}

export const companies: Company[] = companiesData.slice(0, 30).map((c) => ({
  name: c.name,
  logoUrl: c.logo_url,
  url: c.url,
}));

/** Deterministic hue (0–360) derived from a company name, for the fallback. */
export function hueFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

/** Up to two initials for the monogram fallback. */
export function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
