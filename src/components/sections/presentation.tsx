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
  return null;
}
