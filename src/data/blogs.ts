import { BlogCategory, BlogDetail, BlogListItem, BlogTag } from "@/types/blogs";

export const FALLBACK_BLOG_CATEGORIES: BlogCategory[] = [
  { id: null, name: "All", slug: "all", post_count: 10 },
  { id: "cat-1", name: "Hiring Trends", slug: "hiring-trends", post_count: 3 },
  { id: "cat-2", name: "Career Insights", slug: "career-insights", post_count: 2 },
  { id: "cat-3", name: "Employer Strategy", slug: "employer-strategy", post_count: 3 },
  { id: "cat-4", name: "Tech Industry", slug: "tech-industry", post_count: 2 },
];

export const FALLBACK_BLOG_TAGS: BlogTag[] = [
  { name: "Swipe Hiring", slug: "swipe-hiring", count: 18 },
  { name: "Smart Score", slug: "smart-score", count: 14 },
  { name: "Recruitment Tech", slug: "recruitment-tech", count: 12 },
  { name: "Tech Jobs", slug: "tech-jobs", count: 10 },
  { name: "Startups", slug: "startups", count: 8 },
  { name: "India Tech", slug: "india-tech", count: 7 },
  { name: "Interview Prep", slug: "interview-prep", count: 6 },
  { name: "Remote Work", slug: "remote-work", count: 5 },
];

