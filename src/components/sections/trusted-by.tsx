"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  companies,
  getCompanyColorTheme,
  initials,
  type Company,
} from "@/config/companies";
import { cn } from "@/lib/utils";

/**
 * App-icon squircle card for a company.
 * Clean, stable display with no hover stops or shifts.
 */
function AppIconCompanyCard({
  company,
  index,
}: {
  company: Company;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const theme = getCompanyColorTheme(company.name, index);

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      title={company.name}
      aria-label={`Visit ${company.name}`}
      className="relative flex shrink-0 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl sm:rounded-[22px] md:rounded-[26px]"
    >
      {/* Squircle App-Icon Container with Varied Background */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden select-none",
          "w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-26 lg:h-26",
          "rounded-2xl sm:rounded-[22px] md:rounded-[26px]",
          "shadow-[0_4px_14px_rgba(0,0,0,0.08)]",
          theme.isLight
            ? "border border-slate-200/90 dark:border-white/15 dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            : "border border-white/15"
        )}
        style={{
          backgroundColor: theme.bg,
        }}
      >
        {/* Top Bevel Inner Ring */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-[22px] md:rounded-[26px] ring-1 ring-inset ring-white/20" />

        {/* Content: Centered Logo or Monogram */}
        <div className="relative z-10 flex h-full w-full items-center justify-center p-3 sm:p-3.5 md:p-4">
          {failed ? (
            <span
              aria-hidden
              className="grid h-full w-full place-items-center text-base sm:text-lg md:text-xl font-black select-none tracking-tight"
              style={{
                color: theme.textColor || (theme.isLight ? "#18181B" : "#FFFFFF"),
              }}
            >
              {initials(company.name)}
            </span>
          ) : (
            // On dark or colored backgrounds, render on a subtle clean plate for perfect visibility
            <div
              className={cn(
                "flex items-center justify-center",
                theme.bg === "#FFFFFF"
                  ? "w-full h-full"
                  : "w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-[14px] bg-white/95 backdrop-blur-xs p-1.5 shadow-xs ring-1 ring-black/5"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logoUrl}
                alt={company.name}
                loading="lazy"
                decoding="async"
                className={cn(
                  "object-contain select-none",
                  theme.bg === "#FFFFFF"
                    ? "max-h-9 max-w-9 sm:max-h-11 sm:max-w-11 md:max-h-12 md:max-w-12"
                    : "max-h-8 max-w-8 sm:max-h-9 sm:max-w-9 md:max-h-10 md:max-w-10"
                )}
                onError={() => setFailed(true)}
              />
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

/**
 * Continuous infinite marquee row that never stops on hover.
 */
function ContinuousMarqueeRow({
  items,
  direction = "normal",
  speed = "70s",
  startIndex = 0,
}: {
  items: Company[];
  direction?: "normal" | "reverse";
  speed?: string;
  startIndex?: number;
}) {
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="relative flex overflow-hidden py-2 sm:py-3 select-none">
      <div
        className="flex shrink-0 gap-3.5 sm:gap-5 md:gap-6 animate-marquee will-change-transform items-center"
        style={
          {
            "--marquee-duration": speed,
            "--marquee-direction": direction,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((company, idx) => (
          <AppIconCompanyCard
            key={`${company.name}-${idx}`}
            company={company}
            index={startIndex + idx}
          />
        ))}
      </div>
    </div>
  );
}

export function TrustedBy() {
  const reducedMotion = useReducedMotion();

  // Split companies into 2 balanced rows
  const half = Math.ceil(companies.length / 2);
  const row1 = useMemo(() => companies.slice(0, half), [half]);
  const row2 = useMemo(() => companies.slice(half), [half]);

  return (
    <section
      id="partners"
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center min-h-0"
      aria-labelledby="trusted-by-heading"
    >
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-500/8 via-indigo-500/6 to-sky-500/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Clean, SEO-optimized Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center mb-8 sm:mb-12"
        >
          <h2
            id="trusted-by-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
          >
            Trusted By Top Teams Across{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              India
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            From high-growth startups to established leaders, top hiring teams trust Hirance.
          </p>
        </motion.div>

        {/* 2-Row Continuous App-Icon Stream (Continuous, no pause on hover) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-4 marquee-mask"
        >
          {/* Row 1: Leftward continuous scroll */}
          <ContinuousMarqueeRow
            items={row1}
            direction="normal"
            speed="75s"
            startIndex={0}
          />

          {/* Row 2: Rightward continuous scroll */}
          <ContinuousMarqueeRow
            items={row2}
            direction="reverse"
            speed="65s"
            startIndex={half}
          />
        </motion.div>
      </div>
    </section>
  );
}
