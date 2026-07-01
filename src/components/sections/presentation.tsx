"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, RefreshCw, Star, Quote, Sparkles, UserCheck, Check, MapPin, Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

// Review structure & data
interface Review {
  id: number;
  author: string;
  role: string;
  company: string;
  avatarInitials: string;
  avatarUrl: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Priya Sharma",
    role: "VP of People",
    company: "DevFlow",
    avatarInitials: "PS",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "The swipe mechanism is a game-changer. We connected with our lead engineer in just two days.",
  },
  {
    id: 2,
    author: "Arjun Mehta",
    role: "Co-Founder",
    company: "LinearQ",
    avatarInitials: "AM",
    avatarUrl: "https://randomuser.me/api/portraits/men/43.jpg",
    rating: 5,
    text: "No more scanning hundreds of resumes. Hirance filters out the noise so we only talk to the best matches.",
  },
  {
    id: 3,
    author: "Ananya Reddy",
    role: "Head of Talent",
    company: "Aether AI",
    avatarInitials: "AR",
    avatarUrl: "https://randomuser.me/api/portraits/women/26.jpg",
    rating: 5,
    text: "Matches are spot-on. Candidates are actually responsive, and the process is incredibly smooth.",
  },
];

// Helper Counter component for animating stats
function Counter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let frameId: number;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.min(Math.floor(easeProgress * end), end);

      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount);
      }
    };

    frameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(frameId);
  }, [value, inView, duration]);

  return <span ref={ref}>{count}</span>;
}

