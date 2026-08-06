"use client";

import { ReactNode } from "react";
import { LenisProvider } from "./lenis-provider";
import { GsapProvider } from "./gsap-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LenisProvider>
      <GsapProvider>{children}</GsapProvider>
    </LenisProvider>
  );
}
