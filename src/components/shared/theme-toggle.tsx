"use client"

import { useEffect, useState, type KeyboardEvent } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      disabled={!mounted}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle color theme"
      }
      aria-pressed={mounted ? isDark : undefined}
      tabIndex={0}
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-card/80 text-foreground shadow-sm backdrop-blur-md transition-[background-color,border-color,transform,box-shadow] duration-300",
        "hover:border-brand-500/30 hover:bg-brand-50/70 hover:text-brand-700",
        "dark:hover:bg-brand-950/50 dark:hover:text-brand-300",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40",
        "active:scale-[0.96] disabled:opacity-70",
        className
      )}
    >
      <Sun
        className={cn(
          "h-[1.15rem] w-[1.15rem] transition-[opacity,transform] duration-300",
          mounted && isDark
            ? "absolute scale-75 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "h-[1.15rem] w-[1.15rem] transition-[opacity,transform] duration-300",
          mounted && isDark
            ? "scale-100 rotate-0 opacity-100"
            : "absolute scale-75 -rotate-90 opacity-0"
        )}
        aria-hidden="true"
      />
    </button>
  )
}
