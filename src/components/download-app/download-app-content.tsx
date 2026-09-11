"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Star,
  MessageSquare,
  QrCode,
  Download,
  ChevronDown,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/shared";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES = [
  {
    icon: Zap,
    title: "Swipe Right to Apply",
    description: "No long forms or resume uploads. Express interest with a single swipe.",
  },
  {
    icon: Sparkles,
    title: "AI Match Score",
    description: "Instantly see your compatibility score for every job before applying.",
  },
  {
    icon: MessageSquare,
    title: "Direct HR Chat",
    description: "Connect directly with verified corporate hiring managers without middle agents.",
  },
  {
    icon: ShieldCheck,
    title: "100% Verified Openings",
    description: "Every employer goes through strict verification before posting positions.",
  },
];

const FAQS = [
  {
    question: "Is the Hirance mobile app free for job seekers?",
    answer:
      "Yes, 100% free! Job seekers never pay any registration, subscription, or application fees on the Hirance app.",
  },
  {
    question: "Which mobile operating systems are supported?",
    answer:
      "The Hirance app is available for Android on Google Play Store. An iOS version for Apple iPhone will be released soon.",
  },
  {
    question: "Do I need to fill long application forms on the app?",
    answer:
      "No! Your Hirance profile takes 60 seconds to set up once. After that, you swipe right to apply to any matching job in 1 second.",
  },
  {
    question: "How do employers contact me after I swipe right?",
    answer:
      "When a recruiter accepts your profile match, you receive an instant in-app chat invitation and notification to schedule your interview.",
  },
];

export function DownloadAppContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-white dark:bg-background text-foreground pt-28 sm:pt-32">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50/80 dark:bg-brand-950/40 px-3.5 py-1.5 text-xs font-bold text-brand-700 dark:text-brand-300 shadow-xs">
                <Smartphone className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <span>The #1 Swipe Hiring App</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Download Hirance App{" "}
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  Swipe. Match. Get Hired.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Skip long job application forms. Discover top verified jobs in Bangalore, Mumbai, Delhi NCR, and remote. Swipe right to get interviewed 3x faster.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center gap-3 rounded-2xl bg-brand-600 hover:bg-brand-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Download className="h-5 w-5" />
                  <span>Download on Google Play</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* App Ratings / Trust Badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-muted-foreground border-t border-border/40 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-foreground">4.8 Rating</span>
                </div>
                <div className="h-4 w-px bg-border/60" />
                <div>
                  <span className="font-bold text-foreground">500,000+</span> Downloads
                </div>
                <div className="h-4 w-px bg-border/60" />
                <div>
                  <span className="font-bold text-foreground">100% Free</span>
                </div>
              </div>
            </div>

            {/* Right QR Code / Visual Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-50/80 via-card to-indigo-50/40 dark:from-brand-950/30 dark:via-card dark:to-indigo-950/20 p-8 text-center shadow-xl backdrop-blur-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md mb-5">
                  <QrCode className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-foreground">Scan QR Code to Download</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Point your phone camera to download the Hirance App instantly.
                </p>

                {/* QR Visual Card */}
                <div className="my-6 mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border border-border/80 bg-white p-3 shadow-inner">
                  <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 p-2">
                    <img
                      src="/images/qr.png"
                      alt="Scan to download Hirance App"
                      className="h-28 w-28 object-contain"
                    />
                    <span className="mt-1 text-[10px] font-bold tracking-wider text-brand-700 uppercase">
                      HIRANCE JOB APP
                    </span>
                  </div>
                </div>

                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 text-xs font-bold transition-all hover:opacity-90 shadow-sm"
                >
                  <span>Open Google Play Listing</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* APP FEATURES GRID */}
      <section className="py-16 sm:py-20 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Why Candidates Prefer the{" "}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Hirance App
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Everything built for zero waiting and maximum response rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/60 bg-card p-6 shadow-xs transition-all hover:border-brand-500/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 sm:py-20 border-t border-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Got questions about downloading or using the Hirance mobile app?
            </p>
          </div>

          <div className="divide-y divide-border/40 border border-border/60 rounded-xl px-5 py-3.5 sm:px-8 sm:py-4 shadow-sm">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-3 sm:py-3.5 first:pt-0 last:pb-0 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 text-left group focus-visible:outline-none rounded-lg py-1"
                  >
                    <span className="text-base font-medium text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-brand-600 text-white dark:text-white" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pb-1 text-sm leading-relaxed text-muted-foreground">
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

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
