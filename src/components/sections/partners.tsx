"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  companies,
  hueFromName,
  initials,
  type Company,
} from "@/config/companies";
import { cn } from "@/lib/utils";

/** A single company shown as a sleek logo card with custom hover glow. */
function CompanyCard({ company }: { company: Company }) {
  const [failed, setFailed] = useState(false);
  const hue = hueFromName(company.name);

  // Compute brand-specific glow colors based on deterministic hue
  const hoverShadowColor = `hsla(${hue}, 85%, 55%, 0.18)`;
  const hoverBorderColor = `hsla(${hue}, 75%, 50%, 0.4)`;

  return (
    <div
      className={cn(
        "group/card relative flex shrink-0 items-center gap-5 rounded-full pl-4 pr-8 h-20",
        "border border-border/60 bg-card/45 backdrop-blur-md",
        "shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1 hover:scale-[1.04]",
        "hover:border-[var(--hover-border-color)] hover:bg-card/90",
        "hover:shadow-[0_16px_36px_-6px_var(--hover-shadow-color)]"
      )}
      style={{
        "--hover-shadow-color": hoverShadowColor,
        "--hover-border-color": hoverBorderColor,
      } as React.CSSProperties}
    >
      {/* Shine Reflection Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <div className="absolute top-0 left-0 h-full w-[45%] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 group-hover/card:animate-[card-shine_0.85s_ease-out_forwards]" />
      </div>

      <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-transform duration-500 group-hover/card:scale-105">
        {failed ? (
          <span
            aria-hidden
            className="grid h-full w-full place-items-center text-base font-bold text-white rounded-full"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${hue} 75% 55%), hsl(${
                (hue + 40) % 360
              } 75% 45%))`,
            }}
          >
            {initials(company.name)}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={company.logoUrl}
            alt={`${company.name} logo`}
            loading="lazy"
            decoding="async"
            className="h-9 w-9 object-contain transition-transform duration-500 group-hover/card:scale-110"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className="whitespace-nowrap text-lg font-semibold text-foreground/90 transition-colors group-hover/card:text-foreground">
        {company.name}
      </span>
    </div>
  );
}

interface MarqueeRowProps {
  items: Company[];
  /** Seconds for one full loop. Lower = faster. */
  duration: number;
  /** "ltr" scrolls left→right, "rtl" scrolls right→left. */
  direction: "ltr" | "rtl";
}

const rowVariants: Variants = {
  hidden: (direction: "ltr" | "rtl") => ({
    opacity: 0,
    x: direction === "ltr" ? -80 : 80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 45,
      damping: 14,
    },
  },
};

function MarqueeRow({ items, duration, direction }: MarqueeRowProps) {
  // Duplicate the set once so the -50% translate loops seamlessly.
  const track = [...items, ...items];

  return (
    <motion.div
      custom={direction}
      variants={rowVariants}
      className="marquee-group marquee-mask relative flex overflow-hidden py-6"
    >
      <div
        className="animate-marquee flex w-max gap-6 pr-6"
        style={
          {
            "--marquee-duration": `${duration}s`,
            // keyframe moves 0 → -50% (rtl). `reverse` plays it backwards (ltr).
            "--marquee-direction": direction === "ltr" ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {track.map((company, i) => (
          <CompanyCard key={`${company.name}-${i}`} company={company} />
        ))}
      </div>
    </motion.div>
  );
}

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  // Split into two distinct rows.
  const half = Math.ceil(companies.length / 2);
  const row1 = companies.slice(0, half);
  const row2 = companies.slice(half);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // 1. Reveal header elements on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Slide the marquee rows in opposite directions on scroll scrub
      const rows = rowsRef.current;
      if (!rows) return;

      const ltrRow = rows.querySelector(".row-ltr-wrap");
      const rtlRow = rows.querySelector(".row-rtl-wrap");

      if (ltrRow) {
        gsap.fromTo(
          ltrRow,
          { x: -120, opacity: 0.5 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: rows,
              start: "top 95%",
              end: "top 55%",
              scrub: 1.2,
            },
          }
        );
      }

      if (rtlRow) {
        gsap.fromTo(
          rtlRow,
          { x: 120, opacity: 0.5 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: rows,
              start: "top 95%",
              end: "top 55%",
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-32"
      aria-labelledby="partners-heading"
    >
      {/* Ambient wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute left-1/2 top-10 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[150px]" />
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto mb-20 max-w-6xl px-6 text-center"
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
          </span>
          Trusted by top teams
        </span>

        <h2
          id="partners-heading"
          className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
        >
          Trusted by <span className="text-gradient">100+ leading companies</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground/90 sm:text-lg">
          From fast-growing startups to established giants, we help build and scale high-performing teams.
        </p>
      </div>

      {/* Scrolling rows */}
      <div
        ref={rowsRef}
        className="flex flex-col gap-2 overflow-hidden"
      >
        {/* Row 1 — left to right */}
        <div className="row-ltr-wrap will-change-transform">
          <MarqueeRow items={row1} duration={38} direction="ltr" />
        </div>
        {/* Row 2 — right to left */}
        <div className="row-rtl-wrap will-change-transform">
          <MarqueeRow items={row2} duration={38} direction="rtl" />
        </div>
      </div>
    </section>
  );
}
