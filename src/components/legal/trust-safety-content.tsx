"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowUp,
  ChevronRight,
  ShieldCheck,
  Users,
  Building2,
  Lock,
  Eye,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Footer } from "@/components/shared/footer"

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  )
}

const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-[18px] sm:text-[20px] font-bold text-slate-900 dark:text-white mt-14 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800 tracking-[-0.01em] scroll-mt-28">
    {children}
  </h2>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[14.5px] leading-[1.8] text-slate-700 dark:text-slate-300 mt-4">{children}</p>
)

const BulletList = ({ items }: { items: (string | React.ReactNode)[] }) => (
  <ul className="space-y-2.5 mt-4 pl-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-[14.5px] leading-[1.75] text-slate-700 dark:text-slate-300">
        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

interface PillarCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const PillarCard = ({ icon, title, description }: PillarCardProps) => (
  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200">
    <div className="flex items-center gap-3 mb-3">
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
        {icon}
      </span>
      <p className="font-semibold text-[14.5px] text-slate-900 dark:text-white">{title}</p>
    </div>
    <p className="text-[14px] leading-[1.7] text-slate-600 dark:text-slate-300">{description}</p>
  </div>
)

const tocSections = [
  { id: "sec-mission", label: "Our Mission" },
  { id: "sec-candidates", label: "For Candidates" },
  { id: "sec-employers", label: "For Employers" },
  { id: "sec-data", label: "Data Protection" },
  { id: "sec-content", label: "Content Standards" },
  { id: "sec-pillars", label: "Trust Pillars" },
  { id: "sec-resources", label: "Resources" },
]

const TableOfContents = () => {
  const [activeId, setActiveId] = useState("")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    )
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])
  return (
    <aside className="hidden xl:block w-[240px] shrink-0 sticky top-28 self-start">
      <div className="pr-2">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-3">On this page</p>
        <nav className="space-y-0.5">
          {tocSections.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`block w-full text-left px-3 py-[7px] rounded-md text-[13px] font-medium transition-all duration-150 cursor-pointer
                ${activeId === id ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export function TrustSafetyContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-20 md:pt-24">
      <ReadingProgress />
      <ScrollToTop />

      {/* Hero */}
      <div className="bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="max-w-[820px]">
            <div className="flex items-center gap-1.5 text-[12.5px] text-slate-400 dark:text-slate-500 font-medium mb-5">
              <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              <span className="text-slate-600 dark:text-slate-400">Trust & Safety</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-[28px] sm:text-[36px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-[-0.02em]">
                Trust & Safety
              </h1>
            </div>
            <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-5">
              At Hirance, trust is not a feature — it is the foundation of everything we build. Here is how we keep our platform safe for candidates and employers alike.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[12px] font-semibold text-emerald-700 dark:text-emerald-400">
                Safe Platform Commitment
              </span>
              <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">Last updated: March 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="flex gap-12 items-start">
          <TableOfContents />
          <article className="flex-1 min-w-0 max-w-[820px]">

            <SectionHeading id="sec-mission">Our Mission</SectionHeading>
            <Para>
              Hirance is a next-generation swipe-based hiring platform, connecting candidates with verified employers through a transparent and direct process. Our mission is to make job searching safe, honest, and efficient for everyone.
            </Para>
            <Para>
              We invest deeply in trust and safety measures — from employer verification to data protection — because we understand that your career decisions depend on the integrity of our platform.
            </Para>

            {/* Candidates */}
            <SectionHeading id="sec-candidates">For Candidates</SectionHeading>
            <BulletList items={[
              "Hirance is 100% free for job seekers. We will never charge you to apply for a job.",
              "Your profile is only visible to verified employers — not to the public internet.",
              "You are in full control of your data. Pause your profile, delete it, or update it anytime.",
              "Our swipe-based model ensures you choose who you want to connect with.",
              "We verify employers before they can contact candidates, reducing fake job listings.",
              "Our support team is available to help if you ever feel unsafe or harassed.",
            ]} />

            {/* Employers */}
            <SectionHeading id="sec-employers">For Employers</SectionHeading>
            <BulletList items={[
              "All employers go through a verification process before gaining access to candidate profiles.",
              "Job listings are reviewed for compliance with our content standards before going live.",
              "Employer accounts showing abusive or fraudulent behaviour are suspended immediately.",
              "Candidate contact details are protected — employers cannot harvest or misuse them.",
              "We maintain transparency with candidates about which employers have viewed their profile.",
            ]} />

            {/* Data Protection */}
            <SectionHeading id="sec-data">Data Protection</SectionHeading>
            <Para>
              We handle your personal data with the highest care, in full compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
            </Para>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <PillarCard icon={<Lock className="w-4 h-4" />} title="Encryption" description="All data is encrypted in transit (TLS 1.3) and at rest using AES-256 industry-standard encryption." />
              <PillarCard icon={<Eye className="w-4 h-4" />} title="Minimal Data Collection" description="We collect only what is necessary to provide our services. No data is sold to third parties." />
              <PillarCard icon={<Users className="w-4 h-4" />} title="Access Controls" description="Role-based access controls ensure only authorised personnel can access user data." />
              <PillarCard icon={<ShieldCheck className="w-4 h-4" />} title="Security Audits" description="We conduct regular security assessments and have a responsible disclosure programme for researchers." />
            </div>

            {/* Content Standards */}
            <SectionHeading id="sec-content">Content Standards</SectionHeading>
            <Para>
              All job listings and employer profiles must comply with our content standards. We prohibit:
            </Para>
            <BulletList items={[
              "Misleading or fake job listings",
              "Discriminatory job requirements based on gender, religion, caste, or age (outside legal limits)",
              "Job offers that require upfront payment from candidates",
              "Listings for illegal activities or unregulated financial services",
              "Content that violates Indian law or our Terms and Conditions",
            ]} />
            <Para>
              Listings that violate these standards are removed within 24 hours of detection or reporting. Users who repeatedly violate our standards are permanently banned.
            </Para>

            {/* Pillars */}
            <SectionHeading id="sec-pillars">Our Trust Pillars</SectionHeading>
            <div className="mt-5 space-y-4">
              {[
                { icon: <Building2 className="w-4 h-4" />, title: "Verified Employers Only", description: "Every employer on Hirance is verified by our team before they can post jobs or contact candidates. We check business registration, contact details, and operational legitimacy." },
                { icon: <ShieldCheck className="w-4 h-4" />, title: "Zero Tolerance for Harassment", description: "Any form of harassment, discrimination, or inappropriate communication between users is grounds for immediate account suspension." },
                { icon: <Lock className="w-4 h-4" />, title: "Transparent AI Matching", description: "Our job matching algorithm is based solely on professional merit — skills, experience, and preferences. We do not discriminate based on personal characteristics." },
                { icon: <Eye className="w-4 h-4" />, title: "Ongoing Monitoring", description: "Our trust & safety team actively monitors the platform for policy violations, fake listings, and suspicious activity around the clock." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-[14.5px] text-slate-900 dark:text-white mb-1.5">{item.title}</p>
                    <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-[1.7]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Resources */}
            <SectionHeading id="sec-resources">Related Resources</SectionHeading>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {[
                { label: "Privacy Policy", href: "/privacy", desc: "How we collect and protect your data" },
                { label: "Terms & Conditions", href: "/terms", desc: "Rules governing use of the platform" },
                { label: "Fraud Alert", href: "/fraud-alert", desc: "Protect yourself from scams" },
                { label: "Grievances", href: "/grievances", desc: "Formal complaint redressal" },
                { label: "Vulnerability Disclosure", href: "/vulnerability-disclosure", desc: "Report security issues responsibly" },
                { label: "Contact Us", href: "/contact", desc: "Reach our team directly" },
              ].map((item) => (
                <Link key={item.label} href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-4 py-3.5 hover:border-blue-400 dark:hover:border-blue-600 transition-colors duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</p>
                    <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  )
}
