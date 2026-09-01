"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface CandidateCTAProps {
  onFindJobs?: () => void;
  className?: string;
}

const DECK_CARDS = [
  {
    id: "card-1",
    title: "Senior React Developer",
    company: "Airation Softtech",
    match: "96%",
    tags: ["React", "Node", "TypeScript"],
    color: "from-cyan-400 to-blue-600",
    dir: 1, // swipe right (APPLY)
    stamp: "APPLY",
  },
  {
    id: "card-2",
    title: "Product Designer",
    company: "Nova Studios",
    match: "88%",
    tags: ["Figma", "UI/UX", "Design System"],
    color: "from-indigo-400 to-purple-600",
    dir: -1, // swipe left (SKIP)
    stamp: "SKIP",
  },
  {
    id: "card-3",
    title: "Full Stack Engineer",
    company: "Nexus Cloud Systems",
    match: "94%",
    tags: ["Next.js", "GraphQL", "Tailwind"],
    color: "from-emerald-400 to-teal-600",
    dir: 1, // swipe right (APPLY)
    stamp: "APPLY",
  },
  {
    id: "card-4",
    title: "Growth Marketer",
    company: "ScaleFlow India",
    match: "91%",
    tags: ["SEO", "Performance", "Analytics"],
    color: "from-amber-400 to-orange-600",
    dir: 1, // swipe right (APPLY)
    stamp: "APPLY",
  },
];

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      aria-hidden="true"
      role="img"
    >
      <path
        fill="#00D3FF"
        d="M47 24.6c-5.2 5.6-8.3 14.2-8.3 25.4v412c0 11.2 3.1 19.8 8.3 25.4l1.4 1.3 230.9-230.9v-5.4L48.4 23.4 47 24.6z"
      />
      <path
        fill="#00F076"
        d="M356.4 343.9l-77-77v-5.4l77-77 1.7 1 91.2 51.8c26 14.8 26 39 0 53.8l-91.2 51.8-1.7 1z"
      />
      <path
        fill="#FFD900"
        d="M358.1 342.9l-78.7-78.7L47 497.3c8.6 9.1 22.7 10.2 38.7 1.1l272.4-155.5z"
      />
      <path
        fill="#F43249"
        d="M358.1 185.5L85.7 30C69.7 20.9 55.6 22 47 31.1l232.4 232.4 78.7-78z"
      />
    </svg>
  );
}

