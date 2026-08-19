# Hirance Blogs Backend API Specification

This document provides the complete, production-ready REST API specification for the **Hirance Blog & Hiring Insights Platform**.

---

## 1. Core Architectural Guidelines

### 1.1 Base URL & Versioning
- **Base Path:** `/api/v1/blogs`
- **Format:** `application/json` (UTF-8)
- **Time Format:** ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ss.sssZ`)

### 1.2 Standard Response Wrapper
All endpoints follow a unified response structure:

```json
// Success Response
{
  "success": true,
  "message": "Success",
  "data": { ... },
  "pagination": { ... } // Included only on paginated list endpoints
}

// Error Response
{
  "success": false,
  "message": "Descriptive error message",
  "errors": {
    "field_name": ["Specific validation error details"]
  }
}
```

### 1.3 Caching & Performance for Next.js (SSR / ISR)
- **Public GET endpoints** return `ETag` and `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.
- The Next.js frontend uses Incremental Static Regeneration (ISR) with on-demand revalidation when blogs are published or updated.

---

## 2. Public Client Endpoints (Frontend / SEO)

---

### 2.1 Get Paginated Blog List & Search
Fetches blog posts with filtering by category, tag, search keywords, and featured status.

- **Method:** `GET`
- **Path:** `/api/v1/blogs/`
- **Permissions:** Public (`AllowAny`)

#### Query Parameters:

