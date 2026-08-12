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
    description: "Roles across tech, product, design, marketing & leadership.",
    icon: Briefcase,
  },
  {
    id: "swipes",
    value: 200,
    suffix: "K+",
    title: "Daily Swipes",
    description: "Real-time candidate and recruiter engagements daily.",
    icon: Zap,
  },
  {
    id: "hires",
    value: 20,
    suffix: "K+",
    title: "Successful Hires",
    description: "Direct matches made with zero agency markup fees.",
    icon: Award,
  },
  {
    id: "candidates",
    value: 500,
    suffix: "K+",
    title: "Active Candidates",
    description: "Verified professionals open to immediate opportunities.",
    icon: Users,
  },
] as const;

const FEATURE_HIGHLIGHTS = [
  {
    icon: Target,
    label: "AI Skill Matching",
    text: "Instant candidate-role compatibility scoring.",
  },
  {
    icon: MessageSquare,
    label: "Direct Messaging",
    text: "Direct communication with hiring decision makers.",
  },
  {
    icon: ShieldCheck,
    label: "Verified Profiles",
    text: "Transparent, pre-screened professional network.",
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
      className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-12 flex flex-col items-center justify-center min-h-0"
      aria-labelledby="presentation-heading"
    >
      {/* Refined Subtle Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <motion.h2
            id="presentation-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight"
          >
            Powering <span className="text-brand-500">Smarter Hiring</span> with Precision
          </motion.h2>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            Empowering enterprise hiring pipelines and candidate discovery with real-time data.
          </motion.p>
        </div>

        {/* Professional Metrics Grid */}
        <div
          ref={metricsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
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
                className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-brand-500/40 hover:shadow-md hover:bg-card/90"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-500/10 text-brand-500 dark:text-brand-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    <Counter value={metric.value} />
                    {metric.suffix}
                  </p>
                  <h3 className="mt-2 text-sm font-bold text-foreground">
                    {metric.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimalist Feature Row */}
        <div ref={pillarsRef} className="mt-8 w-full">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border/40 pt-6"
          >
            {FEATURE_HIGHLIGHTS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/30 px-4 py-3 text-left transition-colors hover:bg-card/60"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                    <ItemIcon className="h-4 w-4 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">
                      {item.label}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

