"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BellRing,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Smartphone,
  Mail,
  ChevronDown,
  MessageSquare,
  Briefcase,
  MapPin,
  User,
  Phone,
  Building2,
  Users,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/shared";
import { submitContactLead } from "@/lib/api/contact";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Tag Cloud Component ─── */
function JobTagCloud({
  items,
  initialShow,
  colorClass,
  getItemUrl,
}: {
  items: string[];
  initialShow: number;
  colorClass: string;
  getItemUrl: (item: string) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initialShow);
  const remaining = items.length - initialShow;
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {visible.map((item, index) => (
        <Link
          key={`${item}-${index}`}
          href={getItemUrl(item)}
          className={`group inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 cursor-pointer select-none ${colorClass}`}
        >
          <span className="underline-offset-2 group-hover:underline">{item}</span>
        </Link>
      ))}
      {!expanded && remaining > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="inline-flex items-center rounded-full border border-border/70 bg-white dark:bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
        >
          + {remaining} more
        </button>
      )}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="inline-flex items-center rounded-full border border-border/70 bg-white dark:bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
        >
          Show less
        </button>
      )}
    </div>
  );
}

/* ─── Data ─── */
const ALL_JOB_CATEGORIES = [
  "Delivery Person", "Marketing", "Business Development", "Accounts / Finance",
  "Cook / Chef / Baker", "Software / Web Developer", "Driver", "Human Resource",
  "Technician", "Back Office", "Beautician / Hair Stylist", "AC Technician",
  "Admin / Office Assistant", "Aircraft Maintainance", "Business Operations",
  "Carpenter", "Civil Engineer", "Content Writer", "Customer Support",
  "Data Entry", "Data Analyst", "Digital Marketing", "Electrician",
  "Event Management", "Fashion Designer", "Field Sales", "Graphic Designer",
  "Hotel Management", "Interior Designer", "IT Support", "Legal",
  "Logistics", "Mechanic", "Medical / Healthcare", "Mobile Repair",
  "Operations", "Pharmacist", "Photography", "Plumber", "PR / Communications",
  "Product Manager", "Project Manager", "Quality Control", "Real Estate",
  "Receptionist", "Retail / Store", "Security Guard", "SEO Specialist",
  "Social Media", "Supply Chain", "Teacher / Trainer", "Telecaller",
  "Tour & Travel", "UI/UX Designer", "Video Editor", "Warehouse",
  "Web Designer", "Welding", "Wire Man",
];

const ALL_CITIES = [
  "Agra", "Ahmadnagar", "Ahmedabad", "Ajmer", "Akola", "Aligarh",
  "Allahabad", "Alwar", "Ambala", "Amravati", "Amritsar", "Anand",
  "Anantapur", "Arrah", "Asansol", "Aurangabad", "Bangalore", "Bareilly",
  "Belgaum", "Bhilai", "Bhopal", "Bhubaneswar", "Bikaner", "Chennai",
  "Coimbatore", "Cuttack", "Dehradun", "Delhi NCR", "Dhanbad", "Durgapur",
  "Faridabad", "Ghaziabad", "Gorakhpur", "Guntur", "Gurgaon", "Guwahati",
  "Gwalior", "Hubli", "Hyderabad", "Indore", "Jabalpur", "Jaipur",
  "Jalandhar", "Jammu", "Jamshedpur", "Jodhpur", "Kanpur", "Kochi",
  "Kolkata", "Kota", "Kozhikode", "Lucknow", "Ludhiana", "Madurai",
  "Mangalore", "Meerut", "Mumbai", "Mysore", "Nagpur", "Nashik",
  "Navi Mumbai", "Noida", "Patna", "Pune", "Raipur", "Rajkot",
  "Ranchi", "Salem", "Srinagar", "Surat", "Thane", "Thiruvananthapuram",
  "Tiruchirappalli", "Udaipur", "Vadodara", "Varanasi", "Vijayawada",
  "Visakhapatnam", "Remote / Work From Home",
];

const POPULAR_ROLES = [
  "Frontend Developer",
  "Full Stack Developer",
  "React Developer",
  "Sales Executive",
  "Telecaller / Inside Sales",
  "Human Resources (HR)",
  "Business Development (BDM)",
  "Data Analyst",
  "Graphic / UI Designer",
  "Accountant",
  "Customer Support Associate",
];

const POPULAR_CITIES = [
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Remote / Work From Home",
];

