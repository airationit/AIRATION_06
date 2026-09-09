"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  UserCheck,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Footer, InteractiveDots } from "@/components/shared";
import { siteConfig } from "@/config/site";

export type RoleFilter = "all" | "candidate" | "employer";

export interface FeedbackItem {
  id: string;
  name: string;
  role: "candidate" | "employer";
  designation: string;
  company?: string;
  rating: number;
  headline: string;
  comment: string;
  date: string;
  verified: boolean;
  avatarColor: string;
}

// Authentic dummy user reviews for candidates and employers
// Ready to be replaced or augmented with a backend feedback API later
export const DUMMY_FEEDBACKS: FeedbackItem[] = [
  {
    id: "fb-1",
    name: "Aarav Sharma",
    role: "candidate",
    designation: "Full Stack Developer",
    company: "Airation Tech",
    rating: 5,
    headline: "No 5-page forms. Applied in 1 swipe and closed my offer!",
    comment:
      "Traditional job boards feel like a black hole. With Hirance, I saw my AI match percentage, swiped right, and had an interview scheduled the very next afternoon.",
    date: "3 days ago",
    verified: true,
    avatarColor: "from-blue-600 to-indigo-600",
  },
  {
    id: "fb-2",
    name: "Priya Nair",
    role: "employer",
    designation: "Head of Talent Acquisition",
    company: "ScaleFlow Systems",
    rating: 5,
    headline: "Posted our requirement in 60 seconds, hired in 4 days.",
    comment:
      "The 60-second job post flow is unbeatable. We received pre-scored matching profiles without sifting through hundreds of irrelevant resumes. A game changer for startup hiring.",
    date: "5 days ago",
    verified: true,
    avatarColor: "from-sky-600 to-cyan-600",
  },
  {
    id: "fb-3",
    name: "Vikram Malhotra",
    role: "candidate",
    designation: "UI/UX Product Designer",
    company: "Nova Digital",
    rating: 5,
    headline: "Finally, a hiring app built for the mobile generation.",
    comment:
      "The card swiping interface makes discovering design roles effortless. You instantly see key tech stacks, salary clarity, and team details without any fluff.",
    date: "1 week ago",
    verified: true,
    avatarColor: "from-indigo-600 to-violet-600",
  },
  {
    id: "fb-4",
    name: "Siddharth Verma",
    role: "employer",
    designation: "Engineering Director",
    company: "Nexus Cloud",
    rating: 5,
    headline: "Filtered signal from noise instantly.",
    comment:
      "Matching candidate skill-sets directly to our stack saved our tech leads over 15 hours of initial screening time in just our first hiring sprint.",
    date: "1 week ago",
    verified: true,
    avatarColor: "from-blue-700 to-sky-600",
  },
  {
    id: "fb-5",
    name: "Ananya Iyer",
    role: "candidate",
    designation: "DevOps & Cloud Engineer",
    company: "CloudScale India",
    rating: 5,
    headline: "Direct responses instead of waiting weeks in silence.",
    comment:
      "Got matched with high-growth startups looking specifically for AWS and Kubernetes experience. The transparency on Hirance is unmatched.",
    date: "2 weeks ago",
    verified: true,
    avatarColor: "from-teal-600 to-emerald-600",
  },
  {
    id: "fb-6",
    name: "Karan Patel",
    role: "employer",
    designation: "Founder & CEO",
    company: "FinEdge Labs",
    rating: 5,
    headline: "Best hiring platform for high-velocity startup teams.",
    comment:
      "We closed 2 backend engineering positions within a week of posting. Candidates are responsive, verified, and well-aligned with the role expectations.",
    date: "2 weeks ago",
    verified: true,
    avatarColor: "from-cyan-600 to-blue-600",
  },
  {
    id: "fb-7",
    name: "Neha Gupta",
    role: "candidate",
    designation: "Product Growth Specialist",
    company: "GrowFast Media",
    rating: 5,
    headline: "Match scores actually reflect real skills.",
    comment:
      "Loved seeing my match percentage on every job card before deciding. It gives you confidence that employers are genuinely interested in your exact profile.",
    date: "3 weeks ago",
    verified: true,
    avatarColor: "from-indigo-600 to-blue-500",
  },
  {
    id: "fb-8",
    name: "Rajesh Kulkarni",
    role: "employer",
    designation: "HR Lead",
    company: "Apex Infotech",
    rating: 5,
    headline: "Zero spam applicants. High response rate.",
    comment:
      "Unlike conventional job portals where 90% of applicants don't match criteria, Hirance delivers verified, high-intent candidates ready to connect.",
    date: "1 month ago",
    verified: true,
    avatarColor: "from-blue-600 to-teal-600",
  },
];