function CardContent({ card }: { card: (typeof DECK_CARDS)[number] }) {
  return (
    <div className="h-full flex flex-col justify-between select-none">
      <div>
        {/* Card Header Placeholder */}
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "w-9 h-9 rounded-xl shadow-xs shrink-0 flex items-center justify-center text-white font-black text-xs bg-gradient-to-br",
              card.color
            )}
          >
            {card.company.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white leading-tight truncate">
              {card.title}
            </p>
            <p className="text-[10px] text-white/70 truncate">{card.company}</p>
          </div>
        </div>

        {/* Match Percentage Pill */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-400/20 px-2.5 py-1 border border-emerald-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
          <span className="font-mono-hi text-[10px] font-extrabold text-emerald-200">
            {card.match} MATCH
          </span>
        </div>

        {/* Content Wireframe Bars */}
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded-full bg-white/15" />
          <div className="h-2 w-4/5 rounded-full bg-white/15" />
          <div className="h-2 w-2/3 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Role Tags */}
      <div className="flex gap-1.5 flex-wrap">
        {card.tags.map((t) => (
          <span
            key={t}
            className="text-[9.5px] font-medium px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/10"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CandidateCTA({ onFindJobs, className }: CandidateCTAProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [isSwiping, setIsSwiping] = React.useState(false);

  React.useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setIsSwiping(true);
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % DECK_CARDS.length);
        setIsSwiping(false);
      }, 550);

      return () => clearTimeout(timer);
    }, 2800);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  const topCard = DECK_CARDS[index];
  const nextCard = DECK_CARDS[(index + 1) % DECK_CARDS.length];
  const thirdCard = DECK_CARDS[(index + 2) % DECK_CARDS.length];

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16 text-white",
        "border border-white/15 shadow-2xl shadow-sky-950/30",
        className
      )}
      style={{
        background:
          "linear-gradient(135deg, #0284C7 0%, #0369A1 55%, #0B1528 100%)",
      }}
      data-testid="candidate-cta-section"
    >
      {/* Background Decorative Ambient Aura */}
      <div
        className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-cyan-400/20 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-sky-400/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Synchronized Swiping Glass Card Deck on Right Side */}
      <div
        className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 w-[220px] sm:w-[240px] h-[290px] sm:h-[310px] pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        {/* 3rd Card (Deepest Stack Layer) */}
        <motion.div
          key={`third-${thirdCard.id}`}
          className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xs p-5"
          style={{ zIndex: 10 }}
          animate={{
            scale: isSwiping ? 0.95 : 0.9,
            y: isSwiping ? 6 : 14,
            opacity: isSwiping ? 0.65 : 0.4,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <CardContent card={thirdCard} />
        </motion.div>

        {/* 2nd Card (Middle Stack Layer -> Steps up to Top) */}
        <motion.div
          key={`next-${nextCard.id}`}
          className="absolute inset-0 rounded-3xl border border-white/15 bg-white/[0.07] backdrop-blur-sm p-5 shadow-md"
          style={{ zIndex: 20 }}
          animate={{
            scale: isSwiping ? 1 : 0.95,
            y: isSwiping ? 0 : 7,
            opacity: isSwiping ? 1 : 0.8,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <CardContent card={nextCard} />
        </motion.div>

        {/* Top Card (Top Active Layer -> Swipes out smoothly) */}
        <motion.div
          key={`top-${topCard.id}-${index}`}
          className="absolute inset-0 rounded-3xl border border-white/25 bg-white/[0.11] backdrop-blur-md p-5 shadow-2xl"
          style={{ zIndex: 30 }}
          animate={
            reducedMotion
              ? { x: 0, rotate: 0, opacity: 1 }
              : {
                  x: isSwiping ? topCard.dir * 320 : 0,
                  rotate: isSwiping ? topCard.dir * 18 : 0,
                  opacity: isSwiping ? 0 : 1,
                  scale: isSwiping ? 0.96 : 1,
                }
          }
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <CardContent card={topCard} />

          {/* Swipe Verdict Stamp (APPLY / SKIP) */}
          {!reducedMotion && isSwiping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute top-5 border-2 font-black text-sm px-3 py-0.5 rounded-xl select-none uppercase tracking-wider shadow-lg",
                topCard.dir === 1
                  ? "left-4 text-emerald-300 border-emerald-400 bg-emerald-950/80 shadow-emerald-500/20 -rotate-12"
                  : "right-4 text-rose-300 border-rose-400 bg-rose-950/80 shadow-rose-500/20 rotate-12"
              )}
            >
              {topCard.stamp}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Main Left Content */}
      <div className="relative z-10 max-w-xl text-left">
        {/* Heading */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-balance text-white">
          Your Next Opportunity <br className="hidden sm:inline" />
          Is Waiting.
        </h3>

        {/* Subtext */}
        <p className="mt-3.5 text-base sm:text-lg text-white/85 leading-relaxed text-pretty">
          Swipe through jobs. Apply in seconds. Get hired faster.
        </p>

        {/* Action Row: Find Jobs & Google Play */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
          {onFindJobs ? (
            <button
              type="button"
              onClick={onFindJobs}
              data-testid="candidate-cta-find-jobs-button"
              className="group flex items-center justify-center gap-2.5 font-bold text-[#060c18] bg-white hover:bg-slate-100 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Find Jobs</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          ) : (
            <Link
              href="/jobs"
              data-testid="candidate-cta-find-jobs-button"
              className="group flex items-center justify-center gap-2.5 font-bold text-[#060c18] bg-white hover:bg-slate-100 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Find Jobs</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}

          {/* Google Play Button */}
          <a
            href={siteConfig.links.playStore}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Hirance on Google Play Store"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 px-5 sm:px-6 py-2.5 sm:py-3 text-left text-white shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <GooglePlayIcon className="h-5 w-5 shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="text-[9px] uppercase tracking-wider text-white/70">
                Get it on
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5">
                Google Play
              </span>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default CandidateCTA;
