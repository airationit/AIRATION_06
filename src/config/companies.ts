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

/** Authentic, varied card color themes inspired by app icons and top brands */
export const CARD_COLOR_PALETTE: CardColorTheme[] = [
  { bg: "#FEE000", isLight: true, textColor: "#18181B", glow: "rgba(254, 224, 0, 0.45)" }, // Vivid Yellow (DG style)
  { bg: "#0071CE", isLight: false, textColor: "#FFFFFF", glow: "rgba(0, 113, 206, 0.45)" }, // Royal Blue (Walmart style)
  { bg: "#232F3E", isLight: false, textColor: "#FFFFFF", glow: "rgba(35, 47, 62, 0.45)" }, // Charcoal (Amazon style)
  { bg: "#223B5D", isLight: false, textColor: "#FFFFFF", glow: "rgba(34, 59, 93, 0.45)" }, // Navy (USPS style)
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.08)" }, // Crisp White (Target/Apple style)
  { bg: "#0A2540", isLight: false, textColor: "#FFFFFF", glow: "rgba(10, 37, 64, 0.45)" }, // Deep Navy (Seal style)
  { bg: "#FFFFFF", isLight: true, textColor: "#DC291E", glow: "rgba(220, 41, 30, 0.25)" }, // Crisp White with Red Accent
  { bg: "#152A4A", isLight: false, textColor: "#FFFFFF", glow: "rgba(21, 42, 74, 0.45)" }, // Slate Navy (Prudential style)
  { bg: "#A2C99B", isLight: false, textColor: "#FFFFFF", glow: "rgba(162, 201, 155, 0.45)" }, // Sage Green (Publix style)
  { bg: "#E20074", isLight: false, textColor: "#FFFFFF", glow: "rgba(226, 0, 116, 0.45)" }, // Vibrant Magenta (T-Mobile style)
  { bg: "#FFFFFF", isLight: true, textColor: "#0F172A", glow: "rgba(0, 0, 0, 0.08)" }, // Clean White (ADP style)
  { bg: "#0D2C6C", isLight: false, textColor: "#FFFFFF", glow: "rgba(13, 44, 108, 0.45)" }, // Deep Blue (UnitedHealth style)
  { bg: "#D71E28", isLight: false, textColor: "#FFFFFF", glow: "rgba(215, 30, 40, 0.45)" }, // Crimson Red (Wells Fargo style)
  { bg: "#F96302", isLight: false, textColor: "#FFFFFF", glow: "rgba(249, 99, 2, 0.45)" }, // Vibrant Orange (Home Depot style)
  { bg: "#CC0000", isLight: false, textColor: "#FFFFFF", glow: "rgba(204, 0, 0, 0.45)" }, // CVS Red style
  { bg: "#0C51A1", isLight: false, textColor: "#FFFFFF", glow: "rgba(12, 81, 161, 0.45)" }, // Deep Royal Blue (Kroger style)
  { bg: "#006241", isLight: false, textColor: "#FFFFFF", glow: "rgba(0, 98, 65, 0.45)" }, // Forest Green (Starbucks style)
  { bg: "#0284C7", isLight: false, textColor: "#FFFFFF", glow: "rgba(2, 132, 199, 0.45)" }, // Sky Cyan (AT&T style)
  { bg: "#7C3AED", isLight: false, textColor: "#FFFFFF", glow: "rgba(124, 58, 237, 0.45)" }, // Purple / Violet
  { bg: "#18181B", isLight: false, textColor: "#FFFFFF", glow: "rgba(24, 24, 27, 0.45)" }, // Jet Black
  { bg: "#059669", isLight: false, textColor: "#FFFFFF", glow: "rgba(5, 150, 105, 0.45)" }, // Emerald Green
  { bg: "#EA580C", isLight: false, textColor: "#FFFFFF", glow: "rgba(234, 88, 12, 0.45)" }, // Warm Orange
];

export const companies: Company[] = companiesData.slice(0, 100).map((c) => ({
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
