"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { LenisProvider } from "./lenis-provider"
import { GsapProvider } from "./gsap-provider"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <GsapProvider>{children}</GsapProvider>
      </LenisProvider>
    </ThemeProvider>
  )
}
