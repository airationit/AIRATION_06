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
  { id: "sec-legal", label: "Legal Basis" },
  { id: "sec-1", label: "1. Definitions" },
  { id: "sec-2", label: "2. Content Ownership" },
  { id: "sec-3", label: "3. License to Airation" },
  { id: "sec-4", label: "4. Restrictions on Use" },
  { id: "sec-5", label: "5. Platform IP" },
  { id: "sec-6", label: "6. Copyright & Takedown" },
  { id: "sec-7", label: "7. Representations" },
  { id: "sec-8", label: "8. Enforcement & Disputes" },
  { id: "sec-9", label: "9. Third-Party Content" },
  { id: "sec-10", label: "10. Disclaimers" },
  { id: "sec-11", label: "11. Limitation of Liability" },
  { id: "sec-12", label: "12. Modifications" },
  { id: "sec-13", label: "13. Severability" },
  { id: "sec-14", label: "14. Contact Information" },
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
export function TermsContent() {
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
                Terms &amp; Conditions
              </span>
            </div>

            <h1 className="text-[28px] sm:text-[36px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-[-0.02em] mb-2">
              Terms &amp; Conditions
            </h1>
            <p className="text-[15px] text-slate-500 dark:text-slate-400 font-medium mb-5">
              Intellectual Property Rights &amp; Content Ownership
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
              This section of the Terms and Conditions (&quot;<strong>Terms</strong>
              &quot;) governs the ownership, use, protection, and enforcement of
              intellectual property rights and user-generated content on the digital
              platform (&quot;<strong>Platform</strong>&quot;) operated by{" "}
              <strong>Airation Softech Private Limited</strong>, a company
              incorporated under the Companies Act, 2013, with its registered office
              at 8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh, India
              (&quot;<strong>Airation</strong>&quot;, &quot;
              <strong>Company</strong>&quot;, &quot;<strong>we</strong>&quot;, &quot;
              <strong>our</strong>&quot;, or &quot;<strong>us</strong>&quot;).
            </Para>
            <Para>
              These Terms form a legally binding agreement between Airation and
              every individual or entity accessing or using the Platform, whether
              as a candidate, employer, recruiter, or any other user (&quot;
              <strong>User</strong>&quot;, &quot;<strong>you</strong>&quot;, &quot;
              <strong>your</strong>&quot;). By registering on, accessing, or using
              the Platform in any manner, you unconditionally accept and agree to
              be bound by these Terms.
            </Para>
            <Para>
              These Terms must be read in conjunction with the Privacy Policy,
              Cancellation &amp; Refund Policy, and any other policies published on the
              Platform. In the event of any conflict between these Terms and any other
              policy, these Terms shall prevail with respect to intellectual property
              matters.
            </Para>

            {/* Legal Basis */}
            <SectionHeading id="sec-legal">Legal Basis</SectionHeading>
            <Callout type="legal" label="Legal Note">
              These Terms are governed by and construed in accordance with the laws
              of India, including the Copyright Act, 1957; the Trade Marks Act, 1999;
              the Patents Act, 1970; the Information Technology Act, 2000; the
              Information Technology (Amendment) Act, 2008; the Digital Personal
              Data Protection Act, 2023; and any other applicable Indian statutes and
              international intellectual property conventions to which India is a
              party.
            </Callout>

            {/* Section 1 */}
            <SectionHeading id="sec-1">
              1. Definitions and Interpretation
            </SectionHeading>
            <Para>
              Unless the context otherwise requires, the following terms shall have
              the meanings ascribed to them below. These definitions apply throughout
              this section and all related policies published on the Platform.
            </Para>
            <DataTable
              headers={["Term", "Definition"]}
              rows={[
                [
                  '"Platform"',
                  "The website, mobile application, software, APIs, and all digital services operated by Airation Softech Private Limited, including all current and future features, tools, and functionalities.",
                ],
                [
                  '"User Content"',
                  "Any data, text, files, documents, images, graphics, audio, video, information, or other materials submitted, uploaded, posted, transmitted, or otherwise made available by a User on or through the Platform.",
                ],
                [
                  '"Candidate Content"',
                  "User Content submitted by candidates, including but not limited to resumes, CVs, portfolios, educational certificates, profile descriptions, skills data, and experience information.",
                ],
                [
                  '"Employer Content"',
                  "User Content submitted by employers or recruiters, including but not limited to job descriptions, job postings, company profiles, logos, branding materials, and recruitment-related communications.",
                ],
                [
                  '"Platform IP"',
                  "All intellectual property owned by or licensed to Airation, including but not limited to the Platform design, code, algorithms, databases, trademarks, trade secrets, and all other proprietary materials.",
                ],
                [
                  '"License"',
                  "The limited, non-exclusive, royalty-free, revocable right granted by a User to Airation to use User Content as described in these Terms.",
                ],
                [
                  '"Infringing Content"',
                  "Any User Content that violates or is alleged to violate the intellectual property rights, privacy rights, or other legal rights of any third party or of Airation.",
                ],
                [
                  '"Takedown Request"',
                  "A formal written complaint submitted by a rights holder or their authorised representative requesting the removal of Infringing Content from the Platform.",
                ],
                [
                  '"Moral Rights"',
                  "Rights of attribution, integrity, and other non-economic rights of creators as recognised under the Copyright Act, 1957, and applicable international treaties.",
                ],
                [
                  '"Support ID"',
                  "A unique identification alphanumeric code generated by the Platform for each contact or enquiry submission to facilitate tracking and support communication.",
                ],
              ]}
            />

            {/* Section 2 */}
            <SectionHeading id="sec-2">2. Ownership of User Content</SectionHeading>
            <Para>
              Airation recognises and respects the intellectual property rights of
              its Users. Subject to the License granted under Section 3 of these Terms
              and any applicable laws, Users retain ownership of the content they
              create and submit to the Platform.
            </Para>

            <SubHeading>2.1 Candidate Content Ownership</SubHeading>
            <Para>
              Candidates who create profiles or upload materials on the Platform
              retain full ownership of the intellectual property in the content
              they submit. This includes, without limitation:
            </Para>
            <BulletList
              items={[
                "Resumes, curriculum vitae (CVs), cover letters, and related professional documents;",
                "Professional portfolios, work samples, and project showcases;",
                "Educational certificates, academic qualifications, and professional credentials;",
                "Profile descriptions, career objectives, skills inventories, and experience summaries;",
                "Any other original creative or informational content submitted by the candidate.",
              ]}
            />
            <Para>
              Candidates represent and warrant that they are the original authors or
              lawful holders of the rights in all Candidate Content submitted by
              them. Submission of content that belongs to a third party without proper
              authorisation is strictly prohibited and may result in account
              termination and legal liability.
            </Para>

            <SubHeading>2.2 Employer Content Ownership</SubHeading>
            <Para>
              Employers and recruiters using the Platform retain full ownership of
              the intellectual property in the content they upload or publish. This
              includes, without limitation:
            </Para>
            <BulletList
              items={[
                "Job descriptions, job specifications, role requirements, and recruitment advertisements;",
                "Company profiles, about-us information, culture statements, and employer branding materials;",
                "Company logos, trademarks, trade names, and other distinctive marks;",
                "Recruitment workflows, assessment criteria, and any proprietary hiring methodologies uploaded to the Platform;",
                "Any other business-related content published by the employer on the Platform.",
              ]}
            />
            <Para>
              Employers represent and warrant that they have the full right,
              power, and authority to upload and publish all Employer Content,
              including the right to display company trademarks and branding materials
              on the Platform.
            </Para>

            <SubHeading>2.3 Acknowledgement of License</SubHeading>
            <Para>
              Users acknowledge and expressly agree that, while ownership of User
              Content remains with the respective User, by submitting such content to
              the Platform, they grant Airation the License described in Section 3
              below.
            </Para>
            <Callout type="important" label="Important">
              Ownership of User Content does not restrict Airation&apos;s right to use
              such content in accordance with the License granted under these Terms.
              Users should not submit content to the Platform that they do not wish
              to be used, processed, or displayed in accordance with this License.
            </Callout>

            {/* Section 3 */}
            <SectionHeading id="sec-3">
              3. License Granted to Airation
            </SectionHeading>
            <SubHeading>3.1 Scope of License</SubHeading>
            <Para>
              By submitting, uploading, publishing, or otherwise making available
              any User Content on the Platform, each User grants Airation a limited,
              non-exclusive, royalty-free, sub-licensable, transferable, and
              worldwide license to:
            </Para>
            <BulletList
              items={[
                "Store, host, cache, and back up the content on Airation's servers or those of its authorised cloud infrastructure partners;",
                "Access, retrieve, process, and analyse such content using automated and manual means;",
                "Display, transmit, or make the content available to other authorised Users in accordance with applicable visibility and privacy settings;",
                "Format, resize, compress, or otherwise technically adapt the content to ensure compatibility with the Platform's systems;",
                "Use such content for the sole purpose of providing, operating, and improving the Services offered through the Platform.",
              ]}
            />

            <SubHeading>3.2 Extended Permitted Uses</SubHeading>
            <BulletList
              items={[
                "Facilitating accurate and intelligent job matching between candidates and employers using algorithmic and AI-assisted systems;",
                "Generating automated recommendations, job alerts, and candidate shortlists based on profile data and behavioural signals;",
                "Conducting internal research, platform analytics, performance measurement, and service optimisation activities;",
                "Developing, testing, and improving AI-based matching models, fraud detection systems, and recommendation engines;",
                "Producing aggregated, anonymised, or de-identified datasets for product development and market research purposes.",
              ]}
            />

            <SubHeading>3.3 Moral Rights</SubHeading>
            <Para>
              Airation acknowledges and respects the moral rights of Users in their
              original content under the Copyright Act, 1957. The License granted
              under this Section does not constitute a waiver of any moral rights.
            </Para>

            <SubHeading>3.4 Duration and Termination of License</SubHeading>
            <Para>
              The License granted under this Section shall remain in force for as long
              as the User Content is available or hosted on the Platform. Upon deletion
              of User Content or account closure, the License shall terminate with
              respect to the deleted content, subject to:
            </Para>
            <BulletList
              items={[
                "Residual copies that may exist in backup or archival systems, which will be purged in accordance with Airation's data retention schedule;",
                "Content that has already been shared with or accessed by third-party Users prior to deletion;",
                "Content required to be retained by Airation to comply with applicable legal obligations or ongoing legal proceedings.",
              ]}
            />

            <SubHeading>3.5 No Transfer of Ownership</SubHeading>
            <Para>
              For the avoidance of doubt, the License granted under this Section
              does not constitute a transfer, assignment, or sale of any intellectual
              property rights in the User Content. Airation acquires no ownership
              interest in User Content by virtue of this License.
            </Para>

            {/* Section 4 */}
            <SectionHeading id="sec-4">
              4. Restrictions on Use of Platform Content
            </SectionHeading>
            <SubHeading>4.1 Prohibited Activities</SubHeading>
            <Para>
              All Users agree that they shall not engage in any of the following
              activities without the prior express written permission of Airation or
              the relevant rights holder:
            </Para>
            <BulletList
              items={[
                "Copying, reproducing, duplicating, archiving, distributing, republishing, or publicly displaying any content obtained from the Platform;",
                "Scraping, crawling, spidering, harvesting, or otherwise extracting data from the Platform through automated systems or bots;",
                "Downloading, storing, compiling, or aggregating Platform data or User Content in bulk;",
                "Using candidate profiles, resumes, or employer job postings for any purpose unrelated to legitimate recruitment activities;",
                "Republishing, reselling, licensing, or redistributing any content obtained through the Platform;",
                "Framing, mirroring, or linking to any portion of the Platform in a misleading or deceptive manner;",
                "Using any content from the Platform to train or develop AI/ML models without prior written consent of Airation.",
              ]}
            />

            <SubHeading>4.2 Consequences of Violation</SubHeading>
            <BulletList
              items={[
                "Immediate suspension or permanent termination of the User's account without notice or refund;",
                "Removal or disabling of the infringing or unauthorised content from the Platform;",
                "Civil legal action for damages, injunctive relief, or both, under applicable Indian law;",
                "Criminal complaint filed under the IPC, the IT Act, the Copyright Act, or other applicable statutes;",
                "Referral of the matter to the Cyber Crime Cell or relevant regulatory authorities.",
              ]}
            />
            <Callout type="warning" label="Warning">
              Unauthorised data scraping, harvesting, or bulk extraction of content
              from the Platform constitutes a violation of the Information Technology
              Act, 2000, and may attract criminal liability under Section 43 and Section
              66 thereof, in addition to civil remedies available to Airation.
            </Callout>

            {/* Section 5 */}
            <SectionHeading id="sec-5">
              5. Platform Intellectual Property
            </SectionHeading>
            <SubHeading>5.1 Ownership of Platform IP</SubHeading>
            <Para>
              All intellectual property rights in and to the Platform and its
              constituent elements are exclusively owned by or licensed to Airation
              Softech Private Limited, including, without limitation:
            </Para>
            <BulletList
              items={[
                "The overall design, visual layout, colour schemes, typographic choices, and structural arrangement of the Platform;",
                "All UI elements, UX flows, navigation architecture, and interactive design components;",
                "Proprietary job-matching algorithms, recommendation engines, AI/ML models, and candidate ranking systems;",
                "All Platform features, functionalities, modules, tools, and workflows;",
                "All registered and unregistered trademarks, service marks, trade names, logos, taglines, and distinctive marks;",
                "The underlying source code, object code, software architecture, APIs, and database schemas;",
                "All documentation, technical specifications, and proprietary written works relating to the Platform.",
              ]}
            />

            <SubHeading>5.2 No Rights Conferred on Users</SubHeading>
            <Para>
              Except as expressly stated in these Terms, nothing shall be construed
              as granting any User any right, title, or interest in any Platform IP. In
              particular, Users are expressly prohibited from:
            </Para>
            <BulletList
              items={[
                "Reverse engineering, decompiling, disassembling, or otherwise attempting to derive the source code of the Platform;",
                "Copying, reproducing, modifying, or creating derivative works based on the Platform's design, layout, code, or functionality;",
                "Registering any trademark or domain name identical or confusingly similar to Airation's trademarks;",
                "Removing, altering, or obscuring any copyright notices, trademark symbols, or proprietary legends displayed on the Platform.",
              ]}
            />

            <SubHeading>5.3 Trademarks and Brand Identity</SubHeading>
            <Para>
              The name &quot;Airation&quot;, the Airation logo, and all related
              marks are the exclusive trademarks or registered trademarks of Airation
              Softech Private Limited. No User or third party may use Airation&apos;s
              trademarks in any manner without prior express written authorisation.
            </Para>

            {/* Section 6 */}
            <SectionHeading id="sec-6">
              6. Copyright Infringement &amp; Content Takedown
            </SectionHeading>
            <SubHeading>6.1 Airation&apos;s Policy on Copyright</SubHeading>
            <Para>
              Airation is committed to protecting the intellectual property rights of
              third parties and will respond to valid notices of alleged copyright
              infringement that comply with applicable law. Repeat infringers may
              have their accounts permanently terminated.
            </Para>

            <SubHeading>6.2 Submitting a Takedown Request</SubHeading>
            <Para>
              If any person or entity believes that their copyrighted work has been
              reproduced on the Platform without authorisation, they may submit a
              formal Takedown Request to:
            </Para>
            <div className="mt-6 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-slate-900 dark:text-white text-[14.5px] mb-2">
                Takedown Contact
              </p>
              <div className="space-y-1 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
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

            <SubHeading>6.3 Required Contents of a Takedown Request</SubHeading>
            <BulletList
              items={[
                "A clear and specific identification of the copyrighted work alleged to have been infringed;",
                "Documentary proof of ownership of the intellectual property;",
                "A precise identification of the allegedly infringing content on the Platform, including specific URL(s);",
                "Full contact details of the complainant, including full legal name, postal address, and email address;",
                "A declaration that the complainant has a good-faith belief that the use of the content is not authorised;",
                "A physical or electronic signature of the person authorised to act on behalf of the rights holder.",
              ]}
            />
            <Callout type="note" label="Note">
              Takedown Requests that are incomplete, frivolous, or submitted in bad
              faith may be disregarded. Persons submitting false or misleading
              Takedown Requests may be held liable under applicable law for damages
              caused to the accused User and to Airation.
            </Callout>

            <SubHeading>6.4 Airation&apos;s Response to Takedown Requests</SubHeading>
            <BulletList
              items={[
                "Acknowledge receipt of the complaint within a reasonable time;",
                "Review and verify the complaint against the identified content on the Platform;",
                "Remove or disable access to the allegedly infringing content pending resolution, if appropriate;",
                "Notify the User whose content has been subject to a Takedown Request, where practicable;",
                "Provide the User with an opportunity to submit a counter-notice if they believe the Takedown Request was erroneous;",
                "Restore content upon receipt of a valid counter-notice, if no legal action is commenced within the applicable period.",
              ]}
            />

            <SubHeading>6.5 Consequences of Confirmed Infringement</SubHeading>
            <BulletList
              items={[
                "Permanently remove or disable the infringing content from the Platform;",
                "Suspend or terminate the account responsible for uploading the infringing content;",
                "Maintain a record of the infringement for the purpose of identifying repeat infringers;",
                "Take such additional legal, administrative, or regulatory action as Airation deems appropriate.",
              ]}
            />

            {/* Section 7 */}
            <SectionHeading id="sec-7">
              7. User Representations and Warranties
            </SectionHeading>
            <SubHeading>7.1 Representations by All Users</SubHeading>
            <Para>
              By uploading or submitting any User Content, each User unconditionally
              represents and warrants to Airation:
            </Para>
            <BulletList
              items={[
                "They are the lawful owner of the intellectual property in the content submitted, or have obtained all necessary rights and permissions;",
                "The submission and use of the content does not infringe any copyright, trademark, patent, trade secret, moral right, or privacy right of any third party;",
                "The content is original and does not constitute plagiarism or a misappropriation of any third party's intellectual property;",
                "The content complies with all applicable laws and regulations, including employment laws and data protection laws in India;",
                "The content does not contain any defamatory, obscene, offensive, unlawful, or otherwise objectionable material;",
                "The content does not include any personally identifiable information of third parties without their explicit, informed consent.",
              ]}
            />

            <SubHeading>7.2 Employer-Specific Representations</SubHeading>
            <BulletList
              items={[
                "All job postings are genuine, accurate, and relate to actual employment opportunities;",
                "Job postings comply with all applicable employment laws, including anti-discrimination and equal opportunity legislation;",
                "They have the authority to post on behalf of the employer entity, which is duly registered and legally operating;",
                "They will not use the Platform for the purpose of collecting candidate data for any purpose other than genuine recruitment.",
              ]}
            />

            <SubHeading>7.3 Indemnification</SubHeading>
            <Para>
              Each User agrees to indemnify, defend, and hold harmless Airation
              Softech Private Limited, its directors, officers, employees, agents, and
              licensors from and against any and all claims, demands, losses,
              liabilities, damages, costs, and expenses arising out of or in connection
              with any breach of these representations or warranties.
            </Para>

            {/* Section 8 */}
            <SectionHeading id="sec-8">
              8. Enforcement, Remedies, and Dispute Resolution
            </SectionHeading>
            <SubHeading>8.1 Airation&apos;s Enforcement Rights</SubHeading>
            <BulletList
              items={[
                "Immediate removal of infringing or violating User Content from the Platform;",
                "Temporary or permanent suspension of the User's account and access to the Platform;",
                "Permanent termination of the User's account and all associated rights under these Terms;",
                "Blocking the User's IP address or device from accessing the Platform;",
                "Reporting the violation to relevant law enforcement authorities or regulatory bodies;",
                "Disclosure of the User's identity and related information to authorities in accordance with applicable law.",
              ]}
            />

            <SubHeading>8.2 Legal Remedies</SubHeading>
            <BulletList
              items={[
                "Filing a civil suit for copyright infringement under the Copyright Act, 1957;",
                "Seeking trademark infringement remedies under the Trade Marks Act, 1999;",
                "Initiating criminal proceedings under the IPC, the IT Act, or the Copyright Act for wilful violations;",
                "Applying for an ex parte injunction or interlocutory relief from a competent court;",
                "Seeking specific performance, restitution, or such other equitable relief as the circumstances may warrant.",
              ]}
            />

            <SubHeading>8.3 Governing Law and Jurisdiction</SubHeading>
            <Para>
              These Terms shall be governed by the laws of India. Any dispute arising
              out of or in connection with these Terms shall be subject to the
              exclusive jurisdiction of the courts of competent jurisdiction located
              in Lucknow, Uttar Pradesh, India.
            </Para>

            <SubHeading>8.4 Arbitration</SubHeading>
            <Para>
              Airation reserves the right to elect to resolve any dispute by binding
              arbitration in accordance with the Arbitration and Conciliation Act,
              1996, as amended. The seat and venue of arbitration shall be Lucknow,
              Uttar Pradesh, India. The proceedings shall be conducted in English.
            </Para>

            {/* Section 9 */}
            <SectionHeading id="sec-9">
              9. Third-Party Content and Links
            </SectionHeading>
            <SubHeading>9.1 Third-Party Content</SubHeading>
            <Para>
              The Platform may contain or provide access to content, materials, or
              information originating from third parties. Airation does not own,
              control, endorse, or assume any responsibility for any third-party
              content accessible through the Platform.
            </Para>

            <SubHeading>9.2 Third-Party Links</SubHeading>
            <Para>
              The Platform may contain hyperlinks to external websites or resources
              operated by third parties. Airation does not endorse the content of
              any linked website and is not responsible for the availability,
              accuracy, or legality of any content on such third-party websites.
            </Para>

            <SubHeading>9.3 Open Source Components</SubHeading>
            <Para>
              The Platform may incorporate open-source software components that are
              subject to their own licence terms. A list of open-source components and
              their applicable licences is available upon written request to{" "}
              <a
                href="mailto:airation.it@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                airation.it@gmail.com
              </a>
              .
            </Para>

            {/* Section 10 */}
            <SectionHeading id="sec-10">
              10. Disclaimer of Warranties
            </SectionHeading>
            <Para>
              To the fullest extent permitted by applicable law, the Platform, its
              content, and all features and services provided through it are made
              available on an &quot;as is&quot; and &quot;as available&quot; basis,
              without any representation or warranty of any kind. Airation expressly
              disclaims all implied warranties, including but not limited to implied
              warranties of merchantability, fitness for a particular purpose,
              non-infringement, and accuracy.
            </Para>

            {/* Section 11 */}
            <SectionHeading id="sec-11">
              11. Limitation of Liability
            </SectionHeading>
            <Para>
              To the fullest extent permitted under applicable Indian law, in no event
              shall Airation Softech Private Limited, its directors, officers,
              employees, agents, or licensors be liable for any indirect, incidental,
              special, consequential, punitive, or exemplary damages arising out of
              or in connection with the use or inability to use the Platform or any
              content thereon.
            </Para>
            <Para>
              Airation&apos;s total aggregate liability to any User for any claim
              arising under or in connection with these Terms shall not exceed the total
              fees paid by such User to Airation in the three (3) months immediately
              preceding the event giving rise to the claim.
            </Para>

            {/* Section 12 */}
            <SectionHeading id="sec-12">
              12. Modifications to These Terms
            </SectionHeading>
            <Para>
              Airation reserves the right to modify, update, or replace any part of
              these Terms at any time, at its sole discretion. Updated Terms will be
              published on the Platform with a revised effective date. Your continued
              use of the Platform following the publication of updated Terms constitutes
              your acceptance of and agreement to be bound by the revised Terms.
            </Para>

            {/* Section 13 */}
            <SectionHeading id="sec-13">
              13. Severability and Waiver
            </SectionHeading>
            <Para>
              If any provision of these Terms is found to be invalid, unlawful, or
              unenforceable by a court of competent jurisdiction, such provision shall
              be deemed severed from these Terms to the minimum extent necessary, and
              the remaining provisions shall continue in full force and effect.
            </Para>

            {/* Section 14 */}
            <SectionHeading id="sec-14">14. Contact Information</SectionHeading>
            <Para>
              For all matters relating to intellectual property rights, Takedown
              Requests, licensing enquiries, or questions regarding these Terms, please
              contact:
            </Para>
            <div className="mt-6 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 border-l-[3px] border-l-slate-900 dark:border-l-slate-100 shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white text-[16px] mb-2">
                Contact
              </p>
              <div className="space-y-1 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Airation Softech Private Limited
                </p>
                <p>
                  Address: 8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh,
                  India
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

            <Callout type="response" label="Response Commitment">
              Airation will endeavour to respond to all intellectual property-related
              enquiries and Takedown Requests within 15 (fifteen) business days of
              receipt. For urgent matters involving ongoing infringement, please mark
              your email as &apos;URGENT – IP Matter&apos; to ensure expedited
              handling.
            </Callout>

            {/* Closing note */}
            <div className="mt-14 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-[12.5px] text-slate-400 dark:text-slate-500 font-medium">
                These Terms &amp; Conditions were last reviewed and approved on 24
                March 2026.
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
