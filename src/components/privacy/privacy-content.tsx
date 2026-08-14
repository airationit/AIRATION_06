"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUp,
  ChevronRight,
  FileText,
  Info,
  List,
  Scale,
  X,
} from "lucide-react"
import { Footer } from "@/components/shared/footer"

/* ───────────────────────── Reading Progress Bar ───────────────────────── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-brand-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/* ───────────────────────── Scroll-to-Top Button ───────────────────────── */
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
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-blue-600 text-white
                 shadow-lg shadow-blue-500/25 flex items-center justify-center
                 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30
                 active:scale-95 transition-all duration-200 cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  )
}

/* ───────────────────────── Callout Box ───────────────────────── */
interface CalloutProps {
  type?: "note" | "legal" | "important" | "warning" | "response"
  label: string
  children: React.ReactNode
}

const Callout = ({ type = "note", label, children }: CalloutProps) => {
  const palette = {
    legal: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-l-blue-600 dark:border-l-blue-400",
      text: "text-blue-700 dark:text-blue-300",
      icon: <Scale className="w-4 h-4 stroke-[2]" />,
    },
    important: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-l-amber-600 dark:border-l-amber-400",
      text: "text-amber-800 dark:text-amber-300",
      icon: <Info className="w-4 h-4 stroke-[2]" />,
    },
    warning: {
      bg: "bg-orange-50 dark:bg-orange-950/40",
      border: "border-l-orange-600 dark:border-l-orange-400",
      text: "text-orange-900 dark:text-orange-300",
      icon: <AlertTriangle className="w-4 h-4 stroke-[2]" />,
    },
    note: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-l-emerald-600 dark:border-l-emerald-400",
      text: "text-emerald-800 dark:text-emerald-300",
      icon: <FileText className="w-4 h-4 stroke-[2]" />,
    },
    response: {
      bg: "bg-purple-50 dark:bg-purple-950/40",
      border: "border-l-purple-600 dark:border-l-purple-400",
      text: "text-purple-800 dark:text-purple-300",
      icon: <Info className="w-4 h-4 stroke-[2]" />,
    },
  }
  const s = palette[type] || palette.note

  return (
    <div
      className={`${s.bg} border-l-[3px] ${s.border} rounded-r-lg px-5 py-4 my-6`}
    >
      <div
        className={`flex items-center gap-2.5 font-semibold text-[15px] mb-1.5 ${s.text}`}
      >
        {s.icon} <span>{label}</span>
      </div>
      <p className="text-[14.5px] leading-[1.75] text-slate-700 dark:text-slate-300">
        {children}
      </p>
    </div>
  )
}

/* ───────────────────────── Section Headings & Content ───────────────────────── */
const SectionHeading = ({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) => (
  <h2
    id={id}
    className="text-[18px] sm:text-[20px] font-bold text-slate-900 dark:text-white mt-14 mb-4
               pb-3 border-b border-slate-200 dark:border-slate-800 tracking-[-0.01em]
               scroll-mt-28"
  >
    {children}
  </h2>
)

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[16px] sm:text-[17px] font-semibold text-slate-800 dark:text-slate-100 mt-8 mb-3">
    {children}
  </h3>
)

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5 mt-4 pl-1">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start gap-3 text-[14.5px] leading-[1.75] text-slate-700 dark:text-slate-300"
      >
        <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-blue-600 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[14.5px] leading-[1.8] text-slate-700 dark:text-slate-300 mt-4 text-justify">
    {children}
  </p>
)