| Parameter | Type | Required | Default | Example | Description |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `category` | `string` | No | `all` | `hiring-trends` | Filter by category slug or name |
| `tag` | `string` | No | - | `swipe-hiring` | Filter by tag name |
| `search` | `string` | No | - | `salary trends` | Free-text search on title, excerpt, and content |
| `featured` | `boolean` | No | - | `true` | Return only featured spotlight posts |
| `ordering` | `string` | No | `-published_at` | `-published_at` | Sort: `-published_at`, `published_at`, `-views_count` |
| `page` | `integer` | No | `1` | `1` | Page number |
| `page_size` | `integer` | No | `10` | `10` | Items per page (max: `50`) |

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "data": [
    {
      "id": "blg_984f1a23-6b3a-4a2e-8c31-7bfae0192801",
      "slug": "how-swipe-hiring-is-replacing-traditional-resumes",
      "title": "How Swipe-Based Hiring is Replacing Traditional Resumes in 2026",
      "excerpt": "Traditional job application forms are fading. Discover how instant swipe matching connects top engineers with hiring leads in seconds.",
      "category": {
        "id": "cat_01",
        "name": "Hiring Trends",
        "slug": "hiring-trends"
      },
      "read_time": "4 min read",
      "published_at": "2026-08-12T10:00:00.000Z",
      "featured": true,
      "cover_image": {
        "url": "https://assets.hirance.com/blogs/covers/swipe-hiring-cover.webp",
        "alt": "Swipe-based job matching on Hirance mobile app",
        "width": 1200,
        "height": 630
      },
      "author": {
        "id": "auth_01",
        "name": "Ananya Sharma",
        "role": "Lead Talent Analyst",
        "avatar": "https://assets.hirance.com/authors/ananya-sharma.webp"
      },
      "tags": ["Swipe Hiring", "Recruitment Tech", "Career Advice", "Smart Score"],
      "views_count": 1420
    }
  ],
  "pagination": {
    "count": 48,
    "total_pages": 5,
    "current_page": 1,
    "page_size": 10,
    "next": "/api/v1/blogs/?page=2&page_size=10",
    "previous": null
  }
}
```

---

### 2.2 Get Single Blog Post by Slug
Returns complete structured article details, content blocks, SEO metadata, author bio, and related recommended posts.

- **Method:** `GET`
- **Path:** `/api/v1/blogs/{slug}/`
- **Permissions:** Public (`AllowAny`)
- **Path Parameter:** `slug` (string) — URL friendly slug (e.g. `how-swipe-hiring-is-replacing-traditional-resumes`)

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "Blog details fetched successfully",
  "data": {
    "id": "blg_984f1a23-6b3a-4a2e-8c31-7bfae0192801",
    "slug": "how-swipe-hiring-is-replacing-traditional-resumes",
    "title": "How Swipe-Based Hiring is Replacing Traditional Resumes in 2026",
    "excerpt": "Traditional job application forms are fading. Discover how instant swipe matching connects top engineers with hiring leads in seconds.",
    "category": {
      "id": "cat_01",
      "name": "Hiring Trends",
      "slug": "hiring-trends"
    },
    "read_time": "4 min read",
    "published_at": "2026-08-12T10:00:00.000Z",
    "updated_at": "2026-08-15T14:30:00.000Z",
    "featured": true,
    "views_count": 1421,

    "cover_image": {
      "url": "https://assets.hirance.com/blogs/covers/swipe-hiring-cover.webp",
      "alt": "Swipe-based job matching on Hirance mobile app",
      "caption": "Instant candidate matching replaces multi-page ATS forms.",
      "width": 1200,
      "height": 630
    },

    "author": {
      "id": "auth_01",
      "name": "Ananya Sharma",
      "role": "Lead Talent Analyst",
      "avatar": "https://assets.hirance.com/authors/ananya-sharma.webp",
      "bio": "Talent researcher tracking hiring velocity, candidate Smart Scores, and tech recruitment trends in India."
    },

    "tags": ["Swipe Hiring", "Recruitment Tech", "Career Advice", "Smart Score"],

    "key_takeaways": [
      "Traditional multi-page application forms lose up to 84% of qualified talent.",
      "Swipe matching relies on real-time skill scoring rather than static keyword resumes.",
      "Candidates get matched directly with hiring managers without recruiter bottlenecks."
    ],

    "sections": [
      {
        "type": "paragraph",
        "content": "The era of sending 50 generic resumes into an automated applicant tracking system (ATS) black hole is officially ending. In 2026, tech recruitment is shifting toward high-intent, instant matching platforms designed around candidate experience."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "The Breakdown of Traditional Resumes"
      },
      {
        "type": "paragraph",
        "content": "For over two decades, job hunting followed the same tedious flow: search for listings, fill out multi-page forms, re-type resume details line by line, and wait weeks for an automated rejection email."
      },
      {
        "type": "image",
        "url": "https://assets.hirance.com/blogs/inline/recruitment-dropoff-chart.webp",
        "alt": "Chart showing candidate drop-off rate on legacy application forms",
        "caption": "Candidate drop-off reaches 84% after the second page of application forms.",
        "width": 800,
        "height": 450
      },
      {
        "type": "callout",
        "title": "Key Insight for Hiring Leads",
        "content": "Top software engineers receive multiple outreach messages a week. Adding any form friction causes them to abandon the application immediately."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Enter Swipe-Based Hiring"
      },
      {
        "type": "list",
        "items": [
          "**For Candidates:** Zero forms. A single swipe right submits your verified profile directly to verified engineering leads.",
          "**For Employers:** Zero candidate spam. Job listings take 60 seconds to launch, matching only with engineers whose Smart Score aligns with role requirements."
        ]
      }
    ],

    "seo": {
      "meta_title": "How Swipe-Based Hiring Replaces Traditional Resumes | Hirance",
      "meta_description": "Discover how swipe-based hiring is ending lengthy resumes and connecting verified engineers with hiring managers in seconds.",
      "canonical_url": "https://hirance.com/blog/how-swipe-hiring-is-replacing-traditional-resumes",
      "keywords": ["swipe hiring", "recruitment tech", "Hirance blog", "tech jobs India"]
    },

    "cta": {
      "type": "candidate",
      "title": "Ready to experience swipe hiring?",
      "description": "Download the Hirance app and match directly with verified tech employers.",
      "button_text": "Get the App",
      "button_url": "https://play.google.com/store/apps/details?id=com.hirance"
    },

    "related_posts": [
      {
        "id": "blg_984f1a23-6b3a-4a2e-8c31-7bfae0192802",
        "slug": "5-ways-candidates-can-boost-their-smart-score",
        "title": "5 Ways Candidates Can Boost Their Smart Score on Hirance",
        "excerpt": "Maximize your candidate match rating to appear at the top of hiring managers' feeds with these proven profile optimization tips.",
        "category": "Career Insights",
        "read_time": "3 min read",
        "published_at": "2026-08-10T10:00:00.000Z",
        "cover_image": {
          "url": "https://assets.hirance.com/blogs/covers/smart-score-guide.webp",
          "alt": "Smart score calculation illustration"
        }
      }
    ]
  }
}
```

#### Error Responses:
- **`404 Not Found`**:
  ```json
  {
    "success": false,
    "message": "Blog post not found",
    "errors": {
      "slug": ["No published article matches the provided slug."]
    }
  }
  ```

---

### 2.3 Get Categories with Post Counts
Returns all active blog categories with their live post counts for top filter tabs.

