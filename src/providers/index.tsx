"use client";

import { ReactNode } from "react";
import { LenisProvider } from "./lenis-provider";
import { GsapProvider } from "./gsap-provider";
import { FirebaseAnalyticsProvider } from "./firebase-analytics-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <FirebaseAnalyticsProvider>
      <LenisProvider>
        <GsapProvider>{children}</GsapProvider>
      </LenisProvider>
    </FirebaseAnalyticsProvider>
  );
}