const FAQS = [
  {
    question: "Is the Hirance Job Alert service completely free?",
    answer:
      "Yes, 100% free! Job seekers on Hirance never pay a rupee for job alerts or applying to verified employers.",
  },
  {
    question: "How fast will I receive job alerts after a new vacancy is posted?",
    answer:
      "Instantly! As soon as a verified employer posts a job matching your preferences, our system sends a notification to your registered WhatsApp or Email within seconds.",
  },
  {
    question: "Can I stop or update my job alert preferences later?",
    answer:
      "Yes, you can pause, edit, or customize your preferred roles, locations, and alert frequency anytime with a single tap in your Hirance account.",
  },
  {
    question: "Will I get spammed with irrelevant job alerts?",
    answer:
      "No. Hirance uses AI Match Scoring to strictly filter job alerts so you only receive genuine openings tailored to your specific roles and city choices.",
  },
];

export function JobAlertsContent() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState(ALL_JOB_CATEGORIES[0]);
  const [selectedCity, setSelectedCity] = useState(ALL_CITIES[16]); // Bangalore
  const [experience, setExperience] = useState("Freshers (0-1 yrs)");
  const [channel, setChannel] = useState<"whatsapp" | "email" | "both">("whatsapp");
  const [contactValue, setContactValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getCategoryUrl = (category: string) => {
    return `/jobs?search=${encodeURIComponent(category)}`;
  };

  const getCityUrl = (city: string) => {
    if (city.toLowerCase().includes("remote") || city.toLowerCase().includes("work from home")) {
      return "/jobs/work-from-home-jobs";
    }
    const slug = city
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `/jobs/jobs-in-${slug}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim() || !nameValue.trim()) return;

    setIsSubmitting(true);
    try {
      // Passes name, email, default subject, message, role, and city to backend API
      await submitContactLead({
        name: nameValue,
        email: contactValue,

        subject: "Free Job Alert Subscription",
        message: `Free Job Alert lead. Candidate Name: ${nameValue}`,
      });
    } catch {
      // Continue gracefully
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-clip bg-white dark:bg-background text-foreground pt-24 sm:pt-24">

      {/* HERO — Centered heading + 2-col below matching Image 1 */}
      <section className="relative overflow-hidden pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── TOP: Full-width centered heading ── */}
          <div className="text-center mb-6 sm:mb-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50/80 dark:bg-brand-950/40 px-3.5 py-1.5 text-xs font-bold text-brand-700 dark:text-brand-300 shadow-xs">
              <BellRing className="h-4 w-4 text-brand-600 dark:text-brand-400 animate-bounce" />
              <span>Instant Hiring Alerts</span>
            </div>

            <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Get Free Job Alerts on{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-brand-600 to-indigo-600 dark:from-emerald-400 dark:via-brand-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Email
              </span>
            </h1>
          </div>

          {/* ── BOTTOM: 2-col grid on desktop (lg+), stacked full-width layout on tablet/mobile ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-10 items-stretch">

            {/* LEFT SECTION */}
            <div className="flex flex-col justify-between gap-6 sm:gap-8 h-full py-2">

              {/* Main Heading (Left side) */}
              <h2 className="text-xl sm:text-2xl lg:text-[1.25rem] font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.2] w-full">
                Get verified job openings matching your skills, delivered straight to Email.
              </h2>

              {/* Middle: Features + Phone Image */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end">

                {/* Features */}
                <div className="flex flex-col gap-6 sm:gap-7 pb-2 sm:pb-6 z-20 mt-2">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                      <Zap className="h-6 w-6 fill-blue-600 dark:fill-blue-400" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-slate-900 dark:text-white leading-tight">Alerts within seconds</p>
                      <p className="text-sm text-muted-foreground leading-tight mt-0.5">of a new posting</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                      <Sparkles className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-slate-900 dark:text-white leading-tight">AI-filtered</p>
                      <p className="text-sm text-muted-foreground leading-tight mt-0.5">— only roles relevant to you</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-slate-900 dark:text-white leading-tight">Verified employers,</p>
                      <p className="text-sm text-muted-foreground leading-tight mt-0.5">zero consultancy fee</p>
                    </div>
                  </div>
                </div>

                {/* Graphic Image */}
                <div className="relative mx-auto sm:ml-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] flex items-end justify-center sm:justify-end pointer-events-none -mb-3 sm:-mb-5 z-10 translate-y-3 sm:translate-y-5">
                  <Image
                    src="/images/job_alerts.png"
                    alt="Job Alert Notification"
                    width={420}
                    height={320}
                    className="w-full h-auto object-contain drop-shadow-2xl sm:scale-110 origin-bottom"
                    priority
                  />
                </div>
              </div>

              {/* Stats Container */}
              <div className="relative z-20 rounded-2xl border border-border/60 bg-white dark:bg-card p-4 sm:p-5 shadow-xs grid grid-cols-3 divide-x divide-border/50 gap-2 sm:gap-4 mt-0">
                {/* Stat 1 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 px-1 sm:px-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-none">500K+</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Job Seekers</p>
                    <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">Active & ready</p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 pl-3 sm:pl-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-none">10K+</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Verified Jobs</p>
                    <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">From companies</p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 pl-3 sm:pl-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-none">229</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Cities</p>
                    <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">Across India</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SECTION: Form card */}
            <div ref={formRef} className="flex flex-col justify-between h-full rounded-2xl border border-border/70 bg-card p-6 sm:p-8 lg:p-7 shadow-xl backdrop-blur-xl max-w-xl mx-auto w-full lg:max-w-none">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col flex-1 items-center justify-center py-10 text-center space-y-4"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">Alert Activated! 🎉</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We'll send fresh <strong>{selectedRole}</strong> jobs in <strong>{selectedCity}</strong> straight to your WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setIsSubmitted(false); setContactValue(""); setNameValue(""); }}
                    className="mt-2 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-muted/60 px-5 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    Create Another Alert
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between gap-5">
                  <div className="pb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Activate Free Job Alerts</h3>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">Fill in your details — takes 30 seconds.</p>
                  </div>

                  {/* Fields — with inner icons */}
                  <div className="flex flex-col gap-3 flex-1 justify-center">

                    {/* Name */}
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        className="h-11 w-full rounded-xl border border-border/80 bg-background/70 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    {/* Job Role */}
                    <div className="relative">
                      <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="h-11 w-full rounded-xl border border-border/80 bg-background/70 pl-10 pr-4 text-sm font-medium text-foreground focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                      >
                        {ALL_JOB_CATEGORIES.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    {/* City */}
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="h-11 w-full rounded-xl border border-border/80 bg-background/70 pl-10 pr-4 text-sm font-medium text-foreground focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                      >
                        {ALL_CITIES.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        placeholder="Email id"
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        className="h-11 w-full rounded-xl border border-border/80 bg-background/70 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                  </div>

                  {/* Submit button + privacy note */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-brand-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Activating...</span>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 fill-white" />
                          <span>Get Free Job Alerts Now</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground font-medium">
                      <Lock className="h-3.5 w-3.5 text-muted-foreground/80" />
                      <span>No spam. Unsubscribe anytime.</span>
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* BROWSE JOBS SECTION — Redesigned with Image */}
      <section className="py-8 sm:py-12 border-t border-border/40 overflow-hidden relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/60 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-background shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 p-6 sm:p-8 lg:p-10">

            {/* Content */}
            <div className="relative z-10 flex-1 max-w-xl space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
                  Explore thousands of <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">verified jobs.</span>
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Find the perfect role matching your skills across 200+ categories and 229 cities in India. Say goodbye to spam and hello to your next big career move.
                </p>
              </div>

              <div>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 text-sm font-bold transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                >
                  View all openings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Image Illustration */}
            <div className="relative z-10 w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[360px] shrink-0">
              <div className="relative w-full drop-shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <Image
                  src="/images/openings.png"
                  alt="Explore Jobs Illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain max-h-[260px] sm:max-h-[320px]"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY HIRANCE JOB ALERTS GRID */}

      <section className="py-10 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Why 500,000+ Job Seekers Trust{" "}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Hirance Alerts
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Get an unfair advantage in your job search with real-time notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">First to Apply</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Be among the first 10 applicants to respond. Candidates who apply within 1 hour get 3x higher interview callbacks.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">100% Verified HRs</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every job alert features active openings from verified corporate hiring managers and recruiters. Zero consultancy charges.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">AI Smart Matching</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Our AI algorithm filters out irrelevant posts, ensuring every alert strictly matches your target role, salary, and city.
              </p>
            </div>
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
              Everything you need to know about Hirance Job Alerts.
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
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 transition-transform duration-200 ${isOpen ? "rotate-180 bg-brand-600 text-white dark:text-white" : ""
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

      {/* JOB CATEGORIES SECTION */}
      <section className="py-14 sm:py-10 border-t border-border/40 bg-[#f0f4f8] dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
            Jobs available in <strong>200+ categories</strong> including
          </h2>
          <JobTagCloud
            items={ALL_JOB_CATEGORIES}
            initialShow={15}
            colorClass="bg-brand-600 dark:bg-brand-700 text-white hover:bg-brand-700 dark:hover:bg-brand-600"
            getItemUrl={getCategoryUrl}
          />
        </div>
      </section>

      {/* CITIES SECTION */}
      <section className="py-14 sm:py-10 border-t border-border/40 bg-[#f0f4f8] dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
            Jobs available in <strong>229 cities</strong>
          </h2>
          <JobTagCloud
            items={ALL_CITIES}
            initialShow={15}
            colorClass="bg-brand-600 dark:bg-brand-700 text-white hover:bg-brand-700 dark:hover:bg-brand-600"
            getItemUrl={getCityUrl}
          />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
