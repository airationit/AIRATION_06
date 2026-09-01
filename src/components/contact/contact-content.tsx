"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  UserCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  QrCode,
  ChevronDown,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { Footer, InteractiveDots } from "@/components/shared";

// 5 Clean & Professional Contact FAQs Data
const contactFaqs = [
  {
    question: "How fast does the Hirance support team respond?",
    answer:
      "Our support team typically responds within 24 hours. For urgent employer queries, you can call or WhatsApp us directly at +91 9793780913 during business hours.",
  },
  {
    question: "How can employers get dedicated onboarding assistance?",
    answer:
      "Employers looking for custom hiring plans or assistance can select 'Employer' in our contact form or email hello@hirance.com for instant 1-on-1 onboarding support.",
  },
  {
    question: "What should job seekers do if they face an issue on the app?",
    answer:
      "If you experience any technical issues with your profile or job applications, send us a quick message via the form above or email hello@hirance.com with your registered phone number.",
  },
  {
    question: "What are Hirance's support working hours?",
    answer:
      "Phone and WhatsApp support is active Monday through Saturday from 9:00 AM to 7:00 PM IST. Email support is monitored 7 days a week.",
  },
  {
    question: "Where is Hirance headquartered?",
    answer:
      "Our technology and operations headquarters is located at Janki Puram Extension, Lucknow - 226021, Uttar Pradesh, India.",
  },
];

const CONTACT_CHANNELS = [
  {
    id: "email",
    icon: Mail,
    label: "Email Us",
    value: "hello@hirance.com",
    href: "mailto:hello@hirance.com",
    subtext: "We typically reply within 24 hours",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Call or WhatsApp",
    value: "+91 9793780913",
    href: "tel:+919793780913",
    subtext: "Mon - Sat from 9am to 7pm IST",
  },
  {
    id: "office",
    icon: MapPin,
    label: "Headquarters",
    value: "Jankipuram, Lucknow, Uttar Pradesh - 226021",
    href: "https://www.google.com/maps?ll=26.923114,80.95313&z=15&t=m&hl=en&gl=IN&mapclient=embed&q=Jankipuram+Lucknow,+Uttar+Pradesh",
    subtext: "Tech & Operations Center",
  },
] as const;

const SUPPORT_CATEGORIES = [
  {
    icon: UserCheck,
    title: "Job Seekers",
    description: "Need help with job applications, profile setup, or swipe matches?",
  },
  {
    icon: Building2,
    title: "Employers & Recruiters",
    description: "Questions about 60-second job posting or candidate matching?",
  },
];

type FormState = {
  name: string;
  email: string;
  userType: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  userType: "job-seeker",
  subject: "",
  message: "",
};