export const FALLBACK_BLOGS: BlogDetail[] = [
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192801",
    slug: "how-swipe-hiring-is-replacing-traditional-resumes",
    title: "How Swipe-Based Hiring is Replacing Traditional Resumes in 2026",
    excerpt: "Instant swipe matching connects engineers with hiring leads in seconds without tedious multi-page application forms.",
    category: {
      id: "cat-1",
      name: "Hiring Trends",
      slug: "hiring-trends",
    },
    read_time: "4 min read",
    published_at: "2026-08-12T10:00:00.000Z",
    updated_at: "2026-08-15T14:30:00.000Z",
    featured: true,
    views_count: 1420,
    cover_image: {
      url: "/og.png",
      alt: "Swipe-based job matching on Hirance",
      caption: "Instant matching replaces legacy ATS applicant forms.",
      width: 1200,
      height: 630,
    },
    author: {
      id: "auth-1",
      name: "Ananya Sharma",
      role: "Lead Talent Analyst",
      avatar: "",
      bio: "Talent researcher analyzing recruitment velocity and hiring efficiency across India's top tech ecosystems.",
    },
    tags: ["Swipe Hiring", "Recruitment Tech", "Career Advice", "Smart Score"],
    key_takeaways: [
      "Traditional multi-page application forms lose up to 84% of top engineering talent.",
      "Swipe matching evaluates real-time skill benchmarks instead of static keyword formatting.",
      "Candidates connect directly with verified engineering leaders without recruiter bottlenecks.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "The era of sending 50 generic resumes into an automated applicant tracking system (ATS) black hole is officially coming to an end. In 2026, tech recruitment is shifting toward high-intent, instant matching platforms designed around candidate experience.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Breakdown of Traditional Resumes",
      },
      {
        type: "paragraph",
        content:
          "For over two decades, job hunting followed the same frustrating flow: search for listings, fill out multi-page forms, re-type resume details line by line, and wait weeks for an automated rejection email. Recruiters face the opposite headache: receiving 1,000+ unvetted applications for a single software engineering post.",
      },
      {
        type: "callout",
        title: "The Friction Cost",
        content:
          "Over 84% of senior tech candidates abandon career portals that require manual account setup and multi-step forms.",
      },
      {
        type: "heading",
        level: 2,
        content: "Enter Swipe-Based Hiring",
      },
      {
        type: "paragraph",
        content:
          "Hirance pioneered India's first swipe-based recruitment ecosystem to eliminate friction for both job seekers and hiring teams.",
      },
      {
        type: "list",
        items: [
          "**For Candidates:** Zero forms. No resume re-uploads. A single swipe right submits your verified profile directly to engineering leads.",
          "**For Employers:** No candidate spam. Job listings take 60 seconds to launch, matching only with engineers whose Smart Score aligns with role requirements.",
        ],
      },
      {
        type: "quote",
        quote: "Hiring speed is the single highest predictor of offer acceptance in competitive tech sectors.",
        author: "Ananya Sharma",
        role: "Lead Talent Analyst",
      },
      {
        type: "heading",
        level: 3,
        content: "Real-Time Smart Scoring vs. Keyword Parsing",
      },
      {
        type: "paragraph",
        content:
          "Unlike legacy keyword scanners that penalize resume formatting, real-time Smart Scoring evaluates structured skill benchmarks, hands-on project experience, tech stack familiarity, and candidate availability. The result? Faster hiring cycles, higher candidate response rates, and a streamlined experience built for modern professionals.",
      },
      {
        type: "stat",
        value: "48 hrs",
        label: "Average time-to-hire with swipe matching vs 35 days traditional",
      },
    ],
    seo: {
      meta_title: "How Swipe-Based Hiring Replaces Traditional Resumes | Hirance",
      meta_description: "Discover how swipe-based hiring connects engineers with hiring leads in seconds with zero form friction.",
      canonical_url: "https://hirance.com/blog/how-swipe-hiring-is-replacing-traditional-resumes",
      keywords: ["swipe hiring", "recruitment tech", "smart score", "hirance blog"],
    },
    cta: {
      type: "candidate",
      title: "Ready to experience swipe hiring?",
      description: "Download the Hirance mobile app and get matched with top tech roles in seconds.",
      button_text: "Get the App",
      button_url: "https://play.google.com/store/apps/details?id=com.hirance",
    },
    related_posts: [
      {
        id: "984f1a23-6b3a-4a2e-8c31-7bfae0192802",
        slug: "5-ways-candidates-can-boost-their-smart-score",
        title: "5 Ways Candidates Can Boost Their Smart Score on Hirance",
        excerpt: "Maximize your candidate match rating to appear at the top of hiring managers' feeds.",
        category: "Career Insights",
        read_time: "3 min read",
        published_at: "2026-08-10T10:00:00.000Z",
      },
      {
        id: "984f1a23-6b3a-4a2e-8c31-7bfae0192803",
        slug: "why-60-second-job-postings-are-revolutionizing-recruitment",
        title: "Why 60-Second Job Postings Are Revolutionizing Recruitment",
        excerpt: "Structured job postings save founders 15+ hours per hire while attracting higher quality talent.",
        category: "Employer Strategy",
        read_time: "4 min read",
        published_at: "2026-08-08T10:00:00.000Z",
      },
    ],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192802",
    slug: "5-ways-candidates-can-boost-their-smart-score",
    title: "5 Ways Candidates Can Boost Their Smart Score on Hirance",
    excerpt: "Maximize your candidate match rating to appear at the top of hiring managers' feeds with these proven profile optimization tips.",
    category: {
      id: "cat-2",
      name: "Career Insights",
      slug: "career-insights",
    },
    read_time: "3 min read",
    published_at: "2026-08-10T10:00:00.000Z",
    updated_at: "2026-08-11T12:00:00.000Z",
    featured: false,
    views_count: 980,
    cover_image: {
      url: "/og.png",
      alt: "Candidate Smart Score Optimization",
    },
    author: {
      id: "auth-2",
      name: "Rohan Varma",
      role: "Senior Product Strategist",
      bio: "Product strategist specializing in algorithmic talent matching and candidate conversion.",
    },
    tags: ["Smart Score", "Job Search", "Profile Tips", "Tech Jobs"],
    key_takeaways: [
      "Keep core tech stacks updated with specific framework versions.",
      "Specify clear CTC expectations and notice period status.",
      "Add direct links to verified GitHub repositories and live app projects.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "On Hirance, your Smart Score determines how prominently your profile appears when employers search for talent in your domain. A high Smart Score means instant visibility for top-tier tech roles.",
      },
      {
        type: "heading",
        level: 2,
        content: "Actionable Steps to Boost Your Rating",
      },
      {
        type: "list",
        items: [
          "**Define Precise Technical Stacks:** Specify frameworks like React, Next.js, Node.js, TypeScript, or PostgreSQL instead of broad terms.",
          "**Update Notice Period & Availability:** Employers prioritize immediate joiners or 15-day candidates.",
          "**Showcase Verified Live Work:** Add working repository links or production demo URLs.",
          "**Set Realistic CTC & Location Preferences:** Clarity reduces mismatched inquiries and increases interview conversions.",
          "**Keep Profile Credentials Verified:** Complete skill badges on the Hirance app for 3x more swipe-rights.",
        ],
      },
    ],
    seo: {
      meta_title: "5 Ways Candidates Can Boost Their Smart Score | Hirance",
      meta_description: "Learn how to optimize your candidate profile and Smart Score on Hirance to get hired faster.",
      canonical_url: "https://hirance.com/blog/5-ways-candidates-can-boost-their-smart-score",
      keywords: ["smart score", "tech profile tips", "job search india", "hirance"],
    },
    cta: {
      type: "candidate",
      title: "Boost your score on the mobile app",
      description: "Create your verified profile in 2 minutes and start getting matched.",
      button_text: "Download App",
      button_url: "https://play.google.com/store/apps/details?id=com.hirance",
    },
    related_posts: [
      {
        id: "984f1a23-6b3a-4a2e-8c31-7bfae0192801",
        slug: "how-swipe-hiring-is-replacing-traditional-resumes",
        title: "How Swipe-Based Hiring is Replacing Traditional Resumes in 2026",
        excerpt: "Instant swipe matching connects engineers with hiring leads in seconds.",
        category: "Hiring Trends",
        read_time: "4 min read",
        published_at: "2026-08-12T10:00:00.000Z",
      },
    ],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192803",
    slug: "why-60-second-job-postings-are-revolutionizing-recruitment",
    title: "Why 60-Second Job Postings Are Revolutionizing Recruitment",
    excerpt: "Lengthy 5-page job descriptions are out. Learn how structured, 60-second job postings save startup founders 15+ hours per hire.",
    category: {
      id: "cat-3",
      name: "Employer Strategy",
      slug: "employer-strategy",
    },
    read_time: "4 min read",
    published_at: "2026-08-08T10:00:00.000Z",
    updated_at: "2026-08-09T08:00:00.000Z",
    featured: false,
    views_count: 850,
    cover_image: {
      url: "/og.png",
      alt: "60-Second Job Posting Workflow",
    },
    author: {
      id: "auth-3",
      name: "Priya Nair",
      role: "Head of Growth & Talent",
      bio: "Scaling hiring velocity for high-growth tech firms across India.",
    },
    tags: ["Employer Strategy", "Fast Hiring", "Tech Recruitment", "Startups"],
    key_takeaways: [
      "Traditional job descriptions are over-engineered and discourage qualified applicants.",
      "60-second structured listings highlight core essentials: stack, compensation, location, and key deliverable.",
      "Employers cut time-to-hire from 35 days down to under 48 hours.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "Startups and high-growth engineering teams cannot afford to spend 3 weeks drafting job descriptions and waiting for HR approvals while critical features sit stalled in product pipelines.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Problem With Old Job Descriptions",
      },
      {
        type: "list",
        items: [
          "**Unnecessary Wishlists:** Demanding 10 years of experience in technologies created 3 years ago.",
          "**Ambiguous Compensation:** Hiding salary bands leads to dropped offers after rounds of interviews.",
          "**Slow Publishing Workflows:** Multi-step recruiter dashboards delay candidate outreach by days.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "The 60-Second Job Posting Framework",
      },
      {
        type: "paragraph",
        content:
          "By selecting structured parameters—Role Title, Key Tech Stack, Clear CTC Range, and Primary 90-Day Outcome—listing a role takes under a minute, and candidate matching begins instantly.",
      },
    ],
    seo: {
      meta_title: "Why 60-Second Job Postings Revolutionize Recruitment | Hirance",
      meta_description: "Learn how structured 60-second job postings help founders hire qualified tech talent in 48 hours.",
      canonical_url: "https://hirance.com/blog/why-60-second-job-postings-are-revolutionizing-recruitment",
      keywords: ["fast hiring", "60 second job post", "recruiter playbook", "hirance"],
    },
    cta: {
      type: "employer",
      title: "Post a job in 60 seconds",
      description: "Launch your role and match with verified engineers today.",
      button_text: "Post a Job Now",
      button_url: "https://employer.hirance.com/",
    },
    related_posts: [],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192804",
    slug: "the-death-of-job-application-forms",
    title: "The Death of Job Application Forms: What Candidate Data Reveals",
    excerpt: "Over 84% of tech professionals drop off when forced to fill multi-step forms. Here is how modern hiring UX fixes candidate drop-off.",
    category: {
      id: "cat-1",
      name: "Hiring Trends",
      slug: "hiring-trends",
    },
    read_time: "3 min read",
    published_at: "2026-08-05T10:00:00.000Z",
    updated_at: "2026-08-06T10:00:00.000Z",
    featured: false,
    views_count: 730,
    cover_image: {
      url: "/og.png",
      alt: "Job Application Form Drop-Off Analytics",
    },
    author: {
      id: "auth-1",
      name: "Ananya Sharma",
      role: "Lead Talent Analyst",
      bio: "Talent researcher tracking hiring velocity in India.",
    },
    tags: ["Candidate UX", "Gen-Z Talent", "Hiring Analytics", "Mobile App"],
    key_takeaways: [
      "Application form abandonment rate spikes after the 2nd form step.",
      "Mobile-first tech candidates expect 1-click or swipe application flows.",
      "Faster response times directly correlate with higher offer acceptance rates.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "Recent hiring data across Indian tech hubs shows a stark trend: top software developers, UI designers, and DevOps engineers consistently abandon tedious application portals requiring manual form filling.",
      },
      {
        type: "callout",
        title: "Mobile-First Expectation",
        content:
          "Modern professionals manage their lives through mobile apps—from food delivery to financial transfers. Job discovery should feel equally seamless.",
      },
    ],
    seo: {
      meta_title: "The Death of Job Application Forms | Hirance",
      meta_description: "Discover why top talent abandons traditional career forms and how swipe matching fixes candidate drop-off.",
      canonical_url: "https://hirance.com/blog/the-death-of-job-application-forms",
      keywords: ["candidate ux", "zero forms hiring", "recruitment analytics"],
    },
    related_posts: [],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192805",
    slug: "top-high-demand-tech-skills-in-india-2026",
    title: "Top High-Demand Tech Skills in India for 2026 & Salary Trends",
    excerpt: "Explore the most sought-after engineering skill sets, framework demands, and compensation benchmarks across India's top tech hubs.",
    category: {
      id: "cat-4",
      name: "Tech Industry",
      slug: "tech-industry",
    },
    read_time: "5 min read",
    published_at: "2026-08-02T10:00:00.000Z",
    updated_at: "2026-08-03T10:00:00.000Z",
    featured: false,
    views_count: 1120,
    cover_image: {
      url: "/og.png",
      alt: "High-Demand Tech Skills in India",
    },
    author: {
      id: "auth-4",
      name: "Vikramaditya Das",
      role: "Chief Tech Economist",
      bio: "Economist analyzing workforce dynamics and compensation benchmarks.",
    },
    tags: ["Tech Skills", "Salary Insights", "India Tech", "Engineering"],
    key_takeaways: [
      "Full-stack TypeScript and AI system integration top engineering demand.",
      "DevOps & cloud security specialists command high compensation growth.",
      "Tier-2 tech hubs like Lucknow, Indore, and Kochi are witnessing accelerated hiring.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "India's technology sector continues to evolve rapidly in 2026. Data gathered from thousands of employer job postings on Hirance highlights key skill trends and compensation benchmarks shaping the industry.",
      },
      {
        type: "heading",
        level: 2,
        content: "Top Technical Domains",
      },
      {
        type: "list",
        items: [
          "**AI & ML Integration Engineers:** Demand for LLM fine-tuning, Python, PyTorch, and vector databases grew 140% year-over-year.",
          "**Modern Full-Stack Developers:** Next.js, React, Node.js, and TypeScript remain dominant.",
          "**Cloud Infrastructure:** AWS, Kubernetes, Terraform, and CI/CD automation remain critical.",
          "**Mobile Engineers:** Cross-platform React Native and Flutter experts see strong demand.",
        ],
      },
    ],
    seo: {
      meta_title: "Top Tech Skills in India 2026 & Salary Trends | Hirance",
      meta_description: "Explore high demand engineering skills and compensation benchmarks in India.",
      canonical_url: "https://hirance.com/blog/top-high-demand-tech-skills-in-india-2026",
      keywords: ["tech skills 2026", "salary trends india", "software engineer compensation"],
    },
    related_posts: [],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192806",
    slug: "how-real-time-candidate-matching-eliminates-ghosting",
    title: "How Real-Time Candidate Matching Eliminates Recruitment Ghosting",
    excerpt: "Candidate ghosting damages employer brands and frustrates applicants. Here is how instant match notifications fix communication breakdown.",
    category: {
      id: "cat-1",
      name: "Hiring Trends",
      slug: "hiring-trends",
    },
    read_time: "4 min read",
    published_at: "2026-07-28T10:00:00.000Z",
    featured: false,
    views_count: 640,
    cover_image: {
      url: "/og.png",
      alt: "Eliminating recruitment ghosting",
    },
    author: {
      id: "auth-3",
      name: "Priya Nair",
      role: "Head of Growth & Talent",
      bio: "Scaling hiring velocity for high-growth tech firms across India.",
    },
    tags: ["Ghosting Fix", "Recruitment UX", "Candidate Experience", "Hirance"],
    key_takeaways: [
      "Lack of communication during hiring is the #1 complaint among candidates.",
      "Automated status triggers keep both candidates and recruiters updated at every stage.",
      "Direct chat channels shorten response windows from 10 days to under 3 hours.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "Ghosting—the sudden disappearance of communication after an application or interview—has long plagued the recruitment industry. Real-time match status tracking on Hirance gives candidates full transparency.",
      },
    ],
    related_posts: [],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192807",
    slug: "employer-guide-shortlist-10-tech-candidates-in-10-minutes",
    title: "Employer Guide: How to Shortlist 10 Tech Candidates in 10 Minutes",
    excerpt: "A step-by-step playbook for founders and HR leads to evaluate, rank, and schedule interviews with top technical talent at lightning speed.",
    category: {
      id: "cat-3",
      name: "Employer Strategy",
      slug: "employer-strategy",
    },
    read_time: "4 min read",
    published_at: "2026-07-25T10:00:00.000Z",
    featured: false,
    views_count: 590,
    cover_image: {
      url: "/og.png",
      alt: "Shortlisting candidates in 10 minutes",
    },
    author: {
      id: "auth-2",
      name: "Rohan Varma",
      role: "Senior Product Strategist",
    },
    tags: ["Recruiter Playbook", "Speed Hiring", "Employer Tips", "Shortlisting"],
    key_takeaways: [
      "Filter by Smart Score to focus on top 10% profile matches.",
      "Verify code repository links before diving into long interview rounds.",
      "Use 1-click scheduling to book initial technical syncs immediately.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "Time is money when building tech products. Every day an engineering role stays unfilled is a day of product delay. Here is how top hiring leads use Hirance to shortlist 10 qualified candidates in under 10 minutes.",
      },
    ],
    related_posts: [],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192808",
    slug: "mastering-the-tech-interview-common-pitfalls",
    title: "Mastering the Tech Interview: Common Pitfalls & How to Stand Out",
    excerpt: "Beyond coding tests: Learn what hiring managers really look for during system design syncs and practical technical evaluations.",
    category: {
      id: "cat-2",
      name: "Career Insights",
      slug: "career-insights",
    },
    read_time: "4 min read",
    published_at: "2026-07-20T10:00:00.000Z",
    featured: false,
    views_count: 720,
    cover_image: {
      url: "/og.png",
      alt: "Mastering tech interviews",
    },
    author: {
      id: "auth-4",
      name: "Vikramaditya Das",
      role: "Chief Tech Economist",
    },
    tags: ["Interview Prep", "Coding Tips", "Software Engineers", "Career"],
    key_takeaways: [
      "Communication of trade-offs matters more than memorized syntax.",
      "Ask clarifying questions before writing a single line of solution code.",
      "Be prepared to explain past project decisions, bugs solved, and architecture choices.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "Passing tech interviews in 2026 requires more than LeetCode grinding. Modern engineering teams prioritize practical problem-solving, architectural decision-making, and clear team communication.",
      },
    ],
    related_posts: [],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192809",
    slug: "tier-2-cities-rising-how-remote-work-is-reshaping-tech",
    title: "Tier-2 Cities Rising: How Regional Talent Hubs Are Shaping Tech Hiring",
    excerpt: "Cities like Lucknow, Jaipur, and Indore are emerging as powerhouses for tech talent. Here is why top employers are expanding regional recruitment.",
    category: {
      id: "cat-4",
      name: "Tech Industry",
      slug: "tech-industry",
    },
    read_time: "3 min read",
    published_at: "2026-07-15T10:00:00.000Z",
    featured: false,
    views_count: 510,
    cover_image: {
      url: "/og.png",
      alt: "Regional talent hubs in India",
    },
    author: {
      id: "auth-1",
      name: "Ananya Sharma",
      role: "Lead Talent Analyst",
    },
    tags: ["Tier 2 Tech", "Remote Work", "India Hiring", "Regional Hubs"],
    key_takeaways: [
      "Tier-2 tech talent pools offer high loyalty, strong engineering skills, and lower attrition.",
      "Remote and hybrid models allow companies to tap into talented professionals nationwide.",
      "Hirance connects regional talent with top national employers seamlessly.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "The Indian tech ecosystem is no longer confined to traditional metro hubs. Over the past three years, cities like Lucknow, Indore, Chandigarh, Jaipur, and Kochi have seen explosive growth in technical talent.",
      },
    ],
    related_posts: [],
  },
  {
    id: "984f1a23-6b3a-4a2e-8c31-7bfae0192810",
    slug: "the-cost-of-bad-hiring-fits-why-ai-match-precision-matters",
    title: "The Cost of Bad Hiring Fits: Why AI-Match Precision Matters",
    excerpt: "Replacing a misplaced engineer costs up to 3x their monthly salary. Discover how precision matching prevents costly mishires.",
    category: {
      id: "cat-3",
      name: "Employer Strategy",
      slug: "employer-strategy",
    },
    read_time: "4 min read",
    published_at: "2026-07-10T10:00:00.000Z",
    featured: false,
    views_count: 480,
    cover_image: {
      url: "/og.png",
      alt: "Precision candidate matching",
    },
    author: {
      id: "auth-3",
      name: "Priya Nair",
      role: "Head of Growth & Talent",
    },
    tags: ["Match Precision", "Mishire Prevention", "HR Analytics", "Employer"],
    key_takeaways: [
      "Bad hires result from mismatched expectations and unverified skill claims.",
      "Smart Scoring measures objective technical alignment before initial interviews.",
      "Higher match precision leads to 40% improved 1-year candidate retention rates.",
    ],
    sections: [
      {
        type: "paragraph",
        content:
          "A bad hire isn't just a minor inconvenience—it impacts team morale, delays product release dates, and drains financial resources. Precision matching on Hirance fixes alignment from day one.",
      },
    ],
    related_posts: [],
  },
];

/**
 * Convert full BlogDetail to lightweight BlogListItem
 */
export function toBlogListItem(blog: BlogDetail): BlogListItem {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category,
    read_time: blog.read_time,
    published_at: blog.published_at,
    featured: blog.featured,
    cover_image: blog.cover_image,
    author: blog.author,
    tags: blog.tags,
    views_count: blog.views_count,
  };
}

export const FALLBACK_BLOG_LIST_ITEMS: BlogListItem[] = FALLBACK_BLOGS.map(toBlogListItem);
