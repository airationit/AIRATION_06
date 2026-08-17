"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Zap,
  Brain,
  Clock,
  Sparkles,
  Filter,
  Wand2,
  CalendarCheck,
  UserX,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Smartphone,
  Building2,
  Check,
  Trophy,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { Footer } from "@/components/shared";
import { GooglePlayButton } from "@/components/shared/google-play-button";

// 10 Clean & Professional FAQs Data
const faqs = [
  {
    question: "How does Hirance's swipe-based hiring work?",
    answer:
      "Candidates swipe right to apply for jobs and left to pass—just like modern apps. Every job card displays an instant AI Match Score, allowing job seekers to apply to 10+ matching roles in under 60 seconds with zero form filling.",
    category: "Candidates",
  },
  {
    question: "What is the AI Match Score and how does it work?",
    answer:
      "The AI Match Score calculates how well your skills and experience align with a job posting (e.g., 94% Fit Score). It gives candidates instant clarity on their application fit and helps employers quickly focus on top talent.",
    category: "Candidates",
  },
  {
    question: "How fast can an employer post a job on Hirance?",
    answer:
      "Employers can post a complete job in under 60 seconds. Hirance's 1-click AI tool automatically writes clear, professional job descriptions, so you don't have to type anything from scratch.",
    category: "Employers",
  },
  {
    question: "Is Hirance free for candidates?",
    answer:
      "Yes, Hirance is 100% free for job seekers. Create your profile once, explore matching jobs, and swipe right to apply with zero hidden fees or charges.",
    category: "Candidates",
  },
  {
    question: "How does Hirance pre-filter candidates for employers?",
    answer:
      "Employers select essential hiring criteria—such as location, experience level, and key skills—before posting. Hirance filters out unqualified applicants automatically, so you only receive pre-matched profiles.",
    category: "Employers",
  },
  {
    question: "Do candidates need to re-upload their resume for every application?",
    answer:
      "No! You set up your profile once on the Hirance mobile app. When you swipe right on a job, your verified profile and resume details are submitted instantly.",
    category: "Candidates",
  },
  {
    question: "How does 1-click interview scheduling work?",
    answer:
      "Recruiters can select qualified candidates directly from their web dashboard and send instant interview invites with calendar integration, eliminating tedious email back-and-forths.",
    category: "Employers",
  },
  {
    question: "What happens immediately after a candidate swipes right?",
    answer:
      "The candidate's application is instantly delivered to the employer's dashboard alongside their AI Match Score. When the employer shortlists the profile, both parties are connected directly.",
    category: "Candidates",
  },
  {
    question: "Can recruiters send bulk status updates to applicants?",
    answer:
      "Yes. Employers can send polite status updates or bulk rejection notifications with one click, ensuring candidates receive transparent communication without manual typing.",
    category: "Employers",
  },
  {
    question: "Where can candidates and employers get started?",
    answer:
      "Candidates can download the free Hirance app on the Google Play Store for Android. Employers can sign up and post jobs directly on hirance.com in under a minute.",
    category: "General",
  },
];

// Candidate 3-Step Timeline Data with Unified Brand Palette
const candidateSteps = [
  {
    step: "01",
    icon: Zap,
    title: "Swipe Right to Apply",
    description: "No forms, no typing, no resume re-uploads. Just swipe right on jobs you love.",
    circleBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white",
    badgeBg: "bg-blue-600",
    textHover: "group-hover:text-blue-600",
  },
  {
    step: "02",
    icon: Brain,
    title: "Smart Instant Match",
    description: "Know your fit score before applying so you connect with ideal roles.",
    circleBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white",
    badgeBg: "bg-blue-600",
    textHover: "group-hover:text-blue-600",
  },
  {
    step: "03",
    icon: Trophy,
    title: "Get Hired Fast",
    description: "Apply to 10+ jobs in under 60 seconds and land your dream role in days.",
    circleBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white",
    badgeBg: "bg-blue-600",
    textHover: "group-hover:text-blue-600",
  },
];

// Employer 3-Step Timeline Data with Unified Brand Palette
const employerSteps = [
  {
    step: "01",
    icon: Clock,
    title: "Post Job in 60s",
    description: "Let smart tools draft your complete job description with one click. Zero manual typing.",
    circleBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white",
    badgeBg: "bg-blue-600",
    textHover: "group-hover:text-blue-600",
  },
  {
    step: "02",
    icon: Filter,
    title: "Pre-Filtered Candidates",
    description: "Receive pre-ranked candidates with instant Smart Scores on every profile.",
    circleBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white",
    badgeBg: "bg-blue-600",
    textHover: "group-hover:text-blue-600",
  },
  {
    step: "03",
    icon: CalendarCheck,
    title: "1-Click Scheduling",
    description: "Schedule interviews or dispatch bulk rejection emails in a single click.",
    circleBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white",
    badgeBg: "bg-blue-600",
    textHover: "group-hover:text-blue-600",
  },
];

