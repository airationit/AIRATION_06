"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { companies, hueFromName, initials, type Company } from "@/config/companies";
import { cn } from "@/lib/utils";

function CircularCompanyChip({ company }: { company: Company }) {
  const [failed, setFailed] = useState(false);
  const hue = hueFromName(company.name);

  const hoverShadowColor = `hsla(${hue}, 85%, 55%, 0.25)`;
  const hoverBorderColor = `hsla(${hue}, 75%, 50%, 0.45)`;

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${company.name}`}
      className="group flex shrink-0 flex-col items-center gap-2 w-28 sm:w-32 text-center transition-all duration-300 focus-visible:outline-none"
    >
      {/* Circular Logo Badge */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-300 ease-out",
          "h-14 w-14 sm:h-16 sm:w-16 bg-card/80 dark:bg-card/50 backdrop-blur-md border border-border/60 shadow-sm",
          "group-hover:scale-110 group-hover:border-[var(--hover-border-color)] group-hover:bg-card group-hover:shadow-[0_12px_28px_-6px_var(--hover-shadow-color)] group-hover:-translate-y-1"
        )}
        style={
          {
            "--hover-shadow-color": hoverShadowColor,
            "--hover-border-color": hoverBorderColor,
          } as React.CSSProperties
        }
      >
        {/* Inner Gloss Reflection */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 dark:via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Circle Icon Container */}
        <span className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white dark:bg-zinc-900/90 shadow-inner ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 group-hover:scale-105">
          {failed ? (
            <span
              aria-hidden
              className="grid h-full w-full place-items-center text-xs sm:text-sm font-bold text-white rounded-full"
              style={{
                backgroundImage: `linear-gradient(135deg, hsl(${hue} 75% 50%), hsl(${
                  (hue + 40) % 360
                } 75% 40%))`,
              }}
            >
              {initials(company.name)}
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logoUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-5.5 w-5.5 sm:h-6.5 sm:w-6.5 object-contain transition-transform duration-300 group-hover:scale-110"
              onError={() => setFailed(true)}
            />
          )}
        </span>
      </div>

      {/* Full Company Name Below Chip (Up to 2 lines) */}
      <span className="w-full line-clamp-2 text-xs sm:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors leading-snug text-center">
        {company.name}
      </span>
    </a>
  );
}

function ContinuousMarqueeRow({
  items,
  direction = "normal",
  speed = "90s",
}: {
  items: Company[];
  direction?: "normal" | "reverse";
  speed?: string;
}) {
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="marquee-group relative flex overflow-hidden py-2 select-none">
      <div
        className="flex shrink-0 gap-5 sm:gap-7 animate-marquee will-change-transform"
        style={
          {
            "--marquee-duration": speed,
            "--marquee-direction": direction,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((company, idx) => (
          <CircularCompanyChip key={`${company.name}-${idx}`} company={company} />
        ))}
      </div>
    </div>
  );
}

export function TrustedBy() {
  const reducedMotion = useReducedMotion();

  // Partition companies into 3 clean, balanced rows
  const row1 = useMemo(() => companies.slice(0, 33), []);
  const row2 = useMemo(() => companies.slice(33, 66), []);
  const row3 = useMemo(() => companies.slice(66, 99), []);

  return (
    <section
      id="partners"
      className="relative w-full overflow-hidden py-10 sm:py-14 flex flex-col items-center justify-center min-h-0"
      aria-labelledby="trusted-by-heading"
    >
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-500/10 via-indigo-500/8 to-purple-500/5 blur-[150px]" />

        {/* Geometric Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Minimalist Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
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
        </motion.div>

        {/* 3-Row Continuous Marquee Stream */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-10 space-y-4 sm:space-y-5 marquee-mask"
        >
          <ContinuousMarqueeRow items={row1} direction="normal" speed="110s" />
          <ContinuousMarqueeRow items={row2} direction="reverse" speed="95s" />
          <ContinuousMarqueeRow items={row3} direction="normal" speed="120s" />
        </motion.div>

        {/* Minimalist Stats Sub-bar */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-muted-foreground"
        >
          {/* <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            <strong className="text-foreground font-semibold">100+</strong> Hiring Partners
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <strong className="text-foreground font-semibold">&lt; 48 Hrs</strong> Time to Hire
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <strong className="text-foreground font-semibold">98%</strong> Satisfaction
          </span> */}
        </motion.div>
      </div>
    </section>
  );
}

