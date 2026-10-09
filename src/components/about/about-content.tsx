"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ChevronLeft,
  ChevronRight,
  Globe,
  Users,
  User,
  Check,
  Trophy,
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

// Team Members Data
const teamMembers = [
  {
    name: "Ranjeet Singh",
    role: "Tech Leader",
    image: "https://cdn.hirance.com/library/93b85c2e-e6cb-42e2-b9db-c55bb7ebabcc.webp",
  },
  {
    name: "Amit Verma",
    role: "Full Stack Developer",
    image: "https://cdn.hirance.com/library/176ba005-35c1-4630-87cb-0122ebf853dc.webp",
  },
  {
    name: "Shubham Gaur",
    role: "Full Stack App Developer",
    image: "https://cdn.hirance.com/library/31bf000e-d807-4490-beb8-ae3337cd3700.webp",
  },
  {
    name: "Yash Kumar",
    role: "UI/UX Designer",
    image: "https://cdn.hirance.com/library/1a8b22b1-7ef7-491e-9ff6-68876123b106.webp",
  },
  {
    name: "Shweta Chaudhary",
    role: "Web Developer",
    image: "https://cdn.hirance.com/library/f458c091-2b15-4e23-84ed-3e65ecc1ca1a.webp",
  },
  {
    name: "Neelam",
    role: "Backend Developer",
    image: "https://cdn.hirance.com/library/eb98fba3-8c5e-43c8-ab5e-d037799cebb6.webp",
  },
  {
    name: "Rintu Kumari",
    role: "QA & Backend Developer[AI]",
    image: "https://cdn.hirance.com/library/e127d65a-084b-4645-93ac-01b5eb4b1c95.webp",
  },
  {
    name: "Ayushi Pandey",
    role: "Graphic Designer & Video Editor",
    image: "https://cdn.hirance.com/library/774945c4-1e20-4804-ac97-cbe6f4eb247a.webp",
  },
  {
    name: "Khusboo Agrawal",
    role: "Graphic Designer",
    image: "https://cdn.hirance.com/library/fbbdf47c-902b-42b1-bac2-365cb18e7463.webp",
  },
  {
    name: "Neha Singh",
    role: "Business Developer Associate",
    image: "https://cdn.hirance.com/library/b5341b38-753c-4d9e-8356-cc0477e8238d.webp",
  },
  {
    name: "Awadhesh Kumar",
    role: "Business Developer Associate",
    image: "https://cdn.hirance.com/library/45094325-ad67-41b5-8add-2b220f547ed9.webp",
  },
  {
    name: "Deepa",
    role: "Business Developer Associate",
    image: "https://cdn.hirance.com/library/3913a5a9-24f4-4b79-974f-f6ca2ae83170.webp",
  },
  {
    name: "Anant Rai",
    role: "Field Sales Executive",
    image: "https://cdn.hirance.com/library/0cc7133e-647c-4e50-9609-0bd355f05ac8.webp",
  },
];