// Candidate Features Data
const candidateFeatures = [
  {
    icon: Zap,
    title: "Just Swipe",
    description: "No forms, no resume re-uploads needed",
  },
  {
    icon: Brain,
    title: "AI Match Score",
    description: "Know your exact fit % before applying",
  },
  {
    icon: Clock,
    title: "10+ Jobs in 1 Minute",
    description: "Apply faster than ever before",
  },
  {
    icon: Sparkles,
    title: "Smooth, Modern Experience",
    description: "Job hunting made simple & enjoyable",
  },
];

// Employer Features Data
const employerFeatures = [
  {
    icon: Clock,
    title: "Post Jobs in 1 Minute",
    description: "Zero manual typing required",
  },
  {
    icon: Wand2,
    title: "AI-Written Job Description",
    description: "One click, completely done",
  },
  {
    icon: Filter,
    title: "Pre-Filtered Candidates Only",
    description: "Set your filters before posting",
  },
  {
    icon: Brain,
    title: "Instant Match Score",
    description: "Decide on candidates in seconds",
  },
  {
    icon: CalendarCheck,
    title: "One-Click Interview Scheduling",
    description: "Invite multiple candidates instantly",
  },
  {
    icon: UserX,
    title: "Bulk Rejection Emails",
    description: "Notify multiple applicants in one click",
  },
];