- **Method:** `GET`
- **Path:** `/api/v1/blogs/categories/`
- **Permissions:** Public (`AllowAny`)

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": "cat_00",
      "name": "All",
      "slug": "all",
      "post_count": 48
    },
    {
      "id": "cat_01",
      "name": "Hiring Trends",
      "slug": "hiring-trends",
      "post_count": 16
    },
    {
      "id": "cat_02",
      "name": "Career Insights",
      "slug": "career-insights",
      "post_count": 14
    },
    {
      "id": "cat_03",
      "name": "Employer Strategy",
      "slug": "employer-strategy",
      "post_count": 10
    },
    {
      "id": "cat_04",
      "name": "Tech Industry",
      "slug": "tech-industry",
      "post_count": 8
    }
  ]
}
```

---

### 2.4 Get Trending Tags
Returns popular tags used across articles for search suggestions and tag cloud filtering.

- **Method:** `GET`
- **Path:** `/api/v1/blogs/tags/`
- **Permissions:** Public (`AllowAny`)

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "Tags fetched successfully",
  "data": [
    { "name": "Swipe Hiring", "slug": "swipe-hiring", "count": 18 },
    { "name": "Smart Score", "slug": "smart-score", "count": 14 },
    { "name": "Tech Jobs", "slug": "tech-jobs", "count": 22 },
    { "name": "Salary Trends", "slug": "salary-trends", "count": 9 },
    { "name": "Startup Hiring", "slug": "startup-hiring", "count": 12 }
  ]
}
```

---

### 2.5 Sitemap URL Discovery (SEO / Google Indexing)
Lightweight endpoint returning all published blog slugs and last modified dates for dynamic XML sitemap generation (`/sitemap.xml`).

- **Method:** `GET`
- **Path:** `/api/v1/blogs/sitemap/`
- **Permissions:** Public (`AllowAny`)

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "Sitemap URLs fetched successfully",
  "data": {
    "total": 48,
    "items": [
      {
        "slug": "how-swipe-hiring-is-replacing-traditional-resumes",
        "url": "https://hirance.com/blog/how-swipe-hiring-is-replacing-traditional-resumes",
        "published_at": "2026-08-12T10:00:00.000Z",
        "updated_at": "2026-08-15T14:30:00.000Z",
        "change_freq": "monthly",
        "priority": 0.8
      }
    ]
  }
}
```

---

### 2.6 Increment Blog View Count
Asynchronously logs an article view for popularity analytics.

- **Method:** `POST`
- **Path:** `/api/v1/blogs/{slug}/view/`
- **Permissions:** Public (`AllowAny`) (Rate-limited by IP/fingerprint to prevent artificial spam)

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "View recorded successfully"
}
```

---

## 3. Author / Admin CMS Endpoints (Management)

These endpoints require authentication (`Bearer <token>` / Admin Role).

---

### 3.1 Upload Media Asset (Cover / Inline Images)
Uploads an image asset to S3/Cloud Storage, optimizes it to `.webp`, and returns CDN dimensions and URLs.

- **Method:** `POST`
- **Path:** `/api/v1/admin/blogs/media/upload/`
- **Permissions:** Authenticated Admin (`IsAdminUser`)
- **Content-Type:** `multipart/form-data`

#### Request Body (Form Data):
- `file`: Binary image file (`.png`, `.jpg`, `.jpeg`, `.webp`, max: 5MB)
- `folder`: String (`covers` | `inline` | `authors`, default: `inline`)
- `alt_text`: String (optional)

#### Success Response (`201 Created`):

```json
{
  "success": true,
  "message": "Image uploaded and optimized successfully",
  "data": {
    "url": "https://assets.hirance.com/blogs/inline/recruitment-dropoff-chart.webp",
    "file_name": "recruitment-dropoff-chart.webp",
    "width": 1200,
    "height": 675,
    "format": "webp",
    "size_bytes": 142380
  }
}
```

---

### 3.2 Create New Blog Post
Creates a new draft or published blog post.

- **Method:** `POST`
- **Path:** `/api/v1/admin/blogs/`
- **Permissions:** Authenticated Admin (`IsAdminUser`)
- **Content-Type:** `application/json`

#### Request Body Example:

