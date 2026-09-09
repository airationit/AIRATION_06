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
      className="relative flex shrink-0 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl sm:rounded-[14px] md:rounded-2xl"
    >
      {/* Squircle App-Icon Container with Light Background & Crisp Grey Border */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden select-none",
          "w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-16 lg:h-16",
          "rounded-xl sm:rounded-[14px] md:rounded-2xl",
          "border-[1.5px] border-slate-300/90 dark:border-slate-700",
          "shadow-[0_1px_4px_rgba(0,0,0,0.04)]",
          "transition-transform duration-200 ease-out hover:scale-105"
        )}
        style={{
          backgroundColor: theme.bg,
        }}
      >
        {/* Content: Centered Logo or Monogram with Balanced Proportions */}
        <div className="relative z-10 flex h-full w-full items-center justify-center p-1.5 sm:p-2 md:p-2.5">
          {failed ? (
            <span
              aria-hidden
              className="grid h-full w-full place-items-center text-xs sm:text-sm font-bold select-none tracking-tight rounded-md"
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
              width={36}
              height={36}
              loading="lazy"
              decoding="async"
              className={cn(
                "object-contain select-none rounded-md sm:rounded-lg",
                "max-h-6 max-w-6 sm:max-h-7 sm:max-w-7 md:max-h-8 md:max-w-8 lg:max-h-9 lg:max-w-9"
              )}
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg sm:rounded-[10px] bg-white p-1 shadow-xs overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logoUrl}
                alt={company.name}
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="max-h-5 max-w-5 sm:max-h-6 sm:max-w-6 md:max-h-7 md:max-w-7 lg:max-h-8 lg:max-w-8 object-contain select-none rounded-sm sm:rounded-md"
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
    <div className="relative flex overflow-hidden py-1 sm:py-1.5 select-none [contain:layout_paint]">
      <div
        className="flex shrink-0 gap-2.5 sm:gap-3 md:gap-3.5 animate-marquee will-change-transform items-center"
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

  // Split companies into 4 balanced rows
  const quarter = Math.ceil(companies.length / 4);
  const row1 = useMemo(() => companies.slice(0, quarter), [quarter]);
  const row2 = useMemo(() => companies.slice(quarter, quarter * 2), [quarter]);
  const row3 = useMemo(() => companies.slice(quarter * 2, quarter * 3), [quarter]);
  const row4 = useMemo(() => companies.slice(quarter * 3), [quarter]);

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
          className="mx-auto max-w-3xl text-center mb-8 sm:mb-10"
        >
          <h2
            id="trusted-by-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
          >
            Companies Are Hiring on{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              Hirance
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Built for modern hiring teams looking for better matches, faster applications and simpler hiring.
          </p>
        </motion.div>

        {/* 4-Row Continuous App-Icon Stream (Continuous, no pause on hover) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 sm:space-y-2.5 md:space-y-3 marquee-mask"
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
            startIndex={quarter}
          />

          {/* Row 3: Leftward continuous scroll */}
          <ContinuousMarqueeRow
            items={row3}
            direction="normal"
            speed="80s"
            startIndex={quarter * 2}
          />

          {/* Row 4: Rightward continuous scroll */}
          <ContinuousMarqueeRow
            items={row4}
            direction="reverse"
            speed="70s"
            startIndex={quarter * 3}
          />
        </motion.div>
      </div>
    </section>
  );
}
