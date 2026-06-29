// Shared type definitions for the landing page

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