const DataTable = ({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) => (
  <div className="overflow-x-auto mt-6 mb-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
    <table className="w-full text-[14px]">
      <thead>
        <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          {headers.map((h, i) => (
            <th
              key={i}
              className={`text-left px-5 py-3.5 font-semibold text-slate-900 dark:text-white text-[13.5px] uppercase tracking-wide
                          ${i === 0 ? "w-[180px] sm:w-[220px]" : ""}`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className={`border-b border-slate-100 dark:border-slate-800/80 last:border-b-0
                        ${i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/50 dark:bg-slate-800/20"}
                        hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors duration-150`}
          >
            {row.map((cell, j) => (
              <td
                key={j}
                className={`px-5 py-4 align-top leading-[1.7] text-[14px]
                            ${j === 0 ? "font-semibold text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-300"}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/* ───────────────────────── Table of Contents ───────────────────────── */
const tocSections = [
  { id: "sec-legal-basis", label: "Legal Basis" },
  { id: "sec-1", label: "1. Definitions" },
  { id: "sec-2", label: "2. Objective & Scope" },
  { id: "sec-3", label: "3. Data We Collect" },
  { id: "sec-4", label: "4. Legal Bases" },
  { id: "sec-5", label: "5. How We Use Data" },
  { id: "sec-6", label: "6. Automated Decisions" },
  { id: "sec-7", label: "7. Profile Visibility" },
  { id: "sec-8", label: "8. Payments & Refunds" },
  { id: "sec-9", label: "9. Identity Verification" },
  { id: "sec-10", label: "10. Data Sharing" },
  { id: "sec-11", label: "11. Cookies" },
  { id: "sec-12", label: "12. Fraud Prevention" },
  { id: "sec-13", label: "13. Data Retention" },
  { id: "sec-14", label: "14. Your Rights" },
  { id: "sec-15", label: "15. Security Measures" },
  { id: "sec-16", label: "16. Children's Data" },
  { id: "sec-17", label: "17. Policy Updates" },
  { id: "sec-18", label: "18. Grievance Officer" },
]

const TableOfContents = () => {
  const [activeId, setActiveId] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

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
    setMobileOpen(false)
  }, [])

  const linkList = (
    <nav className="space-y-0.5">
      {tocSections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`block w-full text-left px-3 py-[7px] rounded-md text-[13px] font-medium transition-all duration-150 cursor-pointer
            ${
              activeId === id
                ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
        >
          {label}
        </button>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile TOC toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-8 left-6 z-50 flex items-center gap-2
                   bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-full px-4 py-2.5
                   text-[13px] font-semibold text-slate-800 dark:text-slate-100
                   hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <List className="w-4 h-4 stroke-[2.5]" /> Contents
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-[70]">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-2xl max-h-[70vh] overflow-y-auto p-5 pt-4 shadow-2xl animate-slide-up border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[15px] text-slate-900 dark:text-white">
                Table of Contents
              </h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
            {linkList}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden xl:block w-[240px] shrink-0">
        <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-3">
            On this page
          </p>
          {linkList}
        </div>
      </aside>
    </>
  )
}

/* ───────────────────────── MAIN CONTENT COMPONENT ───────────────────────── */
export function PrivacyPolicyContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-20 md:pt-24">
      <ReadingProgress />
      <ScrollToTop />

      {/* ─── Page Hero ─── */}
      <div className="bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="max-w-[820px]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[12.5px] text-slate-400 dark:text-slate-500 font-medium mb-5">
              <Link
                href="/"
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              <span className="text-slate-600 dark:text-slate-400">
                Privacy Policy
              </span>
            </div>

            <h1 className="text-[28px] sm:text-[36px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-[-0.02em] mb-2">
              Privacy Policy
            </h1>
            <p className="text-[15px] text-slate-500 dark:text-slate-400 font-medium mb-5">
              Candidate / Job Seeker
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                Airation Softtech Pvt. Ltd.
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[12px] font-semibold text-blue-600 dark:text-blue-400">
                v1.0
              </span>
              <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">
                Last updated: 24 March 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Body: TOC + Content ─── */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="flex gap-12 items-start">
          {/* Desktop Table of Contents */}
          <TableOfContents />

          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-[820px]">
            {/* Intro */}
            <Para>
              This Privacy Policy (&quot;<strong>Privacy Policy</strong>&quot;) is
              published by <strong>Airation Softtech Private Limited</strong>, a
              company incorporated under the Companies Act, 2013, with its
              registered office at 8/4, Sector-4, Jankipuram, Lucknow – 226021,
              Uttar Pradesh, India (&quot;<strong>Airation</strong>&quot;,&quot;
              <strong>we</strong>&quot;, &quot;<strong>us</strong>&quot;, or &quot;
              <strong>our</strong>&quot;). This Privacy Policy governs the
              collection, use, storage, processing, disclosure, and protection of
              Personal Data submitted by candidates and job seekers (&quot;
              <strong>you</strong>&quot;, &quot;<strong>your</strong>&quot;, or
              &quot;<strong>User</strong>&quot;) who access or use our Platform and
              Services.
            </Para>
            <Para>
              This Privacy Policy is issued in compliance with the Digital Personal
              Data Protection Act, 2023 (&quot;<strong>DPDP Act</strong>&quot;), the
              Information Technology Act, 2000 (&quot;<strong>IT Act</strong>&quot;),
              the Information Technology (Reasonable Security Practices and
              Procedures and Sensitive Personal Data or Information) Rules, 2011
              (&quot;<strong>SPDI Rules</strong>&quot;), and all other applicable
              Indian laws and regulations governing data privacy and protection.
            </Para>
            <Para>
              By registering on the Platform, creating a candidate profile, or
              otherwise using our Services, you acknowledge that you have read,
              understood, and unconditionally agree to be bound by this Privacy Policy.
              If you do not agree with any provision of this Privacy Policy, you must
              immediately discontinue use of the Platform.
            </Para>
            <Para>
              This Privacy Policy must be read in conjunction with our Terms and
              Conditions, Intellectual Property Policy, Cookie Policy, and any other
              policies published on the Platform. In the event of any conflict
              between this Privacy Policy and any other policy with respect to data
              protection matters, this Privacy Policy shall prevail.
            </Para>

            {/* Legal Basis */}
            <SectionHeading id="sec-legal-basis">Legal Basis</SectionHeading>
            <Para>
              This Privacy Policy is compliant with the Digital Personal Data
              Protection Act, 2023 (India), the Information Technology Act, 2000,
              the IT (SPDI) Rules 2011, and applicable provisions of international
              data protection standards including principles aligned with the GDPR
              where relevant to cross-border data flows involving Indian citizens.
            </Para>

            <div className="mt-6 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-slate-900 dark:text-white text-[14.5px] mb-2">
                Contact Information
              </p>
              <div className="space-y-1 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Airation Softtech Private Limited
                </p>
                <p>
                  8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh, India
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:airation.it@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    airation.it@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <Callout type="warning" label="Consent Declaration">
              BY ACCESSING OR USING THE PLATFORM AND SERVICES, YOU EXPRESSLY AND
              FREELY CONSENT TO AIRATION SOFTTECH PRIVATE LIMITED&apos;S
              COLLECTION, RETENTION, ANALYSIS, PROCESSING, USE, AND DISCLOSURE OF
              YOUR PERSONAL DATA IN ACCORDANCE WITH THIS PRIVACY POLICY. CONSENT
              OBTAINED UNDER THIS POLICY IS SPECIFIC, INFORMED, UNCONDITIONAL, AND
              UNAMBIGUOUS AS REQUIRED UNDER THE DIGITAL PERSONAL DATA PROTECTION ACT,
              2023.
            </Callout>

            {/* Section 1 */}
            <SectionHeading id="sec-1">
              1. Definitions and Interpretation
            </SectionHeading>
            <Para>
              The following terms shall have the meanings set out below and shall
              apply throughout this Privacy Policy and all related policies of
              Airation.
            </Para>
            <DataTable
              headers={["Term", "Definition"]}
              rows={[
                [
                  '"Personal Data"',
                  "Any data about an individual who is identifiable by or in relation to such data, as defined under the Digital Personal Data Protection Act, 2023. This includes name, contact information, professional history, biometric data, financial information, and any other data that can identify you directly or indirectly.",
                ],
                [
                  '"Sensitive Personal Data"',
                  "Personal Data pertaining to passwords, financial information (bank accounts, credit/debit cards, UPI IDs), health data, official identifier information (Aadhaar, PAN, Passport), biometric data (selfie/photo for verification), and any other data classified as sensitive under applicable Indian law.",
                ],
                [
                  '"Processing"',
                  "Any operation or set of operations performed on Personal Data, including collection, recording, organisation, structuring, storage, adaptation, retrieval, consultation, use, disclosure by transmission, dissemination, alignment, combination, restriction, erasure, or destruction.",
                ],
                [
                  '"Data Fiduciary"',
                  "Airation Softtech Private Limited, in its capacity as the entity that determines the purpose and means of processing your Personal Data, as defined under the DPDP Act, 2023.",
                ],
                [
                  '"Data Principal"',
                  "You, the candidate or job seeker whose Personal Data is being processed by Airation.",
                ],
                [
                  '"Consent Manager"',
                  "An entity registered with the Data Protection Board of India enabling you to give, manage, review, and withdraw your consent, as applicable under the DPDP Act, 2023.",
                ],
                [
                  '"Data Processor"',
                  "Any third party engaged by Airation to process Personal Data on Airation's behalf, including cloud infrastructure providers, payment gateways, KYC verification vendors, and analytics partners.",
                ],
                [
                  '"Platform"',
                  "The website, mobile application, APIs, and all digital services operated by Airation Softtech Private Limited.",
                ],
                [
                  '"Services"',
                  "All services offered by Airation to candidates through the Platform, including job matching, profile management, employer communication, identity verification, and related features.",
                ],
                [
                  '"Cookies"',
                  "Small text files placed on your device by the Platform to enable functionality, analytics, and personalization, as further described in Section 11 of this Privacy Policy.",
                ],
                [
                  '"Anonymization"',
                  "The irreversible process of altering Personal Data in such a manner that you cannot be identified directly or indirectly, resulting in data that is no longer Personal Data under applicable law.",
                ],
                [
                  '"Pseudonymization"',
                  "The processing of Personal Data in such a manner that it can no longer be attributed to a specific individual without the use of additional information, which is kept separately and subject to technical and organizational safeguards.",
                ],
              ]}
            />

            {/* Section 2 */}
            <SectionHeading id="sec-2">
              2. Objective and Scope of This Policy
            </SectionHeading>
            <Para>
              Airation is committed to maintaining the highest standards of data
              privacy and security for all candidates using its Platform. The
              objective of this Privacy Policy is to:
            </Para>
            <BulletList
              items={[
                "Provide you with a clear, transparent, and comprehensive understanding of how your Personal Data is collected, used, stored, and shared by Airation;",
                "Ensure full compliance with the Digital Personal Data Protection Act, 2023, the IT Act, 2000, and all other applicable Indian data protection legislation;",
                "Establish your rights as a Data Principal and Airation's obligations as a Data Fiduciary;",
                "Describe the technical and organizational safeguards implemented by Airation to protect your Personal Data against loss, misuse, unauthorized access, disclosure, alteration, and destruction;",
                "Set out the legal bases upon which Airation processes each category of your Personal Data.",
              ]}
            />
            <Para>
              This Privacy Policy applies to all Personal Data collected through
              the Platform, whether submitted during registration, profile creation,
              job applications, identity verification, payment processing, or any
              other interaction with the Platform or its features. It applies to
              candidates accessing the Platform from within India and, where
              applicable, to candidates accessing the Platform from outside India in
              connection with job opportunities in India.
            </Para>

            {/* Section 3 */}
            <SectionHeading id="sec-3">
              3. Categories of Personal Data We Collect
            </SectionHeading>
            <Para>
              Airation collects Personal Data that is adequate, relevant, and
              limited to what is strictly necessary for the purposes described in
              this Privacy Policy (the principle of data minimization). The categories
              of Personal Data we collect, and the specific details of how we collect,
              use, process, and retain each category, are set out below.
            </Para>

            <SubHeading>A. Personal Information</SubHeading>
            <DataTable
              headers={["Category", "Details"]}
              rows={[
                [
                  "What we collect",
                  "Full legal name, personal or professional phone number, email address, current residential or professional location (city/state level), and profile photograph.",
                ],
                [
                  "How we collect it",
                  "Directly from you during registration, profile creation, or subsequent updates to your account.",
                ],
                [
                  "How we use it",
                  "To create, authenticate, and manage your candidate profile; to enable verified employers to identify and contact you; to personalize your experience on the Platform including job recommendations, notifications, and interface preferences; and to send transactional communications such as application updates, interview scheduling, and account alerts.",
                ],
                [
                  "Why we process it",
                  "To perform the contract between you and Airation for the provision of candidate services; to operate the candidate account; and to facilitate the job-seeking process. Phone and email are also used for two-factor authentication and account security.",
                ],
                [
                  "Legal basis",
                  "Performance of a contract (Article 6(1)(b) equivalent under DPDP Act, 2023); legitimate interests of Airation in operating a secure and functional recruitment platform.",
                ],
                [
                  "Retention Period",
                  "Retained for the full duration of your account lifecycle. Upon account deletion, personal identifiers are purged within 30 days, subject to backup retention schedules not exceeding 90 days. Residual anonymised data may be retained indefinitely for platform analytics.",
                ],
              ]}
            />

            <SubHeading>B. Professional Information</SubHeading>
            <DataTable
              headers={["Category", "Details"]}
              rows={[
                [
                  "What we collect",
                  "Resume or curriculum vitae (CV) including employment history, job titles, responsibilities, and tenure; professional skills and competencies; educational background including institutions, qualifications, and graduation dates; portfolio links, GitHub profiles, or work samples; professional certifications, licences, and accreditations; career objectives and salary expectations (where voluntarily provided).",
                ],
                [
                  "How we collect it",
                  "Directly from you via document upload, manual profile entry, or import from LinkedIn or other integrated third-party professional networks (subject to your authorisation).",
                ],
                [
                  "How we use it",
                  "To power Airation's proprietary AI-assisted job matching and candidate ranking algorithms; to generate personalised job recommendations and recruiter-facing candidate summaries; to enable verified employers to search, filter, and evaluate candidate profiles; to improve the Platform's recommendation accuracy through behavioural feedback loops; and to provide candidates with career insights and job market analytics.",
                ],
                [
                  "Why we process it",
                  "To fulfil the core purpose of the Platform — connecting suitable candidates with relevant employers. Processing is necessary for the performance of the candidate services agreement and constitutes a legitimate interest of the Platform.",
                ],
                [
                  "Legal basis",
                  "Performance of a contract; legitimate interests of Airation in providing an effective recruitment platform; your explicit consent where applicable.",
                ],
                [
                  "Retention Period",
                  "Retained for the duration of the account lifecycle or until you delete specific content. Following account deletion, professional data is purged within 30 days subject to backup schedules. Aggregated, anonymised insights derived from professional data may be retained indefinitely.",
                ],
              ]}
            />

            <SubHeading>C. Identity and Verification Data (if applicable)</SubHeading>
            <DataTable
              headers={["Category", "Details"]}
              rows={[
                [
                  "What we collect",
                  "Government-issued identity documents including Aadhaar card, PAN card, Passport, Voter ID, or Driving Licence; a live selfie or facial photograph submitted for biometric liveness verification; background verification data including employment history verification, criminal record checks (where consented to), and educational credential authentication.",
                ],
                [
                  "How we collect it",
                  "Directly from you when you opt into identity verification or when verification is required to access certain features. Identity document uploads and selfie/liveness checks are processed through Airation's authorised KYC verification partner.",
                ],
                [
                  "How we use it",
                  "To verify that you are who you claim to be, preventing the creation of fraudulent or impersonation profiles; to maintain platform integrity and trust; to comply with applicable regulatory obligations; and to enable features that require verified status, such as premium job applications or salary disclosure.",
                ],
                [
                  "Why we process it",
                  "Fraud prevention and platform security constitute legitimate interests of Airation. Processing of government-issued ID and biometric data for identity verification purposes is subject to your explicit prior consent, which may be withdrawn at any time (with the consequence that verified status will be revoked).",
                ],
                [
                  "Legal basis",
                  "Explicit consent of the Data Principal for Sensitive Personal Data; legitimate interests (fraud prevention); compliance with applicable regulatory requirements.",
                ],
                [
                  "Retention Period",
                  "Identity documents and selfie data are retained for the duration of account activity and for a further period of up to 5 (five) years as required by KYC regulations and applicable financial crime prevention obligations. Background verification reports are retained for up to 3 years.",
                ],
              ]}
            />

            <Callout type="important" label="Sensitive Data Notice">
              Identity documents (Aadhaar, PAN, Passport) and biometric data
              (selfie/liveness photos) constitute Sensitive Personal Data under the IT
              (SPDI) Rules, 2011, and Sensitive Data under the DPDP Act, 2023. This
              data is processed only with your explicit, freely given, informed, and
              specific consent. You may withdraw consent at any time by contacting
              airation.it@gmail.com, which will result in the revocation of your
              verified status on the Platform.
            </Callout>

            <SubHeading>D. Payment Information (if applicable)</SubHeading>
            <DataTable
              headers={["Category", "Details"]}
              rows={[
                [
                  "What we collect",
                  "UPI ID or VPA (Virtual Payment Address); transaction reference numbers and transaction history for premium subscriptions or paid services; billing name, billing address, and GST number (if applicable); bank account details where required for candidate payouts or refunds. Airation does NOT store full debit/credit card numbers, CVV/CVC codes, or net banking passwords.",
                ],
                [
                  "How we collect it",
                  "Collected at the time of initiating a payment transaction through the Platform's integrated payment interface. Full card details are transmitted directly to Airation's PCI-DSS compliant third-party payment gateway and are never stored on Airation's servers.",
                ],
                [
                  "How we use it",
                  "To process payments for premium subscriptions, job application boosts, or other paid features; to generate transaction receipts and invoices; to manage subscription renewals and cancellations; to process refunds in accordance with Airation's Refund Policy; and to comply with financial and tax record-keeping obligations.",
                ],
                [
                  "Why we process it",
                  "Processing is necessary for the performance of a contract for paid services. Tax and financial record-keeping processing is required by law under the Income Tax Act, 1961, and GST law.",
                ],
                [
                  "Legal basis",
                  "Performance of a contract; compliance with financial, taxation, and accounting legal obligations.",
                ],
                [
                  "Retention Period",
                  "Transaction records and billing details are retained for a minimum of 8 (eight) years as required under the Companies Act, 2013, the Income Tax Act, 1961, and GST legislation. Payment instrument details (UPI ID, bank account) are retained only for as long as needed for the purpose of the transaction and refund window.",
                ],
              ]}
            />

            <SubHeading>E. Device and Usage Data</SubHeading>
            <DataTable
              headers={["Category", "Details"]}
              rows={[
                [
                  "What we collect",
                  "IP address, approximate geolocation derived from IP (city/region level), device type (mobile/desktop/tablet), operating system, browser type and version, device identifiers (where applicable and consented to); platform behavioural data including pages visited, job listings viewed, searches conducted, swipe actions, application submissions, session duration, click-through patterns, and feature interactions.",
                ],
                [
                  "How we collect it",
                  "Automatically collected through server logs, cookies, web beacons, pixel tags, software development kits (SDKs), and similar tracking technologies when you access and use the Platform.",
                ],
                [
                  "How we use it",
                  "To ensure the technical operation, stability, and performance of the Platform; to diagnose bugs, errors, and security incidents; to analyse aggregate usage patterns for product improvement; to deliver personalised content including job recommendations and UI preferences; to detect anomalous behaviour indicative of fraud, account compromise, or bot activity; and to measure the performance of marketing and recruitment campaigns.",
                ],
                [
                  "Why we process it",
                  "Legitimate interests of Airation in operating a secure, functional, and optimised digital platform. Where processing involves targeted analytics or profiling, Airation relies on your consent obtained via the Cookie Consent mechanism.",
                ],
                [
                  "Legal basis",
                  "Legitimate interests; consent (for non-essential cookies and profiling analytics).",
                ],
                [
                  "Retention Period",
                  "Raw server logs are retained for 90 days. Aggregated, anonymised usage analytics are retained indefinitely. Cookie-derived data is retained in accordance with individual cookie lifespans disclosed in the Cookie Policy.",
                ],
              ]}
            />

            <SubHeading>F. Communications Data</SubHeading>
            <DataTable
              headers={["Category", "Details"]}
              rows={[
                [
                  "What we collect",
                  "Messages sent between candidates and employers through the Platform's in-app messaging system; emails and support tickets submitted to Airation's customer support team; feedback, ratings, or reviews submitted through the Platform; responses to surveys or research studies (where you voluntarily participate).",
                ],
                [
                  "How we collect it",
                  "Directly from you when you initiate or respond to communications through the Platform's communication features.",
                ],
                [
                  "How we use it",
                  "To facilitate communication between candidates and employers; to provide customer support and resolve disputes; to improve the quality and safety of the Platform; to detect and prevent abuse, harassment, or policy violations; and to conduct research to enhance Services.",
                ],
                [
                  "Why we process it",
                  "Legitimate interests of Airation in maintaining a safe, functional communication environment; performance of a support contract; legal obligations to retain records of certain communications.",
                ],
                [
                  "Legal basis",
                  "Legitimate interests; performance of a contract; legal obligation.",
                ],
                [
                  "Retention Period",
                  "In-app messages are retained for 2 (two) years or until account deletion. Support communications are retained for 3 (three) years. Survey responses are retained in anonymised form indefinitely.",
                ],
              ]}
            />

            {/* Section 4 */}
            <SectionHeading id="sec-4">
              4. Legal Bases for Processing Personal Data
            </SectionHeading>
            <Para>
              Airation processes your Personal Data only where a valid legal basis
              exists under applicable Indian law, including the DPDP Act, 2023. The
              primary legal bases relied upon by Airation are:
            </Para>
            <BulletList
              items={[
                "Consent: Where you have given free, specific, informed, unconditional, and unambiguous consent to the processing of your Personal Data for a stated purpose. You may withdraw consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out prior to withdrawal, but may limit your ability to use certain features of the Platform.",
                "Performance of a Contract: Where processing is necessary to perform the candidate services agreement between you and Airation, including account creation, job matching, profile management, and payment processing for premium services.",
                "Legitimate Interests: Where processing is necessary for Airation's legitimate business interests, provided such interests are not overridden by your fundamental rights and freedoms. Legitimate interests relied upon include platform security, fraud prevention, product improvement, and analytics.",
                "Legal Obligation: Where processing is necessary to comply with a legal obligation under Indian law, including tax record retention, KYC compliance, compliance with court orders, and reporting obligations to regulatory authorities.",
                "Vital Interests: In exceptional circumstances, Airation may process Personal Data to protect the vital interests of you or another natural person, including in life-threatening situations or emergencies.",
              ]}
            />

            {/* Section 5 */}
            <SectionHeading id="sec-5">
              5. How We Use Your Personal Data
            </SectionHeading>
            <Para>
              In addition to the specific uses described for each data category in
              Section 3, Airation uses Personal Data collected from candidates for
              overarching purposes such as job matching, identity verification,
              account security, and service improvement.
            </Para>
            <BulletList
              items={[
                "Job Matching and Personalised Recommendations: Analyses your professional profile, skills, and experience to generate relevant job opportunities.",
                "Identity Verification and Platform Integrity: Authenticates your identity and assigns verified status to your profile to maintain a trusted recruitment environment.",
                "Employer Communication and Recruitment Facilitation: Facilitates communication between you and verified employers through in-platform messaging.",
                "Payment and Subscription Management: Processes payments for premium features, issues invoices, and manages subscription renewals.",
                "Platform Security and Fraud Prevention: Analyzes usage data to detect anomalous access patterns and prevent account takeover attempts.",
                "Legal Compliance and Regulatory Reporting: Processes data to comply with obligations under the DPDP Act, IT Act, Income Tax Act, and GST laws.",
                "Research, Analytics, and Service Improvement: Uses anonymised data to fix technical issues and develop new platform features.",
              ]}
            />

            {/* Sections 6–18 */}
            <SectionHeading id="sec-6">
              6. Automated Decision-Making and Profiling
            </SectionHeading>
            <Para>
              Airation uses automated processing, including machine-learning-based
              profiling, to facilitate job matching and candidate ranking. This
              involves creating a candidate &apos;match score&apos; that determines the
              order in which your profile appears in employer search results and the
              job recommendations you receive.
            </Para>
            <Para>
              Airation provides safeguards such as the right to human review of
              significant automated decisions and the ability to opt out of
              algorithmic profiling for job matching.
            </Para>

            <SectionHeading id="sec-7">
              7. Profile Visibility and Data Control
            </SectionHeading>
            <SubHeading>7.1 Visibility Settings</SubHeading>
            <Para>
              Airation provides candidates with granular controls over the
              visibility of their profile. The default visibility settings and
              available options are as follows:
            </Para>
            <BulletList
              items={[
                "Profile Visibility: Default is 'Verified Employers Only'. You may set it to 'Private' or 'Public'.",
                "Contact Information: Phone and email are masked by default and shared only with your consent or when you accept a contact request.",
                "Salary Expectations: Visible only to employers you directly apply to by default.",
                "Identity Verification Status: Your verified badge is visible to all, but underlying documents are never shared.",
              ]}
            />

            <SectionHeading id="sec-8">
              8. Payments, Financial Data, and Refunds
            </SectionHeading>
            <Para>
              All payment transactions on the Platform are processed exclusively
              through Airation&apos;s authorised third-party payment gateway
              partners. Airation does not process, store, or have access to your full
              debit or credit card number, CVV/CVC code, net banking credentials, or
              UPI PIN.
            </Para>

            <SectionHeading id="sec-9">
              9. Identity Verification and Document Security
            </SectionHeading>
            <Para>
              Identity documents like Aadhaar, PAN, and Passports are treated as
              Sensitive Personal Data. They are encrypted in transit and at rest,
              stored on secure cloud infrastructure, and never shared with
              employers without explicit consent.
            </Para>

            <SectionHeading id="sec-10">
              10. Sharing, Disclosure, and Transfer of Personal Data
            </SectionHeading>
            <Para>
              We share data with verified employers (based on your visibility
              settings) and authorized data processors who assist in providing
              platform services. We primarily store data in India and ensure all
              cross-border transfers comply with the DPDP Act, 2023.
            </Para>

            <SectionHeading id="sec-11">
              11. Cookies and Tracking Technologies
            </SectionHeading>
            <Para>
              We use cookies for session management, authentication, analytics,
              and functional preferences. You can manage your preferences through
              the Cookie Consent banner or your account settings.
            </Para>

            <SectionHeading id="sec-12">
              12. Safety, Fraud Prevention, and Platform Integrity
            </SectionHeading>
            <Para>
              Technical safeguards include AI-based anomaly detection, manual
              spot-checks on job postings, and a robust &quot;Report and
              Block&quot; system to maintain a safe environment for all
              candidates.
            </Para>

            <SectionHeading id="sec-13">
              13. Data Retention and Erasure
            </SectionHeading>
            <Para>
              We retain profile data for the duration of account activity. Financial
              records are kept for 8 years as required by law. Upon account
              deletion, identifiers are purged within 30 days.
            </Para>

            <SectionHeading id="sec-14">
              14. Your Rights as a Data Principal under the DPDP Act, 2023
            </SectionHeading>
            <Para>As a Data Principal, you have the following key rights:</Para>
            <BulletList
              items={[
                "Right of Access: Obtain a summary of your personal data and processor list.",
                "Right to Correction and Erasure of inaccurate or unnecessary data.",
                "Right to Grievance Redressal through our Grievance Officer.",
                "Right to Nominate another individual to manage your data rights.",
                "Right to Withdraw Consent for any processing basis.",
                "Right to Data Portability in structured, machine-readable formats.",
              ]}
            />

            <SectionHeading id="sec-15">
              15. Technical and Organisational Security Measures
            </SectionHeading>
            <Para>
              Security measures include TLS encryption in transit, AES-256
              encryption at rest, role-based access control, and annual mandatory data
              protection training for all employees.
            </Para>

            <SectionHeading id="sec-16">16. Children&apos;s Data</SectionHeading>
            <Para>
              The Platform is intended only for individuals aged 18 or older. We do
              not knowingly collect or process personal data from minors.
            </Para>

            <SectionHeading id="sec-17">
              17. Updates to This Privacy Policy
            </SectionHeading>
            <Para>
              We reserve the right to update this policy. Material changes will be
              notified at least 14 days in advance through in-platform
              notifications or email.
            </Para>

            <SectionHeading id="sec-18">
              18. Grievance Officer and Contact Information
            </SectionHeading>
            <div className="mt-6 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 border-l-[3px] border-l-slate-900 dark:border-l-slate-100 shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white text-[16px] mb-2">
                Grievance Officer
              </p>
              <div className="space-y-1 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Airation Softtech Private Limited
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:airation.it@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    airation.it@gmail.com
                  </a>
                </p>
                <p>
                  8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh, India
                </p>
              </div>
            </div>

            <Callout type="response" label="Response Commitment">
              Airation&apos;s Grievance Officer will acknowledge all complaints and
              requests within 72 hours of receipt and provide a substantive response
              within 15 (fifteen) business days.
            </Callout>

            {/* Closing note */}
            <div className="mt-14 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-[12.5px] text-slate-400 dark:text-slate-500 font-medium">
                This Privacy Policy was last reviewed and approved on 24 March 2026.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Slide up animation for drawer */}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out both;
        }
      `}</style>
    </div>
  )
}
