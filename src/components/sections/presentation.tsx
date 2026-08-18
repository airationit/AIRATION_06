"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { User, Briefcase, TrendingUp, Clock } from "lucide-react";
import { companies, hueFromName, initials } from "@/config/companies";
import { cn } from "@/lib/utils";

interface StatCardData {
  id: string;
  prefix?: string;
  value: number;
  suffix: string;
  title: string;
  line1: string;
  line2: string;
  icon: typeof User;
}

const STAT_CARDS: StatCardData[] = [
  {
    id: "candidates",
    value: 500,
    suffix: "K+",
    title: "Verified Candidates",
    line1: "Authentic profiles.",
    line2: "Real people. Real skills.",
    icon: User,
  },
  {
    id: "hires",
    value: 20,
    suffix: "K+",
    title: "Successful Placements",
    line1: "Right matches.",
    line2: "Real results.",
    icon: Briefcase,
  },
  {
    id: "categories",
    value: 80,
    suffix: "+",
    title: "Specialized Career Tracks",
    line1: "Diverse opportunities",
    line2: "for every ambition.",
    icon: TrendingUp,
  },
  {
    id: "speed",
    prefix: "< ",
    value: 48,
    suffix: "h",
    title: "Average Time to Interview",
    line1: "Faster connections.",
    line2: "Faster outcomes.",
    icon: Clock,
  },
];

function Counter({
  value,
  duration = 1.4,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setCount(value);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;
    let frameId: number;

    const updateCount = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.min(Math.floor(easeProgress * value), value));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount);
      }
    };

    frameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(frameId);
  }, [value, inView, duration, reducedMotion]);

  return <span ref={ref}>{count}</span>;
}

function CompanyLogoItem({ name, logoUrl }: { name: string; logoUrl: string }) {
  const [failed, setFailed] = useState(false);
  const hue = hueFromName(name);

  return (
    <div className="flex items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-border/50 overflow-hidden">
        {failed ? (
          <span
            aria-hidden
            className="grid h-full w-full place-items-center text-[10px] font-bold text-white"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${hue} 75% 50%), hsl(${
                (hue + 40) % 360
              } 75% 40%))`,
            }}
          >
            {initials(name)}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={name}
            loading="lazy"
            decoding="async"
            className="h-4.5 w-4.5 sm:h-5 sm:w-5 object-contain"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function Presentation() {
  const reducedMotion = useReducedMotion();
  const showcaseCompanies = companies.slice(0, 8);

  return (
    <section
      id="employers"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28 flex flex-col items-center justify-center min-h-0"
      aria-labelledby="presentation-heading"
    >
      {/* Background Arc & Ambient Glow (matching reference image) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        
        {/* Soft Ambient Mesh Glows */}
        <div className="absolute right-0 top-1/4 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute left-1/4 top-1/2 h-[26rem] w-[26rem] rounded-full bg-brand-500/5 blur-[120px]" />

        {/* Elegant Curved Orbital Ring */}
        <div className="absolute -right-20 sm:-right-32 top-1/4 h-[44rem] w-[44rem] rounded-full border border-blue-500/15 dark:border-blue-400/10 [mask-image:linear-gradient(to_bottom,black_40%,transparent_90%)]" />
        <div className="absolute -right-36 sm:-right-48 top-1/6 h-[58rem] w-[58rem] rounded-full border border-blue-500/10 dark:border-blue-400/5 [mask-image:linear-gradient(to_bottom,black_30%,transparent_80%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center">
          <motion.h2
            id="presentation-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15]"
          >
            Powering{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Smarter Hiring
            </span>
            <br />
            with Precision
          </motion.h2>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base md:text-lg leading-relaxed"
          >
            Hirance connects top talent and ambitious teams directly —
            <br className="hidden sm:inline" /> in three simple steps.
          </motion.p>
        </div>

        {/* 4 Professional Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {STAT_CARDS.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group relative flex flex-col items-center text-center rounded-3xl p-8 sm:p-9",
                  "bg-white/80 dark:bg-card/40 backdrop-blur-xl border border-border/70 dark:border-border/40",
                  "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:border-blue-500/30"
                )}
              >
                {/* Circular Icon Container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-6 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>

                {/* Primary Metric Counter */}
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  {card.prefix}
                  <Counter value={card.value} />
                  {card.suffix}
                </p>

                {/* Card Title */}
                <h3 className="mt-2 text-sm sm:text-base font-semibold text-foreground tracking-tight">
                  {card.title}
                </h3>

                {/* 2-Line Micro-Description */}
                <div className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <p>{card.line1}</p>
                  <p>{card.line2}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trusted By Footer Strip */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 flex flex-col items-center text-center"
        >
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-muted-foreground/70 uppercase">
            Trusted by growing teams
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {showcaseCompanies.map((company) => (
              <CompanyLogoItem
                key={company.name}
                name={company.name}
                logoUrl={company.logoUrl}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
