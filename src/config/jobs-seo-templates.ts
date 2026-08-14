export interface SeoTemplate {
  title: string;
  description: string;
  heading: string;
  subheading: string;
  breadcrumb: string;
}

export type SeoPatternKey =
  | "role-city"
  | "remote-role"
  | "freshers-city"
  | "experience-role"
  | "role"
  | "city"
  | "company-city"
  | "default";

export const JOBS_SEO_TEMPLATES: Record<SeoPatternKey, SeoTemplate> = {
  "role-city": {
    title: "{count}+ {role} Jobs in {city} ({year}) | Hirance",
    description:
      "Explore {count}+ verified {role} job openings in {city} on Hirance. Swipe right to apply with your AI match score, direct employer connections, and transparent salaries.",
    heading: "{role} Jobs in {city}",
    subheading:
      "Discover active {role} vacancies from verified companies hiring in {city}. Apply in seconds with zero form-filling.",
    breadcrumb: "{role} in {city}",
  },
  "remote-role": {
    title: "Remote {role} Jobs ({year}) - Work From Home | Hirance",
    description:
      "Find {count}+ remote and work-from-home {role} jobs on Hirance. Fast-track your hiring process with AI-driven matching and direct chats with recruiters.",
    heading: "Remote {role} Jobs",
    subheading:
      "Work from anywhere. Explore top flexible and full-time remote {role} positions with fast hiring cycles.",
    breadcrumb: "Remote {role}",
  },
  "freshers-city": {
    title: "Fresher & Entry-Level Jobs in {city} ({year}) | Hirance",
    description:
      "Looking for fresher jobs in {city}? Browse {count}+ entry-level openings on Hirance. No complicated application forms—swipe right to get interviewed.",
    heading: "Fresher Jobs in {city}",
    subheading:
      "Kickstart your career with top employers in {city} offering verified entry-level roles and competitive pay.",
    breadcrumb: "Freshers in {city}",
  },
  "experience-role": {
    title: "{experience} {role} Jobs ({year}) | Hirance",
    description:
      "Apply to {count}+ curated {experience} {role} opportunities on Hirance. Connect directly with hiring managers and view AI job fit scores.",
    heading: "{experience} {role} Openings",
    subheading:
      "Exclusive high-growth {role} roles for {experience} professionals across leading tech and business teams.",
    breadcrumb: "{experience} {role}",
  },
  "role": {
    title: "{count}+ {role} Jobs ({year}) | Hirance",
    description:
      "Find your next {role} role on Hirance. Browse {count}+ active vacancies from top startups and enterprise companies.",
    heading: "{role} Jobs",
    subheading:
      "Explore vetted {role} job openings with transparent compensation and rapid employer responses.",
    breadcrumb: "{role}",
  },
  "city": {
    title: "Jobs in {city} ({year}) - {count}+ Openings | Hirance",
    description:
      "Search {count}+ verified jobs in {city} across tech, sales, design, and operations on Hirance. Fast hiring with AI match scores.",
    heading: "Jobs in {city}",
    subheading:
      "Find the best career opportunities in {city}. Connect directly with hiring teams on India's modern hiring platform.",
    breadcrumb: "Jobs in {city}",
  },
  "company-city": {
    title: "Jobs at {company} in {city} ({year}) | Hirance",
    description:
      "Explore open vacancies at {company} in {city}. Browse roles, view compensation, and apply directly via Hirance.",
    heading: "Open Roles at {company} ({city})",
    subheading:
      "Join the team at {company}. Discover active job postings and submit your application in 1 click.",
    breadcrumb: "{company} in {city}",
  },
  "default": {
    title: "Find Jobs & Career Opportunities ({year}) | Hirance",
    description:
      "Search verified jobs across top companies on Hirance. Swipe to apply, get instant AI match scores, and chat directly with employers.",
    heading: "Explore Active Job Openings",
    subheading:
      "Connect with companies building the future. Fast, transparent hiring for ambitious professionals.",
    breadcrumb: "All Jobs",
  },
};
