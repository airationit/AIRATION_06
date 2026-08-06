"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { GooglePlayButton } from "@/components/shared"

const headlineWords = ["Where", "ambition", "finds", "its", "match."]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
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
      const wrap = videoWrapRef.current
      if (!wrap) return

      gsap.fromTo(
        wrap,
        {
          scale: 0.88,
          rotateX: 8,
          y: 48,
          opacity: 0.85,
          filter: "blur(3px)",
          transformPerspective: 1200,
        },
        {
          scale: 1,
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 95%",
            end: "top 50%",
            scrub: 1.2,
          },
        }
      )
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
      { threshold: 0.2 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-aurora absolute -left-32 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-brand-400/20 blur-[130px]" />
        <div className="animate-aurora absolute right-[-15%] top-[8%] h-[32rem] w-[32rem] rounded-full bg-sky-300/20 blur-[130px] [animation-delay:-6s]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-background/50 to-transparent" />

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 pt-28 text-center sm:pt-32">
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

      <div className="mt-12 px-3 pb-16 sm:mt-16 sm:px-6 sm:pb-20">
        <div
          ref={videoWrapRef}
          className="mx-auto w-full max-w-7xl will-change-transform"
          style={{ perspective: 1200 }}
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.28)] sm:rounded-3xl">
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
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