export function ContactContent() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
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
            HIRANCE SUPPORT
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
          >
            We're Here to Help You{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Connect & Grow
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 text-lg font-bold tracking-wide text-foreground sm:text-xl"
          >
            Swipe. Match. Get Hired.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Have a question, need assistance with your hiring or job search, or want to partner with Hirance? Reach out and we'll get back to you promptly.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column - Contact Channels & Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 lg:col-span-5"
          >
            {/* Direct Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Get in Touch
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose your preferred way to contact the Hirance team.
              </p>
            </div>

            <div className="space-y-3.5">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-4 transition-all duration-300 hover:border-blue-500/50 hover:bg-card hover:shadow-lg hover:shadow-blue-500/5 dark:bg-card/40 dark:hover:bg-card/80"
                  >
                    {/* Subtle hover gradient highlight */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/[0.04] to-indigo-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-center gap-3.5 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white shadow-sm">
                        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {channel.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm sm:text-base font-semibold text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {channel.value}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {channel.subtext}
                        </span>
                      </div>
                    </div>

                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground/40 transition-all duration-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:group-hover:text-blue-400">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Dedicated Assistance Card */}
            <div className="rounded-2xl border border-border/70 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Dedicated Assistance
              </h3>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {SUPPORT_CATEGORIES.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/50 p-3 transition-colors hover:border-border/80"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mt-0.5">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground">
                          {cat.title}
                        </h4>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* App Download Callout Card */}
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-600/[0.08] via-indigo-600/[0.04] to-transparent p-5 sm:p-6 shadow-sm backdrop-blur-sm">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/15 blur-2xl" />

              <div className="relative flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Experience Faster Hiring on Mobile</span>
              </div>
              <p className="relative mt-1 text-xs text-muted-foreground leading-relaxed">
                India's swipe-based hiring app. Direct matches and real-time candidate chat.
              </p>

              <div className="relative mt-4 flex flex-wrap items-center gap-3">
                {/* Google Play Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.hirance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.18 23.76a2.23 2.23 0 0 1-1.18-.34V.58A2.23 2.23 0 0 1 3.18.24L13.7 12 3.18 23.76zM14.9 13.2l2.5 2.5-9.8 5.56 7.3-8.06zm2.5-4.9L14.9 10.8 7.6 2.74l9.8 5.56zM19.06 9.8l2.87 1.63a1.4 1.4 0 0 1 0 2.44l-2.87 1.63-2.7-2.7 2.7-3z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-medium leading-none text-blue-100 uppercase">Get it on</span>
                    <span className="text-xs font-bold leading-tight">Google Play</span>
                  </div>
                </a>

                {/* Coming to App Store Badge */}
                <div className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/60 px-3.5 py-2.5 text-left opacity-80 backdrop-blur-sm">
                  <svg className="h-4 w-4 fill-current text-foreground" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.24 1.31-2.22 3.91.03 3.1 2.72 4.13 2.75 4.15l-.08.56zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-medium leading-none text-muted-foreground uppercase">Coming to</span>
                    <span className="text-xs font-bold leading-tight text-foreground">App Store</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/85 p-6 sm:p-10 shadow-xl shadow-blue-500/5 backdrop-blur-xl">
              {/* Subtle ambient light accents */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

              {submitted ? (
                <div className="relative py-10 text-center" role="status" aria-live="polite">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                    Message Sent Successfully!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    Thank you for contacting Hirance. Our support team will review your message and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200"
                  >
                    Send Another Message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6" noValidate>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      Send Us a Message
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill out the form below and we'll respond to your inquiry directly.
                    </p>
                  </div>

                  {/* I am a... Role Selector */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {[
                        { id: "job-seeker", label: "Job Seeker" },
                        { id: "employer", label: "Employer" },
                        { id: "partner", label: "Partner" },
                        { id: "other", label: "General" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleChange("userType", type.id)}
                          className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all duration-200 ${
                            form.userType === type.id
                              ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                              : "border-border/70 bg-background/60 text-muted-foreground hover:border-blue-500/40 hover:text-foreground hover:bg-background"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-foreground">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:bg-background focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-foreground">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:bg-background focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-foreground">
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:bg-background focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-foreground">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-600 focus:bg-background focus:ring-4 focus:ring-blue-500/10 resize-y min-h-[120px]"
                    />
                  </div>

                  {/* Submit Footer */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
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
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
                    >
                      {submitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
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

      {/* SECTION: OFFICE LOCATION MAP */}
      <section
        id="office-location"
        aria-labelledby="office-location-heading"
        className="mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-24"
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="office-location-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground"
            >
              Visit Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Headquarters
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jankipuram, Lucknow, Uttar Pradesh — 226021, India
            </p>
          </div>

          <a
            href="https://www.google.com/maps?ll=26.923114,80.95313&z=15&t=m&hl=en&gl=IN&mapclient=embed&q=Jankipuram+Lucknow,+Uttar+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 hover:bg-blue-600 hover:text-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-600 transition-all duration-200 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white shadow-sm w-fit active:scale-[0.98]"
          >
            <Navigation className="h-4 w-4" />
            <span>Get Directions</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>

        {/* Interactive Map Embed Container */}
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 shadow-xl shadow-blue-500/5 backdrop-blur-md">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[320px] sm:min-h-[420px] w-full">
            <iframe
              src="https://www.google.com/maps?ll=26.923114,80.95313&z=15&t=m&hl=en&gl=IN&mapclient=embed&q=Jankipuram+Lucknow,+Uttar+Pradesh&output=embed"
              title="Hirance Headquarters Location Map - Jankipuram, Lucknow"
              className="absolute inset-0 h-full w-full border-0 filter dark:contrast-[0.95] dark:brightness-[0.92]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* SECTION: FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="border-t border-border/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about contacting Hirance support.
            </p>
          </div>

          {/* Accordion List (Clean Lines, No Excessive Cards) */}
          <div className="mt-10 divide-y divide-border/40 border-y border-border/40">
            {contactFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 sm:py-5 transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`contact-faq-answer-${idx}`}
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
                        id={`contact-faq-answer-${idx}`}
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

      {/* Footer */}
      <Footer />
    </main>
  );
}
