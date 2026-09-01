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
  | "work-from-office"
  | "field-jobs"
  | "work-from-home"
  | "full-time"
  | "part-time"
  | "day-shift"
  | "night-shift"
  | "hybrid"
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
  "work-from-office": {
    title: "Work From Office Jobs ({year}) - {count}+ In-Office Vacancies | Hirance",
    description:
      "Explore {count}+ verified in-office job opportunities across India. Connect with top employers hiring for on-site positions with instant application on Hirance.",
    heading: "Work From Office Jobs",
    subheading:
      "Discover active in-office opportunities at modern workplaces across India. Apply with zero form-filling.",
    breadcrumb: "Work From Office Jobs",
  },
  "field-jobs": {
    title: "Field Jobs ({year}) - {count}+ On-Field & Executive Openings | Hirance",
    description:
      "Browse {count}+ verified field sales, operations, and technician jobs on Hirance. Apply directly to verified companies hiring in your area.",
    heading: "Field Jobs",
    subheading:
      "Find active on-field and frontline roles with verified employers. Competitive salaries and quick hiring.",
    breadcrumb: "Field Jobs",
  },
  "work-from-home": {
    title: "Work From Home Jobs ({year}) - {count}+ Remote Vacancies | Hirance",
    description:
      "Apply for {count}+ verified Work From Home jobs in tech, customer support, sales, and data entry on Hirance. Work flexibly from anywhere in India.",
    heading: "Work From Home Jobs",
    subheading:
      "Explore top remote and telecommute jobs with verified employers. Fast-track your hiring with one swipe.",
    breadcrumb: "Work From Home Jobs",
  },
  "full-time": {
    title: "Full-Time Jobs ({year}) - {count}+ Career Openings | Hirance",
    description:
      "Find {count}+ verified full-time job openings in India across leading enterprises and high-growth startups on Hirance. Instant AI matching.",
    heading: "Full-Time Jobs",
    subheading:
      "Discover long-term career growth with top companies hiring full-time professionals nationwide.",
    breadcrumb: "Full-Time Jobs",
  },
  "part-time": {
    title: "Part-Time Jobs ({year}) - {count}+ Flexible Vacancies | Hirance",
    description:
      "Browse {count}+ verified part-time and flexible jobs on Hirance. Perfect for students, freelancers, and professionals seeking flexible working hours.",
    heading: "Part-Time Jobs",
    subheading:
      "Earn on your schedule with verified part-time roles offering competitive hourly and monthly compensation.",
    breadcrumb: "Part-Time Jobs",
  },
  "day-shift": {
    title: "Day Shift Jobs ({year}) - {count}+ Active Vacancies | Hirance",
    description:
      "Explore {count}+ verified day shift job vacancies in operations, support, sales, and administration on Hirance. Apply directly with verified employers.",
    heading: "Day Shift Jobs",
    subheading:
      "Find jobs with standard daytime working hours and structured schedules at top hiring companies.",
    breadcrumb: "Day Shift Jobs",
  },
  "night-shift": {
    title: "Night Shift Jobs ({year}) - {count}+ Night Shift Openings | Hirance",
    description:
      "Search {count}+ verified night shift job openings in customer support, international processes, IT, and logistics on Hirance with attractive shift allowances.",
    heading: "Night Shift Jobs",
    subheading:
      "Explore verified night shift roles with premium shift allowances and rapid interview scheduling.",
    breadcrumb: "Night Shift Jobs",
  },
  "hybrid": {
    title: "Hybrid Jobs ({year}) - {count}+ Flexible Work & Shift Openings | Hirance",
    description:
      "Search {count}+ verified hybrid jobs with flexible work arrangements and shifts on Hirance. Connect with top companies hiring nationwide.",
    heading: "Hybrid Jobs",
    subheading:
      "Discover verified hybrid positions offering optimal work-life balance and flexible working models across leading employers.",
    breadcrumb: "Hybrid Jobs",
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
