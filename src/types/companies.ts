/**
 * Company Directory Types (GET /company/?search=)
 */

export interface CompanyItem {
  id: string;
  company_name: string;
  company_logo: string;
}

export type CompanyListItem = CompanyItem;

export interface CompanySearchParams {
  search?: string;
  page?: number;
  page_size?: number;
}

export interface CompanyDetail {
  id: string;
  company_name: string;
  company_logo: string;
  industry: string;
  number_of_employees: string;
  address: string;
  city: { id: string; name: string } | null;
  state: { id: string; name: string } | null;
  website_link: string | null;
  linkedin_link: string | null;
  is_verified: boolean;
  email?: string;
  contact_email?: string;
}

export interface CompanyJobCategory {
  id: string;
  name: string;
  open_jobs_count: number;
}
