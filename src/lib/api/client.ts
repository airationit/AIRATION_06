// export const BASE_URL = "https://api.hirance.com";
export const BASE_URL = "https://prod.hirance.com";


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
  const { params, timeoutMs = 15000, revalidate = 60, headers = {}, signal, ...fetchOptions } = options;
  const queryString = buildQueryString(params);

  // Normalize endpoint URL
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${BASE_URL}${cleanEndpoint}${queryString}`;

  const isServer = typeof window === "undefined";

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

    if (!res.ok) {
      let serverErrorMsg = `API Error: ${res.status} ${res.statusText} at ${cleanEndpoint}`;
      try {
        const errorJson = (await res.json()) as Record<string, unknown>;
        if (errorJson && typeof errorJson === "object" && "message" in errorJson) {
          serverErrorMsg = String(errorJson.message);
        }
      } catch {
        // Ignore json parsing error for non-JSON response bodies
      }
      throw new Error(serverErrorMsg);
    }

    const json = (await res.json()) as T;
    return json;
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    if (error instanceof Error && (error.name === "AbortError" || error.message.includes("aborted"))) {
      throw new Error(`Request timeout after ${timeoutMs}ms for ${cleanEndpoint}`);
    }
    throw error;
  }
}
