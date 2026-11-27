"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { HeroVideoCard } from "./hero-video-card";
import { cn } from "@/lib/utils";

import { JobListItem } from "@/types/jobs";

const POPULAR_SEARCHES = [
  "Software engineer",
  "Product manager",
  "Data analyst",
  "Designer",
  "Marketing",
  "Customer success",
  "Product designer",
  "Sales",
  "Remote Jobs",
];

interface HeroProps {
  initialJobs?: JobListItem[];
}

export function Hero({ initialJobs }: HeroProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const { scrollYProgress: copyScrollProgress } = useScroll({
    target: copyRef,
    offset: ["start start", "end start"],
  });

  const copyScale = useTransform(copyScrollProgress, [0, 0.8], [1, 0.94]);
  const copyOpacity = useTransform(copyScrollProgress, [0, 0.75], [1, 0.3]);
  const copyY = useTransform(copyScrollProgress, [0, 0.8], [0, -30]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    const trimmedLocation = location.trim();
    if (!trimmedKeyword && !trimmedLocation) return;

    const params = new URLSearchParams();
    if (trimmedKeyword) params.set("keyword", trimmedKeyword);
    if (trimmedLocation) params.set("city", trimmedLocation);
    router.push(`/jobs?${params.toString()}`);
  };

  const handlePopularSearch = (term: string) => {
    router.push(`/jobs?keyword=${encodeURIComponent(term)}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip pt-[var(--hero-top)] [--hero-top:3rem] [--header-height:3.75rem] [--video-height:500px] sm:[--hero-top:2.75rem] sm:[--header-height:4.5rem] sm:[--video-height:530px] md:[--hero-top:3.25rem] md:[--video-height:560px] lg:[--hero-top:4.5rem] lg:[--header-height:4.75rem] lg:[--video-height:620px] xl:[--video-height:660px] 2xl:[--video-height:700px]"
    >
      {/* Background bottom edge fade */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* HERO COPY TEXT SECTION */}
      <div className="relative z-0 flex min-h-0 lg:min-h-[calc(100svh_-_var(--header-height)_-_var(--hero-top)_-_var(--video-height)*0.2)] items-center justify-center px-4 sm:px-6 lg:px-8 pb-3 sm:pb-8 lg:pb-12">
        <motion.div
          ref={copyRef}
          style={
            reducedMotion
              ? {}
              : {
                scale: copyScale,
                opacity: copyOpacity,
                y: copyY,
              }
          }
          className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center will-change-transform pb-2 sm:pb-4 lg:pb-8"
        >
          {/* Headline */}
          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: reducedMotion ? 0 : 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-balance text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.1] tracking-tight"
          >
            <span className="text-slate-900 dark:text-white">Job Hunting in </span>
            <span className="text-slate-900 dark:text-white font-normal">Seconds</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-slate-900 dark:text-slate-400 leading-relaxed font-normal"
          >
            Swipe, match, and connect with employers instantly
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 w-full max-w-4xl lg:max-w-5xl px-4 sm:px-0"
          >
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl sm:rounded-full border border-border/60 bg-white dark:bg-slate-900 shadow-lg shadow-black/5 p-2"
            >
              {/* Job title input */}
              <div className="flex flex-1 items-center gap-2.5 px-4 py-3 sm:py-2">
                <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title, keywords or company"
                  className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none"
                />
              </div>

              {/* Horizontal divider on mobile / vertical on desktop */}
              <div className="block sm:hidden h-px bg-border/60 mx-4" aria-hidden="true" />
              <div className="hidden sm:block w-px bg-border/60 my-2" aria-hidden="true" />

              {/* Location input */}
              <div className="flex flex-1 items-center gap-2.5 px-4 py-3 sm:py-2">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={`City, state or "Remote"`}
                  className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="mt-2 sm:mt-0 shrink-0 rounded-xl sm:rounded-full bg-[#15803D] hover:bg-[#166534] active:bg-green-500 px-7 py-3 sm:py-2.5 text-sm font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-yellow-400/50 w-full sm:w-auto cursor-pointer"
              >
                Search
              </button>
            </form>
          </motion.div>

          {/* Popular Searches */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6 flex flex-col items-center gap-2 sm:gap-3 px-2 sm:px-0"
          >
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">Popular searches</p>
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 w-full max-w-[340px] xs:max-w-[420px] sm:max-w-xl mx-auto">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handlePopularSearch(term)}
                  className="rounded-full border border-border/70 bg-white dark:bg-slate-900 px-2.5 xs:px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] xs:text-[11.5px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors hover:border-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-95 shrink-0 shadow-xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* HERO SHOWCASE BANNER */}
      <div className="relative mx-auto w-full max-w-9xl px-4 sm:px-10 lg:px-16 xl:px-20 pb-10 sm:pb-16">
        <HeroVideoCard initialJobs={initialJobs} className="w-full min-h-[var(--video-height)] lg:h-[var(--video-height)]" />
      </div>
    </section>
  );
}