export function FeedbackContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [activeFilter, setActiveFilter] = useState<RoleFilter>("all");
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(DUMMY_FEEDBACKS);

  // Sync tab with URL query parameter (?role=candidate or ?role=employer)
  useEffect(() => {
    if (roleParam === "candidate") {
      setActiveFilter("candidate");
    } else if (roleParam === "employer") {
      setActiveFilter("employer");
    } else {
      setActiveFilter("all");
    }
  }, [roleParam]);

  const filteredFeedbacks = feedbacks.filter((item) => {
    if (activeFilter === "all") return true;
    return item.role === activeFilter;
  });

  const candidateCount = feedbacks.filter((f) => f.role === "candidate").length;
  const employerCount = feedbacks.filter((f) => f.role === "employer").length;

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Dynamic interactive background canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.15),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-3 text-base font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase sm:text-lg"
          >
            USER FEEDBACK & REVIEWS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
          >
            Real Stories from{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Candidates & Employers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 text-base font-bold tracking-wide text-foreground sm:text-xl"
          >
            Swipe. Match. Get Hired.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Discover how candidates land dream roles in seconds and how fast-growing companies hire verified talent with zero spam.
          </motion.p>
        </div>
      </section>

      {/* Metrics / Key Stats Strip (Clean, No Excessive Cards) */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 rounded-3xl border border-border/80 bg-card/60 p-6 sm:grid-cols-4 sm:p-8 backdrop-blur-md shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                4.8
              </span>
              <Star className="h-5 w-5 fill-amber-400 text-amber-400 shrink-0" />
            </div>
            <span className="mt-1 text-xs text-muted-foreground font-medium">
              Average User Rating
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
              &lt; 48 hrs
            </span>
            <span className="mt-1 text-xs text-muted-foreground font-medium">
              Average Time to Match
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
              94%
            </span>
            <span className="mt-1 text-xs text-muted-foreground font-medium">
              Match Accuracy Rate
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
              100%
            </span>
            <span className="mt-1 text-xs text-muted-foreground font-medium">
              Verified Roles & Profiles
            </span>
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs Section */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-bold text-foreground">Filter by:</span>
          </div>

          <div className="flex items-center gap-2">
            {/* All Reviews */}
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-card/70 border border-border/70 text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
              }`}
            >
              All Feedback ({feedbacks.length})
            </button>

            {/* Candidate Feedback */}
            <button
              type="button"
              onClick={() => setActiveFilter("candidate")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === "candidate"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-card/70 border border-border/70 text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Candidates ({candidateCount})</span>
            </button>

            {/* Employer Feedback */}
            <button
              type="button"
              onClick={() => setActiveFilter("employer")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === "employer"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-card/70 border border-border/70 text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>Employers ({employerCount})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredFeedbacks.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/85 p-6 sm:p-7 shadow-lg shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  {/* Top Row: User Avatar, Name & Role Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar initial */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.avatarColor} text-white font-bold text-base shadow-sm`}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-base font-bold text-foreground leading-tight">
                            {item.name}
                          </h2>
                          {item.verified && (
                            <CheckCircle2
                              className="h-4 w-4 text-blue-500 fill-blue-500/15 shrink-0"
                              aria-label="Verified user"
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.designation}
                          {item.company ? ` • ${item.company}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* Role Indicator Badge */}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        item.role === "candidate"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                      }`}
                    >
                      {item.role === "candidate" ? (
                        <>
                          <UserCheck className="h-3 w-3" />
                          <span>Candidate</span>
                        </>
                      ) : (
                        <>
                          <Building2 className="h-3 w-3" />
                          <span>Employer</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Star Rating Row */}
                  <div className="mt-4 flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review Headline & Text */}
                  <h3 className="mt-3 text-base font-bold text-foreground leading-snug">
                    &ldquo;{item.headline}&rdquo;
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.comment}
                  </p>
                </div>

                {/* Footer Meta: Date & Verified Feedback */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Verified Hirance User</span>
                  <time>{item.date}</time>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Bottom Dual-Audience CTA Section */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Candidate CTA Card */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-card to-card p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
              <Sparkles className="h-4 w-4" />
              <span>For Job Seekers</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-foreground tracking-tight">
              Ready to find your next role in seconds?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Download the Hirance Android app and discover verified jobs tailored to your tech stack.
            </p>
            <div className="mt-6">
              <a
                href={siteConfig.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Get Hirance on Google Play</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Employer CTA Card */}
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-card to-card p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs sm:text-sm">
              <Building2 className="h-4 w-4" />
              <span>For Employers</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-foreground tracking-tight">
              Hire pre-screened talent in 60 seconds.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Post jobs with instant AI match scoring and connect directly with high-intent candidates.
            </p>
            <div className="mt-6">
              <a
                href={siteConfig.links.employer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground hover:bg-foreground/90 text-background px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <span>Post a Job Free</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

export default FeedbackContent;
