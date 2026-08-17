export interface JobCategory {
  slug: string;
  label: string;
  category: "Engineering" | "Data & AI" | "Design" | "Marketing" | "Sales" | "Operations" | "Product" | "Finance & HR" | "Support & Admin";
}

export interface JobCity {
  slug: string;
  name: string;
  state: string;
  isPopular?: boolean;
}

export const POPULAR_JOB_ROLES = [
  // 1. Engineering & Technology
  { slug: "frontend-developer", label: "Frontend Developer", category: "Engineering" },
  { slug: "backend-developer", label: "Backend Developer", category: "Engineering" },
  { slug: "full-stack-developer", label: "Full Stack Developer", category: "Engineering" },
  { slug: "react-developer", label: "React Developer", category: "Engineering" },
  { slug: "node-js-developer", label: "Node.js Developer", category: "Engineering" },
  { slug: "python-developer", label: "Python Developer", category: "Engineering" },
  { slug: "java-developer", label: "Java Developer", category: "Engineering" },
  { slug: "golang-developer", label: "Golang Developer", category: "Engineering" },
  { slug: "mobile-app-developer", label: "Mobile App Developer", category: "Engineering" },
  { slug: "flutter-developer", label: "Flutter Developer", category: "Engineering" },
  { slug: "react-native-developer", label: "React Native Developer", category: "Engineering" },
  { slug: "ios-developer", label: "iOS Developer", category: "Engineering" },
  { slug: "android-developer", label: "Android Developer", category: "Engineering" },
  { slug: "devops-engineer", label: "DevOps Engineer", category: "Engineering" },
  { slug: "cloud-engineer", label: "Cloud & AWS Engineer", category: "Engineering" },
  { slug: "qa-automation-engineer", label: "QA / SDET Engineer", category: "Engineering" },
  { slug: "security-engineer", label: "Cybersecurity Analyst", category: "Engineering" },

  // 2. Data Science & AI
  { slug: "data-analyst", label: "Data Analyst", category: "Data & AI" },
  { slug: "data-scientist", label: "Data Scientist", category: "Data & AI" },
  { slug: "data-engineer", label: "Data Engineer", category: "Data & AI" },
  { slug: "ai-ml-engineer", label: "AI / ML Engineer", category: "Data & AI" },
  { slug: "business-analyst", label: "Business Analyst", category: "Data & AI" },

  // 3. Design & Creative
  { slug: "ui-ux-designer", label: "UI/UX Designer", category: "Design" },
  { slug: "product-designer", label: "Product Designer", category: "Design" },
  { slug: "graphic-designer", label: "Graphic Designer", category: "Design" },
  { slug: "motion-designer", label: "Motion Graphic Designer", category: "Design" },
  { slug: "brand-designer", label: "Brand Identity Designer", category: "Design" },

  // 4. Product & Management
  { slug: "product-manager", label: "Product Manager", category: "Product" },
  { slug: "associate-product-manager", label: "Associate Product Manager (APM)", category: "Product" },
  { slug: "project-manager", label: "Project / Scrum Master", category: "Product" },

  // 5. Marketing & Growth
  { slug: "digital-marketing-specialist", label: "Digital Marketing Specialist", category: "Marketing" },
  { slug: "performance-marketing-manager", label: "Performance Marketing Manager", category: "Marketing" },
  { slug: "seo-specialist", label: "SEO Specialist", category: "Marketing" },
  { slug: "content-writer", label: "Content & Copywriter", category: "Marketing" },
  { slug: "social-media-manager", label: "Social Media Specialist", category: "Marketing" },
  { slug: "email-marketing-specialist", label: "Email Marketing Specialist", category: "Marketing" },

  // 6. Sales & Business Development
  { slug: "sales-executive", label: "Sales Executive", category: "Sales" },
  { slug: "business-development-manager", label: "Business Development Manager (BDM)", category: "Sales" },
  { slug: "telecaller", label: "Telecaller / Inside Sales", category: "Sales" },
  { slug: "account-executive", label: "Account Executive (B2B)", category: "Sales" },
  { slug: "field-sales-executive", label: "Field Sales Officer", category: "Sales" },
  { slug: "retail-sales-associate", label: "Retail Sales Associate", category: "Sales" },

  // 7. Operations, HR & Finance
  { slug: "hr-manager", label: "HR Generalist / Recruiter", category: "Finance & HR" },
  { slug: "talent-acquisition-specialist", label: "Talent Acquisition Specialist", category: "Finance & HR" },
  { slug: "accountant", label: "Accountant / Finance Associate", category: "Finance & HR" },
  { slug: "operations-executive", label: "Operations Executive", category: "Operations" },
  { slug: "back-office-executive", label: "Back Office Executive", category: "Support & Admin" },
  { slug: "data-entry-operator", label: "Data Entry Operator", category: "Support & Admin" },
  { slug: "customer-support-associate", label: "Customer Support Associate", category: "Support & Admin" },
  { slug: "office-administrator", label: "Office Administrator", category: "Support & Admin" },
] as const;

