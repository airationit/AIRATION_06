/**
 * Standard Hirance API Response Envelopes
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationMeta {
  count: number;
  total_pages: number;
  current_page: number;
  page_size?: number;
  next: string | null;
  previous: string | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[] | string>;
}
