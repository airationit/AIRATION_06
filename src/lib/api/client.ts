export const BASE_URL = "https://api.hirance.com";

interface FetchOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined | null>;
  timeoutMs?: number;
  revalidate?: number | false;
}

/**
 * Builds a query string safely from an object of key-value params
 */
export function buildQueryString(
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/**
 * Core resilient API client for Hirance public endpoints
 */
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, timeoutMs = 8000, revalidate = 60, headers = {}, ...fetchOptions } = options;
  const queryString = buildQueryString(params);
  
  // Normalize endpoint URL
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${BASE_URL}${cleanEndpoint}${queryString}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(fullUrl, {
      ...fetchOptions,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      signal: controller.signal,
      next: typeof revalidate === "number" ? { revalidate } : undefined,
      cache: revalidate === false ? "no-store" : undefined,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText} at ${cleanEndpoint}`);
    }

    const json = (await res.json()) as T;
    return json;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeoutMs}ms for ${cleanEndpoint}`);
    }
    throw error;
  }
}
