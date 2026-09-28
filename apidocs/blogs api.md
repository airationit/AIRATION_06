# Hirance Blogs — Public API

Base path: `/api/v1/blogs/`  
Audience: **Next.js frontend / SEO** (unauthenticated).

Only **published** posts with `published_at` in the past are returned. IDs are UUIDs. Datetimes are ISO 8601 UTC.

Staff CMS is documented separately in [`blogs-admin-api.md`](blogs-admin-api.md).

---

## 1. Conventions

### Auth

None. All endpoints use `AllowAny`.

Public list/detail/categories/tags/sitemap are throttled at **60/minute** per IP or authenticated user (`blog_public`). View increment is **20/minute** per IP (`blog_view`).

### Envelope

**Success**

```json
{
  "success": true,
  "message": "…",
  "data": {}
}
```

Paginated lists also include `pagination`:

| Field          | Type           | Description                   |
| -------------- | -------------- | ----------------------------- |
| `count`        | int            | Total matching rows           |
| `total_pages`  | int            | Page count                    |
| `current_page` | int            | 1-based page                  |
| `page_size`    | int            | Page size used                |
| `next`         | string \| null | Absolute URL of next page     |
| `previous`     | string \| null | Absolute URL of previous page |

**Error**

```json
{
  "success": false,
  "message": "Blog post not found",
  "errors": {
    "slug": ["No published article matches the provided slug."]
  }
}
```

### Caching (SSR / ISR)

Public **GET** responses send:

- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`
- `ETag` (list/categories/tags/sitemap share a version; detail includes post `updated_at`)

Send `If-None-Match` with the previous `ETag` to receive `304 Not Modified`. Publishing, updating, or deleting a post in the CMS bumps the list version.

Sitemap `url` values use `BLOG_PUBLIC_BASE_URL` (default `https://hirance.com/blog`).

---

## 2. GET paginated list and search

```http
GET /api/v1/blogs/
```

OpenAPI tag: **Blogs**

### Query parameters

| Parameter   | Type    | Required | Default         | Description                                                |
| ----------- | ------- | -------- | --------------- | ---------------------------------------------------------- |
| `category`  | string  | No       | `all`           | Category slug or name. `all` = no category filter          |
| `tag`       | string  | No       | —               | Tag slug or name                                           |
| `search`    | string  | No       | —               | Case-insensitive match on title, excerpt, and section text |
| `featured`  | boolean | No       | —               | `true` / `false` to filter spotlight posts                 |
| `ordering`  | string  | No       | `-published_at` | `-published_at`, `published_at`, or `-views_count`         |
| `page`      | int     | No       | `1`             | Page number                                                |
| `page_size` | int     | No       | `10`            | Items per page (max `50`)                                  |

