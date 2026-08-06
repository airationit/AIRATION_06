"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { GooglePlayButton } from "./google-play-button"

interface NavbarProps {
  className?: string
}

const isExternalHref = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:")

export function Navbar({ className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const handleMenuToggle = () => {
    setMenuOpen((v) => !v)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const employer = siteConfig.audiences.find((a) => a.id === "employers")
  const candidate = siteConfig.audiences.find((a) => a.id === "candidates")

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "absolute inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-500 ease-in-out sm:px-5 sm:pt-4",
        className
      )}
    >
      <nav
        className={cn(
          "relative mx-auto flex items-center justify-between rounded-full bg-white px-4 transition-all duration-500 ease-in-out sm:px-6",
          scrolled
            ? "h-14 max-w-5xl border border-border/50 shadow-[0_10px_36px_-18px_rgba(15,23,42,0.22)] sm:h-16"
            : "h-16 max-w-6xl border border-border/30 shadow-[0_4px_20px_-12px_rgba(15,23,42,0.12)] sm:h-20"
        )}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group relative flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
          aria-label={`${siteConfig.name} home`}
          tabIndex={0}
        >
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={300}
            height={100}
            loading="eager"
            fetchPriority="high"
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-10"
          />
        </Link>

        <div
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {siteConfig.nav.map((item, index) => {
            const external = "external" in item && item.external
            const className =
              "relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"

            const label = (
              <>
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navbar-hover-bg"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-500/8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </>
            )

            if (external || isExternalHref(item.href)) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={className}
                  aria-label={`${item.label} — open in new tab`}
                  tabIndex={0}
                >
                  {label}
                </a>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                className={className}
                tabIndex={0}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {candidate && (
            <a
              href={candidate.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
              aria-label="Get the Hirance app for candidates on Google Play"
              tabIndex={0}
            >
              Get the app
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            </a>
          )}
          {employer && (
            <Link
              href={employer.href}
              className="inline-flex h-10 items-center justify-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
              aria-label="Start hiring on the Hirance web platform for employers"
              tabIndex={0}
            >
              Start hiring
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={handleMenuToggle}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          tabIndex={0}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/80 text-foreground transition-colors md:hidden",
            "hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
          )}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-border/50 bg-white p-4 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.25)] md:hidden"
          >
            <p className="px-3 pb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Choose your path
            </p>

            <div className="grid gap-2">
              {siteConfig.audiences.map((audience) => {
                const content = (
                  <>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-base font-semibold text-foreground">
                        {audience.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {audience.hint} · {audience.cta}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </>
                )

                const itemClass =
                  "flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/40 px-4 py-3.5 transition-colors hover:border-brand-500/30 hover:bg-brand-50/60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"

                if (audience.external) {
                  return (
                    <a
                      key={audience.id}
                      href={audience.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleMenuClose}
                      className={itemClass}
                      aria-label={`${audience.label}: ${audience.hint}`}
                      tabIndex={0}
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <Link
                    key={audience.id}
                    href={audience.href}
                    onClick={handleMenuClose}
                    className={itemClass}
                    aria-label={`${audience.label}: ${audience.hint}`}
                    tabIndex={0}
                  >
                    {content}
                  </Link>
                )
              })}
            </div>

            <div className="mt-3 flex flex-col gap-1 border-t border-border/60 pt-3">
              {siteConfig.nav
                .filter(
                  (item) =>
                    !siteConfig.audiences.some((a) => a.href === item.href)
                )
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleMenuClose}
                    className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                    tabIndex={0}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>

            <div className="mt-3 border-t border-border/60 pt-4">
              <GooglePlayButton className="w-full justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