export function HowItWorksContent() {
  const reducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === "All" || faq.category === activeCategory
  );

  const fadeIn = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-white dark:bg-background text-foreground">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        
        {/* Pure Light Minimal Background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-[38rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-500/3 via-blue-400/2 to-transparent blur-[160px]" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Main Hero Headline */}
          <motion.h1
            {...fadeIn(0.05)}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]"
          >
            Swipe.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              Match.
            </span>{" "}
            Get Hired.
          </motion.h1>

          {/* Tagline & Subtitle */}
          <motion.div {...fadeIn(0.1)} className="mt-6 space-y-2">
            <p className="text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-400 tracking-wide">
              India's 1st Swipe-Based Hiring Platform
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground/90 max-w-3xl mx-auto leading-snug">
              Fastest way to Post & Apply for jobs—No forms, No scrolling, No waiting.
            </p>
          </motion.div>

          {/* Hero Paragraph */}
          <motion.p
            {...fadeIn(0.15)}
            className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto"
          >
            Hirance is built to solve the biggest problem in job hunting and recruitment—<strong className="text-foreground font-semibold">speed</strong>. No more long forms, resume uploads, or endless job scrolling. Candidates swipe right to apply based on an AI match score, and employers post jobs in under a minute to receive pre-filtered candidates. Smarter hiring starts here.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            {...fadeIn(0.2)}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#for-candidates"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all duration-200 hover:bg-brand-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Smartphone className="h-4 w-4" />
              For Candidates
            </a>
            <a
              href="#for-employers"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border/80 bg-background/80 backdrop-blur-sm px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:scale-[1.02] active:scale-[0.98]"
            >
              <Building2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              For Employers
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: FOR CANDIDATES */}
      <section id="for-candidates" className="relative py-20 sm:py-28 overflow-hidden border-t border-border/30">
        
        <div className="mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 items-center">
            
            {/* Candidate Content Column */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-6">
              
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                  For Candidates
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Job Hunting,{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                    Reimagined
                  </span>
                </h3>
                <p className="text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-400">
                  Swipe Your Way to Your Next Job
                </p>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Tired of filling the same form on every job site? With Hirance, just swipe—no forms, no re-typing. Every job card shows your AI-calculated match percentage, so you instantly know how well you fit before you decide. Right swipe to apply, left swipe to skip.
              </p>

              {/* Highlight Line */}
              <div className="py-1.5 flex items-center gap-3 text-base sm:text-lg font-bold text-foreground">
                <Sparkles className="h-5 w-5 text-brand-600 shrink-0" />
                <span>Apply to 10+ relevant jobs in under a minute—fast, smooth, and actually enjoyable.</span>
              </div>

              {/* Feature Points Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {candidateFeatures.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download CTA Box */}
              <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border/30">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Ready to find your job?</h4>
                  <p className="text-xs text-muted-foreground">Download the Hirance Candidate Mobile App.</p>
                </div>
                <GooglePlayButton className="shrink-0" />
              </div>

            </div>

            {/* Candidate App Showcase Display */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-none">
                <Image
                  src="/pics/left_right.png"
                  alt="Hirance Swipe Left to Skip, Swipe Right to Apply for Candidates"
                  width={1823}
                  height={863}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, (max-width: 1280px) 50vw, (max-width: 1536px) 58vw, 850px"
                  className="h-auto w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>

          </div>

          {/* CANDIDATE 3-STEP VISUAL TIMELINE FLOW */}
          <div className="mt-20 pt-12 border-t border-border/30">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Candidate Journey in{" "}
                <span className="bg-gradient-to-r from-blue-600 to-brand-600 bg-clip-text text-transparent">
                  3 Simple Steps
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {candidateSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative flex flex-col items-center text-center group">
                    {/* Connecting Line between steps on desktop */}
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border/80 via-border/40 to-transparent -z-10" />
                    )}
                    
                    {/* Step Number Circle */}
                    <div className={`relative flex h-14 w-14 items-center justify-center rounded-full font-extrabold text-lg border transition-colors duration-300 shadow-sm mb-4 ${step.circleBg}`}>
                      <Icon className="h-6 w-6" />
                      <span className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white font-black ${step.badgeBg}`}>
                        {idx + 1}
                      </span>
                    </div>

                    <h4 className={`text-lg font-bold text-foreground transition-colors ${step.textHover}`}>
                      {step.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: FOR EMPLOYERS */}
      <section id="for-employers" className="relative py-20 sm:py-28 overflow-hidden border-t border-border/30">
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              For Employers
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Hire Smarter,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                Not Harder
              </span>
            </h3>
            <p className="text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-400">
              Post a Job in Under 1 Minute. Hire the Right Candidate in Days, Not Weeks.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Hirance is built for HR teams who don't have time to waste on irrelevant resumes. Post a job in under 60 seconds—no long descriptions to type, no manual filtering. Let AI write your full job description with one click, set your filters before posting, and receive only relevant, matched candidates.
            </p>
          </div>

          {/* Employer Autopilot Highlights Grid (NO background card wrappers) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-2"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Autopilot Highlight Line */}
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg font-bold text-foreground">
              🚀 Hiring, finally on autopilot. Every candidate card shows an AI match score for instant decisions. Schedule interviews or send bulk rejections in a single click.
            </p>
          </div>

          {/* EMPLOYER 3-STEP VISUAL TIMELINE FLOW */}
          <div className="mt-16 pt-12 border-t border-border/30">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Employer Hiring in{" "}
                <span className="bg-gradient-to-r from-blue-600 to-brand-600 bg-clip-text text-transparent">
                  3 Easy Steps
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {employerSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative flex flex-col items-center text-center group">
                    {/* Connecting Line between steps on desktop */}
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border/80 via-border/40 to-transparent -z-10" />
                    )}
                    
                    {/* Step Number Circle */}
                    <div className={`relative flex h-14 w-14 items-center justify-center rounded-full font-extrabold text-lg border transition-colors duration-300 shadow-sm mb-4 ${step.circleBg}`}>
                      <Icon className="h-6 w-6" />
                      <span className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white font-black ${step.badgeBg}`}>
                        {idx + 1}
                      </span>
                    </div>

                    <h4 className={`text-lg font-bold text-foreground transition-colors ${step.textHover}`}>
                      {step.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Employer Web Dashboard Showcase (Direct Mockup Display - NO bg card wrapper) */}
          <div className="mt-16 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-5">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Streamlined Employer Dashboard
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Review pre-filtered applicants, check AI match scores, and organize team hiring from one intuitive web workspace.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-600 shrink-0" />
                    <span>Instant candidate match score badges</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-600 shrink-0" />
                    <span>1-Click interview scheduling</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-600 shrink-0" />
                    <span>Bulk rejection email notifications</span>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href="https://uat.hirance.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-brand-600 hover:bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-brand-600/20"
                  >
                    <Briefcase className="h-4 w-4" />
                    Post Job in Under 1 Minute
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 flex justify-center">
                <Image
                  src="/images/web_mock.png"
                  alt="Hirance Employer Web Dashboard Showcase"
                  width={850}
                  height={550}
                  className="h-auto w-full object-contain filter drop-shadow-lg transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>

            </div>
          </div>

          {/* Employer Interview Showcase (Direct Compact Display - NO bg card wrapper) */}
          <div className="mt-16 py-6 border-t border-border/30 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                <div className="relative w-full max-w-[460px]">
                  <Image
                    src="/images/meeting.png"
                    alt="Hirance Fast Interview Scheduling Showcase"
                    width={540}
                    height={350}
                    className="h-auto w-full object-cover rounded-2xl filter drop-shadow-md transition-transform duration-300 hover:scale-[1.01]"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Interview Qualified Candidates Faster
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Eliminate back-and-forth emails. Schedule interviews with pre-vetted, high-intent candidates in seconds.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Check className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Zero back-and-forth email loops</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Check className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Instant calendar invite integration</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="relative py-20 sm:py-28 overflow-hidden border-t border-border/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header (Clean & Professional, No Chips) */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about India's 1st swipe-based hiring platform.
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
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat === "All" ? "All Questions" : cat}
              </button>
            ))}
          </div>

          {/* Accordion FAQ Items (Clean Lines, No Cards) */}
          <div className="mt-10 divide-y divide-border/40 border-y border-border/40">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 sm:py-5 transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="flex w-full items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg py-1"
                  >
                    <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
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
                        id={`faq-answer-${idx}`}
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

      {/* BOTTOM ACTION BAR */}
      <section className="py-20 border-t border-border/30 relative">
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Smarter hiring starts here.
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
            Get started with Hirance today—whether you're looking for your next role or building your dream team.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.hirance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-brand-600/20"
            >
              <Smartphone className="h-4 w-4" />
              For Candidates (Get Mobile App)
            </a>
            <a
              href="https://uat.hirance.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 backdrop-blur-sm px-7 py-3.5 text-sm font-bold text-foreground hover:bg-muted transition-all duration-200 hover:scale-[1.02]"
            >
              <Building2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              For Employers (Post Job)
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
