# Programmatic SEO (pSEO) & Dynamic Job Directory Guide

A complete overview of what is currently implemented for **Hirance.com**, what steps are remaining (backend integration), and advanced best practices to scale to 50,000+ indexed pages.

---

## 1. What Is Implemented Right Now

A production-ready **Programmatic SEO (pSEO)** engine and dynamic job search directory has been built directly into the Next.js App Router.

### Architecture Breakdown

```
src/
├── config/
│   ├── jobs-seo-templates.ts  # SEO title, meta description & heading templates
│   └── jobs-taxonomy.ts       # Master lists of roles, Indian cities, experience tiers
├── lib/
│   ├── seo-engine.ts          # URL slug parser, metadata & Google JSON-LD schema builder
│   └── jobs-data.ts           # Typed data repository & backend-ready API adapter
├── components/jobs/
│   ├── job-card.tsx           # Clean job card with AI match score & swipe CTA
│   ├── job-filter-bar.tsx     # Role search, city dropdown, and quick filter pills
│   ├── job-seo-links.tsx      # Internal linking clusters for search crawlers
│   └── jobs-content.tsx       # Master directory layout & live opening counter
└── app/
    ├── sitemap.ts             # Dynamic XML sitemap generator
    └── jobs/
        ├── page.tsx           # Main /jobs directory
        └── [slug]/
            └── page.tsx       # Dynamic pSEO landing page (e.g. /jobs/react-developer-in-bangalore)
```

---

### Working Live Route Examples

All routes below render dynamically with server-side metadata, OpenGraph tags, and Google Schema:

| URL Pattern | Example URL | Dynamically Generated SEO Title |
| :--- | :--- | :--- |
| **Main Hub** | `/jobs` | *Search Jobs & Career Opportunities in India (2026) \| Hirance* |
| **Role + City** | `/jobs/react-developer-in-bangalore` | *35+ React Developer Jobs in Bangalore (2026) \| Hirance* |
| **Remote Role** | `/jobs/remote-frontend-developer` | *Remote Frontend Developer Jobs (2026) - Work From Home \| Hirance* |
| **Freshers + City** | `/jobs/freshers-jobs-in-pune` | *Fresher & Entry-Level Jobs in Pune (2026) \| Hirance* |
| **City Hub** | `/jobs/jobs-in-mumbai` | *Jobs in Mumbai (2026) - 35+ Openings \| Hirance* |
| **Sitemap** | `/sitemap.xml` | *Auto-generated sitemap listing all static & pSEO URLs* |

---

## 2. What We Have To Do (Next Steps & Backend Integration)

Connecting your real database/backend takes **3 simple steps**:

### Step A: Backend API Requirements
Your backend team should expose **two simple REST endpoints**:

#### 1. Filtered Jobs List:
`GET /api/v1/jobs?role=react-developer&city=bangalore&page=1&limit=12`
```json
{
  "totalJobs": 142,
  "jobs": [
    {
      "id": "job_101",
      "slug": "senior-react-dev-razorpay",
      "title": "Senior React Developer",
      "company": "Razorpay",
      "location": "Bangalore, Karnataka",
      "citySlug": "bangalore",
      "roleSlug": "react-developer",
      "jobType": "Full-Time",
      "experience": "3-5 yrs",
      "salaryRange": "₹18L - ₹28L / yr",
      "skills": ["React", "TypeScript", "Next.js"],
      "matchScore": 96,
      "postedDate": "2026-08-14",
      "isVerified": true,
      "department": "Engineering"
    }
  ]
}
```

#### 2. Active Sitemap Slugs List:
`GET /api/v1/jobs/sitemap-list`
```json
{
  "total": 1000,
  "jobs": [
    { "slug": "react-developer-in-bangalore", "updatedAt": "2026-08-14T10:00:00Z" },
    { "slug": "senior-ui-ux-designer-in-mumbai", "updatedAt": "2026-08-14T09:30:00Z" },
    { "slug": "remote-python-ai-engineer", "updatedAt": "2026-08-13T16:00:00Z" }
  ]
}
```

---

### Step B: Connect Frontend to Backend (1-File Edit)
In `src/lib/jobs-data.ts`, replace the local mock filter with your live API:

```typescript
// src/lib/jobs-data.ts
export async function getJobs(params: {
  roleSlug?: string;
  citySlug?: string;
  experienceSlug?: string;
  jobType?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<JobsQueryResponse> {
  const query = new URLSearchParams();
  if (params.roleSlug) query.set("role", params.roleSlug);
  if (params.citySlug && params.citySlug !== "all") query.set("city", params.citySlug);
  if (params.experienceSlug) query.set("experience", params.experienceSlug);
  if (params.search) query.set("q", params.search);

  const res = await fetch(`https://api.hirance.com/api/v1/jobs?${query.toString()}`, {
    next: { revalidate: 3600 }, // Cache on CDN, refresh hourly
  });

  if (!res.ok) {
    // Fallback to safe defaults if backend is unreachable
    return { jobs: [], totalJobs: 0, page: 1, totalPages: 1, activeFilters: {} };
  }

  return await res.json();
}
```

---

### Step C: How `sitemap.ts` Automatically Updates For 1,000+ Jobs

In Next.js, `sitemap.ts` runs directly on the server whenever Googlebot visits `https://hirance.com/sitemap.xml`.

