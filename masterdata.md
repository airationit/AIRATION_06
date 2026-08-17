# Masterdata API

Reference endpoints used by jobs and other APIs. Base path: `/masterdata/`.

Endpoints and response shapes (all responses wrap `data` in the standard success envelope):

- `GET /masterdata/currencies/`
  - Item (`CurrencySerializer`): `{ "id": "uuid", "code": "INR", "name": "Indian Rupee" }`

- `GET /masterdata/salary-ranges/`
  - Item (`SalaryRangeSerializer`): `{ "id": "uuid", "label": "0-2 yrs", "min_salary": 10000, "max_salary": 30000, "currency": { /* Currency */ } }`

- `GET /masterdata/countries/`
  - Item: `{ "id": "uuid", "name": "Country Name" }`

- `GET /masterdata/states/` — query: `?country_id=` (UUID)
  - Item: `{ "id": "uuid", "name": "State Name", "country": "uuid" }`

- `GET /masterdata/cities/` — query: `?state_id=` (UUID)
  - Item: `{ "id": "uuid", "name": "City Name", "state": "uuid" }`

- `GET /masterdata/experience-ranges/`
  - Item: `{ "id": "uuid", "label": "0-2 yrs", "min_experience": 0, "max_experience": 2 }`

- `GET /masterdata/education_list/`
  - Item (`EducationLevelSerializer`): `{ "id": "uuid", "level": "Bachelor's", "display_order": 1 }`

- `GET /masterdata/job-types/`
  - Item: `{ "id": "uuid", "name": "Full Time", "display_order": 1 }`

- `GET /masterdata/work-modes/` and `GET /masterdata/work-shifts/`
  - Item: `{ "id": "uuid", "name": "Hybrid", "display_order": 1 }`

- `GET /masterdata/industries/`
  - Item: `{ "id": "uuid", "name": "Software", "display_order": 1 }`

- `GET /masterdata/skill-categories/`
  - Item: `{ "id": "uuid", "name": "Programming" }`

- `GET /masterdata/skills/` — query: `?category_id=` (UUID)
  - Item (`SkillsSerializer`): `{ "id": "uuid", "name": "Django", "category": "uuid" }`

- `GET /masterdata/recommended-skills/` — query: `?role_id=` (UUID)
  - Returns recommended skills for the given job role (shape same as `SkillsSerializer`).

- `GET /masterdata/role-categories/`
  - Item: `{ "id": "uuid", "name": "Engineering" }`

- `GET /masterdata/job-roles/` — query: `?category_id=` (UUID)
  - Item (`JobRoleSerializer`): `{ "id": "uuid", "name": "Backend Engineer", "category": "uuid" }`

Notes:
- Serializers are defined in `apps/masterdata/serializers.py`.
- Standard success envelope:
```
{
  "success": true,
  "message": "Success",
  "data": [ /* items */ ]
}
```

If you want concrete example responses for specific endpoints, I can add those next.
