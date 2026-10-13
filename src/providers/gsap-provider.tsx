"use client";

import { ReactNode } from "react";

interface GsapProviderProps {
  children: ReactNode;
}

export function GsapProvider({ children }: GsapProviderProps) {
  return <>{children}</>;
}
