"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Zap,
  Award,
  Users,
  Target,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

const METRICS = [
  {
    id: "categories",
    value: 80,
    suffix: "+",
    title: "Job Categories",
    tag: "Global Roles",
    icon: Briefcase,
  },
  {
    id: "swipes",
    value: 200,
    suffix: "K+",
    title: "Daily Swipes",
    tag: "Real-time",
    icon: Zap,
  },
  {
    id: "hires",
    value: 20,
    suffix: "K+",
    title: "Successful Hires",
    tag: "Direct Match",
    icon: Award,
  },
  {
    id: "candidates",
    value: 500,
    suffix: "K+",
    title: "Active Talent",
    tag: "Verified",
    icon: Users,
  },
] as const;

const FEATURE_HIGHLIGHTS = [
  {
    icon: Target,
    label: "AI Skill Matching",
  },
  {
    icon: MessageSquare,
    label: "Direct Messaging",
  },
  {
    icon: ShieldCheck,
    label: "Verified Profiles",
  },
];

const Counter = ({
  value,
  duration = 1.4,
}: {
  value: number;
  duration?: number;
}) => {
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
};

export function Presentation() {
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isMetricsInView = useInView(metricsRef, { once: true, amount: 0.15 });
  const isPillarsInView = useInView(pillarsRef, { once: true, amount: 0.2 });

  const reducedMotion = useReducedMotion();

  return (
    <section
      id="employers"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28 flex flex-col items-center justify-center min-h-0"
      aria-labelledby="presentation-heading"
    >
      {/* Dynamic Ambient Mesh Glow Background (matching other sections) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-500/15 via-indigo-500/10 to-sky-500/5 blur-[140px]" />
        <div className="absolute right-10 top-1/4 h-[22rem] w-[22rem] rounded-full bg-blue-600/10 blur-[100px]" />
        
        {/* Subtle geometric grid backdrop */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center">
          <motion.h2
            id="presentation-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
          >
            Powering{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              Smarter Hiring
            </span>{" "}
            with Precision
          </motion.h2>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base leading-relaxed"
          >
            Empowering enterprise hiring pipelines and candidate discovery with real-time data.
          </motion.p>
        </div>

        {/* Professional Metrics Grid */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8"
          aria-label="Hirance platform key metrics"
        >
          {METRICS.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.id}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:bg-card/80 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/20">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-colors" />
                  </div>
                  <span className="rounded-md bg-secondary/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    {metric.tag}
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    <Counter value={metric.value} />
                    {metric.suffix}
                  </p>
                  <h3 className="mt-2 text-sm sm:text-base font-semibold tracking-tight text-foreground">
                    {metric.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimalist Feature Badges */}
        <div ref={pillarsRef} className="mt-12 sm:mt-16 w-full">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 border-t border-border/40 pt-8 sm:pt-10"
          >
            {FEATURE_HIGHLIGHTS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-2.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-card/80"
                >
                  <ItemIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


