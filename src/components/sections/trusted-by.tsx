"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { companies, hueFromName, initials, type Company } from "@/config/companies";
import { cn } from "@/lib/utils";

function CompanyLogoPill({ company }: { company: Company }) {
  const [failed, setFailed] = useState(false);
  const hue = hueFromName(company.name);

  const hoverShadowColor = `hsla(${hue}, 85%, 55%, 0.16)`;
  const hoverBorderColor = `hsla(${hue}, 75%, 50%, 0.35)`;

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${company.name}`}
      className={cn(
        "group relative flex shrink-0 items-center gap-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50",
        "h-14 px-4 sm:h-16 sm:px-5 bg-card/75 dark:bg-card/45 backdrop-blur-md border border-border/50 shadow-sm",
        "hover:border-[var(--hover-border-color)] hover:bg-card hover:shadow-[0_12px_32px_-8px_var(--hover-shadow-color)] hover:-translate-y-0.5"
      )}
      style={
        {
          "--hover-shadow-color": hoverShadowColor,
          "--hover-border-color": hoverBorderColor,
        } as React.CSSProperties
      }
    >
      {/* Shine Reflection */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <div className="absolute top-0 left-0 h-full w-[45%] bg-gradient-to-r from-transparent via-white/25 dark:via-white/12 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[card-shine_0.9s_ease-out_forwards]" />
      </div>

      {/* Avatar / Logo Circle */}
      <span className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105">
        {failed ? (
          <span
            aria-hidden
            className="grid h-full w-full place-items-center text-xs font-bold text-white rounded-full"
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
            className="h-6 w-6 sm:h-7 sm:w-7 object-contain transition-transform duration-500 group-hover:scale-110"
            onError={() => setFailed(true)}
          />
        )}
      </span>

      {/* Title & Domain */}
      <div className="flex flex-col min-w-0 pr-1">
        <span className="truncate text-xs sm:text-sm font-semibold text-foreground/90 transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {company.name}
        </span>
        <span className="truncate text-[10px] text-muted-foreground opacity-75 group-hover:opacity-100 transition-opacity">
          {company.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </span>
      </div>

      <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:text-brand-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-0 group-hover:opacity-100" />
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
        className="flex shrink-0 gap-4 sm:gap-5 animate-marquee will-change-transform"
        style={
          {
            "--marquee-duration": speed,
            "--marquee-direction": direction,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((company, idx) => (
          <CompanyLogoPill key={`${company.name}-${idx}`} company={company} />
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
      className="relative w-full overflow-hidden py-6 sm:py-8 lg:py-10 flex flex-col items-center justify-center min-h-0"
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
        {/* Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Headline */}
          <h2
            id="trusted-by-heading"
            className="text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Trusted By Top Teams Across <span className="text-gradient">India</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm sm:text-base text-muted-foreground leading-relaxed">
            From fast-growing Indian tech startups to industry giants, recruiters and hiring managers rely on Hirance to build high-performing teams.
          </p>
        </motion.div>

        {/* 3-Row Steady & Slow Continuous Marquee Stream */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 space-y-3 sm:space-y-4 marquee-mask"
        >
          <ContinuousMarqueeRow items={row1} direction="normal" speed="110s" />
          <ContinuousMarqueeRow items={row2} direction="reverse" speed="95s" />
          <ContinuousMarqueeRow items={row3} direction="normal" speed="120s" />
        </motion.div>

        {/* Minimalist Stat Counter Footer */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 mx-auto max-w-2xl grid grid-cols-3 gap-4 border-t border-border/60 pt-6 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">100+</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">Hiring Partners</div>
          </div>
          <div className="border-x border-border/60 px-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">&lt; 48 Hrs</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">Avg. Time to Hire</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">98%</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">Match Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
