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
    </section>
  );
}
