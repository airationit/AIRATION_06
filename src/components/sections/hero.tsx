"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { GooglePlayButton } from "@/components/shared"
import { cn } from "@/lib/utils"

const headlineWords = ["Where", "ambition", "finds", "its", "match."]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const copy = copyRef.current
      const wrap = videoWrapRef.current
      if (!copy || !wrap) return

      ScrollTrigger.create({
        trigger: copy,
        start: "center center",
        end: () => `+=${wrap.offsetHeight * 0.7}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.05 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[18%] h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-[42%] h-[24rem] w-[28rem] rounded-full bg-sky-300/12 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div
        className={cn(
          "relative z-0 flex items-center justify-center px-6",
          reducedMotion
            ? "pt-28 pb-10 sm:pt-32"
            : "min-h-[95dvh] pt-28 pb-6 sm:pt-32"
        )}
      >
        <div
          ref={copyRef}
          className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center"
        >
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-semibold tracking-[0.18em] text-brand-600 uppercase"
          >
            {siteConfig.name}
          </motion.p>

          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.75rem]">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={
                  reducedMotion ? false : { opacity: 0, y: 36, rotateX: -28 }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.75,
                  delay: reducedMotion ? 0 : 0.15 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={
                  i >= 3
                    ? "text-gradient mr-[0.22em] inline-block"
                    : "mr-[0.22em] inline-block"
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: reducedMotion ? 0 : 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            Smarter matches, faster hires, and zero noise — connecting exceptional
            people with the companies shaping tomorrow.
          </motion.p>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: reducedMotion ? 0 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href={siteConfig.links.employer}
              className="group inline-flex h-12 min-w-[11rem] items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/40"
              aria-label="Start hiring today"
              tabIndex={0}
            >
              Start hiring today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <GooglePlayButton animate={!reducedMotion} />
          </motion.div>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 px-2 pb-16 sm:px-4 sm:pb-24 lg:px-6",
          reducedMotion ? "mt-10" : "mt-0"
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-[8%] top-8 -z-10 h-[70%] rounded-full bg-brand-500/[0.06] blur-[90px]"
          aria-hidden="true"
        />

        <div
          ref={videoWrapRef}
          className="mx-auto w-full max-w-[90rem]"
        >
          <div className="overflow-hidden rounded-xl border border-border/70 bg-background shadow-[0_24px_64px_-36px_rgba(15,23,42,0.35)] sm:rounded-2xl">
            <div
              className="flex h-9 items-center gap-3 border-b border-border/60 bg-muted/40 px-3.5 sm:h-10 sm:px-4"
              aria-hidden="true"
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span className="truncate text-xs font-medium tracking-wide text-muted-foreground">
                {siteConfig.name}
              </span>
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src="/videos/hero_video.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${siteConfig.name} product showcase`}
              />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
