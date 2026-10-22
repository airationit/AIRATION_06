"use client";

import { ReactNode } from "react";
import { LenisProvider } from "./lenis-provider";
import { FirebaseAnalyticsProvider } from "./firebase-analytics-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <FirebaseAnalyticsProvider>
      <LenisProvider>{children}</LenisProvider>
    </FirebaseAnalyticsProvider>
  );
}
