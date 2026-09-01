"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Brain,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Target,
  ShieldCheck,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { Footer, InteractiveDots, GooglePlayButton } from "@/components/shared";

// 10 Clean & Professional FAQs Data for About Us
const faqs = [
  {
    question: "What is Hirance and what is its mission?",
    answer:
      "Hirance is India's swipe-based hiring platform. Our mission is to make hiring instant, transparent, and form-free for job seekers and recruiters across India.",
    category: "General",
  },
  {
    question: "Why was Hirance created?",
    answer:
      "We built Hirance to eliminate recruitment friction—long job application forms, endless scrolling, resume re-uploads, and candidate ghosting.",
    category: "General",
  },
  {
    question: "What does 'Swipe. Match. Get Hired.' mean?",
    answer:
      "Candidates swipe right on jobs to apply instantly and left to pass. An AI Smart Score calculates profile fit in real-time, making job search fast and effortless.",
    category: "Candidates",
  },
  {
    question: "How is Hirance different from traditional job portals?",
    answer:
      "Hirance replaces 10-page application forms with single swipes, allows employers to post jobs in under 60 seconds, and delivers pre-filtered candidates instantly.",
    category: "General",
  },
  {
    question: "Is Hirance an Indian platform?",
    answer:
      "Yes! Hirance is proudly built in India to empower job seekers and companies with fast, modern recruitment technology.",
    category: "General",
  },
  {
    question: "Who can use Hirance?",
    answer:
      "Hirance is built for both candidates looking for tech, sales, marketing, operations, and business roles, and employers ranging from startups to growing enterprises.",
    category: "General",
  },
  {
    question: "Is Hirance completely free for job seekers?",
    answer:
      "Yes! Job seekers can download the Hirance app, create a profile once, and swipe to apply to unlimited jobs without paying anything.",
    category: "Candidates",
  },
  {
    question: "How does Hirance help recruiters hire faster?",
    answer:
      "With 1-click AI job description generation and pre-filtered candidate matching, recruiters cut hiring timelines from weeks to just days.",
    category: "Employers",
  },
  {
    question: "How does Hirance protect user privacy and profile data?",
    answer:
      "Hirance uses bank-grade security protocols. Candidate profiles and contact details are only shared with verified hiring managers when a candidate swipes right.",
    category: "General",
  },
  {
    question: "How can candidates and employers get started?",
    answer:
      "Candidates can download the free Hirance mobile app on Google Play. Employers can register and post jobs directly on hirance.com in under 60 seconds.",
    category: "General",
  },
];

const speedPillars = [
  {
    icon: Zap,
    title: "No Forms",
    highlight: "Swipe right to apply instantly.",
    description:
      "Forget tedious multi-step application forms and constant resume re-uploads. One right swipe submits your profile directly to top employers.",
    accentBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    icon: Brain,
    title: "No Scrolling",
    highlight: "Smart score on every job.",
    description:
      "Stop wading through endless irrelevant job postings. Our intelligent match algorithm ranks top opportunities right at the top of your feed.",
    accentBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    icon: Clock,
    title: "No Waiting",
    highlight: "Post in 60s, get matched fast.",
    description:
      "Employers publish listings in under a minute and connect with pre-filtered candidates without weeks of waiting or candidate ghosting.",
    accentBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
];

const candidateHighlights = [
  "Swipe right to apply, left to pass",
  "Real-time Smart Score on every job",
  "No resume uploads or long form fill-ups",
  "Direct updates from verified hiring teams",
];

const employerHighlights = [
  "Post jobs in under 60 seconds with smart assistance",
  "Get pre-filtered, relevant candidates immediately",
  "Zero spam applications to sort through",
  "1-click interview scheduling & instant response",
];

export function AboutContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === "All" || faq.category === activeCategory
  );

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Unified interactive dot canvas matching home screen styling */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.15),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-3 text-base sm:text-lg font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase"
          >
            Hirance
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
          >
            India's Swipe-Based{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Hiring Platform
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 text-xl font-bold tracking-wide text-foreground sm:text-2xl"
          >
            Swipe. Match. Get Hired.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Fastest way to Post & Apply for jobs—No forms, No scrolling, No waiting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <GooglePlayButton />
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border/80 bg-background/80 px-6 text-sm font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Contact Hirance hiring team"
            >
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Narrative Section: Built for Speed */}
      <section className="relative border-t border-border/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built to solve recruitment speed
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Hirance is India's swipe-based hiring platform, built to solve the biggest problem in job hunting and recruitment—speed. No more long forms, resume uploads, or endless job scrolling. Candidates swipe right to apply and left to skip, based on a Smart Score for every job. Employers post jobs in under a minute and get only relevant, pre-filtered candidates. Smarter hiring starts here.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/50 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                &lt; 60s
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                Employer Job Posting Time
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                1 Swipe
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                Instant Application Submission
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 p-6 text-center backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                Real-Time
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                Smart Score Calculation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Speed Pillars */}
      <section className="relative border-t border-border/50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Hirance is different
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              We stripped away friction, forms, and waiting from traditional job platforms.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {speedPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg"
              >
                <div>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${pillar.accentBg}`}>
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {pillar.highlight}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Audience Section: Candidates & Employers */}
      <section className="relative border-t border-border/50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Designed for candidates & recruiters alike
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              A single platform built to serve both sides of the hiring table with speed and respect.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* For Candidates */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">For Candidates</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Take control of your job search with a modern mobile app experience. Find roles matched to your exact profile and skills.
              </p>
              <ul className="mt-6 space-y-3">
                {candidateHighlights.map((item) => (
                  <li key={item} className="flex items-start text-sm text-foreground">
                    <CheckCircle2 className="mr-3 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Employers */}
            <div className="rounded-2xl border border-border/60 bg-background/60 p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">For Employers</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Cut hiring timelines from weeks to hours. Get matched with active, pre-filtered talent without recruiter overhead.
              </p>
              <ul className="mt-6 space-y-3">
                {employerHighlights.map((item) => (
                  <li key={item} className="flex items-start text-sm text-foreground">
                    <CheckCircle2 className="mr-3 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="relative border-t border-border/50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our core principles
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              What drives our product and engineering team every day.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Speed First</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We measure our product success in seconds saved for candidates applying and recruiters listing open positions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Smart Score</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Relevance over quantity. Match algorithms calculate skill alignment so candidates don't waste time on wrong roles.
              </p>
            </div>

            <div className="space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Human Respect</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                No ghosting, transparent communication, and simple direct connections for modern professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Clean & Professional Accordion) */}
      <section id="faq" className="relative border-t border-border/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Hirance and our mission.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {["All", "Candidates", "Employers", "General"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(0);
                }}
                className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 dark:bg-blue-600 dark:text-white"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat === "All" ? "All Questions" : cat}
              </button>
            ))}
          </div>

          {/* Accordion FAQ List (Clean Lines, No Cards) */}
          <div className="mt-10 divide-y divide-border/40 border-y border-border/40">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 sm:py-5 transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`about-faq-answer-${idx}`}
                    className="flex w-full items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg py-1"
                  >
                    <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-blue-600 text-white dark:text-white" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`about-faq-answer-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pb-1 text-sm sm:text-base leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="relative border-t border-border/50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Smarter hiring starts here
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Join thousands of candidates and employers experiencing India's swipe-based job platform.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <GooglePlayButton />
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