```
[Googlebot requests /sitemap.xml]
         ↓
[Next.js executes sitemap.ts on server]
         ↓
[Fetches 1,000 active slugs from GET /api/v1/jobs/sitemap-list]
         ↓
[Outputs fresh XML with 1,000+ URLs to Google]
```

#### Updated `src/app/sitemap.ts` when connected:
```typescript
import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 1. Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/how-it-works`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    // 2. Fetch 1,000 active job slugs from backend API
    const res = await fetch("https://api.hirance.com/api/v1/jobs/sitemap-list", {
      next: { revalidate: 3600 }, // Cache on edge CDN for 1 hour
    });
    const { jobs } = await res.json();

    // 3. Map into dynamic sitemap URLs
    const dynamicJobUrls: MetadataRoute.Sitemap = jobs.map((job: { slug: string; updatedAt: string }) => ({
      url: `${baseUrl}/jobs/${job.slug}`,
      lastModified: new Date(job.updatedAt),
      changeFrequency: "daily",
      priority: 0.8,
    }));

    return [...staticPages, ...dynamicJobUrls];
  } catch (error) {
    // Graceful fallback if backend is momentarily unreachable
    return staticPages;
  }
}
```

#### Why this is 100% automated:
- **Zero Manual Work:** When an employer posts a job on the Hirance Employer Portal, it appears in the sitemap on the next hourly cache refresh.
- **Auto-Removal:** When a job is closed or expires in your database, it automatically disappears from `sitemap.xml`.
- **Database Protection:** Using `next: { revalidate: 3600 }` ensures your database is only queried once per hour, even if Googlebot crawls the sitemap hundreds of times a day.

---

### Step D: Search Console & Indexing Setup
1. Deploy to production (`hirance.com`).
2. Open **Google Search Console** -> **Sitemaps**.
3. Submit `https://hirance.com/sitemap.xml`.
4. Google will begin indexing all landing pages automatically.

---

## 3. What Will Be An Even Better Way To Do This? (Advanced Enhancements)

To turn Hirance into an industry-leading programmatic SEO powerhouse (competing directly with Indeed, Apna, and Naukri), here are the top 5 high-impact upgrades:

### 1. Dynamic Social Share Images (`@vercel/og`)
- **What it does:** Automatically generate a custom OpenGraph preview image for every single page.
- **Example:** When someone shares `hirance.com/jobs/react-developer-in-bangalore` on LinkedIn/Twitter/WhatsApp, it dynamically generates an image saying *"142+ React Developer Jobs in Bangalore on Hirance (Swipe to Apply)"*.
- **Why it matters:** 3x higher click-through rates on social media.

### 2. Location-Based Salary Insights Widget
- **What it does:** Add an automated salary benchmark summary card on every landing page:
  > *"Average React Developer Salary in Bangalore: ₹14.5 LPA (Range: ₹8L - ₹28L based on 45 verified postings)"*
- **Why it matters:** Google gives massive ranking boosts to pages that provide unique, data-rich answers to salary search intent.

### 3. Dynamic Category FAQ Schema
- **What it does:** Inject 3–4 role-specific FAQs with Schema.org `FAQPage` markup on dynamic pages:
  - *Q: What are the top skills required for React Developer roles in Bangalore?*
  - *Q: Can I apply for remote React Developer jobs on Hirance?*
- **Why it matters:** Google frequently displays expandable FAQ accordions directly on the search results page, giving Hirance double the visual real estate.

### 4. Paginated Sitemap Index (For 10,000+ Pages)
- As job postings grow, split `sitemap.ts` into a sitemap index (`sitemap-jobs-roles.xml`, `sitemap-jobs-cities.xml`, `sitemap-static.xml`) so search engines crawl without hitting the 50,000 URL limit.

### 5. Google Indexing API Integration (Instant Crawling)
- Whenever an employer posts a new job, trigger a webhook that calls Google's Indexing API (`https://indexing.googleapis.com/v3/urlNotifications:publish`).
- Google bots crawl and index the new role in **under 10 minutes** instead of waiting days.

---

## Summary Checklist

- [x] SEO Templates & Taxonomy configuration created
- [x] Slug Parser & Schema Generator built
- [x] Dynamic `/jobs` & `/jobs/[slug]` pages built with server-side metadata
- [x] Dynamic `sitemap.xml` configured
- [ ] Connect `getJobs()` in `src/lib/jobs-data.ts` to live backend API
- [ ] Submit `sitemap.xml` to Google Search Console upon deployment
