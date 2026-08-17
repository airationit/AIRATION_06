# Jobs Sitemap List API

Provides a minimal public job listing suitable for sitemap generation or lightweight consumers.

**Endpoint**: `GET /jobs/sitemap-list`
- Summary: Get minimal public job listing for sitemap-like consumers
- Permissions: Public (AllowAny)
- Query params: none
- Throttle: none configured (view is public)

Response shape:
- Standard success envelope with `data` object containing:
  - `total` (integer): total number of published jobs
  - `jobs` (array): list of job summaries. Each summary contains:
    - `id` (UUID string)
    - `title` (string)
    - `city` (string) — resolved in order: city.name, location, state.name, country.name, or "Remote"
    - `updatedAt` (ISO8601 UTC string, or `null`) — `updated_at` or `created_at` in Zulu format

Example response:
```
{
  "success": true,
  "message": "Jobs fetched successfully.",
  "data": {
    "total": 2,
    "jobs": [
      { "id": "11111111-1111-1111-1111-111111111111", "title": "Platform Engineer", "city": "Bengaluru", "updatedAt": "2026-08-17T12:34:56Z" },
      { "id": "22222222-2222-2222-2222-222222222222", "title": "Frontend Engineer", "city": "Remote", "updatedAt": "2026-08-16T08:00:00Z" }
    ]
  }
}
```

Implementation notes:
- Implemented in `apps/jobs/views/browse.py` as `SitemapListView`.
- Query selects published, non-deleted jobs and `select_related("city","state","country")`, ordered by `-updated_at, -created_at`.
- `total` is computed by `jobs_qs.count()` and every job is converted into the minimal shape above.

Tests:
- See `apps/jobs/tests/tests_job_search.py::test_sitemap_list_returns_public_jobs_with_total_and_camel_case_fields` for expected behavior.

If you'd like, I can add a small example `sitemap.xml` generator that consumes this endpoint and produces XML sitemaps.
