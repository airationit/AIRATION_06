# Jobs Browse API

This document describes the public candidate-facing job discovery endpoints.

**Base path**: `/jobs/`

---

**GET /jobs/**
- Summary: Search and filter published jobs (browse/search).
- Permissions: Public (AllowAny). Some fields (compatibility) populated only for authenticated candidates.
- Query parameters:
  - `job_role` (UUID) — filter by job role id (comma-separated accepted)
  - `job_type` (UUID) — filter by job type id
  - `work_mode` (UUID) — filter by work mode id
  - `work_shift` (UUID) — filter by work shift id
  - `experience_level` (UUID) — returns jobs at this level and above (by display_order)
  - `city` (UUID) — filter by city id
  - `state` (UUID) — filter by state id
  - `salary_range` (UUID) — returns jobs at this range and above (by display_order)
  - `skills` (string) — comma-separated skill UUIDs; jobs requiring at least one of these skills
  - `is_free_for_candidates` (bool) — filter jobs that do not consume candidate daily application quota
  - `search` (string) — text search across title/description
  - `ordering` (string) — ordering options: `relevance | -relevance | compatibility_score | -compatibility_score | -published_at | published_at | -created_at | created_at`
  - `page` (int) — page number (pagination)
  - `page_size` (int) — page size (optional)

- Response: Paginated response (see `StandardPagination` format) with `data` being a list of `JobListSerializer` items.

Job list item (`JobListSerializer`) fields:
- `id` (UUID)
- `title` (string)
- `company_name` (string)
- `company_logo` (URL)
- `job_role` (object) — `{id, name}` via `JobRoleSerializer`
- `role_category` (object)
- `job_type` (object)
- `work_mode` (object)
- `work_shift` (object)
- `experience_level` (object)
- `salary_min` (decimal)
- `salary_max` (decimal)
- `currency` (object)
- `number_of_openings` (int)
- `location` (string)
- `city` (object)
- `state` (object)
- `match_threshold` (number)
- `is_free_for_candidates` (bool)
- `required_skills` (array of `{id, name}`)
- `additional_skills` (array of `{id, name}`)
- `custom_skills` (array of strings)
- `compatibility_score` (number|null) — candidate-specific; `null` if no candidate context
- `compatibility_tips` (array)
- `compatibility_breakdown` (object|null)
- `can_apply` (bool)
- `reason` (string|null)
- `badge_active` (bool)
- `applied` (bool) — whether candidate already applied (candidate context)
- `status` (string/enum)
- `published_at` (datetime)
- `application_deadline` (datetime)
- `views_count` (int)
- `applications_count` (int)
- `created_at` (datetime)

Example successful paginated response (trimmed):
```
{
  "success": true,
  "message": "Success",
  "data": [ { /* JobListSerializer item */ }, ... ],
  "pagination": { "count": 123, "total_pages": 13, "current_page": 1, "next": null, "previous": null }
}
```

---

**GET /jobs/{pk}/**
- Summary: Public job detail
- Method: `GET`
- Path parameter: `pk` (UUID) — job id
- Permissions: Public (AllowAny)
- Throttle: `JobPublicDetailThrottle` (rate-limited)
- Response: `success_response` with `data` as `JobDetailSerializer`

`JobDetailSerializer` fields (subset):
- `id`, `title`, `company` (brief object: `id`, `company_name`, `company_logo`, `city`, `state`)
- `created_by` (id, mobile_number, name)
- `company_name`, `company_logo`
- `description`, `responsibilities` (strings)
- `education_level`, `education_specialization`, `english_proficiency`
- `job_role`, `role_category`, `job_type`, `work_mode`, `work_shift`, `experience_level`
- `salary_min`, `salary_max`, `currency`
- `location`, `city`, `state`
- `required_skills`, `additional_skills`, `custom_skills`
- `match_threshold`, `is_free_for_candidates`, `number_of_openings`, `is_walk_in`
- `compatibility_score`, `compatibility_tips`, `compatibility_breakdown` (candidate-specific; removed for employer/HR viewers)
- `can_apply`, `reason`, `badge_active`, `applied`
- `status`, `published_at`, `application_deadline`, `expired_at`, `views_count`, `applications_count`, `created_at`, `updated_at`, `closed_at`

Example success response:
```
{
  "success": true,
  "message": "Success",
  "data": { /* JobDetailSerializer object */ }
}
```

Errors:
- `404` when job not found (response from `error_response`).

Notes:
- If the requester is not an employer/HR, the view enqueues an async task to record the view and increments candidate/public view metrics.