// Mobile-app style swipe simulator — job cards swipe right to apply
function SwipeSimulator() {
  const [cardIndex, setCardIndex] = useState(0);
  const [swipeState, setSwipeState] = useState<"idle" | "swiping" | "matched">("idle");

  const jobs = [
    { title: "Product Designer", company: "DevFlow", location: "Remote", type: "Full-time", salary: "$120k–150k", match: "98%" },
    { title: "Fullstack Engineer", company: "LinearQ", location: "Berlin", type: "Hybrid", salary: "$130k–160k", match: "95%" },
    { title: "DevOps Architect", company: "Aether AI", location: "Remote", type: "Contract", salary: "$140k–175k", match: "97%" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSwipeState("swiping");

      setTimeout(() => {
        setSwipeState("matched");
      }, 700);

      setTimeout(() => {
        setSwipeState("idle");
        setCardIndex((prev) => (prev + 1) % jobs.length);
      }, 2100);
    }, 3800);

    return () => clearInterval(interval);
  }, [jobs.length]);

  const current = jobs[cardIndex];
  const next = jobs[(cardIndex + 1) % jobs.length];

  const renderCard = (j: typeof jobs[number]) => (
    <div className="flex h-full flex-col p-2">
      {/* Company badge + match */}
      <div className="flex items-center justify-between">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/10 text-[9px] font-extrabold text-brand-600">
          {j.company.slice(0, 2).toUpperCase()}
        </div>
        <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[7px] font-bold text-white shadow-sm">
          {j.match} Match
        </span>
      </div>

      {/* Title + company */}
      <div className="mt-1.5">
        <h4 className="text-[10px] font-bold leading-tight text-foreground">{j.title}</h4>
        <p className="truncate text-[8px] font-medium text-muted-foreground">{j.company}</p>
      </div>

      {/* Details */}
      <div className="mt-1.5 space-y-0.5">
        <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
          <MapPin className="h-2 w-2 shrink-0 text-brand-500" />
          <span className="truncate">{j.location}</span>
        </div>
        <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
          <Clock className="h-2 w-2 shrink-0 text-brand-500" />
          <span className="truncate">{j.type}</span>
        </div>
        <div className="flex items-center gap-1 text-[8px] font-semibold text-foreground/80">
          <Wallet className="h-2 w-2 shrink-0 text-brand-500" />
          <span className="truncate">{j.salary}</span>
        </div>
      </div>

      {/* Pass / Apply actions */}
      <div className="mt-auto flex items-center justify-center gap-2.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-red-200 bg-red-50 text-[8px] text-red-500 dark:border-red-900/40 dark:bg-red-950/30">✕</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-green-200 bg-green-50 text-[9px] text-green-500 dark:border-green-900/40 dark:bg-green-950/30">💚</span>
      </div>
    </div>
  );

  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-border/40 bg-secondary/30">
      {/* Phone frame */}
      <div className="relative h-[11rem] w-[7.5rem] rounded-[1.4rem] border-[3px] border-foreground/80 bg-card p-1 shadow-xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-1 z-30 h-1 w-8 -translate-x-1/2 rounded-full bg-foreground/70" />

        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-background">
          {/* Preview / next card behind */}
          <motion.div
            initial={false}
            animate={
              swipeState === "idle"
                ? { scale: 0.92, y: 6, opacity: 0.7 }
                : { scale: 1, y: 0, opacity: 1 }
            }
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 overflow-hidden rounded-[1.1rem]"
          >
            {renderCard(next)}
          </motion.div>

          {/* Current card — swipes right */}
          <motion.div
            animate={
              swipeState === "swiping" || swipeState === "matched"
                ? { x: "120%", rotate: 12, opacity: 0 }
                : { x: 0, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 select-none overflow-hidden rounded-[1.1rem] bg-card"
          >
            {/* "APPLY" stamp appears as the card swipes right */}
            <motion.span
              animate={{ opacity: swipeState === "idle" ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute left-2 top-2 z-10 -rotate-12 rounded-md border-2 border-green-500 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-green-500"
            >
              Apply
            </motion.span>
            {renderCard(current)}
          </motion.div>

          {/* Match overlay fills the screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={swipeState === "matched" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-brand-600/95 text-center text-white backdrop-blur-[1px] dark:bg-brand-700/95"
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={swipeState === "matched" ? { scale: 1 } : { scale: 0.6 }}
              transition={{ type: "spring", stiffness: 240, damping: 13 }}
              className="mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm shadow-lg"
            >
              💚
            </motion.div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Applied!</span>
            <span className="mt-0.5 px-2 text-[8px] leading-tight opacity-80">Application sent to employer</span>
          </motion.div>
        </div>
      </div>

      {/* Rightward swipe motion cue */}
      <motion.div
        aria-hidden
        animate={{ x: [-4, 6, -4], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-3 right-3 text-brand-500"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </div>
  );
}

// Drifting/Floating tags component for categories
function DriftingBadges() {
  const categoryTags = [
    "Product Design", "React Engineer", "AI Researcher",
    "DevOps Architect", "Growth Marketing", "iOS Developer",
    "QA Specialist", "Sales Lead", "Data Scientist",
    "Backend Engineer", "UX Researcher", "Product Manager",
    "Cloud Architect", "ML Engineer", "Content Strategist",
    "Android Developer", "Cybersecurity", "Finance Analyst",
    "HR Business Partner", "Customer Success", "Technical Writer",
    "Motion Designer", "Blockchain Dev", "SRE Engineer",
  ];

  const half = Math.ceil(categoryTags.length / 2);
  const row1 = categoryTags.slice(0, half);
  const row2 = categoryTags.slice(half);

  return (
    <div className="relative flex h-48 w-full flex-col justify-center gap-2.5 overflow-hidden rounded-2xl border border-border/40 bg-secondary/30 p-4">
      {/* Row 1 */}
      <div className="flex w-max animate-[marquee_28s_linear_infinite] justify-start gap-2">
        {[...row1, ...row1].map((tag, idx) => (
          <span
            key={`tag-r1-${idx}`}
            className="whitespace-nowrap rounded-full border border-border/80 bg-card/65 px-3 py-1.5 text-xs font-semibold text-foreground/80 shadow-sm transition-all hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex w-max animate-[marquee_22s_linear_infinite_reverse] justify-start gap-2">
        {[...row2, ...row2].map((tag, idx) => (
          <span
            key={`tag-r2-${idx}`}
            className="whitespace-nowrap rounded-full border border-border/80 bg-card/65 px-3 py-1.5 text-xs font-semibold text-foreground/80 shadow-sm transition-all hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Successful hires visual — a stack of hired candidate avatars with a success pulse
function HiredVisual() {
  const hires = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/76.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/51.jpg",
  ];

  return (
    <div className="relative flex h-48 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border/40 bg-secondary/30 p-4">
      {/* Overlapping avatar stack */}
      <div className="flex items-center">
        {hires.map((src, idx) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
            style={{ zIndex: hires.length - idx }}
            className="relative -ml-3 first:ml-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Hired candidate"
              loading="lazy"
              decoding="async"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-card shadow-sm"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-success-500 ring-2 ring-card">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
          </motion.div>
        ))}
        <div className="z-10 -ml-3 flex h-11 w-11 items-center justify-center rounded-full border border-brand-500/20 bg-brand-500/10 text-xs font-bold text-brand-600 ring-2 ring-card">
          +20K
        </div>
      </div>

      {/* Animated "just hired" pulse chip */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-success-500/20 bg-success-50 px-3 py-1.5 text-xs font-semibold text-success-600 shadow-sm dark:bg-success-500/10"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" />
        </span>
        New hire made just now
      </motion.div>
    </div>
  );
}

// A single high-impact stat / showcase card
function ShowcaseCard({
  icon: Icon,
  label,
  value,
  suffix,
  title,
  description,
  children,
  index,
  inView,
}: {
  icon: typeof Briefcase;
  label: string;
  value: number;
  suffix: string;
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col gap-5 rounded-3xl border border-border/60 bg-card/45 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-brand-500/25 hover:shadow-[0_16px_36px_-6px_rgba(59,130,246,0.08)] sm:p-7"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-brand-500/10 bg-brand-500/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-500">
          {label}
        </span>
      </div>

      <div>
        <h3 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          <Counter value={value} />
          {suffix}
        </h3>
        <p className="mt-1 text-sm font-bold text-foreground/90">{title}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {/* Visual demo pinned to the bottom so both cards align */}
      <div className="mt-auto pt-1">{children}</div>
    </motion.div>
  );
}

function ReviewCard({ review, index, inView }: { review: Review; index: number; inView: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-card/45 p-6 shadow-[0_2px_8px_rgba(15,23,42,0.02)] backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-brand-500/25 hover:bg-card/75 hover:shadow-[0_16px_36px_-6px_rgba(59,130,246,0.12)]"
      )}
    >
      {/* Top row with stars and quote icon */}
      <div className="flex items-start justify-between">
        <div className="flex gap-0.5">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-brand-500 text-brand-500" />
          ))}
        </div>
        <Quote className="h-7 w-7 fill-brand-500/15 text-brand-500/50 transition-colors group-hover:text-brand-500/70" />
      </div>

      {/* Review body */}
      <p className="text-sm font-medium italic leading-relaxed text-foreground/80 md:text-base">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer Details — pinned to the bottom so all cards align */}
      <div className="mt-auto flex items-center gap-3 border-t border-border/30 pt-4">
        {imgFailed ? (
          <div className="flex h-9 w-9 shrink-0 place-items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white shadow-inner">
            {review.avatarInitials}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.avatarUrl}
            alt={`${review.author} portrait`}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="h-9 w-9 shrink-0 rounded-full object-cover shadow-inner ring-1 ring-border/50"
          />
        )}
        <div className="overflow-hidden">
          <h4 className="truncate text-xs font-bold text-foreground">{review.author}</h4>
          <p className="text-[10px] font-semibold text-muted-foreground">
            {review.role} at <span className="font-semibold text-brand-600 dark:text-brand-400">{review.company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Presentation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const isReviewsInView = useInView(reviewsRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="stats-reviews"
      className="relative overflow-hidden border-t border-border/30 pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      {/* Ambient glowing washes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 h-[25rem] w-[25rem] rounded-full bg-sky-400/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            Real Impact, In Real Time
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
          >
            Powering <span className="text-gradient">Smarter Hiring</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 text-pretty text-base text-muted-foreground/90 sm:text-lg"
          >
            Helping companies and candidates connect faster every day.
          </motion.p>
        </div>

        {/* Showcase stat cards — equal height, evenly aligned */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
        >
          <ShowcaseCard
            icon={Briefcase}
            label="Global Roles"
            value={80}
            suffix="+"
            title="Job Categories"
            description="Opportunities across technology, design, operations, marketing, and leadership fields."
            index={0}
            inView={isStatsInView}
          >
            <DriftingBadges />
          </ShowcaseCard>

          <ShowcaseCard
            icon={RefreshCw}
            label="Active Matching"
            value={200}
            suffix="K+"
            title="Candidate Swipes"
            description="High-intent decisions made daily by quality employers and active job seekers."
            index={1}
            inView={isStatsInView}
          >
            <SwipeSimulator />
          </ShowcaseCard>

          <ShowcaseCard
            icon={UserCheck}
            label="Real Outcomes"
            value={20}
            suffix="K+"
            title="Successful Hires"
            description="Candidates matched, interviewed, and hired into roles they love through Hirance."
            index={2}
            inView={isStatsInView}
          >
            <HiredVisual />
          </ShowcaseCard>
        </div>

        {/* Testimonials */}
        <div ref={reviewsRef} className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Employer Testimonials
            </h3>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              What scaling companies are saying about our match mechanism.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, idx) => (
              <ReviewCard key={review.id} review={review} index={idx} inView={isReviewsInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
