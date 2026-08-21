// Partnering companies shown in the Trusted By section.
// Data comes from companies.json (name + website URL + logo).
// A generated monogram is used as a graceful fallback if a logo fails to load.

import companiesData from "./companies.json";

export interface Company {
  name: string;
  logoUrl: string;
  url: string;
}

export interface CardColorTheme {
  bg: string;
  isLight: boolean;
  textColor?: string;
  glow: string;
}

/** Authentic color themes consisting of 80% Crisp White and 20% Dark/Navy accents */
export const CARD_COLOR_PALETTE: CardColorTheme[] = [
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#18181B", isLight: false, textColor: "#FFFFFF", glow: "rgba(24, 24, 27, 0.3)" }, // Jet Charcoal Black (Dark Accent)
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#1E293B", isLight: false, textColor: "#FFFFFF", glow: "rgba(30, 41, 59, 0.3)" }, // Dark Slate (Amazon style)
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.04)" }, // Crisp White
  { bg: "#0A2540", isLight: false, textColor: "#FFFFFF", glow: "rgba(10, 37, 64, 0.3)" }, // Deep Navy Blue (USPS style)
];

export const companies: Company[] = companiesData.slice(0, 48).map((c) => ({
  name: c.name,
  logoUrl: c.logo_url,
  url: c.url,
}));

/** Deterministic color theme for a company card based on name & index */
export function getCompanyColorTheme(name: string, index: number): CardColorTheme {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const paletteIndex = (Math.abs(hash) + index) % CARD_COLOR_PALETTE.length;
  return CARD_COLOR_PALETTE[paletteIndex];
}

/** Deterministic hue (0–360) derived from a company name, for fallback */
export function hueFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

/** Up to two initials for the monogram fallback */
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