```json
{
  "title": "Why 60-Second Job Postings Are Revolutionizing Recruitment",
  "slug": "why-60-second-job-postings-are-revolutionizing-recruitment",
  "excerpt": "Lengthy 5-page job descriptions are out. Learn how structured, 60-second job postings save startup founders 15+ hours per hire.",
  "category_id": "cat_03",
  "status": "published",
  "featured": false,
  "read_time": "4 min read",
  "published_at": "2026-08-18T10:30:00.000Z",
  "author_id": "auth_01",
  "tags": ["Employer Strategy", "Fast Hiring", "Tech Recruitment", "Startups"],
  "cover_image": {
    "url": "https://assets.hirance.com/blogs/covers/60-second-postings.webp",
    "alt": "Quick 60-second job creation flow on Hirance employer portal",
    "caption": "Publishing roles in 60 seconds."
  },
  "key_takeaways": [
    "Traditional job descriptions are over-engineered and discourage top applicants.",
    "60-second structured listings highlight core essentials: stack, compensation, and outcomes.",
    "Employers cut time-to-hire from 35 days down to under 48 hours."
  ],
  "sections": [
    {
      "type": "paragraph",
      "content": "Startups and high-growth engineering teams cannot afford to spend 3 weeks drafting job descriptions while critical features sit stalled."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "The Problem With Old Job Descriptions"
    },
    {
      "type": "list",
      "items": [
        "**Unnecessary Wishlists:** Demanding 10 years of experience in tools released 3 years ago.",
        "**Ambiguous Compensation:** Hiding salary bands leads to dropped offers late in the pipeline.",
        "**Slow Publishing:** Multi-step recruiter dashboards delay candidate outreach by days."
      ]
    }
  ],
  "seo": {
    "meta_title": "Why 60-Second Job Postings Are Revolutionizing Recruitment | Hirance",
    "meta_description": "Learn how structured 60-second job listings save founders 15+ hours and connect top talent faster.",
    "keywords": ["fast job posting", "startup hiring", "recruitment speed", "Hirance"]
  },
  "cta": {
    "type": "employer",
    "title": "Post your tech role in 60 seconds",
    "description": "Start receiving high-intent, score-matched engineer profiles today.",
    "button_text": "Post a Job",
    "button_url": "https://employer.hirance.com/"
  }
}
```

#### Success Response (`201 Created`):

```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": "blg_4a5c9b21-8f23-41e9-9134-118820c74900",
    "slug": "why-60-second-job-postings-are-revolutionizing-recruitment",
    "status": "published",
    "created_at": "2026-08-18T10:32:15.000Z"
  }
}
```

---

### 3.3 Update Blog Post
Updates any field of an existing blog post (full or partial update).

- **Method:** `PATCH` / `PUT`
- **Path:** `/api/v1/admin/blogs/{id}/`
- **Permissions:** Authenticated Admin (`IsAdminUser`)

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "Blog post updated successfully",
  "data": {
    "id": "blg_4a5c9b21-8f23-41e9-9134-118820c74900",
    "slug": "why-60-second-job-postings-are-revolutionizing-recruitment",
    "updated_at": "2026-08-18T11:00:00.000Z"
  }
}
```

---

### 3.4 Delete Blog Post
Soft-deletes or archives an article.

- **Method:** `DELETE`
- **Path:** `/api/v1/admin/blogs/{id}/`
- **Permissions:** Authenticated Admin (`IsAdminUser`)

#### Success Response (`200 OK`):

```json
{
  "success": true,
  "message": "Blog post removed successfully"
}
```

---

## 4. Section Block Types Reference Table

The `sections` array allows the backend and frontend to build rich, visually engaging articles safely without fragile HTML parsing:

| `type` | Properties | Description |
| :--- | :--- | :--- |
| `paragraph` | `content: string` | Regular body paragraph text |
| `heading` | `level: 2 \| 3`, `content: string` | Section sub-heading (`<h2>` or `<h3>`) |
| `image` | `url: string`, `alt: string`, `caption?: string`, `width?: number`, `height?: number` | High-res responsive inline image with caption |
| `callout` | `title: string`, `content: string` | Highlighted key takeaway / pro-tip container |
| `list` | `items: string[]` | Bulleted list supporting inline bold formatting (`**text**`) |
| `quote` | `quote: string`, `author?: string`, `role?: string` | Blockquote styling for industry citations & quotes |
| `stat` | `value: string`, `label: string` | Large numeric highlight box (e.g. `84%`, `Candidate drop-off`) |

---

## 5. Summary of Endpoints

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/v1/blogs/` | Public | Paginated list, search, tag/category filters |
| `GET` | `/api/v1/blogs/{slug}/` | Public | Full single blog post details & structured blocks |
| `GET` | `/api/v1/blogs/categories/` | Public | Category list with real-time post counts |
| `GET` | `/api/v1/blogs/tags/` | Public | Trending tags list for search suggestions |
| `GET` | `/api/v1/blogs/sitemap/` | Public | SEO discovery for Google sitemap generator |
| `POST` | `/api/v1/blogs/{slug}/view/` | Public | Async view metric recorder |
| `POST` | `/api/v1/admin/blogs/media/upload/` | Admin | Image upload & `.webp` optimization |
| `POST` | `/api/v1/admin/blogs/` | Admin | Create blog post |
| `PATCH` | `/api/v1/admin/blogs/{id}/` | Admin | Update blog post |
| `DELETE` | `/api/v1/admin/blogs/{id}/` | Admin | Delete / Archive blog post |
