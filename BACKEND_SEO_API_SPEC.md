# Backend API Specification for Programmatic SEO & Job Directory

This document defines the exact API endpoints and response payloads required from the backend to power Hirance’s **Programmatic SEO (pSEO)** and dynamic job listing pages.

---

## Quick Summary for Backend Developers

- **Frontend Framework:** Next.js (App Router) with Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR).
- **Slug Management:** You **do NOT need to manage or store slugs in the database**. The frontend generates SEO slugs dynamically from `title` and `city`.
- **Cache Strategy:** The frontend caches API responses for 1 hour (`revalidate: 3600`), so your database load remains very low even with heavy Googlebot crawling.
- **Active Jobs Only:** Return only published/active jobs (`status = 'active'`). When a job is closed or deleted, excluding it from the API automatically cleans up the frontend pages and sitemap.

---

## 1. Filtered Jobs & Count API (Primary Endpoint)

This endpoint feeds both the dynamic SEO landing pages (e.g. `/jobs/react-developer-in-bangalore`) and the search/filter directory (`/jobs`).

### `GET /api/v1/jobs`

#### Request Query Parameters:

| Parameter | Type | Required | Example | Description |
| :--- | :--- | :---: | :--- | :--- |
| `role` | `string` | No | `react-developer` or `React Developer` | Role slug or job title keyword |
| `city` | `string` | No | `bangalore` or `remote` | City name / location slug |
| `experience` | `string` | No | `freshers`, `mid-level`, `senior` | Experience tier |
| `jobType` | `string` | No | `Full-Time`, `Remote`, `Part-Time` | Employment type |
| `q` | `string` | No | `figma` | Free text keyword search (title, company, skills) |
| `page` | `integer` | No | `1` (Default: `1`) | Current page number |
| `limit` | `integer` | No | `12` (Default: `12`) | Jobs per page |

#### Success Response (`200 OK`):

```json
{
  "totalJobs": 142,
  "page": 1,
  "totalPages": 12,
  "jobs": [
    {
      "id": "job_101",
      "title": "Senior React Developer",
      "company": "Razorpay",
      "companyLogo": "https://assets.hirance.com/logos/razorpay.png",
      "location": "Bangalore, Karnataka",
      "city": "Bangalore",
      "jobType": "Full-Time",
      "experience": "3-5 yrs",
      "experienceTier": "mid-level",
      "salaryRange": "₹18L - ₹28L / yr",
      "skills": ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS"],
      "matchScore": 96,
      "department": "Engineering",
      "postedDate": "2026-08-14T08:30:00.000Z",
      "isVerified": true
    },
    {
      "id": "job_102",
      "title": "Frontend Engineer (Next.js)",
      "company": "Cred",
      "companyLogo": "https://assets.hirance.com/logos/cred.png",
      "location": "Remote / Work From Home",
      "city": "Remote",
      "jobType": "Remote",
      "experience": "2-4 yrs",
      "experienceTier": "mid-level",
      "salaryRange": "₹16L - ₹24L / yr",
      "skills": ["Next.js", "React", "TypeScript", "Performance"],
      "matchScore": 93,
      "department": "Engineering",
      "postedDate": "2026-08-13T12:00:00.000Z",
      "isVerified": true
    }
  ]
}
```

#### Field Descriptions:

| Field | Type | Description |
| :--- | :--- | :--- |
| `totalJobs` | `number` | **Critical for SEO:** Total count of active jobs matching the query (used for `<title>` tags like *"142+ React Developer Jobs in Bangalore"*). |
| `jobs[].id` | `string` | Unique Job ID |
| `jobs[].title` | `string` | Clean job title |
| `jobs[].company` | `string` | Hiring company name |
| `jobs[].salaryRange` | `string` | Display salary string (e.g. `₹12L - ₹18L / yr`) |
| `jobs[].matchScore` | `number` | Hirance AI match score (1–100) or default fallback |
| `jobs[].skills` | `string[]` | Array of key skill tags (e.g. `["React", "TypeScript"]`) |
| `jobs[].isVerified` | `boolean` | Verified employer checkmark |

---

## 2. Sitemap URL Discovery API

This lightweight endpoint provides the list of all active jobs and dynamic pages for Google Search Console indexing.

### `GET /api/v1/jobs/sitemap-list`

#### Success Response (`200 OK`):

```json
{
  "total": 1000,
  "jobs": [
    {
      "id": "job_101",
      "title": "React Developer",
      "city": "Bangalore",
      "updatedAt": "2026-08-14T10:00:00Z"
    },
    {
      "id": "job_102",
      "title": "UI UX Designer",
      "city": "Mumbai",
      "updatedAt": "2026-08-14T09:30:00Z"
    },
    {
      "id": "job_103",
      "title": "Python AI Engineer",
      "city": "Remote",
      "updatedAt": "2026-08-13T16:00:00Z"
    }
  ]
}
```

*Note: The frontend takes `title` and `city` and automatically constructs the sitemap URL (e.g. `/jobs/react-developer-in-bangalore`).*

---

## 3. Recommended Database Indexes

To keep queries fast (< 50ms) even with hundreds of thousands of jobs:

```sql
-- Index for filtering by status, role, city and dates
CREATE INDEX idx_jobs_search ON jobs (status, city, role, posted_at DESC);

-- Full text search index (if PostgreSQL)
CREATE INDEX idx_jobs_fts ON jobs USING GIN (to_tsvector('english', title || ' ' || company || ' ' || skills));
```

---

## 4. How the Frontend Connects to Your API

Once your endpoints are live, frontend integration is a 1-line update in `src/lib/jobs-data.ts`:

```typescript
// Frontend data fetcher
export async function getJobs(params) {
  const query = new URLSearchParams({
    ...(params.roleSlug && { role: params.roleSlug }),
    ...(params.citySlug && params.citySlug !== 'all' && { city: params.citySlug }),
    ...(params.experienceSlug && { experience: params.experienceSlug }),
    ...(params.search && { q: params.search }),
    page: String(params.page || 1),
    limit: String(params.limit || 12),
  });

  const res = await fetch(`https://api.hirance.com/api/v1/jobs?${query.toString()}`, {
    next: { revalidate: 3600 }, // Cached for 1 hour
  });

  return await res.json();
}
```

---

## 5. Developer FAQ

#### Q: Do we need to store SEO slug strings in PostgreSQL/MongoDB?
**No.** The frontend translates `/jobs/react-developer-in-bangalore` into `role=react-developer` & `city=bangalore` before querying your API.

#### Q: Will Google traffic overload our database?
**No.** Next.js caches API responses at the edge CDN for 1 hour. Even if Googlebot crawls 10,000 pages an hour, your backend is only hit when the cache expires.

#### Q: What happens when an employer closes a job?
Set `status = 'closed'` or `is_active = false`. The API will stop returning it, and the frontend will automatically remove it from the sitemap on the next hourly cache refresh.