### Success `200`

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "data": [
    {
      "id": "984f1a23-6b3a-4a2e-8c31-7bfae0192801",
      "slug": "how-swipe-hiring-is-replacing-traditional-resumes",
      "title": "How Swipe-Based Hiring is Replacing Traditional Resumes in 2026",
      "excerpt": "Instant swipe matching connects engineers with hiring leads.",
      "category": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Hiring Trends",
        "slug": "hiring-trends"
      },
      "read_time": "4 min read",
      "published_at": "2026-08-12T10:00:00.000Z",
      "featured": true,
      "cover_image": {
        "url": "https://assets.example/blogs/covers/swipe.webp",
        "alt": "Swipe-based job matching",
        "width": 1200,
        "height": 630
      },
      "author": {
        "id": "22222222-2222-2222-2222-222222222222",
        "name": "Ananya Sharma",
        "role": "Lead Talent Analyst",
        "avatar": "https://assets.example/authors/ananya.webp"
      },
      "tags": ["Swipe Hiring", "Recruitment Tech"],
      "views_count": 1420
    }
  ],
  "pagination": {
    "count": 48,
    "total_pages": 5,
    "current_page": 1,
    "page_size": 10,
    "next": "https://api.example/api/v1/blogs/?page=2",
    "previous": null
  }
}
```

---

## 3. GET single post by slug

```http
GET /api/v1/blogs/{slug}/
```

Path: `slug` — URL-friendly slug (e.g. `how-swipe-hiring-is-replacing-traditional-resumes`).

Includes structured `sections`, SEO, CTA, author bio, and up to **3** related published posts in the same category.

### Success `200`

```json
{
  "success": true,
  "message": "Blog details fetched successfully",
  "data": {
    "id": "984f1a23-6b3a-4a2e-8c31-7bfae0192801",
    "slug": "how-swipe-hiring-is-replacing-traditional-resumes",
    "title": "How Swipe-Based Hiring is Replacing Traditional Resumes in 2026",
    "excerpt": "Instant swipe matching connects engineers with hiring leads.",
    "category": {
      "id": "11111111-1111-1111-1111-111111111111",
      "name": "Hiring Trends",
      "slug": "hiring-trends"
    },
    "read_time": "4 min read",
    "published_at": "2026-08-12T10:00:00.000Z",
    "updated_at": "2026-08-15T14:30:00.000Z",
    "featured": true,
    "views_count": 1421,
    "cover_image": {
      "url": "https://assets.example/blogs/covers/swipe.webp",
      "alt": "Swipe-based job matching",
      "caption": "Instant matching replaces ATS forms.",
      "width": 1200,
      "height": 630
    },
    "author": {
      "id": "22222222-2222-2222-2222-222222222222",
      "name": "Ananya Sharma",
      "role": "Lead Talent Analyst",
      "avatar": "https://assets.example/authors/ananya.webp",
      "bio": "Talent researcher tracking hiring velocity in India."
    },
    "tags": ["Swipe Hiring", "Recruitment Tech"],
    "key_takeaways": ["Multi-page application forms lose qualified talent."],
    "sections": [
      {
        "type": "paragraph",
        "content": "Tech recruitment is shifting toward instant matching."
      },
      {
        "type": "heading",
        "level": 2,
        "content": "Enter Swipe-Based Hiring"
      },
      {
        "type": "list",
        "items": [
          "**For Candidates:** Zero forms.",
          "**For Employers:** Score-matched profiles."
        ]
      }
    ],
    "seo": {
      "meta_title": "How Swipe-Based Hiring Replaces Traditional Resumes | Hirance",
      "meta_description": "Discover how swipe-based hiring connects engineers with hiring managers.",
      "canonical_url": "https://hirance.com/blog/how-swipe-hiring-is-replacing-traditional-resumes",
      "keywords": ["swipe hiring", "recruitment tech"]
    },
    "cta": {
      "type": "candidate",
      "title": "Ready to experience swipe hiring?",
      "description": "Download the Hirance app.",
      "button_text": "Get the App",
      "button_url": "https://play.google.com/store/apps/details?id=com.hirance"
    },
    "related_posts": [
      {
        "id": "984f1a23-6b3a-4a2e-8c31-7bfae0192802",
        "slug": "5-ways-candidates-can-boost-their-smart-score",
        "title": "5 Ways Candidates Can Boost Their Smart Score",
        "excerpt": "Profile optimization tips.",
        "category": "Hiring Trends",
        "read_time": "3 min read",
        "published_at": "2026-08-10T10:00:00.000Z",
        "cover_image": {
          "url": "https://assets.example/blogs/covers/smart-score.webp",
          "alt": "Smart score illustration"
        }
      }
    ]
  }
}
```

### Section block types (read-only)

| `type`      | Properties                                          | Render as         |
| ----------- | --------------------------------------------------- | ----------------- |
| `paragraph` | `content`                                           | Body paragraph    |
| `heading`   | `level` (`2` \| `3`), `content`                     | `<h2>` / `<h3>`   |
| `image`     | `url`, `alt`, optional `caption`, `width`, `height` | Figure            |
| `callout`   | `title`, `content`                                  | Highlight box     |
| `list`      | `items` (strings; `**bold**` allowed)               | Bullets           |
| `quote`     | `quote`, optional `author`, `role`                  | Blockquote        |
| `stat`      | `value`, `label`                                    | Numeric highlight |

### Errors

| Status | When                                                                  |
| ------ | --------------------------------------------------------------------- |
| `404`  | Slug missing, draft, archived, future `published_at`, or soft-deleted |

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

## 4. GET categories with post counts

```http
GET /api/v1/blogs/categories/
```

First row is a virtual **All** tab (`id` is `null`, `slug` is `all`). Remaining rows are active categories ordered by `sort_order`.

### Success `200`

```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    { "id": null, "name": "All", "slug": "all", "post_count": 48 },
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "name": "Hiring Trends",
      "slug": "hiring-trends",
      "post_count": 16
    }
  ]
}
```

---

## 5. GET trending tags

```http
GET /api/v1/blogs/tags/
```

Tags that appear on at least one published post, ordered by usage count (max 30).

### Success `200`

```json
{
  "success": true,
  "message": "Tags fetched successfully",
  "data": [
    { "name": "Swipe Hiring", "slug": "swipe-hiring", "count": 18 },
    { "name": "Smart Score", "slug": "smart-score", "count": 14 }
  ]
}
```

---

## 6. GET sitemap URLs

```http
GET /api/v1/blogs/sitemap/
```

Lightweight list for generating `/sitemap.xml`. Featured posts use `priority` `0.9`; others `0.8`. `change_freq` is `monthly`.

### Success `200`

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
        "priority": 0.9
      }
    ]
  }
}
```

---

## 7. POST increment view count

```http
POST /api/v1/blogs/{slug}/view/
```

No request body. Increments `views_count` for a published post. Does not change `updated_at`.

### Success `200`

```json
{
  "success": true,
  "message": "View recorded successfully",
  "data": null
}
```

### Errors

| Status | When                   |
| ------ | ---------------------- |
| `404`  | Not a published post   |
| `429`  | View throttle exceeded |

---

## 8. Endpoint summary

| Method | Path                         | Purpose                         |
| ------ | ---------------------------- | ------------------------------- |
| `GET`  | `/api/v1/blogs/`             | Paginated list, search, filters |
| `GET`  | `/api/v1/blogs/{slug}/`      | Full article                    |
| `GET`  | `/api/v1/blogs/categories/`  | Filter tabs with counts         |
| `GET`  | `/api/v1/blogs/tags/`        | Tag cloud                       |
| `GET`  | `/api/v1/blogs/sitemap/`     | SEO URL discovery               |
| `POST` | `/api/v1/blogs/{slug}/view/` | Record a view                   |