export const POPULAR_CITIES: JobCity[] = [
  // Tier 1 Metro Tech & Commercial Hubs
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", isPopular: true },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", isPopular: true },
  { slug: "delhi-ncr", name: "Delhi NCR", state: "Delhi", isPopular: true },
  { slug: "gurgaon", name: "Gurgaon", state: "Haryana", isPopular: true },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", isPopular: true },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", isPopular: true },
  { slug: "pune", name: "Pune", state: "Maharashtra", isPopular: true },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", isPopular: true },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", isPopular: true },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", isPopular: true },
  { slug: "remote", name: "Remote / Work From Home", state: "All India", isPopular: true },

  // NCR Extended Hubs
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh" },
  { slug: "faridabad", name: "Faridabad", state: "Haryana" },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh" },
  { slug: "navi-mumbai", name: "Navi Mumbai", state: "Maharashtra" },
  { slug: "thane", name: "Thane", state: "Maharashtra" },

  // Tier 2 High-Growth Cities
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", isPopular: true },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab/Haryana", isPopular: true },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", isPopular: true },
  { slug: "kochi", name: "Kochi", state: "Kerala", isPopular: true },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", isPopular: true },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu" },
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha" },
  { slug: "surat", name: "Surat", state: "Gujarat" },
  { slug: "vadodara", name: "Vadodara", state: "Gujarat" },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra" },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh" },
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh" },
  { slug: "patna", name: "Patna", state: "Bihar" },
  { slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh" },
  { slug: "ludhiana", name: "Ludhiana", state: "Punjab" },
  { slug: "nashik", name: "Nashik", state: "Maharashtra" },
  { slug: "rajkot", name: "Rajkot", state: "Gujarat" },
  { slug: "varanasi", name: "Varanasi", state: "Uttar Pradesh" },
  { slug: "agra", name: "Agra", state: "Uttar Pradesh" },
  { slug: "madurai", name: "Madurai", state: "Tamil Nadu" },
  { slug: "guwahati", name: "Guwahati", state: "Assam" },
  { slug: "meerut", name: "Meerut", state: "Uttar Pradesh" },
  { slug: "jodhpur", name: "Jodhpur", state: "Rajasthan" },
  { slug: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh" },
  { slug: "gwalior", name: "Gwalior", state: "Madhya Pradesh" },
  { slug: "ranchi", name: "Ranchi", state: "Jharkhand" },
  { slug: "jabalpur", name: "Jabalpur", state: "Madhya Pradesh" },
  { slug: "raipur", name: "Raipur", state: "Chhattisgarh" },
  { slug: "allahabad", name: "Prayagraj (Allahabad)", state: "Uttar Pradesh" },
  { slug: "amritsar", name: "Amritsar", state: "Punjab" },
  { slug: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala" },
  { slug: "dehradun", name: "Dehradun", state: "Uttarakhand" },
  { slug: "mysore", name: "Mysore", state: "Karnataka" },
];

export const EXPERIENCE_LEVELS = [
  { slug: "freshers", label: "Freshers (0-1 yrs)" },
  { slug: "entry-level", label: "Entry Level (1-3 yrs)" },
  { slug: "mid-level", label: "Mid Level (3-5 yrs)" },
  { slug: "senior-level", label: "Senior Level (5+ yrs)" },
  { slug: "lead", label: "Lead / Manager (8+ yrs)" },
] as const;

export const JOB_TYPES = [
  { slug: "full-time", label: "Full Time" },
  { slug: "part-time", label: "Part Time" },
  { slug: "remote", label: "Remote / WFH" },
  { slug: "internship", label: "Internship" },
] as const;
