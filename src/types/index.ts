// Shared type definitions for Hirance

export * from "./api";
export * from "./masterdata";
export * from "./jobs";
export * from "./blogs";

export interface NavItem {
  label: string;
  href: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}
