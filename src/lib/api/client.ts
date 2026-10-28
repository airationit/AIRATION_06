export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.hirance.com";

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
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/**
 * Core resilient API client for Hirance public endpoints (defaults to api.hirance.com)
 */
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, timeoutMs = 15000, revalidate = 60, headers = {}, signal, ...fetchOptions } = options;
  const queryString = buildQueryString(params);

  const isServer = typeof window === "undefined";

  // Normalize endpoint URL
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  // Use BASE_URL (defaults to process.env.NEXT_PUBLIC_API_URL || https://api.hirance.com)
  const effectiveBaseUrl = BASE_URL;
  const fullUrl = `${effectiveBaseUrl}${cleanEndpoint}${queryString}`;

  let controller: AbortController | null = null;
  let timeoutId: NodeJS.Timeout | null = null;

  // Set timeout controller only on server or when explicit timeout requested
  if (!signal && isServer) {
    controller = new AbortController();
    timeoutId = setTimeout(() => controller?.abort(), timeoutMs);
  }

  const fetchInit: RequestInit = {
    ...fetchOptions,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    signal: signal || (controller ? controller.signal : undefined),
  };

  // Next.js specific cache options are only valid on the server
  if (isServer) {
    if (typeof revalidate === "number") {
      fetchInit.next = { revalidate };
    }
    if (revalidate === false) {
      fetchInit.cache = "no-store";
    }
  }

  try {
    const res = await fetch(fullUrl, fetchInit);
    if (timeoutId) clearTimeout(timeoutId);

    const text = await res.text();

    if (!res.ok) {
      let serverErrorMsg = `API Error: ${res.status} ${res.statusText} at ${cleanEndpoint}`;
      try {
        const errorJson = JSON.parse(text) as Record<string, unknown>;
        if (errorJson && typeof errorJson === "object") {
          if ("message" in errorJson) {
            serverErrorMsg = String(errorJson.message);
          } else if ("detail" in errorJson) {
            serverErrorMsg = String(errorJson.detail);
          }
        }
      } catch {
        // Non-JSON error body (e.g. HTML 502/404)
      }
      throw new Error(serverErrorMsg);
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(`Invalid JSON response from ${cleanEndpoint}`);
    }
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    if (error instanceof Error && (error.name === "AbortError" || error.message.includes("aborted"))) {
      throw new Error(`Request timeout after ${timeoutMs}ms for ${cleanEndpoint}`);
    }
    throw error;
  }
}
