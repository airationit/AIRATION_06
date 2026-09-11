"use client";

import {
  Shield, ChevronDown, FileText, Search,
  CheckCircle2, Download, Mail, Copy, Check,
  ShieldAlert, Cpu, CreditCard, Smartphone,
  FileSpreadsheet, Scale, LockKeyhole, UserX, RefreshCw,
  Globe, Server, Eye, Database, UserCheck, Lock,
  Building, ScrollText, MapPin
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Footer } from "@/components/shared/footer";

const sectionsList = [
  { id: "intro", title: "Preamble & Legal Basis", icon: <Shield className="w-4 h-4" /> },
  { id: "section-1", title: "1. Definitions and Interpretation", icon: <FileText className="w-4 h-4" /> },
  { id: "section-2", title: "2. Objective and Scope of This Policy", icon: <Eye className="w-4 h-4" /> },
  { id: "section-3", title: "3. Categories of Personal Data We Collect", icon: <Database className="w-4 h-4" /> },
  { id: "section-4", title: "4. Legal Bases for Processing Personal Data", icon: <Scale className="w-4 h-4" /> },
  { id: "section-5", title: "5. How We Use Your Personal Data", icon: <Cpu className="w-4 h-4" /> },
  { id: "section-6", title: "6. Automated Decision-Making and Profiling", icon: <RefreshCw className="w-4 h-4" /> },
  { id: "section-7", title: "7. Profile Visibility and Data Control", icon: <UserCheck className="w-4 h-4" /> },
  { id: "section-8", title: "8. Payments, Financial Data, and Refunds", icon: <CreditCard className="w-4 h-4" /> },
  { id: "section-9", title: "9. Identity Verification and Document Security", icon: <LockKeyhole className="w-4 h-4" /> },
  { id: "section-10", title: "10. Sharing, Disclosure, and Transfer of Personal Data", icon: <Globe className="w-4 h-4" /> },
  { id: "section-11", title: "11. Cookies and Tracking Technologies", icon: <FileSpreadsheet className="w-4 h-4" /> },
  { id: "section-12", title: "12. Safety, Fraud Prevention, and Platform Integrity", icon: <ShieldAlert className="w-4 h-4" /> },
  { id: "section-13", title: "13. Data Retention and Erasure", icon: <Server className="w-4 h-4" /> },
  { id: "section-14", title: "14. Your Rights as a Data Principal under the DPDP Act, 2023", icon: <UserCheck className="w-4 h-4" /> },
  { id: "section-15", title: "15. Technical and Organisational Security Measures", icon: <Lock className="w-4 h-4" /> },
  { id: "section-16", title: "16. Children's Data", icon: <UserX className="w-4 h-4" /> },
  { id: "section-17", title: "17. Updates to This Privacy Policy", icon: <RefreshCw className="w-4 h-4" /> },
  { id: "section-18", title: "18. Grievance Officer and Contact Information", icon: <Mail className="w-4 h-4" /> },
];