export function AboutContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [isTeamHovered, setIsTeamHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [activeCenterIndex, setActiveCenterIndex] = useState<number>(1);

  const handleScroll = () => {
    if (!teamScrollRef.current) return;
    const container = teamScrollRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    const children = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveCenterIndex(closestIndex);
  };

  useEffect(() => {
    const container = teamScrollRef.current;
    if (!container) return;

    let animId: number;
    const speed = 0.6; // smooth continuous left scroll speed

    const scrollStep = () => {
      if (!isTeamHovered && !isDragging && container) {
        container.scrollLeft += speed;
        // When scroll reaches halfway point of duplicate array, seamlessly wrap back to 0
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
        handleScroll();
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isTeamHovered, isDragging]);

  const scrollTeam = (direction: "left" | "right") => {
    setIsTeamHovered(true);
    if (teamScrollRef.current) {
      const scrollAmount = teamScrollRef.current.clientWidth / 2;
      teamScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
    setTimeout(() => {
      setIsTeamHovered(false);
    }, 1000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (teamScrollRef.current) {
      setStartX(e.pageX - teamScrollRef.current.offsetLeft);
      setScrollLeftPos(teamScrollRef.current.scrollLeft);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsTeamHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !teamScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - teamScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    teamScrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === "All" || faq.category === activeCategory
  );

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-background text-foreground">
      {/* Unified interactive dot canvas matching home screen styling */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <InteractiveDots />
      </div>


      {/* Main Narrative Section: Built for Speed */}
      <section
        className="relative overflow-hidden py-12 sm:py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.hirance.com/library/e3356092-d71c-4ad5-9f6f-1924276abcf0.webp')",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 text-center">

          {/* WHY HIRANCE badge with sparkle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-4 py-1 shadow-sm"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-blue-500" fill="currentColor" aria-hidden="true">
              <path d="M8 0l1.5 5.5L15 7l-5.5 1.5L8 14l-1.5-5.5L1 7l5.5-1.5z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              WHY HIRANCE
            </span>
          </motion.div>

          {/* Heading — "Recruitment Speed" in blue */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl leading-tight"
          >
            Built to Improve
            <span className="text-blue-600 dark:text-blue-400">Recruitment Speed</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-4xl mx-auto"
          >
            Hire faster, reduce manual work and connect with the right talent — in minutes, not weeks.
          </motion.p>

          {/* Stats Cards in Image 1 Chevron Ribbon Format */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 overflow-x-auto pb-2 sm:pb-0 text-left"
          >
            <div className="mx-auto flex max-w-3xl min-w-[520px] items-stretch gap-1.5 sm:min-w-0 drop-shadow-md">
              {/* Card 1: 60s */}
              <div
                className="relative flex flex-1 items-center gap-3 rounded-l-2xl bg-white py-4 pl-4 pr-7 text-slate-900 transition-all dark:bg-slate-900 dark:text-slate-100"
                style={{
                  clipPath:
                    "polygon(0% 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 0% 100%)",
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs border border-blue-100 dark:bg-blue-950/80 dark:border-blue-900/50 dark:text-blue-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold leading-tight text-slate-900 dark:text-white">60s</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300">Avg. Job Post Time</p>
                </div>
              </div>

              {/* Card 2: 1 Swipe */}
              <div
                className="relative flex flex-1 items-center gap-3 bg-white py-4 pl-6 pr-7 text-slate-900 transition-all dark:bg-slate-900 dark:text-slate-100"
                style={{
                  clipPath:
                    "polygon(0% 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 0% 100%, 15px 50%)",
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs border border-blue-100 dark:bg-blue-950/80 dark:border-blue-900/50 dark:text-blue-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold leading-tight text-slate-900 dark:text-white">1 Swipe</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300">Instant Submission</p>
                </div>
              </div>

              {/* Card 3: Real-Time */}
              <div
                className="relative flex flex-1 items-center gap-3 rounded-r-2xl bg-white py-4 pl-6 pr-5 text-slate-900 transition-all dark:bg-slate-900 dark:text-slate-100"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 15px 50%)",
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs border border-blue-100 dark:bg-blue-950/80 dark:border-blue-900/50 dark:text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold leading-tight text-slate-900 dark:text-white">Real-Time</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300">Smart Match Calculation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <GooglePlayButton />
            <Link
              href="/post-job"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-7 text-sm font-semibold text-slate-900 dark:text-white shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Post Your Job in 60 seconds"
            >
              Post Your Job in 60s
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </div>
      </section>



      {/* The Hirance Advantage: How Hirance is Different */}
      <section className="relative border-t border-border/50 pt-8 pb-6 sm:pt-10 sm:pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
                THE HIRANCE ADVANTAGE
              </div>

              {/* Title */}
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                How <span className="text-blue-600 dark:text-blue-400">Hirance</span> is Different?
              </h2>

              {/* Subtitle Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xl">
                We&apos;re not just another job platform. We&apos;re built to make hiring and job hunting simple, smart and effective.
              </p>

              {/* 3 Advantage Cards */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Card 1: No Forms */}
                <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-xs dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                      <path d="M14.125 8H13.25C13.1812 8 13.125 8.05625 13.125 8.125V13.125H2.875V2.875H7.875C7.94375 2.875 8 2.81875 8 2.75V1.875C8 1.80625 7.94375 1.75 7.875 1.75H2.25C1.97344 1.75 1.75 1.97344 1.75 2.25V13.75C1.75 14.0266 1.97344 14.25 2.25 14.25H13.75C14.0266 14.25 14.25 14.0266 14.25 13.75V8.125C14.25 8.05625 14.1938 8 14.125 8Z" fill="currentColor" />
                      <path d="M5.56095 8.35781L5.53127 10.2156C5.5297 10.3547 5.6422 10.4688 5.78127 10.4688H5.78752L7.63127 10.4234C7.66252 10.4219 7.69377 10.4094 7.71564 10.3875L14.2141 3.90313C14.2625 3.85469 14.2625 3.775 14.2141 3.72656L12.2719 1.78594C12.2469 1.76094 12.2156 1.75 12.1828 1.75C12.15 1.75 12.1188 1.7625 12.0938 1.78594L5.59689 8.27031C5.57432 8.29391 5.56149 8.32516 5.56095 8.35781ZM6.55314 8.72656L12.1828 3.10938L12.8891 3.81406L7.25627 9.43437L6.5422 9.45156L6.55314 8.72656Z" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    No Forms
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    Swipe right to apply instantly.
                  </p>
                </div>

                {/* Card 2: No Scrolling */}
                <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-xs dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400">
                    <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                      <path d="M14.8748 11.3346H14.1665V3.54297C14.1665 2.37422 13.2103 1.41797 12.0415 1.41797H3.5415C2.37275 1.41797 1.4165 2.37422 1.4165 3.54297V5.66797C1.4165 6.05755 1.73525 6.3763 2.12484 6.3763H4.24984V13.4596C4.24984 14.6284 5.20609 15.5846 6.37484 15.5846H13.4582C14.6269 15.5846 15.5832 14.6284 15.5832 13.4596V12.043C15.5832 11.6534 15.2644 11.3346 14.8748 11.3346ZM2.83317 4.95964V3.54297C2.83317 3.15339 3.15192 2.83464 3.5415 2.83464C3.93109 2.83464 4.24984 3.15339 4.24984 3.54297V4.95964H2.83317ZM7.08317 12.043V13.4596C7.08317 13.8492 6.76442 14.168 6.37484 14.168C5.98525 14.168 5.6665 13.8492 5.6665 13.4596V3.54297C5.6665 3.29505 5.61692 3.05422 5.539 2.83464H12.0415C12.4311 2.83464 12.7498 3.15339 12.7498 3.54297V11.3346H7.7915C7.40192 11.3346 7.08317 11.6534 7.08317 12.043ZM14.1665 13.4596C14.1665 13.8492 13.8478 14.168 13.4582 14.168H8.37942C8.45947 13.9404 8.5002 13.7009 8.49984 13.4596V12.7513H14.1665V13.4596Z" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    No Scrolling
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    Smart matching for jobs
                  </p>
                </div>

                {/* Card 3: No Waiting */}
                <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-xs dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground">
                    No Waiting
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    Post in 60s, get matched fast.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-md lg:max-w-none overflow-hidden rounded-2xl">
                <Image
                  src="https://cdn.hirance.com/library/56b0fe32-7898-4cbd-9c55-a306f20e325c.webp"
                  alt="How Hirance is Different"
                  width={560}
                  height={480}
                  className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>






      {/* Our Team Section */}
      <section
        className="relative overflow-hidden border-t border-border/50 py-6 sm:py-8 bg-cover bg-top bg-no-repeat bg-[#f6f9fe] dark:bg-slate-950"
        style={{
          backgroundImage:
            "url('https://cdn.hirance.com/library/f0f99542-eb9f-4dda-a674-7a8c39b3bc96.webp')",
        }}
      >
        <div className="relative mx-auto max-w-6xl px-6">

          {/* 12-Column Compact Header Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">

            {/* LEFT — CEO Graphic Image */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="relative w-[280px] sm:w-[350px] lg:w-[410px]">
                <Image
                  src="https://cdn.hirance.com/library/3bc90846-990e-48d6-8989-46eeacd287b5.webp"
                  alt="Pankaj Chaudhary - Founder & CEO"
                  width={640}
                  height={720}
                  className="w-full h-auto object-contain drop-shadow-md"
                  priority
                />
              </div>
            </div>

            {/* RIGHT — Content (7 cols) */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-0.5 text-[11px] font-bold tracking-wider text-blue-600 uppercase dark:border-blue-900/50 dark:bg-blue-950/80 dark:text-blue-400 shadow-2xs">
                OUR TEAM &amp; LEADERSHIP
              </div>

              {/* Heading */}
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Meet the minds behind <span className="text-blue-600 dark:text-blue-400">Hirance</span>
              </h2>

              {/* Subtitle */}
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg">
                A passionate group of engineers, designers, and hiring specialists building a faster, transparent, and candidate-first recruitment experience.
              </p>
            </div>

          </div>

          {/* Team Cards Slider Container (Compact height) */}
          <div className="relative mt-3 group px-2 sm:px-0">
            {/* Manual Left/Right Navigation Buttons */}
            <button
              onClick={() => scrollTeam("left")}
              aria-label="Scroll team left"
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-105 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 opacity-80 hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => scrollTeam("right")}
              aria-label="Scroll team right"
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-105 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 opacity-80 hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Scrollable track */}
            <div
              ref={teamScrollRef}
              onScroll={handleScroll}
              onMouseEnter={() => setIsTeamHovered(true)}
              onMouseLeave={handleMouseUpOrLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUpOrLeave}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsTeamHovered(true)}
              onTouchEnd={() => setIsTeamHovered(false)}
              className="flex gap-3.5 overflow-x-auto items-center py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none cursor-grab active:cursor-grabbing"
            >
              {[...teamMembers, ...teamMembers].map((member, idx) => {
                const isCenter = activeCenterIndex === idx;

                return (
                  <div
                    key={`${member.name}-${idx}`}
                    className={`group/card relative shrink-0 w-[160px] sm:w-[180px] lg:w-[190px] h-[210px] sm:h-[230px] overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-900 transition-all duration-500 ease-out ${isCenter
                      ? "scale-105 -translate-y-1.5 z-20 shadow-xl border-white/60 dark:border-blue-500/40 ring-2 ring-blue-500/20"
                      : "scale-95 z-0 shadow-sm border-slate-200/60 dark:border-slate-800 hover:scale-100 hover:-translate-y-1 hover:z-10 hover:shadow-md"
                      }`}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="190px"
                        className={`object-contain object-center transition-all duration-500 ${isCenter
                          ? "opacity-100 scale-105"
                          : "opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105"
                          }`}
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center transition-all duration-500 pb-12 ${isCenter
                          ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white"
                          : "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900 group-hover/card:from-blue-600 group-hover/card:to-slate-900"
                          }`}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-blue-600 shadow-sm dark:bg-slate-800/80 dark:text-blue-400">
                          <User className="h-8 w-8" />
                        </div>
                      </div>
                    )}

                    {/* Dark Black Gradient Bottom Overlay with Transparency */}
                    <div className="absolute inset-x-0 bottom-0 pt-12 pb-3.5 px-3.5 text-left bg-gradient-to-t from-black/95 via-black/75 to-transparent transition-all duration-300 pointer-events-none rounded-b-xl z-10">
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight drop-shadow-md">
                        {member.name}
                      </h4>
                      <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-slate-200 leading-tight drop-shadow-sm">
                        {member.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="relative border-t border-border/50 pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Header Row */}
          <div>
            {/* OUR VALUES Badge with Sparkle */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/90 px-3.5 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:border-blue-900/50 dark:bg-blue-950/80 dark:text-blue-400 shadow-xs">
              <svg viewBox="0 0 16 16" className="h-3 w-3 text-blue-500 fill-current" aria-hidden="true">
                <path d="M8 0l1.5 5.5L15 7l-5.5 1.5L8 14l-1.5-5.5L1 7l5.5-1.5z" />
              </svg>
              OUR VALUES
            </div>

            <h2 className="mt-3 flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground sm:text-2xl">
              <span>Our Core <span className="text-blue-600 dark:text-blue-400">Principles</span></span>
              {/* Blue rays accent icon */}

            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-sm">
              What drives our product and keeps us moving forward every day.
            </p>
          </div>

          {/* 3 Horizontal Cards Grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Card 1: Speed First */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400">
                <Zap className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Speed First</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  We believe in fast, simple and frictionless hiring for everyone.
                </p>
              </div>
            </div>

            {/* Card 2: Smart Match */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/70 dark:text-purple-400">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M6.1875 1C6.65168 0.999982 7.10512 1.13965 7.48883 1.40084C7.87255 1.66204 8.16878 2.03266 8.339 2.4645C8.23244 2.5658 8.14747 2.68761 8.08921 2.8226C8.03095 2.95759 8.00061 3.10298 8 3.25C8.00393 3.42798 8.0516 3.60227 8.13879 3.75748C8.22599 3.91269 8.35004 4.04406 8.5 4.14V12.5C8.5 12.8978 8.65804 13.2794 8.93934 13.5607C9.22064 13.842 9.60218 14 10 14H10.155C10.4746 14 10.7859 13.8978 11.0434 13.7085C11.3009 13.5192 11.4911 13.2526 11.5865 12.9475L11.773 12.351L11.803 12.276C11.8446 12.1931 11.9084 12.1233 11.9873 12.0746C12.0663 12.0258 12.1572 12 12.25 12C12.7141 12 13.1592 11.8156 13.4874 11.4874C13.8156 11.1592 14 10.7141 14 10.25V10C14 9.6795 13.924 9.3765 13.79 9.108C13.9458 9.19998 14.1248 9.24529 14.3056 9.23856C14.4864 9.23182 14.6615 9.17332 14.81 9.07C14.8213 9.06133 14.8323 9.05233 14.843 9.043C14.9469 9.35138 14.9999 9.6746 15 10V10.25C14.9998 10.9142 14.7593 11.5558 14.3228 12.0565C13.8863 12.5571 13.2834 12.8828 12.6255 12.9735L12.541 13.2455C12.3821 13.754 12.065 14.1985 11.6358 14.5141C11.2066 14.8297 10.6878 14.9999 10.155 15H10C9.61185 14.9999 9.22904 14.9095 8.88189 14.7358C8.53475 14.5622 8.23282 14.3101 8 13.9995C7.76718 14.3101 7.46525 14.5622 7.11811 14.7358C6.77096 14.9095 6.38815 14.9999 6 15H5.845C5.31225 14.9999 4.79344 14.8297 4.36423 14.5141C3.93503 14.1985 3.61787 13.754 3.459 13.2455L3.3745 12.9735C2.71655 12.8828 2.11365 12.5571 1.67719 12.0565C1.24072 11.5558 1.00018 10.9142 1 10.25V10C0.999961 9.48736 1.13129 8.98326 1.38145 8.5358C1.63162 8.08834 1.99227 7.71245 2.429 7.444C2.03408 7.12455 1.74584 6.69238 1.60266 6.20504C1.45947 5.71769 1.46813 5.19829 1.62749 4.71599C1.78684 4.23369 2.08933 3.81137 2.49468 3.50527C2.90003 3.19916 3.389 3.02379 3.8965 3.0025C3.9714 2.448 4.24486 1.93948 4.66614 1.57124C5.08743 1.20301 5.62796 1.00005 6.1875 1ZM6.1875 2C5.8394 2 5.50556 2.13828 5.25942 2.38442C5.01328 2.63056 4.875 2.9644 4.875 3.3125V3.5C4.875 3.63261 4.82232 3.75979 4.72855 3.85355C4.63479 3.94732 4.50761 4 4.375 4H4C3.60892 4.00011 3.23335 4.15296 2.95332 4.42596C2.6733 4.69896 2.51097 5.07054 2.50093 5.46149C2.49089 5.85244 2.63393 6.23185 2.89957 6.51887C3.16521 6.80589 3.53244 6.97781 3.923 6.998L4 7H4.5C4.63261 7 4.75979 7.05268 4.85355 7.14645C4.94732 7.24022 5 7.36739 5 7.5C5 7.63261 4.94732 7.75979 4.85355 7.85355C4.75979 7.94732 4.63261 8 4.5 8H4L3.897 8.0025C3.38505 8.0289 2.90279 8.25087 2.54977 8.62259C2.19676 8.9943 1.99996 9.48737 2 10V10.25C2 10.7141 2.18437 11.1592 2.51256 11.4874C2.84075 11.8156 3.28587 12 3.75 12C3.84278 12 3.93373 12.0258 4.01267 12.0746C4.09161 12.1233 4.15544 12.1931 4.197 12.276L4.227 12.351L4.4135 12.947C4.50876 13.2521 4.69902 13.5189 4.95653 13.7083C5.21404 13.8977 5.52533 13.9999 5.845 14H6C6.39782 14 6.77936 13.842 7.06066 13.5607C7.34196 13.2794 7.5 12.8978 7.5 12.5V3.3125C7.5 2.9644 7.36172 2.63056 7.11558 2.38442C6.86944 2.13828 6.5356 2 6.1875 2ZM14.2405 5.5C14.2782 5.4997 14.3149 5.51121 14.3457 5.53292C14.3765 5.55462 14.3997 5.58543 14.412 5.621L14.561 6.08C14.6079 6.21939 14.6864 6.34601 14.7906 6.44986C14.8947 6.55372 15.0215 6.63199 15.161 6.6785L15.6195 6.8285L15.629 6.83C15.6554 6.8394 15.6793 6.85477 15.6988 6.87493C15.7183 6.89508 15.7329 6.91947 15.7414 6.94619C15.7499 6.97291 15.7522 7.00123 15.7479 7.02895C15.7437 7.05668 15.7331 7.08304 15.717 7.106C15.6953 7.13664 15.6645 7.15972 15.629 7.172L15.169 7.3215C15.0298 7.36821 14.9033 7.44657 14.7994 7.55041C14.6956 7.65426 14.6172 7.78077 14.5705 7.92L14.4205 8.379C14.4078 8.41413 14.3846 8.44451 14.3541 8.46598C14.3235 8.48744 14.2871 8.49896 14.2498 8.49896C14.2124 8.49896 14.176 8.48744 14.1454 8.46598C14.1149 8.44451 14.0917 8.41413 14.079 8.379L13.9295 7.92C13.883 7.7802 13.8047 7.65312 13.7006 7.54882C13.5966 7.44451 13.4697 7.36583 13.33 7.319L12.871 7.17C12.8446 7.1606 12.8207 7.14523 12.8012 7.12507C12.7817 7.10492 12.7671 7.08053 12.7586 7.05381C12.7501 7.02709 12.7478 6.99877 12.7521 6.97105C12.7563 6.94333 12.7669 6.91696 12.783 6.894C12.8047 6.86336 12.8355 6.84028 12.871 6.828L13.33 6.6785C13.4677 6.63068 13.5925 6.55182 13.6948 6.44804C13.7971 6.34426 13.8742 6.21833 13.92 6.08L14.07 5.621C14.0823 5.58567 14.1052 5.55504 14.1357 5.53335C14.1661 5.51167 14.2026 5.50001 14.24 5.5M11.4835 0.5C11.5522 0.500347 11.619 0.521779 11.6751 0.561397C11.7312 0.601014 11.7737 0.656904 11.797 0.7215L12.0705 1.563C12.1558 1.81884 12.2995 2.05128 12.4902 2.24188C12.681 2.43247 12.9136 2.57598 13.1695 2.661L14.0115 2.9345L14.028 2.9385C14.0927 2.96168 14.1487 3.00419 14.1884 3.06027C14.2281 3.11635 14.2496 3.18328 14.25 3.252C14.25 3.3208 14.2286 3.3879 14.1889 3.44405C14.1491 3.5002 14.0929 3.54264 14.028 3.5655L13.186 3.839C12.9302 3.92409 12.6977 4.06762 12.507 4.25822C12.3163 4.44881 12.1727 4.68122 12.0875 4.937L11.8135 5.7785C11.7909 5.8435 11.7485 5.8998 11.6923 5.93952C11.6361 5.97924 11.5688 6.00039 11.5 6C11.4313 6.00002 11.3642 5.97873 11.3081 5.93906C11.2519 5.89939 11.2094 5.8433 11.1865 5.7785L10.9125 4.937C10.8278 4.68048 10.6844 4.44727 10.4937 4.25595C10.303 4.06463 10.0703 3.92049 9.814 3.835L8.972 3.5615C8.90731 3.53832 8.85131 3.49581 8.8116 3.43973C8.77189 3.38365 8.75038 3.31672 8.75 3.248C8.75002 3.1792 8.77139 3.1121 8.81115 3.05595C8.85091 2.9998 8.90711 2.95737 8.972 2.9345L9.814 2.661C10.0632 2.57497 10.2896 2.43326 10.4759 2.24664C10.6621 2.06002 10.8034 1.8334 10.889 1.584L10.896 1.563L11.1695 0.7215C11.1925 0.656622 11.235 0.600472 11.2913 0.560798C11.3475 0.521124 11.4147 0.499882 11.4835 0.5Z" fill="currentColor" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Smart Match</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  We use intelligent matching to connect the right people.
                </p>
              </div>
            </div>

            {/* Card 3: Human Respect */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400">
                <Users className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">Human Respect</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  We value people, their time and career goals &mdash; always.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dual Audience Section: Candidates & Employers (New Image Layout) */}

      {/* FAQ Section (Clean & Professional Accordion) */}




      <Footer />
    </main >
  );
}
