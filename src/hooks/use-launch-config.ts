"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from "firebase/remote-config";
import { getFirebaseRemoteConfig } from "@/lib/firebase";

export const REMOTE_CONFIG_DEFAULTS = {
  web_date: "",
};

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isComplete: boolean;
}

/**
 * Robust parser for date/time strings from Firebase Remote Config.
 * Handles ISO formats ("2026-09-21T10:30:00+05:30"), space separators ("2026-09-21 10:30:00"), etc.
 */
export const parseLaunchDate = (dateStr: string): number => {
  if (!dateStr || typeof dateStr !== "string") {
    return 0;
  }
  const trimmed = dateStr.trim();
  if (!trimmed) return 0;

  let ts = Date.parse(trimmed);
  if (!isNaN(ts)) return ts;

  // Normalize potential space between date & time to 'T'
  const isoFormatted = trimmed.replace(" ", "T");
  ts = Date.parse(isoFormatted);
  if (!isNaN(ts)) return ts;

  return 0;
};

export const getTimeRemaining = (targetTimestamp: number): TimeRemaining => {
  if (!targetTimestamp || targetTimestamp <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isComplete: true,
    };
  }

  const diff = targetTimestamp - Date.now();
  if (diff <= 0 || isNaN(diff)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isComplete: true,
    };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    totalMs: diff,
    isComplete: false,
  };
};

export function useLaunchConfig() {
  const [webDateStr, setWebDateStr] = useState<string>("");
  const [isLaunched, setIsLaunched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    isComplete: false,
  });
  const [hasJustCompleted, setHasJustCompleted] = useState<boolean>(false);

  const isLaunchedRef = useRef(isLaunched);
  isLaunchedRef.current = isLaunched;

  const fetchConfig = useCallback(async () => {
    try {
      const rc: RemoteConfig | null = await getFirebaseRemoteConfig();
      if (!rc) {
        let fallbackDate = "";
        try {
          fallbackDate = localStorage.getItem("hirance_web_date") || "";
        } catch {}

        if (fallbackDate) {
          const target = parseLaunchDate(fallbackDate);
          if (target > 0) {
            const passed = Date.now() >= target;
            setIsLaunched(passed);
            setTimeLeft(getTimeRemaining(target));
            return;
          }
        }
        setIsLaunched(true);
        return;
      }

      // Fast sync (0ms) in development or before launch
      rc.settings.minimumFetchIntervalMillis =
        process.env.NODE_ENV === "development" || !isLaunchedRef.current
          ? 0
          : 60000;
      rc.defaultConfig = REMOTE_CONFIG_DEFAULTS;

      // 2.5s safety timeout so slow networks or adblockers never trap loader
      await Promise.race([
        fetchAndActivate(rc),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);

      // Read web_date directly from Remote Config
      let remoteWebDate =
        getValue(rc, "web_date").asString() ||
        getValue(rc, "date").asString() ||
        getValue(rc, "launch_date").asString() ||
        "";

      // If remote returned empty, check localStorage as safety fallback
      if (!remoteWebDate) {
        try {
          remoteWebDate = localStorage.getItem("hirance_web_date") || "";
        } catch {}
      }

      setWebDateStr(remoteWebDate);

      const target = parseLaunchDate(remoteWebDate);
      if (target > 0) {
        const passed = Date.now() >= target;
        setIsLaunched(passed);
        setTimeLeft(getTimeRemaining(target));

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("hirance_web_date", remoteWebDate);
            localStorage.removeItem("hirance_has_launched");
            if (passed) {
              document.documentElement.classList.add("hirance-launched");
            } else {
              document.documentElement.classList.remove("hirance-launched");
            }
          } catch {
            // ignore storage errors
          }
        }
      } else {
        // If truly no launch date is set anywhere, site is not gated
        setIsLaunched(true);
      }
    } catch (err) {
      console.warn("[RemoteConfig] Fetch fallback used:", err);
      try {
        const cached = localStorage.getItem("hirance_web_date") || "";
        if (cached) {
          const target = parseLaunchDate(cached);
          if (target > 0) {
            setIsLaunched(Date.now() >= target);
            setTimeLeft(getTimeRemaining(target));
            return;
          }
        }
      } catch {}
      setIsLaunched(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Client-only initialization: runs strictly after initial hydration pass
  useEffect(() => {
    setIsMounted(true);

    // Read cached web_date from localStorage to pre-populate state without closing loader early
    let activeDate = "";
    try {
      const cached = localStorage.getItem("hirance_web_date");
      if (cached) {
        activeDate = cached;
        setWebDateStr(cached);
      }
    } catch {
      // ignore
    }

    if (activeDate) {
      const target = parseLaunchDate(activeDate);
      if (target > 0) {
        const passed = Date.now() >= target;
        setIsLaunched(passed);
        setTimeLeft(getTimeRemaining(target));
        if (passed) {
          if (typeof document !== "undefined") {
            document.documentElement.classList.add("hirance-launched");
          }
        } else {
          if (typeof document !== "undefined") {
            document.documentElement.classList.remove("hirance-launched");
          }
        }
      }
    }

    // Fetch fresh config directly from Remote Config
    fetchConfig();

    // Poll every 10s if not yet launched
    const interval = setInterval(() => {
      if (!isLaunchedRef.current) {
        fetchConfig();
      }
    }, 10000);

    // Sync immediately when user switches back to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isLaunchedRef.current) {
        fetchConfig();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchConfig]);

  // 3. Live countdown ticker: updates every second once mounted
  // When target time is reached (diff <= 0 / 00:00:00:00), wrapper disappears live!
  useEffect(() => {
    if (!isMounted) return;

    const target = parseLaunchDate(webDateStr);

    const tick = () => {
      const remaining = getTimeRemaining(target);
      setTimeLeft(remaining);
      if (remaining.isComplete) {
        setIsLaunched((prev) => {
          if (!prev && target > 0) {
            setHasJustCompleted(true);
          }
          return true;
        });
        if (typeof document !== "undefined") {
          document.documentElement.classList.add("hirance-launched");
        }
      }
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [webDateStr, isMounted]);

  return {
    isLaunched,
    hasLaunched: isLaunched, // Backwards-compatible alias
    hasJustCompleted,
    webDateStr,
    launchDateStr: webDateStr, // Backwards-compatible alias
    timeLeft,
    isLoading,
    isMounted,
    refetch: fetchConfig,
  };
}