export function MobilePrivacyPolicyContent() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("intro");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = sectionsList.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionsList[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmailToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) { navigator.clipboard.writeText("airation.it@gmail.com"); }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const definitionsTable = [
    { term: '"Personal Data"', def: 'Any data about an individual who is identifiable by or in relation to such data, as defined under the Digital Personal Data Protection Act, 2023. This includes name, contact information, professional history, biometric data, financial information, and any other data that can identify you directly or indirectly.' },
    { term: '"Sensitive Personal Data"', def: 'Personal Data pertaining to passwords, financial information (bank accounts, credit/debit cards, UPI IDs), health data, official identifier information (Aadhaar, PAN, Passport), biometric data (selfie/photo for verification), and any other data classified as sensitive under applicable Indian law.' },
    { term: '"Processing"', def: 'Any operation or set of operations performed on Personal Data, including collection, recording, organisation, structuring, storage, adaptation, retrieval, consultation, use, disclosure by transmission, dissemination, alignment, combination, restriction, erasure, or destruction.' },
    { term: '"Data Fiduciary"', def: 'Airation Softtech Private Limited, in its capacity as the entity that determines the purpose and means of processing your Personal Data, as defined under the DPDP Act, 2023.' },
    { term: '"Data Principal"', def: 'You, the candidate or job seeker whose Personal Data is being processed by Airation.' },
    { term: '"Consent Manager"', def: 'An entity registered with the Data Protection Board of India enabling you to give, manage, review, and withdraw your consent, as applicable under the DPDP Act, 2023.' },
    { term: '"Data Processor"', def: 'Any third party engaged by Airation to process Personal Data on Airation’s behalf, including cloud infrastructure providers, payment gateways, KYC verification vendors, and analytics partners.' },
    { term: '"Platform"', def: 'The website, mobile application, APIs, and all digital services operated by Airation Softtech Private Limited.' },
    { term: '"Services"', def: 'All services offered by Airation to candidates through the Platform, including job matching, profile management, employer communication, identity verification, and related features.' },
    { term: '"Cookies"', def: 'Small text files placed on your device by the Platform to enable functionality, analytics, and personalization, as further described in Section 11 of this Privacy Policy.' },
    { term: '"Anonymization"', def: 'The irreversible process of altering Personal Data in such a manner that you cannot be identified directly or indirectly, resulting in data that is no longer Personal Data under applicable law.' },
    { term: '"Pseudonymization"', def: 'The processing of Personal Data in such a manner that it can no longer be attributed to a specific individual without the use of additional information, which is kept separately and subject to technical and organizational safeguards.' }
  ];

  const catA = [
    { cat: "What we collect", details: "Full legal name, personal or professional phone number, email address, current residential or professional location (city/state level), and profile photograph." },
    { cat: "How we collect it", details: "Directly from you during registration, profile creation, or subsequent updates to your account." },
    { cat: "How we use it", details: "To create, authenticate, and manage your candidate profile; to enable verified employers to identify and contact you; to personalize your experience on the Platform including job recommendations, notifications, and interface preferences; and to send transactional communications such as application updates, interview scheduling, and account alerts." },
    { cat: "Why we process it", details: "To perform the contract between you and Airation for the provision of candidate services; to operate the candidate account; and to facilitate the job-seeking process. Phone and email are also used for two-factor authentication and account security." },
    { cat: "Legal basis", details: "Performance of a contract (Article 6(1)(b) equivalent under DPDP Act, 2023); legitimate interests of Airation in operating a secure and functional recruitment platform." },
    { cat: "Retention Period", details: "Retained for the full duration of your account lifecycle. Upon account deletion, personal identifiers are purged within 30 days, subject to backup retention schedules not exceeding 90 days. Residual anonymised data may be retained indefinitely for platform analytics." }
  ];

  const catB = [
    { cat: "What we collect", details: "Resume or curriculum vitae (CV) including employment history, job titles, responsibilities, and tenure; professional skills and competencies; educational background including institutions, qualifications, and graduation dates; portfolio links, GitHub profiles, or work samples; professional certifications, licences, and accreditations; career objectives and salary expectations (where voluntarily provided)." },
    { cat: "How we collect it", details: "Directly from you via document upload, manual profile entry, or import from LinkedIn or other integrated third-party professional networks (subject to your authorisation)." },
    { cat: "How we use it", details: "To power Airation’s proprietary AI-assisted job matching and candidate ranking algorithms; to generate personalised job recommendations and recruiter-facing candidate summaries; to enable verified employers to search, filter, and evaluate candidate profiles; to improve the Platform’s recommendation accuracy through behavioural feedback loops; and to provide candidates with career insights and job market analytics." },
    { cat: "Why we process it", details: "To fulfil the core purpose of the Platform — connecting suitable candidates with relevant employers. Processing is necessary for the performance of the candidate services agreement and constitutes a legitimate interest of the Platform." },
    { cat: "Legal basis", details: "Performance of a contract; legitimate interests of Airation in providing an effective recruitment platform; your explicit consent where applicable." },
    { cat: "Retention Period", details: "Retained for the duration of the account lifecycle or until you delete specific content. Following account deletion, professional data is purged within 30 days subject to backup schedules. Aggregated, anonymised insights derived from professional data may be retained indefinitely." }
  ];

  const catC = [
    { cat: "What we collect", details: "Government-issued identity documents including Aadhaar card, PAN card, Passport, Voter ID, or Driving Licence; a live selfie or facial photograph submitted for biometric liveness verification; background verification data including employment history verification, criminal record checks (where consented to), and educational credential authentication." },
    { cat: "How we collect it", details: "Directly from you when you opt into identity verification or when verification is required to access certain features. Identity document uploads and selfie/liveness checks are processed through Airation’s authorised KYC verification partner." },
    { cat: "How we use it", details: "To verify that you are who you claim to be, preventing the creation of fraudulent or impersonation profiles; to maintain platform integrity and trust; to comply with applicable regulatory obligations; and to enable features that require verified status, such as premium job applications or salary disclosure." },
    { cat: "Why we process it", details: "Fraud prevention and platform security constitute legitimate interests of Airation. Processing of government-issued ID and biometric data for identity verification purposes is subject to your explicit prior consent, which may be withdrawn at any time (with the consequence that verified status will be revoked)." },
    { cat: "Legal basis", details: "Explicit consent of the Data Principal for Sensitive Personal Data; legitimate interests (fraud prevention); compliance with applicable regulatory requirements." },
    { cat: "Retention Period", details: "Identity documents and selfie data are retained for the duration of account activity and for a further period of up to 5 (five) years as required by KYC regulations and applicable financial crime prevention obligations. Background verification reports are retained for up to 3 years." }
  ];

  const catD = [
    { cat: "What we collect", details: "UPI ID or VPA (Virtual Payment Address); transaction reference numbers and transaction history for premium subscriptions or paid services; billing name, billing address, and GST number (if applicable); bank account details where required for candidate payouts or refunds. Airation does NOT store full debit/credit card numbers, CVV/CVC codes, or net banking passwords." },
    { cat: "How we collect it", details: "Collected at the time of initiating a payment transaction through the Platform’s integrated payment interface. Full card details are transmitted directly to Airation’s PCI-DSS compliant third-party payment gateway and are never stored on Airation’s servers." },
    { cat: "How we use it", details: "To process payments for premium subscriptions, job application boosts, or other paid features; to generate transaction receipts and invoices; to manage subscription renewals and cancellations; to process refunds in accordance with Airation’s Refund Policy; and to comply with financial and tax record-keeping obligations." },
    { cat: "Why we process it", details: "Processing is necessary for the performance of a contract for paid services. Tax and financial record-keeping processing is required by law under the Income Tax Act, 1961, and GST law." },
    { cat: "Legal basis", details: "Performance of a contract; compliance with financial, taxation, and accounting legal obligations." },
    { cat: "Retention Period", details: "Transaction records and billing details are retained for a minimum of 8 (eight) years as required under the Companies Act, 2013, the Income Tax Act, 1961, and GST legislation. Payment instrument details (UPI ID, bank account) are retained only for as long as needed for the purpose of the transaction and refund window." }
  ];

  const catE = [
    { cat: "What we collect", details: "IP address, approximate geolocation derived from IP (city/region level), device type (mobile/desktop/tablet), operating system, browser type and version, device identifiers (where applicable and consented to); platform behavioural data including pages visited, job listings viewed, searches conducted, swipe actions, application submissions, session duration, click-through patterns, and feature interactions." },
    { cat: "How we collect it", details: "Automatically collected through server logs, cookies, web beacons, pixel tags, software development kits (SDKs), and similar tracking technologies when you access and use the Platform. See Section 11 (Cookies and Tracking Technologies) for further details." },
    { cat: "How we use it", details: "To ensure the technical operation, stability, and performance of the Platform; to diagnose bugs, errors, and security incidents; to analyse aggregate usage patterns for product improvement; to deliver personalised content including job recommendations and UI preferences; to detect anomalous behaviour indicative of fraud, account compromise, or bot activity; and to measure the performance of marketing and recruitment campaigns." },
    { cat: "Why we process it", details: "Legitimate interests of Airation in operating a secure, functional, and optimised digital platform. Where processing involves targeted analytics or profiling, Airation relies on your consent obtained via the Cookie Consent mechanism." },
    { cat: "Legal basis", details: "Legitimate interests; consent (for non-essential cookies and profiling analytics)." },
    { cat: "Retention Period", details: "Raw server logs are retained for 90 days. Aggregated, anonymised usage analytics are retained indefinitely. Cookie-derived data is retained in accordance with individual cookie lifespans disclosed in the Cookie Policy." }
  ];

  const catF = [
    { cat: "What we collect", details: "Messages sent between candidates and employers through the Platform’s in-app messaging system; emails and support tickets submitted to Airation’s customer support team; feedback, ratings, or reviews submitted through the Platform; responses to surveys or research studies (where you voluntarily participate)." },
    { cat: "How we collect it", details: "Directly from you when you initiate or respond to communications through the Platform’s communication features." },
    { cat: "How we use it", details: "To facilitate communication between candidates and employers; to provide customer support and resolve disputes; to improve the quality and safety of the Platform; to detect and prevent abuse, harassment, or policy violations; and to conduct research to enhance Services." },
    { cat: "Why we process it", details: "Legitimate interests of Airation in maintaining a safe, functional communication environment; performance of a support contract; legal obligations to retain records of certain communications." },
    { cat: "Legal basis", details: "Legitimate interests; performance of a contract; legal obligation." },
    { cat: "Retention Period", details: "In-app messages are retained for 2 (two) years or until account deletion. Support communications are retained for 3 (three) years. Survey responses are retained in anonymised form indefinitely." }
  ];

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sectionsList;
    const query = searchQuery.toLowerCase();
    return sectionsList.filter(s => s.title.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pt-16 md:pt-20">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white pt-24 pb-16 px-4 sm:px-6 sm:pt-28 overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10 text-center">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-5">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>Airation Softtech Private Limited · Official Privacy Policy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              Privacy Policy
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-4">
              Candidate / Job Seeker
            </h2>

            <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
              Airation Softtech Private Limited
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300 mb-8">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-medium">
                Last updated: <strong>24.03.2026</strong>
              </span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-medium">
                Version: <strong>1.0</strong>
              </span>
              <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> DPDP Act 2023 Compliant
              </span>
            </div>

            {/* ACTION BAR: SEARCH & PRINT */}
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search policy sections (e.g. Aadhaar, KYC, Refund, Consent)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-700/50"
                />
              </div>
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md"
              >
                <Download className="w-4 h-4" /> Save / Print PDF
              </button>
            </div>

          </div>
        </section>

        {/* STATUTORY HIGHLIGHT BAR */}
        <section className="bg-white border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#2563EB] text-white shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Legal Basis & Governance</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    DPDP Act 2023 (India), IT Act 2000, IT (SPDI) Rules 2011 & GDPR aligned principles.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Data Fiduciary</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Airation Softtech Private Limited, 8/4, Sector-4, Jankipuram, Lucknow – 226021, UP, India.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Grievance Contact</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Official email: <a href="mailto:airation.it@gmail.com" className="text-blue-600 font-bold hover:underline">airation.it@gmail.com</a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* POLICY CONTENT CONTAINER WITH STICKY TOC */}
        <section className="py-10 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">

            {/* STICKY TABLE OF CONTENTS SIDEBAR */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="sticky top-24 sm:top-28 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ScrollText className="w-4 h-4 text-[#2563EB]" /> Table of Contents
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">{filteredSections.length} sections</span>
                </div>

                <div className="max-h-[calc(100vh-160px)] overflow-y-auto pr-1 space-y-1 scrollbar-hide text-xs font-medium">
                  {filteredSections.map(s => {
                    const isActive = activeSection === s.id;
                    return (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={() => setActiveSection(s.id)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${isActive
                            ? "bg-[#2563EB] text-white font-semibold shadow-xs"
                            : "text-slate-600 hover:bg-blue-50 hover:text-[#2563EB]"
                          }`}
                      >
                        <span className={`shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}>{s.icon}</span>
                        <span className="truncate">{s.title}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* MAIN POLICY DOCUMENT BODY (100% VERBATIM PDF TEXT) */}
            <div className="flex-1 space-y-10 min-w-0">

              {/* INTRODUCTORY PREAMBLE */}
              <div id="intro" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">

                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">Privacy Policy (Candidate / Job Seeker)</h2>
                    <p className="text-xs text-slate-500">Airation Softtech Private Limited · Last updated: 24.03.2026 | Version 1.0</p>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                  <p>
                    This Privacy Policy (&quot;Privacy Policy&quot;) is published by Airation Softtech Private Limited, a company incorporated under the Companies Act, 2013, with its registered office at 8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh, India (&quot;Airation&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). This Privacy Policy governs the collection, use, storage, processing, disclosure, and protection of Personal Data submitted by candidates and job seekers (&quot;you&quot;, &quot;your&quot;, or &quot;User&quot;) who access or use our Platform and Services.
                  </p>
                  <p>
                    This Privacy Policy is issued in compliance with the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;), the Information Technology Act, 2000 (&quot;IT Act&quot;), the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (&quot;SPDI Rules&quot;), and all other applicable Indian laws and regulations governing data privacy and protection.
                  </p>
                  <p>
                    By registering on the Platform, creating a candidate profile, or otherwise using our Services, you acknowledge that you have read, understood, and unconditionally agree to be bound by this Privacy Policy. If you do not agree with any provision of this Privacy Policy, you must immediately discontinue use of the Platform.
                  </p>
                  <p>
                    This Privacy Policy must be read in conjunction with our Terms and Conditions, Intellectual Property Policy, Cookie Policy, and any other policies published on the Platform. In the event of any conflict between this Privacy Policy and any other policy with respect to data protection matters, this Privacy Policy shall prevail.
                  </p>
                </div>

                {/* LEGAL BASIS BOX */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row gap-3 items-start">
                  <span className="px-3 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                    Legal Basis
                  </span>
                  <p className="text-xs text-blue-950 leading-relaxed m-0 font-medium">
                    This Privacy Policy is compliant with the Digital Personal Data Protection Act, 2023 (India), the Information Technology Act, 2000, the IT (SPDI) Rules 2011, and applicable provisions of international data protection standards including principles aligned with the GDPR where relevant to cross-border data flows involving Indian citizens.
                  </p>
                </div>

                {/* CONTACT INFORMATION */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-700">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Contact Information:</h4>
                  <p className="font-semibold text-slate-900">Airation Softtech Private Limited</p>
                  <p>Address: 8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh, India</p>
                  <p>Email: <a href="mailto:airation.it@gmail.com" className="text-blue-600 font-bold hover:underline">airation.it@gmail.com</a></p>
                </div>

                {/* EXPLICIT CONSENT STATEMENT */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-2">
                  <p className="text-xs font-bold text-slate-900 leading-relaxed uppercase m-0">
                    BY ACCESSING OR USING THE PLATFORM AND SERVICES, YOU EXPRESSLY AND FREELY CONSENT TO AIRATION SOFTTECH PRIVATE LIMITED’S COLLECTION, RETENTION, ANALYSIS, PROCESSING, USE, AND DISCLOSURE OF YOUR PERSONAL DATA IN ACCORDANCE WITH THIS PRIVACY POLICY. CONSENT OBTAINED UNDER THIS POLICY IS SPECIFIC, INFORMED, UNCONDITIONAL, AND UNAMBIGUOUS AS REQUIRED UNDER THE DIGITAL PERSONAL DATA PROTECTION ACT, 2023.
                  </p>
                </div>

              </div>

              {/* SECTION 1: DEFINITIONS AND INTERPRETATION */}
              <div id="section-1" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">1. Definitions and Interpretation</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  The following terms shall have the meanings set out below and shall apply throughout this Privacy Policy and all related policies of Airation.
                </p>

                {/* TABLE OF DEFINITIONS */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5 w-1/3 border-r border-slate-200">Term</th>
                        <th className="p-3.5">Definition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {definitionsTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5 font-bold text-[#2563EB] border-r border-slate-200 align-top">
                            {item.term}
                          </td>
                          <td className="p-3.5 text-slate-700 leading-relaxed">
                            {item.def}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 2: OBJECTIVE AND SCOPE */}
              <div id="section-2" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Eye className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">2. Objective and Scope of This Policy</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Airation is committed to maintaining the highest standards of data privacy and security for all candidates using its Platform. The objective of this Privacy Policy is to:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc ml-5">
                  <li>Provide you with a clear, transparent, and comprehensive understanding of how your Personal Data is collected, used, stored, and shared by Airation;</li>
                  <li>Ensure full compliance with the Digital Personal Data Protection Act, 2023, the IT Act, 2000, and all other applicable Indian data protection legislation;</li>
                  <li>Establish your rights as a Data Principal and Airation’s obligations as a Data Fiduciary;</li>
                  <li>Describe the technical and organizational safeguards implemented by Airation to protect your Personal Data against loss, misuse, unauthorized access, disclosure, alteration, and destruction;</li>
                  <li>Set out the legal bases upon which Airation processes each category of your Personal Data.</li>
                </ul>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  This Privacy Policy applies to all Personal Data collected through the Platform, whether submitted during registration, profile creation, job applications, identity verification, payment processing, or any other interaction with the Platform or its features. It applies to candidates accessing the Platform from within India and, where applicable, to candidates accessing the Platform from outside India in connection with job opportunities in India.
                </p>
              </div>

              {/* SECTION 3: CATEGORIES OF PERSONAL DATA WE COLLECT */}
              <div id="section-3" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">3. Categories of Personal Data We Collect</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Airation collects Personal Data that is adequate, relevant, and limited to what is strictly necessary for the purposes described in this Privacy Policy (the principle of data minimization). The categories of Personal Data we collect, and the specific details of how we collect, use, process, and retain each category, are set out below.
                </p>

                {/* A. PERSONAL INFORMATION */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">A. Personal Information</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-1/4 border-r border-slate-200">Category</th>
                          <th className="p-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {catA.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-semibold border-r border-slate-200 bg-slate-50/50">{row.cat}</td>
                            <td className="p-3 leading-relaxed">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* B. PROFESSIONAL INFORMATION */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">B. Professional Information</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-1/4 border-r border-slate-200">Category</th>
                          <th className="p-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {catB.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-semibold border-r border-slate-200 bg-slate-50/50">{row.cat}</td>
                            <td className="p-3 leading-relaxed">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* C. IDENTITY AND VERIFICATION DATA */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">C. Identity and Verification Data (if applicable)</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-1/4 border-r border-slate-200">Category</th>
                          <th className="p-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {catC.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-semibold border-r border-slate-200 bg-slate-50/50">{row.cat}</td>
                            <td className="p-3 leading-relaxed">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* SENSITIVE DATA NOTICE BOX */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row gap-3 items-start">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                      Sensitive Data Notice
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed m-0">
                      Identity documents (Aadhaar, PAN, Passport) and biometric data (selfie/liveness photos) constitute Sensitive Personal Data under the IT (SPDI) Rules, 2011, and Sensitive Data under the DPDP Act, 2023. This data is processed only with your explicit, freely given, informed, and specific consent. You may withdraw consent at any time by contacting airation.it@gmail.com, which will result in the revocation of your verified status on the Platform.
                    </p>
                  </div>
                </div>

                {/* D. PAYMENT INFORMATION */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">D. Payment Information (if applicable)</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-1/4 border-r border-slate-200">Category</th>
                          <th className="p-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {catD.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-semibold border-r border-slate-200 bg-slate-50/50">{row.cat}</td>
                            <td className="p-3 leading-relaxed">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* E. DEVICE AND USAGE DATA */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">E. Device and Usage Data</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-1/4 border-r border-slate-200">Category</th>
                          <th className="p-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {catE.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-semibold border-r border-slate-200 bg-slate-50/50">{row.cat}</td>
                            <td className="p-3 leading-relaxed">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* F. COMMUNICATIONS DATA */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">F. Communications Data</h3>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-1/4 border-r border-slate-200">Category</th>
                          <th className="p-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {catF.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-semibold border-r border-slate-200 bg-slate-50/50">{row.cat}</td>
                            <td className="p-3 leading-relaxed">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* SECTION 4: LEGAL BASES */}
              <div id="section-4" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">4. Legal Bases for Processing Personal Data</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Airation processes your Personal Data only where a valid legal basis exists under applicable Indian law, including the DPDP Act, 2023. The primary legal bases relied upon by Airation are:
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    <strong>Consent:</strong> Where you have given free, specific, informed, unconditional, and unambiguous consent to the processing of your Personal Data for a stated purpose. You may withdraw consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out prior to withdrawal, but may limit your ability to use certain features of the Platform.
                  </p>
                  <p>
                    <strong>Performance of a Contract:</strong> Where processing is necessary to perform the candidate services agreement between you and Airation, including account creation, job matching, profile management, and payment processing for premium services.
                  </p>
                  <p>
                    <strong>Legitimate Interests:</strong> Where processing is necessary for Airation’s legitimate business interests, provided such interests are not overridden by your fundamental rights and freedoms. Legitimate interests relied upon include platform security, fraud prevention, product improvement, and analytics. Where Airation relies on legitimate interests, a Legitimate Interests Assessment (LIA) has been conducted.
                  </p>
                  <p>
                    <strong>Legal Obligation:</strong> Where processing is necessary to comply with a legal obligation under Indian law, including tax record retention, KYC compliance, compliance with court orders, and reporting obligations to regulatory authorities.
                  </p>
                  <p>
                    <strong>Vital Interests:</strong> In exceptional circumstances, Airation may process Personal Data to protect the vital interests of you or another natural person, including in life-threatening situations or emergencies.
                  </p>
                </div>
              </div>

              {/* SECTION 5: HOW WE USE YOUR PERSONAL DATA */}
              <div id="section-5" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">5. How We Use Your Personal Data</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  In addition to the specific uses described for each data category in Section 3, Airation uses Personal Data collected from candidates for the following overarching purposes:
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    <strong>Job Matching and Personalised Recommendations:</strong> Airation’s proprietary AI-based matching engine analyses your professional profile, skills, experience, location preferences, and behavioural signals to generate ranked lists of relevant job opportunities. The matching algorithm uses statistical and machine-learning models trained on historical recruitment outcomes on the Platform. Candidates may opt out of algorithmic profiling for job matching by contacting airation.it@gmail.com, though this will significantly reduce the relevance of job recommendations.
                  </p>
                  <p>
                    <strong>Identity Verification and Platform Integrity:</strong> Verification data is used to authenticate your identity, assign verified status to your profile, and present you as a trustworthy candidate to employers. Verified profiles receive higher visibility in employer search results. Verification also serves to prevent the creation of fake profiles, fraudulent job applications, and impersonation of other candidates.
                  </p>
                  <p>
                    <strong>Employer Communication and Recruitment Facilitation:</strong> Your profile data is made available to verified employers in accordance with your visibility settings. Employer-initiated contact through the Platform’s messaging system is facilitated using your registered contact details. Airation does not share your direct contact details with employers without your consent unless you have set your profile to ‘fully visible’.
                  </p>
                  <p>
                    <strong>Payment and Subscription Management:</strong> Financial data is used to process payments for premium features, issue invoices, manage subscription renewals, and process refunds. Payment data is transmitted to Airation’s PCI-DSS compliant payment gateway and is never stored in plain text on Airation’s servers.
                  </p>
                  <p>
                    <strong>Platform Security and Fraud Prevention:</strong> Device and usage data is continuously analysed by Airation’s AI-powered security systems to detect anomalous access patterns, credential stuffing attacks, account takeover attempts, and other forms of fraud. Suspicious accounts may be temporarily suspended pending investigation.
                  </p>
                  <p>
                    <strong>Legal Compliance and Regulatory Reporting:</strong> Airation processes certain Personal Data to comply with its obligations under applicable Indian law, including the DPDP Act, 2023, the IT Act, 2000, the Income Tax Act, 1961, GST laws, and any order or direction issued by a competent court or regulatory authority.
                  </p>
                  <p>
                    <strong>Research, Analytics, and Service Improvement:</strong> Anonymised and aggregated data derived from candidate interactions is used to improve the Platform’s features, fix technical issues, conduct market research, and develop new services. No individual candidate is identifiable from such aggregated data.
                  </p>
                </div>
              </div>

              {/* SECTION 6: AUTOMATED DECISION-MAKING AND PROFILING */}
              <div id="section-6" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">6. Automated Decision-Making and Profiling</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Airation uses automated processing, including machine-learning-based profiling, to facilitate job matching and candidate ranking. This involves creating a candidate ‘match score’ that determines the order in which your profile appears in employer search results and the job recommendations you receive.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Airation acknowledges that automated decision-making may have a significant impact on your employment opportunities on the Platform. Accordingly, Airation provides the following safeguards:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc ml-5 leading-relaxed">
                  <li>You have the right to request human review of any automated decision that significantly affects you, including removal of your profile from employer search results or suspension of your account;</li>
                  <li>You may contact airation.it@gmail.com to request an explanation of the logic underlying the matching score assigned to your profile;</li>
                  <li>You may opt out of algorithmic profiling at any time, though this will affect the personalisation of your experience on the Platform;</li>
                  <li>Automated decisions relating to account suspension for fraud are subject to a manual review process triggered by your appeal within 7 (seven) days of notification.</li>
                </ul>
              </div>

              {/* SECTION 7: PROFILE VISIBILITY AND DATA CONTROL */}
              <div id="section-7" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">7. Profile Visibility and Data Control</h2>
                  </div>
                </div>

                {/* 7.1 VISIBILITY SETTINGS */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">7.1 Visibility Settings</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                    Airation provides candidates with granular controls over the visibility of their profile and the specific data elements within it. The default visibility settings and available options are as follows:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc ml-5 leading-relaxed">
                    <li><strong>Profile Visibility:</strong> Your profile is, by default, visible only to employers who are registered and verified on the Platform. You may set your profile to ‘Private’ (visible to no employers), ‘Verified Employers Only’ (default), or ‘Public’ (visible to all registered employers).</li>
                    <li><strong>Contact Information:</strong> Your phone number and email address are masked by default and revealed to employers only when you explicitly choose to share them or accept an employer’s contact request.</li>
                    <li><strong>Salary Expectations:</strong> Salary data, if provided, is visible only to employers you have directly applied to, unless you change this setting.</li>
                    <li><strong>Identity Verification Status:</strong> Your verified badge is visible to all employers who view your profile, but the underlying verification documents are never shared with employers.</li>
                  </ul>
                </div>

                {/* 7.2 YOUR DATA CONTROL RIGHTS */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">7.2 Your Data Control Rights</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                    You retain full and continuous control over your Personal Data on the Platform. You may, at any time, exercise the following rights:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc ml-5 leading-relaxed">
                    <li>Edit or update your profile, professional information, or account settings through the Platform’s account management interface;</li>
                    <li>Delete specific data elements, documents, or your entire profile and account through the Platform’s settings;</li>
                    <li>Request a machine-readable export of all Personal Data held by Airation in relation to your account (data portability);</li>
                    <li>Withdraw consent to any processing for which consent was the legal basis, with immediate effect;</li>
                    <li>Object to processing based on legitimate interests, including profiling for job recommendations.</li>
                  </ul>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
                    To exercise any of the above rights, submit a request to airation.it@gmail.com with the subject line ‘Data Rights Request – [Your Full Name]’. Airation will acknowledge your request within 72 hours and respond substantively within 15 (fifteen) business days, subject to verification of your identity.
                  </p>
                </div>
              </div>

              {/* SECTION 8: PAYMENTS, FINANCIAL DATA, AND REFUNDS */}
              <div id="section-8" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">8. Payments, Financial Data, and Refunds</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  All payment transactions on the Platform are processed exclusively through Airation’s authorised third-party payment gateway partners, which are certified to the Payment Card Industry Data Security Standard (PCI-DSS). Airation does not process, store, or have access to your full debit or credit card number, CVV/CVC code, net banking credentials, or UPI PIN.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  When you initiate a payment, your payment instrument details are transmitted directly to the payment gateway using Transport Layer Security (TLS) encryption. Airation receives only a tokenised transaction reference and the transaction status (success/failure), which are stored in Airation’s encrypted financial records.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold m-0">
                  Transactions on the Platform may include:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc ml-5 leading-relaxed">
                  <li>Premium subscription plans for candidates (e.g., enhanced profile visibility, priority applications, career coaching access);</li>
                  <li>One-time purchases of job application credits or value-added services;</li>
                  <li>Refundable deposits for certain assessment or verification services.</li>
                </ul>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Refunds, where applicable, are processed in accordance with Airation’s Refund Policy as published on the Platform. Refund requests must be submitted within the period specified in the Refund Policy and will be credited to the original payment instrument within 7 to 10 business days of approval.
                </p>

                {/* PCI-DSS COMPLIANCE BOX */}
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row gap-3 items-start">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                    PCI-DSS Compliance
                  </span>
                  <p className="text-xs text-indigo-950 leading-relaxed m-0">
                    Airation’s payment infrastructure is integrated exclusively with PCI-DSS Level 1 certified payment gateways. Card data is never transmitted to or stored on Airation’s servers. All payment API communications use TLS 1.2 or higher encryption.
                  </p>
                </div>
              </div>

              {/* SECTION 9: IDENTITY VERIFICATION AND DOCUMENT SECURITY */}
              <div id="section-9" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <LockKeyhole className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">9. Identity Verification and Document Security</h2>
                  </div>
                </div>

                {/* 9.1 DOCUMENT HANDLING */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">9.1 Document Handling</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                    All identity documents submitted by candidates for KYC or verification purposes are treated as Sensitive Personal Data and are subject to the highest level of security controls applied by Airation. Specifically:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc ml-5 leading-relaxed">
                    <li>Identity documents are transmitted to Airation’s KYC verification partner using AES-256 encrypted channels;</li>
                    <li>Documents are stored in encrypted form on secure cloud infrastructure with access controls that restrict access to authorised personnel only;</li>
                    <li>Identity documents are never displayed to, shared with, or downloadable by employers, recruiters, or any other third party without your explicit written consent;</li>
                    <li>Airation’s KYC partners are bound by contractual data processing agreements requiring equivalent security standards and prohibiting secondary use of your documents;</li>
                    <li>Physical access to servers hosting identity document data is restricted to authorised personnel and subject to multi-factor authentication.</li>
                  </ul>
                </div>

                {/* 9.2 BIOMETRIC DATA */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 text-[#2563EB]">9.2 Biometric Data</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                    Selfie photographs and liveness check data submitted for verification purposes are classified as biometric Personal Data and constitute Sensitive Personal Data under applicable Indian law. Such data is:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc ml-5 leading-relaxed">
                    <li>Processed solely for the purpose of confirming your identity at the time of verification;</li>
                    <li>Not used for facial recognition, continuous monitoring, or any other purpose beyond one-time liveness verification;</li>
                    <li>Deleted from the KYC partner’s active systems within 30 days of completed verification, with only the verification result (pass/fail) and a reference token retained by Airation;</li>
                    <li>Subject to your explicit consent, which may be withdrawn at any time resulting in revocation of verified status.</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 10: SHARING, DISCLOSURE, AND TRANSFER OF PERSONAL DATA */}
              <div id="section-10" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">10. Sharing, Disclosure, and Transfer of Personal Data</h2>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-1">10.1 Sharing with Verified Employers</h3>
                    <p className="m-0">
                      Your candidate profile information is made available to employers who are registered on the Platform and have passed Airation’s employer verification process. The specific data elements shared with employers depend on your visibility settings, as described in Section 7. Airation does not share your Sensitive Personal Data, identity documents, or financial information with employers.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-2">10.2 Sharing with Data Processors</h3>
                    <p className="mb-3">
                      Airation engages the following categories of third-party Data Processors who may access certain elements of your Personal Data on Airation’s behalf, strictly for the purposes described in this Privacy Policy:
                    </p>
                    <ul className="space-y-2 list-disc ml-5">
                      <li><strong>Cloud Infrastructure Providers:</strong> Hosting, storage, and computing infrastructure providers (e.g., AWS, Google Cloud, or equivalent) for storing and processing Platform data;</li>
                      <li><strong>Payment Gateway Partners:</strong> PCI-DSS certified payment processors for handling transaction data;</li>
                      <li><strong>KYC and Verification Partners:</strong> Authorised identity verification vendors for processing government ID documents and liveness checks;</li>
                      <li><strong>Communication Service Providers:</strong> Email, SMS, and push notification service providers for delivering transactional and marketing communications;</li>
                      <li><strong>Analytics Partners:</strong> Privacy-compliant analytics tools for analysing Platform usage in anonymised or pseudonymised form;</li>
                      <li><strong>AI and Machine Learning Infrastructure:</strong> Third-party ML platforms used in the development and operation of Airation’s job matching algorithms, subject to strict data anonymisation requirements.</li>
                    </ul>
                    <p className="mt-3 m-0">
                      All Data Processors are bound by Data Processing Agreements (DPAs) that impose obligations equivalent to or stricter than those applicable to Airation under the DPDP Act, 2023. Airation remains responsible for ensuring that its Data Processors comply with these obligations.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-2">10.3 Disclosure to Legal Authorities</h3>
                    <p className="mb-2">
                      Airation may disclose your Personal Data to law enforcement agencies, regulatory authorities, courts, or government bodies in the following circumstances:
                    </p>
                    <ul className="space-y-1.5 list-disc ml-5">
                      <li>Where required to do so by a valid court order, statutory obligation, or lawful direction issued by a competent authority under Indian law;</li>
                      <li>Where necessary to investigate, prevent, or take action against suspected fraud, cyber crime, or other illegal activity involving the Platform;</li>
                      <li>Where necessary to protect the rights, property, or safety of Airation, its employees, its Users, or the public;</li>
                      <li>In connection with any legal proceedings, investigation, or regulatory enquiry to which Airation is a party or subject.</li>
                    </ul>
                    <p className="mt-2 m-0">
                      Airation will, to the extent permitted by law, notify you of any such disclosure before it is made or as promptly thereafter as circumstances permit.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <h3 className="font-bold text-slate-900 text-[#2563EB]">10.4 Cross-Border Data Transfers</h3>
                    <p className="m-0">
                      Airation primarily stores and processes your Personal Data within India. To the extent that any Personal Data is transferred to servers or processors located outside India (for example, in connection with the use of internationally hosted cloud services or analytics platforms), Airation shall ensure that such transfers are effected in accordance with the provisions of the DPDP Act, 2023 and any rules or notifications issued by the Central Government specifying approved jurisdictions for cross-border data transfers.
                    </p>
                    <p className="m-0">
                      Airation implements appropriate safeguards for cross-border transfers, including standard contractual clauses, adequacy determinations, or binding corporate rules, as applicable. Users may request information about cross-border transfer safeguards by contacting airation.it@gmail.com.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-1">10.5 No Sale of Personal Data</h3>
                    <p className="m-0">
                      Airation does not sell, rent, or otherwise commercially exploit your Personal Data to third parties. Personal Data is shared only as described in this Section and only to the extent necessary for the stated purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 11: COOKIES AND TRACKING TECHNOLOGIES */}
              <div id="section-11" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">11. Cookies and Tracking Technologies</h2>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-2">11.1 Types of Cookies Used</h3>
                    <p className="mb-2">
                      When you access the Platform, Airation and its authorised third-party partners may place the following categories of cookies and similar tracking technologies on your device:
                    </p>
                    <ul className="space-y-2 list-disc ml-5">
                      <li><strong>Strictly Necessary Cookies:</strong> Essential for the operation of the Platform, including session management, authentication, and security tokens. These cannot be disabled without rendering the Platform non-functional.</li>
                      <li><strong>Performance and Analytics Cookies:</strong> Used to collect information about how you interact with the Platform, including pages visited, errors encountered, and session duration, for the purpose of improving Platform performance.</li>
                      <li><strong>Functional Cookies:</strong> Used to remember your preferences (such as language, location, and display settings) to provide a personalised experience.</li>
                      <li><strong>Targeting and Marketing Cookies:</strong> Used by Airation and its advertising partners to deliver relevant job advertisements and content based on your browsing behaviour, both on and off the Platform. These are subject to your prior consent.</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-1">11.2 Cookie Consent and Control</h3>
                    <p className="m-0">
                      Upon first accessing the Platform, you will be presented with a Cookie Consent Banner that allows you to accept, reject, or customise your cookie preferences by category. Your consent is recorded and time stamped. Strictly Necessary Cookies are applied without requiring your consent, as they are essential for the Platform to function.
                    </p>
                    <p className="mt-2 m-0">
                      You may change your cookie preferences at any time through the ‘Cookie Settings’ option in the Platform’s footer or account settings. You may also control or delete cookies directly through your browser settings; however, disabling certain cookies may impair the functionality of the Platform.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-1">11.3 Do Not Track</h3>
                    <p className="m-0">
                      The Platform does not currently respond to browser ‘Do Not Track’ (DNT) signals. Airation is monitoring developments in DNT standards and will update this policy if a widely accepted standard is implemented.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-1">11.4 Third-Party Tracking</h3>
                    <p className="m-0">
                      Third-party services integrated into the Platform (such as analytics providers and social login providers) may set their own cookies subject to their own privacy policies. Airation does not control third-party cookies and encourages you to review the privacy policies of any third-party service you interact with through the Platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 12: SAFETY, FRAUD PREVENTION, AND PLATFORM INTEGRITY */}
              <div id="section-12" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">12. Safety, Fraud Prevention, and Platform Integrity</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Airation is committed to maintaining a safe, trustworthy, and fraud-free environment for candidates. The following technical and procedural safeguards are in place:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc ml-5 leading-relaxed">
                  <li><strong>AI-Based Anomaly Detection:</strong> Airation’s security system continuously monitors login patterns, application submission rates, and behavioural signals to detect accounts exhibiting bot-like or fraudulent behaviour. Detected anomalies trigger automated temporary holds pending manual security review.</li>
                  <li><strong>Fake Job Post Filtering:</strong> All employer job postings are subject to automated content analysis and manual spot-checks to identify and remove fake, misleading, or exploitative job advertisements before they reach candidates.</li>
                  <li><strong>Report and Block System:</strong> Candidates may report suspicious employers, job postings, or communications directly through the Platform interface. Reports are reviewed by Airation’s Trust and Safety team within 48 hours.</li>
                  <li><strong>Employer Verification:</strong> All employers are required to complete Airation’s employer verification process before being permitted to contact candidates or access full candidate profiles. Unverified employers have restricted access to candidate data.</li>
                  <li><strong>Phishing and Impersonation Monitoring:</strong> Airation monitors for external websites, social media accounts, or email campaigns that impersonate Airation or the Platform and takes takedown action where possible.</li>
                </ul>
              </div>

              {/* SECTION 13: DATA RETENTION AND ERASURE */}
              <div id="section-13" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Server className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">13. Data Retention and Erasure</h2>
                  </div>
                </div>

                {/* 13.1 GENERAL RETENTION PRINCIPLES */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h3 className="font-bold text-slate-900 text-[#2563EB]">13.1 General Retention Principles</h3>
                  <p className="m-0">
                    Airation retains Personal Data only for as long as is necessary to fulfil the purpose for which it was collected, or as required by applicable law. Airation’s data retention framework is based on the following principles:
                  </p>
                  <ul className="space-y-1 list-disc ml-5">
                    <li>Data minimisation: only data that is necessary is collected and retained;</li>
                    <li>Purpose limitation: data is retained only for the period required to fulfil the original purpose of collection;</li>
                    <li>Legal compliance: retention periods are extended where required by law (e.g., financial records, KYC documents);</li>
                    <li>Security during retention: all retained data is subject to the same security controls as active data.</li>
                  </ul>
                </div>

                {/* 13.2 SPECIFIC RETENTION PERIODS */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h3 className="font-bold text-slate-900 text-[#2563EB]">13.2 Specific Retention Periods</h3>
                  <p className="m-0">
                    The following retention schedule applies to the categories of Personal Data processed by Airation:
                  </p>
                  <ul className="space-y-1.5 list-disc ml-5">
                    <li>Personal and professional profile data: Duration of account activity + 30 days post-deletion;</li>
                    <li>Identity and KYC documents: Up to 5 years from account closure, as required by applicable KYC regulations;</li>
                    <li>Payment and transaction records: Minimum 8 years as required by the Companies Act, 2013, Income Tax Act, 1961, and GST laws;</li>
                    <li>Communications data (in-app messages): 2 years from creation or account deletion, whichever is earlier;</li>
                    <li>Support communications: 3 years from the date of the last communication;</li>
                    <li>Device and usage logs: 90 days (raw logs); indefinitely (anonymised aggregates);</li>
                    <li>Backup and archival copies: Purged within 90 days of the deletion of the primary data.</li>
                  </ul>
                </div>

                {/* 13.3 ACCOUNT DELETION AND ERASURE REQUESTS */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h3 className="font-bold text-slate-900 text-[#2563EB]">13.3 Account Deletion and Erasure Requests</h3>
                  <p className="m-0">
                    You may request deletion of your account and associated Personal Data at any time by submitting a request to airation.it@gmail.com or through the account deletion function in the Platform’s settings. Airation will process your deletion request within 30 (thirty) days, subject to the following qualifications:
                  </p>
                  <ul className="space-y-1.5 list-disc ml-5">
                    <li>Airation may retain Personal Data that is required to be retained under applicable law notwithstanding your erasure request;</li>
                    <li>Anonymised or de-identified data derived from your account may be retained indefinitely, as it no longer constitutes Personal Data;</li>
                    <li>Airation may retain data necessary to defend against legal claims, resolve disputes, or comply with ongoing regulatory obligations;</li>
                    <li>Upon completion of the erasure process, Airation will provide written confirmation that your Personal Data has been deleted.</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 14: YOUR RIGHTS AS A DATA PRINCIPAL UNDER THE DPDP ACT, 2023 */}
              <div id="section-14" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">14. Your Rights as a Data Principal under the DPDP Act, 2023</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  As a Data Principal under the Digital Personal Data Protection Act, 2023, you are entitled to the following rights with respect to your Personal Data processed by Airation. These rights are in addition to any other rights you may have under applicable Indian law.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    <strong>Right of Access (Section 11, DPDP Act):</strong> You have the right to obtain a summary of the Personal Data held by Airation about you, the purposes for which it is being processed, and a list of all Data Processors and third parties with whom your Personal Data has been shared.
                  </p>
                  <p>
                    <strong>Right to Correction and Erasure (Section 12, DPDP Act):</strong> You have the right to correct inaccurate, incomplete, or outdated Personal Data and to request erasure of Personal Data that is no longer necessary for the purpose for which it was collected.
                  </p>
                  <p>
                    <strong>Right to Grievance Redressal (Section 13, DPDP Act):</strong> You have the right to have your grievances about the processing of your Personal Data addressed by Airation’s designated Grievance Officer within the timeframes specified by law.
                  </p>
                  <p>
                    <strong>Right to Nominate (Section 14, DPDP Act):</strong> You have the right to nominate another individual to exercise your data protection rights on your behalf in the event of your death or incapacity.
                  </p>
                  <p>
                    <strong>Right to Withdraw Consent:</strong> You may withdraw consent for any processing for which consent was the legal basis at any time. Withdrawal of consent does not affect the lawfulness of processing that occurred prior to withdrawal.
                  </p>
                  <p>
                    <strong>Right to Data Portability:</strong> You have the right to receive your Personal Data in a structured, commonly used, and machine-readable format and to transmit that data to another service provider, to the extent technically feasible.
                  </p>
                  <p>
                    To exercise any of the above rights, submit a written request to airation.it@gmail.com with the subject line ‘DPDP Rights Request’ accompanied by adequate identity verification. Airation will acknowledge your request within 72 hours and respond within 15 (fifteen) business days. Requests that are manifestly unfounded or excessive may be subject to an administrative fee not exceeding a reasonable amount as prescribed by applicable regulations.
                  </p>
                </div>

                {/* DATA PROTECTION BOARD BOX */}
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row gap-3 items-start">
                  <span className="px-3 py-1 bg-purple-700 text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                    Data Protection Board
                  </span>
                  <p className="text-xs text-purple-950 leading-relaxed m-0 font-medium">
                    If you are not satisfied with Airation’s response to your rights request or grievance, you have the right to escalate your complaint to the Data Protection Board of India, once constituted under the Digital Personal Data Protection Act, 2023.
                  </p>
                </div>
              </div>

              {/* SECTION 15: TECHNICAL AND ORGANISATIONAL SECURITY MEASURES */}
              <div id="section-15" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">15. Technical and Organisational Security Measures</h2>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-2">15.1 Technical Controls</h3>
                    <p className="mb-2">
                      Airation implements the following technical security measures to protect your Personal Data against unauthorised access, disclosure, alteration, loss, or destruction:
                    </p>
                    <ul className="space-y-2 list-disc ml-5">
                      <li><strong>Encryption in Transit:</strong> All communications between your device and Airation’s servers are encrypted using Transport Layer Security (TLS 1.2 or higher). HTTPS is enforced across all Platform endpoints.</li>
                      <li><strong>Encryption at Rest:</strong> Personal Data stored on Airation’s databases and cloud infrastructure is encrypted at rest using AES-256 encryption. Sensitive Personal Data (identity documents, biometric data, financial records) is subject to additional field-level encryption.</li>
                      <li><strong>Access Control:</strong> Role-based access control (RBAC) restricts access to Personal Data to authorised personnel only, on a strict need-to-know basis. All access to sensitive databases is logged and audited.</li>
                      <li><strong>Multi-Factor Authentication (MFA):</strong> All administrative accounts and privileged access to production systems require MFA. Candidate accounts are offered optional MFA for enhanced account security.</li>
                      <li><strong>Penetration Testing and Vulnerability Assessments:</strong> Airation conducts regular third-party penetration tests and internal vulnerability assessments of its systems, networks, and application code to identify and remediate security weaknesses.</li>
                      <li><strong>Intrusion Detection and Prevention:</strong> Airation deploys network-level and application-level intrusion detection and prevention systems (IDS/IPS) to monitor for and respond to suspicious activity in real time.</li>
                      <li><strong>Data Masking and Tokenisation:</strong> Contact details (phone numbers, email addresses) are masked in employer-facing interfaces and tokenised in Airation’s internal systems to reduce the risk of exposure in the event of a security incident.</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-2">15.2 Organisational Controls</h3>
                    <p className="mb-2">
                      Airation implements the following organisational measures to support the security of Personal Data:
                    </p>
                    <ul className="space-y-1.5 list-disc ml-5">
                      <li><strong>Data Protection Training:</strong> All Airation employees with access to Personal Data receive mandatory data protection and security awareness training on an annual basis;</li>
                      <li><strong>Data Processing Agreements:</strong> All third-party Data Processors are required to execute Data Processing Agreements (DPAs) that impose equivalent security obligations;</li>
                      <li><strong>Internal Data Protection Policy:</strong> Airation maintains an internal Data Protection Policy governing the handling of Personal Data by its employees and contractors;</li>
                      <li><strong>Incident Response Plan:</strong> Airation maintains a documented Data Breach Incident Response Plan specifying procedures for detection, containment, assessment, notification, and remediation of data security incidents;</li>
                      <li><strong>Data Protection Officer:</strong> Airation has designated a Data Protection Point of Contact responsible for overseeing compliance with this Privacy Policy and applicable data protection law.</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 text-[#2563EB] mb-1">15.3 Security Incident Notification</h3>
                    <p className="m-0">
                      In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, Airation will notify you and the Data Protection Board of India (once constituted) in accordance with the timelines and procedures prescribed under the DPDP Act, 2023 and the IT Act, 2000. Notification will include the nature of the breach, the categories and approximate number of individuals affected, the likely consequences of the breach, and the measures taken or proposed to address the breach.
                    </p>
                  </div>

                  {/* LIMITATION BOX */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row gap-3 items-start">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                      Limitation
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed m-0 font-medium">
                      Notwithstanding the security measures described above, no system of data transmission or storage can be guaranteed to be 100% secure. Airation cannot guarantee the absolute security of your Personal Data against all threats. You are advised to use strong, unique passwords for your Airation account and to enable MFA where available.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 16: CHILDREN'S DATA */}
              <div id="section-16" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <UserX className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">16. Children’s Data</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  The Platform and all Services offered by Airation are intended solely for individuals who are 18 (eighteen) years of age or older. Airation does not knowingly collect, solicit, process, or retain any Personal Data from individuals under the age of 18. The DPDP Act, 2023 imposes additional obligations on the processing of data of children (defined as individuals under the age of 18), including the requirement to obtain verifiable parental consent.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  If Airation becomes aware that it has inadvertently collected Personal Data from a person under the age of 18 without verifiable parental consent, it will take immediate steps to delete such data from its systems. If you believe that Airation may have collected Personal Data from a minor, please contact airation.it@gmail.com immediately.
                </p>
              </div>

              {/* SECTION 17: UPDATES TO THIS PRIVACY POLICY */}
              <div id="section-17" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">17. Updates to This Privacy Policy</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Airation reserves the right to update, modify, or replace this Privacy Policy at any time to reflect changes in applicable law, Platform features, data processing practices, or business operations. The updated Privacy Policy will be published on the Platform with the revised effective date.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Where changes are material (i.e., where they significantly affect your rights, the purposes for which your data is processed, or the parties with whom your data is shared), Airation will provide advance notice of at least 14 (fourteen) days through a prominent in-Platform notification and, where possible, by email to your registered address.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  Your continued use of the Platform following the effective date of any updated Privacy Policy constitutes your acceptance of the revised terms. If you do not agree with the updated Privacy Policy, you must cease using the Platform and may request deletion of your account and Personal Data in accordance with Section 13.3.
                </p>
              </div>

              {/* SECTION 18: GRIEVANCE OFFICER AND CONTACT INFORMATION */}
              <div id="section-18" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">18. Grievance Officer and Contact Information</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  For any questions, concerns, complaints, or requests relating to this Privacy Policy or the processing of your Personal Data by Airation, you may contact Airation’s designated Grievance Officer at the following coordinates:
                </p>

                {/* GRIEVANCE OFFICER DETAILS CARD */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-white border border-blue-200 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 m-0">Grievance Officer</h3>
                      <p className="text-xs font-semibold text-slate-700 m-0">Airation Softtech Private Limited</p>
                    </div>

                    <button
                      onClick={copyEmailToClipboard}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-blue-200 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copiedEmail ? "Email Copied!" : "Copy Email"}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-blue-100">
                    <p className="flex items-center gap-2 m-0">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <strong>Email:</strong> <a href="mailto:airation.it@gmail.com" className="text-blue-600 font-bold hover:underline">airation.it@gmail.com</a>
                    </p>
                    <p className="flex items-start gap-2 m-0">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Address:</strong> 8/4, Sector-4, Jankipuram, Lucknow – 226021, Uttar Pradesh, India</span>
                    </p>
                  </div>

                  {/* RESPONSE BOX */}
                  <div className="p-4 rounded-2xl bg-white border border-blue-200 flex flex-col sm:flex-row gap-3 items-start">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                      Response
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed m-0 font-medium">
                      Airation’s Grievance Officer will acknowledge all complaints and requests within 72 hours of receipt and provide a substantive response within 15 (fifteen) business days, in accordance with the requirements of the Digital Personal Data Protection Act, 2023, and the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
                    </p>
                  </div>

                  {/* COMMITMENT BOX */}
                  <div className="p-4 rounded-2xl bg-white border border-blue-200 flex flex-col sm:flex-row gap-3 items-start">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                      Commitment
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed m-0 font-medium">
                      the requirements of the Digital Personal Data Protection Act, 2023, and the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
                    </p>
                  </div>
                </div>

                {/* APPROVAL STATEMENT */}
                <div className="p-4 rounded-2xl bg-slate-100 text-center text-xs text-slate-600 font-medium">
                  This Privacy Policy was last reviewed and approved by Airation Softtech Private Limited on 24.03.2026.
                </div>

              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
