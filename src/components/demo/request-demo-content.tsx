"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Send,
  Building2,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  Zap,
} from "lucide-react";
import { Footer, InteractiveDots } from "@/components/shared";

type FormState = {
  fullName: string;
  workEmail: string;
  phone: string;
  companyName: string;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  workEmail: "",
  phone: "",
  companyName: "",
};

const HIGHLIGHTS = [
  {
    icon: Zap,
    title: "60-Second Job Posting",
    description: "Post open roles instantly with zero forms.",
  },
  {
    icon: Sparkles,
    title: "Smart Score Matching",
    description: "AI pre-ranks candidate skill fit.",
  },
  {
    icon: Clock,
    title: "10x Faster Hiring",
    description: "Connect directly with active IT candidates.",
  },
];

export function RequestDemoContent() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    }, 600);
  };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Background dot canvas matching home screen styling */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-14">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.15),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
          >
            Request a{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Demo
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            See how Hirance helps companies post jobs in 60 seconds and match with top candidates fast.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column - Why Request a Demo (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6 lg:col-span-5"
          >
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Why Hirance?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Built to solve hiring delays with smart matching.
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-4">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/60 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-50/20 dark:hover:bg-blue-950/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Phone/Email Callout */}
            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-transparent p-4 dark:from-blue-950/40 dark:via-indigo-950/20">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider">
                <Building2 className="h-4 w-4" />
                <span>Direct Support</span>
              </div>
              <div className="mt-2 flex flex-col gap-1.5 text-xs font-medium">
                <a
                  href="tel:+919793780913"
                  className="inline-flex items-center gap-2 text-foreground hover:text-blue-600"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-600" />
                  +91 9793780913
                </a>
                <a
                  href="mailto:hello@hirance.com"
                  className="inline-flex items-center gap-2 text-foreground hover:text-blue-600"
                >
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  hello@hirance.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Super Minimal Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-border/70 bg-background/80 p-6 sm:p-10 shadow-lg backdrop-blur-md">
              {submitted ? (
                <div className="py-10 text-center" role="status" aria-live="polite">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                    Demo Request Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    Thank you! Our team will contact you within 2 business hours to schedule your live demo.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    Submit Another Request
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      Book a Quick Demo
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Enter your details below and we will get back to you shortly.
                    </p>
                  </div>

                  {/* 4 Minimal Inputs */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="demo-name" className="mb-1.5 block text-xs font-semibold text-foreground">
                        Full Name *
                      </label>
                      <input
                        id="demo-name"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="demo-email" className="mb-1.5 block text-xs font-semibold text-foreground">
                        Work Email *
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        required
                        value={form.workEmail}
                        onChange={(e) => handleChange("workEmail", e.target.value)}
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="demo-phone" className="mb-1.5 block text-xs font-semibold text-foreground">
                        Phone Number *
                      </label>
                      <input
                        id="demo-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label htmlFor="demo-company" className="mb-1.5 block text-xs font-semibold text-foreground">
                        Company Name *
                      </label>
                      <input
                        id="demo-company"
                        type="text"
                        required
                        value={form.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-3">
                    <p className="text-xs text-muted-foreground">
                      By submitting, you agree to our{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60 shrink-0"
                    >
                      {submitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Book Demo</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
