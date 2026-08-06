"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const METRICS = [
  {
    value: 80,
    suffix: "+",
    title: "Job categories",
    description:
      "Roles across technology, design, operations, marketing, and leadership.",
  },
  {
    value: 200,
    suffix: "K+",
    title: "Daily swipes",
    description:
      "High-intent decisions from employers and candidates every day.",
  },
  {
    value: 20,
    suffix: "K+",
    title: "Successful hires",
    description: "People matched into roles they want through Hirance.",
  },
  {
    value: 500,
    suffix: "K+",
    title: "Candidates",
    description: "Verified professionals actively exploring opportunities.",
  },
] as const

const Counter = ({
  value,
  duration = 1.4,
}: {
  value: number
  duration?: number
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [count, setCount] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    if (reducedMotion) {
      setCount(value)
      return
    }

    const startTime = performance.now()
    const durationMs = duration * 1000
    let frameId: number

    const updateCount = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1)
      const easeProgress = progress * (2 - progress)
      setCount(Math.min(Math.floor(easeProgress * value), value))

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount)
      }
    }

    frameId = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(frameId)
  }, [value, inView, duration, reducedMotion])

  return <span ref={ref}>{count}</span>
}

export function Presentation() {
  const headerRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLUListElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.35 })
  const isMetricsInView = useInView(metricsRef, { once: true, amount: 0.2 })
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="employers"
      className="relative overflow-hidden border-t border-border/40 pt-16 pb-24 sm:pt-24 sm:pb-32"
      aria-labelledby="presentation-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[22rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/[0.04] blur-[110px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <motion.h2
            id="presentation-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
          >
            Powering <span className="text-gradient">smarter hiring</span>
          </motion.h2>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg"
          >
            Helping companies and candidates connect faster every day.
          </motion.p>
        </div>

        <ul
          ref={metricsRef}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-8"
          aria-label="Hirance platform metrics"
        >
          {METRICS.map((metric, index) => (
            <motion.li
              key={metric.title}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: reducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative text-center sm:text-left"
            >
              {index > 0 && (
                <span
                  className="absolute -left-4 top-1 hidden h-14 w-px bg-border/70 lg:block"
                  aria-hidden="true"
                />
              )}
              <p className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                <Counter value={metric.value} />
                {metric.suffix}
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {metric.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
