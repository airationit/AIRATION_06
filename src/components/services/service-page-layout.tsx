"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/shared";
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

interface ServicePageLayoutProps {
  badge: string;
  title: string;
  titleGradient: string;
  subtitle: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  children?: ReactNode;
  faqs?: { question: string; answer: string }[];
}

export function ServicePageLayout({
  badge,
  title,
  titleGradient,
  subtitle,
  features,
  ctaLabel = "Get Started Now",
  ctaHref = "/contact",
  children,
  faqs,
}: ServicePageLayoutProps) {
  return (
    <>
      <main className="relative min-h-dvh bg-white dark:bg-background text-foreground pt-24 sm:pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Hero section */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50/80 dark:bg-brand-950/40 px-3.5 py-1.5 text-xs font-bold text-brand-700 dark:text-brand-300">
              <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <span>{badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {title}{" "}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                {titleGradient}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-700 transition-colors shadow-sm"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Explore Jobs
              </Link>
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="rounded-2xl border border-border/60 bg-slate-50/60 dark:bg-slate-900/20 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
              Why Choose Hirance {badge}?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <span className="text-sm font-medium text-foreground leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Page Content */}
          {children}

          {/* FAQs if provided */}
          {faqs && faqs.length > 0 && (
            <div className="space-y-6 border-t border-border/40 pt-10">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
                <p className="text-sm text-muted-foreground">Clear answers to your questions.</p>
              </div>
              <div className="divide-y divide-border/40 border border-border/60 rounded-xl px-6 py-2 shadow-xs">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-1.5">
                    <h3 className="text-base font-bold text-foreground">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA Banner */}
          <div className="rounded-2xl border border-brand-500/20 bg-brand-50/50 dark:bg-brand-950/20 p-8 text-center space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Ready to Elevate Your Hiring Response?</h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Join thousands of job seekers who landed interviews 3x faster with Hirance candidate services.
            </p>
            <div className="pt-2">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
