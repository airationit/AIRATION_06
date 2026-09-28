# Request Demo API (Frontend)

Endpoint used by the **Request a Demo** page (`/request-demo`) to submit the booking form.

---

## Submit Demo Request

- **URL:** `/api/v1/leads/demo-request/`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Access:** Public

---

### Request Body (4 Fields)

| Field | Type | Required | Description | Example |
| :--- | :--- | :---: | :--- | :--- |
| `full_name` | `string` | **Yes** | Full name of the user | `"John Doe"` |
| `work_email` | `string` | **Yes** | Work email address | `"john@company.com"` |
| `phone` | `string` | **Yes** | Contact phone number | `"+91 98765 43210"` |
| `company_name` | `string` | **Yes** | Company name | `"Acme Inc."` |

#### Example Request

```json
{
  "full_name": "John Doe",
  "work_email": "john@company.com",
  "phone": "+91 98765 43210",
  "company_name": "Acme Inc."
}
```

---

### Responses

#### Success (`201 Created`)

```json
{
  "success": true,
  "message": "Demo request received successfully. Our team will contact you within 2 business hours.",
  "data": {
    "id": "demo_lead_101",
    "full_name": "John Doe",
    "work_email": "john@company.com",
    "phone": "+91 98765 43210",
    "company_name": "Acme Inc.",
    "created_at": "2026-08-18T10:45:00.000Z"
  }
}
```

#### Validation Error (`400 Bad Request`)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "work_email": ["Please enter a valid work email address."],
    "phone": ["Please enter a valid phone number."]
  }
}
```
