"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X, ChevronRight, ChevronDown } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { GooglePlayButton } from "./google-play-button"

interface NavbarProps {
  className?: string
}

const isExternalHref = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:")

export function Navbar({ className }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileJobsOpen, setMobileJobsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)



  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Close menu on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleMenuToggle = () => {
    setMenuOpen((v) => !v)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const employer = siteConfig.audiences.find((a) => a.id === "employers")
  const candidate = siteConfig.audiences.find((a) => a.id === "candidates")

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "w-full transition-all duration-300 ease-out",
          "relative z-50 border-b border-transparent bg-transparent py-4 sm:py-5",
          "px-6 sm:px-10 lg:px-16 xl:px-24",
          className
        )}
      >
        <nav
          className="relative flex w-full items-center justify-between gap-4"
          aria-label="Primary"
        >
          <div className="flex min-w-0 items-center gap-6 lg:gap-10">
            <Link
              href="/"
              className="group relative flex shrink-0 items-center gap-2 sm:gap-2.5 select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2"
              aria-label={`${siteConfig.name} home`}
              tabIndex={0}
            >
              <Image
                src="/images/icon.png"
                alt={`${siteConfig.name} icon`}
                width={36}
                height={36}
                loading="eager"
                fetchPriority="high"
                priority
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <Image
                src="/images/wordmark-navy.png"
                alt={siteConfig.name}
                width={110}
                height={28}
                loading="eager"
                fetchPriority="high"
                priority
                className="h-5 sm:h-5.5 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            <div
              className="hidden items-center gap-1 lg:flex"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {siteConfig.nav.map((item, index) => {
                const external = "external" in item && item.external
                const hasSubNav = "subNav" in item && item.subNav
                const linkClass =
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
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
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
                      className={linkClass}
                      aria-label={`${item.label} — open in new tab`}
                      tabIndex={0}
                    >
                      {label}
                    </a>
                  )
                }

                const linkElement = (
                  <Link
                    href={item.href}
                    className={linkClass}
                    tabIndex={0}
                  >
                    {label}
                  </Link>
                )



                if (hasSubNav) {
                  return (
                    <div 
                      key={item.href}
                      className="relative group"
                      onMouseEnter={() => setHoveredIndex(index)}
                    >
                      {linkElement}
                      <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
                        <div className="flex w-[500px] bg-white rounded-2xl shadow-xl border border-border/50 p-5 divide-x divide-border/40 relative">
                          <div className="flex-1 flex flex-col gap-3.5 pr-4">
                            {item.subNav.leftSections ? (
                              item.subNav.leftSections.map((sec: any, secIdx: number) => (
                                <div key={secIdx} className="flex flex-col gap-1.5">
                                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                                    {sec.title}
                                  </h4>
                                  <div className="flex flex-col gap-1">
                                    {sec.items.map((subItem: any) => (
                                      <Link 
                                        key={subItem.href} 
                                        href={subItem.href} 
                                        className="text-xs font-medium text-slate-600 hover:text-brand-600 hover:translate-x-0.5 transition-all flex items-center justify-between"
                                      >
                                        <span>{subItem.label}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : null}
                          </div>
                          <div className="flex-1 flex flex-col gap-2 pl-4">
                            <h4 className="text-sm font-bold text-slate-900 tracking-tight mb-1">
                              Browse Directories
                            </h4>
                            <div className="flex flex-col gap-1.5">
                              {item.subNav.right.map((subItem: any) => (
                                <div key={subItem.href} className="relative group/rightItem">
                                  <Link 
                                    href={subItem.href} 
                                    className="flex items-center justify-between text-xs font-medium text-slate-600 hover:text-brand-600 hover:translate-x-0.5 transition-all"
                                  >
                                    <span>{subItem.label}</span>
                                    {subItem.hasArrow && (
                                      <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover/rightItem:opacity-100 group-hover/rightItem:translate-x-0.5 transition-all text-slate-400" />
                                    )}
                                  </Link>

                                  {subItem.flyoutItems && (
                                    <div className="absolute top-0 left-full pl-2 hidden group-hover/rightItem:block z-50">
                                      <div className="w-[220px] bg-white rounded-xl shadow-xl border border-border/50 p-3 flex flex-col gap-1.5">
                                        <h5 className="text-xs font-bold text-slate-900 tracking-tight mb-0.5">
                                          Popular {subItem.label.replace(/^Jobs By /, "")}
                                        </h5>
                                        {subItem.flyoutItems.map((flyItem: any) => (
                                          <Link
                                            key={flyItem.href}
                                            href={flyItem.href}
                                            className="text-xs font-medium text-slate-600 hover:text-brand-600 hover:translate-x-0.5 transition-all py-0.5"
                                          >
                                            {flyItem.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={item.href} onMouseEnter={() => setHoveredIndex(index)}>
                    {linkElement}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop action buttons */}
          <div className="hidden items-center gap-2 lg:flex">
            {candidate && (
              <a
                href={candidate.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                aria-label="Get the Hirance app for candidates on Google Play"
                tabIndex={0}
              >
                {candidate.cta}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              </a>
            )}
            {employer &&
              (employer.external || isExternalHref(employer.href) ? (
                <a
                  href={employer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                  aria-label="Employer login on the Hirance web platform"
                  tabIndex={0}
                >
                  {employer.cta}
                </a>
              ) : (
                <Link
                  href={employer.href}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                  aria-label="Employer login on the Hirance web platform"
                  tabIndex={0}
                >
                  {employer.cta}
                </Link>
              ))}
          </div>

          {/* Mobile & Tablet hamburger button inside header to align cleanly with logo */}
          <button
            type="button"
            onClick={handleMenuToggle}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            tabIndex={0}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border text-foreground transition-all duration-300 ease-out lg:hidden",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40",
              menuOpen
                ? "border-border/50 bg-white/95 shadow-[0_10px_36px_-18px_rgba(15,23,42,0.22)]"
                : "border-border/40 bg-white/90 hover:bg-muted"
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
              className="mt-2 w-full max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-border/50 bg-white p-4 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.25)] lg:hidden"
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
                {siteConfig.nav.map((item) => {


                  if ("subNav" in item && item.subNav) {
                    return (
                      <div key={item.href} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setMobileJobsOpen((v) => !v)}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              mobileJobsOpen && "rotate-180 text-brand-600"
                            )}
                          />
                        </button>
                        {mobileJobsOpen && (
                          <div className="pl-3 pb-2 flex flex-col gap-2 border-l-2 border-brand-500/20 ml-4 mt-1">
                            {item.subNav.leftSections ? (
                              item.subNav.leftSections.map((sec: any, secIdx: number) => (
                                <div key={secIdx} className="flex flex-col gap-1 pt-1">
                                  <span className="text-xs font-bold text-slate-900 px-3">
                                    {sec.title}
                                  </span>
                                  {sec.items.map((sub: any) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={handleMenuClose}
                                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              ))
                            ) : null}
                            <span className="text-xs font-bold text-slate-900 pt-2 px-3">
                              Browse Directories
                            </span>
                            {item.subNav.right.map((sub: any) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={handleMenuClose}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between"
                              >
                                <span>{sub.label}</span>
                                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleMenuClose}
                      className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
                      tabIndex={0}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-3 border-t border-border/60 pt-4">
                <GooglePlayButton className="w-full justify-center" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>


    </>
  )
}
