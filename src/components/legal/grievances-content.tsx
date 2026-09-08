"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowUp,
  ChevronRight,
  MessageSquare,
  Clock,
  CheckCircle,
  Mail,
  UserCheck,
  ArrowRight,
  Scale,
  PhoneCall,
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
      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
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
        <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-blue-600 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const tocSections = [
  { id: "sec-overview", label: "Overview" },
  { id: "sec-officer", label: "Grievance Officer" },
  { id: "sec-how-to-file", label: "How to File" },
  { id: "sec-timeline", label: "Response Timeline" },
  { id: "sec-escalation", label: "Escalation" },
  { id: "sec-rights", label: "Your Rights" },
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

export function GrievancesContent() {
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
              <span className="text-slate-600 dark:text-slate-400">Grievances</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shrink-0">
                <MessageSquare className="w-5 h-5" />
              </span>
              <h1 className="text-[28px] sm:text-[36px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-[-0.02em]">
                Grievance Redressal
              </h1>
            </div>
            <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-5">
              We are committed to addressing every concern you raise. File a grievance and our dedicated team will respond within the timelines mandated by the IT Act, 2000.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[12px] font-semibold text-blue-700 dark:text-blue-400">IT Act, 2000 Compliant</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[12px] font-semibold text-slate-700 dark:text-slate-300">DPDP Act, 2023</span>
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

            <SectionHeading id="sec-overview">Overview</SectionHeading>
            <Para>
              Airation Softtech Private Limited (&quot;Hirance&quot;) has established a formal grievance redressal mechanism in compliance with the Information Technology Act, 2000, the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Digital Personal Data Protection Act, 2023.
            </Para>
            <Para>
              Any user — candidate, employer, or visitor — who has a complaint regarding the content on the Platform, a violation of their data rights, an account issue, or any other concern may raise a formal grievance using the channels listed below.
            </Para>

            {/* Grievance Officer */}
            <SectionHeading id="sec-officer">Grievance Officer</SectionHeading>
            <Para>
              In accordance with Rule 3(2) of the IT (Intermediary Guidelines) Rules, 2021 and Section 5 of the DPDP Act, 2023, Hirance has appointed a Grievance Officer:
            </Para>
            <div className="mt-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-bold text-[15px] text-slate-900 dark:text-white">Grievance Officer</p>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400">Airation Softtech Private Limited</p>
                </div>
              </div>
              <div className="space-y-2 text-[14px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
                <p>Name: <span className="font-semibold text-slate-800 dark:text-slate-200">Grievance Officer, Hirance</span></p>
                <p>Email: <a href="mailto:grievance@hirance.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">grievance@hirance.com</a></p>
                <p>Alternate: <a href="mailto:airation.it@gmail.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">airation.it@gmail.com</a></p>
                <p>Address: 8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh, India</p>
                <p>Working hours: Monday – Friday, 10:00 AM – 6:00 PM IST</p>
              </div>
            </div>

            {/* How to File */}
            <SectionHeading id="sec-how-to-file">How to File a Grievance</SectionHeading>
            <Para>You may file a grievance through any of the following methods:</Para>
            <div className="mt-5 space-y-3">
              {[
                { step: "1", icon: <Mail className="w-4 h-4" />, title: "Email the Grievance Officer", desc: "Send a detailed email to grievance@hirance.com with your name, contact details, nature of the grievance, and relevant evidence." },
                { step: "2", icon: <PhoneCall className="w-4 h-4" />, title: "Contact Page", desc: "Use the Contact Us form at hirance.com/contact to raise your concern. Select 'Grievance' as the topic." },
                { step: "3", icon: <Scale className="w-4 h-4" />, title: "Written Communication", desc: "Send a formal written complaint to our registered address at 8/4, Sector-4, Jankipuram, Lucknow – 226021." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white text-[13px] font-bold shrink-0">{item.step}</span>
                  <div>
                    <p className="font-semibold text-[14.5px] text-slate-900 dark:text-white mb-1">{item.title}</p>
                    <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-[1.7]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Para>When filing your grievance, please include:</Para>
            <BulletList items={[
              "Your full name and registered email address or phone number",
              "A clear description of the issue or concern",
              "Relevant screenshots, URLs, or reference numbers",
              "The outcome you are seeking",
            ]} />

            {/* Timeline */}
            <SectionHeading id="sec-timeline">Response Timeline</SectionHeading>
            <Para>
              All grievances are handled in accordance with the timelines prescribed under the IT (Intermediary Guidelines) Rules, 2021:
            </Para>
            <div className="mt-5 space-y-3">
              {[
                { label: "Acknowledgement", time: "Within 24 hours of receipt", icon: <CheckCircle className="w-4 h-4 text-emerald-600" /> },
                { label: "Resolution (General Complaints)", time: "Within 15 days", icon: <Clock className="w-4 h-4 text-blue-600" /> },
                { label: "Resolution (Data-Related Complaints)", time: "Within 30 days (DPDP Act)", icon: <Clock className="w-4 h-4 text-amber-600" /> },
                { label: "Illegal / Harmful Content Removal", time: "Within 24 hours", icon: <CheckCircle className="w-4 h-4 text-emerald-600" /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-5 py-4">
                  {item.icon}
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Escalation */}
            <SectionHeading id="sec-escalation">Escalation</SectionHeading>
            <Para>
              If you are not satisfied with the resolution provided by our Grievance Officer, you may escalate your complaint to the following authorities:
            </Para>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  <p className="font-semibold text-[14.5px] text-slate-900 dark:text-white">Data Protection Board of India</p>
                </div>
                <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-[1.7]">For complaints related to the processing of personal data under the Digital Personal Data Protection Act, 2023.</p>
                <a href="https://www.meity.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-[13px] text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  MeitY — meity.gov.in <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  <p className="font-semibold text-[14.5px] text-slate-900 dark:text-white">National Consumer Disputes Redressal Commission</p>
                </div>
                <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-[1.7]">For complaints relating to consumer rights under the Consumer Protection Act, 2019.</p>
                <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-[13px] text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  consumerhelpline.gov.in <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Rights */}
            <SectionHeading id="sec-rights">Your Rights</SectionHeading>
            <Para>
              As a user of the Hirance platform, you have the right to:
            </Para>
            <BulletList items={[
              "Access personal data we hold about you",
              "Correct inaccurate or outdated personal data",
              "Request deletion of your personal data (right to erasure)",
              "Withdraw consent for processing at any time",
              "Lodge a complaint with the Data Protection Board of India",
              "Seek a remedy for grievances without prejudice to your legal rights",
            ]} />
            <Para>
              To exercise any of these rights, contact our Grievance Officer at <a href="mailto:grievance@hirance.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">grievance@hirance.com</a> or refer to our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Privacy Policy</Link> for full details.
            </Para>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  )
}
