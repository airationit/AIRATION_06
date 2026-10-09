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
