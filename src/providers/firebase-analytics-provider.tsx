"use client";

import { useEffect, type ReactNode } from "react";
import { initAnalytics } from "@/lib/firebase";

interface FirebaseAnalyticsProviderProps {
  children: ReactNode;
}

export function FirebaseAnalyticsProvider({
  children,
}: FirebaseAnalyticsProviderProps) {
  useEffect(() => {
    initAnalytics();
  }, []);

  return <>{children}</>;
}
