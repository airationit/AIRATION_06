"use client";

import { useState, useMemo, memo } from "react";
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
 * Clean, lightweight, and hardware-accelerated with subtle grey borders.
 */
const AppIconCompanyCard = memo(function AppIconCompanyCard({
  company,
  index,
}: {
  company: Company;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const theme = useMemo(() => getCompanyColorTheme(company.name, index), [company.name, index]);

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      title={company.name}
      aria-label={`Visit ${company.name}`}
      className="relative flex shrink-0 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl sm:rounded-[22px] md:rounded-[24px]"
    >
      {/* Squircle App-Icon Container with Light Background & Crisp 2px Grey Border */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden select-none",
          "w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24",
          "rounded-2xl sm:rounded-[22px] md:rounded-[24px]",
          "border-2 border-slate-300",
          "shadow-[0_2px_6px_rgba(0,0,0,0.04)]",
          "transition-transform duration-200 ease-out hover:scale-105"
        )}
        style={{
          backgroundColor: theme.bg,
        }}
      >
        {/* Content: Centered Logo or Monogram with Balanced Proportions */}
        <div className="relative z-10 flex h-full w-full items-center justify-center p-2.5 sm:p-3">
          {failed ? (
            <span
              aria-hidden
              className="grid h-full w-full place-items-center text-sm sm:text-base md:text-lg font-bold select-none tracking-tight rounded-lg"
              style={{
                color: theme.textColor || (theme.isLight ? "#1E293B" : "#FFFFFF"),
              }}
            >
              {initials(company.name)}
            </span>
          ) : theme.isLight ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logoUrl}
              alt={company.name}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className={cn(
                "object-contain select-none rounded-lg sm:rounded-xl",
                "max-h-9 max-w-9 sm:max-h-11 sm:max-w-11 md:max-h-12 md:max-w-12 lg:max-h-13 lg:max-w-13"
              )}
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-13 md:w-13 items-center justify-center rounded-xl sm:rounded-[14px] bg-white p-1.5 shadow-xs overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logoUrl}
                alt={company.name}
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="max-h-7 max-w-7 sm:max-h-9 sm:max-w-9 md:max-h-10 md:max-w-10 object-contain select-none rounded-md sm:rounded-lg"
                onError={() => setFailed(true)}
              />
            </div>
          )}
        </div>
      </div>
    </a>
  );
});

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
    <div className="relative flex overflow-hidden py-1.5 sm:py-2.5 select-none [contain:layout_paint]">
      <div
        className="flex shrink-0 gap-3 sm:gap-4 md:gap-5 animate-marquee will-change-transform items-center"
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
