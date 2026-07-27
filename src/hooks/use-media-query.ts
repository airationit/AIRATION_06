"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook to detect media query matches for responsive behavior.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => typeof window !== "undefined" ? window.matchMedia(query).matches : false,
    () => false // Server snapshot
  );
}
