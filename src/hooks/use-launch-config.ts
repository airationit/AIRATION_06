"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from "firebase/remote-config";
import { getFirebaseRemoteConfig } from "@/lib/firebase";

export const REMOTE_CONFIG_DEFAULTS = {
  has_launched: false,
  date: "2026-09-21T10:30:00+05:30",
};

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeRemaining = (targetTimestamp: number): TimeRemaining => {
  const diff = Math.max(0, targetTimestamp - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export function useLaunchConfig() {
  const [hasLaunched, setHasLaunched] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("hirance_has_launched");
      if (cached === "true") return true;
    }
    return REMOTE_CONFIG_DEFAULTS.has_launched;
  });

  const [launchDateStr, setLaunchDateStr] = useState<string>(
    REMOTE_CONFIG_DEFAULTS.date
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const hasLaunchedRef = useRef(hasLaunched);
  hasLaunchedRef.current = hasLaunched;

  const fetchConfig = useCallback(async () => {
    try {
      const rc: RemoteConfig | null = await getFirebaseRemoteConfig();
      if (!rc) {
        setIsLoading(false);
        return;
      }

      // 0ms interval in development or pre-launch for immediate responsiveness
      rc.settings.minimumFetchIntervalMillis =
        process.env.NODE_ENV === "development" || !hasLaunchedRef.current
          ? 0
          : 60000;
      rc.defaultConfig = REMOTE_CONFIG_DEFAULTS;

      await fetchAndActivate(rc);

      const launched = getValue(rc, "has_launched").asBoolean();
      const dateVal =
        getValue(rc, "date").asString() ||
        getValue(rc, "launch_date").asString() ||
        REMOTE_CONFIG_DEFAULTS.date;

      setHasLaunched(launched);
      setLaunchDateStr(dateVal);

      if (typeof window !== "undefined") {
        localStorage.setItem("hirance_has_launched", String(launched));
      }
    } catch (err) {
      console.warn("[RemoteConfig] Fetch fallback used:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount and poll every 10s until launched
  useEffect(() => {
    fetchConfig();
    const interval = setInterval(() => {
      if (!hasLaunchedRef.current) {
        fetchConfig();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchConfig]);

  // Tick countdown timer every second
  useEffect(() => {
    const target = new Date(launchDateStr).getTime();
    const tick = () => setTimeLeft(getTimeRemaining(target));

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [launchDateStr]);

  return {
    hasLaunched,
    launchDateStr,
    timeLeft,
    isLoading,
    refetch: fetchConfig,
  };
}
