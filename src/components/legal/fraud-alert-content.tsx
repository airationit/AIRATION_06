"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowUp,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
  PhoneCall,
  Eye,
  Flag,
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
      <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
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
        <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-red-500 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const tocSections = [
  { id: "sec-intro", label: "Introduction" },
  { id: "sec-red-flags", label: "Red Flags" },
  { id: "sec-official", label: "Official Channels" },
  { id: "sec-protect", label: "Protect Yourself" },
  { id: "sec-report", label: "Report Fraud" },
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
                ${activeId === id ? "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export function FraudAlertContent() {
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
              <span className="text-slate-600 dark:text-slate-400">Fraud Alert</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-600 text-white shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h1 className="text-[28px] sm:text-[36px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-[-0.02em]">
                Fraud Alert
              </h1>
            </div>
            <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-5">
              Protect yourself from scammers who impersonate Hirance or post fake job offers. Learn how to identify fraud and report it immediately.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-[12px] font-semibold text-red-700 dark:text-red-400">
                Important Safety Notice
              </span>
              <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">Last updated: March 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Banner */}
      <div className="bg-red-600 text-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-[14px] font-medium">
            <strong>Hirance never charges candidates</strong> for job applications, job guarantees, or placement services. Any such demand is fraudulent.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="flex gap-12 items-start">
          <TableOfContents />
          <article className="flex-1 min-w-0 max-w-[820px]">

            <SectionHeading id="sec-intro">Introduction</SectionHeading>
            <Para>
              We are aware that fraudsters sometimes impersonate Hirance or claim to represent our platform to deceive job seekers. These scammers may use fake websites, WhatsApp messages, phone calls, or emails to lure candidates with false promises of employment.
            </Para>
            <Para>
              Hirance is committed to your safety. We will never ask you for money to process job applications, guarantee placement, or conduct interviews. Please read this page carefully to protect yourself.
            </Para>

            {/* Red Flags */}
            <SectionHeading id="sec-red-flags">Red Flags — Signs of a Scam</SectionHeading>
            <Para>Be cautious if you encounter any of the following:</Para>
            <div className="mt-5 space-y-3">
              {[
                "You are asked to pay a fee (registration, training, background check, or placement fee) to secure a job",
                "The job offer arrives unsolicited — you never applied to the company",
                "The recruiter contacts you only on WhatsApp or personal phone numbers, not official email",
                "The email domain is not @hirance.com (e.g., hirance.jobs@gmail.com or hirance.hiring@yahoo.com)",
                "The job offer promises an unusually high salary for minimal qualifications",
                "You are asked to provide Aadhaar, PAN, or bank account details before any formal offer letter",
                "The interview is conducted exclusively over chat with no video call",
                "You receive a fake offer letter via WhatsApp PDF asking for document charges",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 px-4 py-3.5">
                  <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-[14px] leading-[1.7] text-slate-700 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            {/* Official Channels */}
            <SectionHeading id="sec-official">Hirance&apos;s Official Channels</SectionHeading>
            <Para>All legitimate Hirance communications happen exclusively through these verified channels:</Para>
            <div className="mt-5 space-y-3">
              {[
                { label: "Website", value: "hirance.com", icon: <Eye className="w-4 h-4 text-emerald-600" /> },
                { label: "Official Email Domain", value: "@hirance.com only", icon: <Mail className="w-4 h-4 text-emerald-600" /> },
                { label: "Support Email", value: "hello@hirance.com", icon: <Mail className="w-4 h-4 text-emerald-600" /> },
                { label: "Contact Number", value: "+91 9793780913", icon: <PhoneCall className="w-4 h-4 text-emerald-600" /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 px-5 py-4">
                  {item.icon}
                  <div className="flex-1">
                    <p className="text-[13px] text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="text-[14.5px] font-semibold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>

            {/* Protect Yourself */}
            <SectionHeading id="sec-protect">Protect Yourself</SectionHeading>
            <Para>Follow these steps to stay safe while your job search:</Para>
            <BulletList items={[
              "Always verify a company's legitimacy before sharing personal documents",
              "Never pay any fee in exchange for a job offer or interview opportunity",
              "Use only the official Hirance app (download from Google Play Store) to apply for jobs",
              "Cross-check recruiter email addresses — legitimate recruiters use @hirance.com",
              "If offered a job by phone, request a formal offer letter on official letterhead",
              "Do not share your OTP, bank account details, or Aadhaar number with anyone claiming to be from Hirance",
              "Trust your instincts — if something feels wrong, it probably is",
            ]} />

            {/* Report Fraud */}
            <SectionHeading id="sec-report">Report Fraud</SectionHeading>
            <Para>If you have encountered or suspect fraud involving the Hirance name, please report it immediately:</Para>
            <div className="mt-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
                  <Flag className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-bold text-[15px] text-slate-900 dark:text-white">Report to Hirance</p>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400">We take all fraud reports seriously and act swiftly</p>
                </div>
              </div>
              <div className="space-y-2 text-[14px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
                <p>Email: <a href="mailto:fraud@hirance.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">fraud@hirance.com</a></p>
                <p>General: <a href="mailto:hello@hirance.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">hello@hirance.com</a></p>
                <p>Phone: <a href="tel:+919793780913" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">+91 9793780913</a></p>
                <p>Contact form: <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">hirance.com/contact</Link></p>
              </div>
              <p className="mt-4 text-[13px] text-slate-500 dark:text-slate-400">
                You may also report suspected cybercrime to the National Cybercrime Reporting Portal at{" "}
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">cybercrime.gov.in</a>
                {" "}or call the helpline: <strong>1930</strong>.
              </p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  )
}
