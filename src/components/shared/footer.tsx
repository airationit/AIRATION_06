"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./logo";
import { siteConfig } from "@/config/site";

/* ─── Social SVG Icons ─── */
function IconLinkedin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconYoutube({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLS: FooterColumn[] = [
  {
    title: "Candidates",
    links: [
      { label: "Find Jobs", href: "/jobs" },
      { label: "Download App", href: siteConfig.links.playStore },
      { label: "Candidate Feedback", href: "/feedback?role=candidate" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Job", href: siteConfig.links.employer },
      { label: "Employer Dashboard", href: siteConfig.links.employer },
      { label: "Employer Feedback", href: "/feedback?role=employer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "How Hirance Works", href: "/how-it-works" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal & Sitemap",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

const SOCIALS = [
  { icon: IconLinkedin, label: "LinkedIn", href: "https://linkedin.com/company/hirance" },
  { icon: IconInstagram, label: "Instagram", href: "https://instagram.com/hirance" },
  { icon: IconFacebook, label: "Facebook", href: "https://facebook.com/hirance" },
  { icon: IconYoutube, label: "YouTube", href: "https://youtube.com/@hirance" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="global-footer"
      className="bg-[#060c18] text-slate-400 pt-16 pb-8 border-t border-white/10"
      data-testid="footer"
      aria-label="Hirance Global Footer"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & App Download Column */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <Logo dark />
            <p className="mt-3.5 text-sm max-w-sm leading-relaxed text-slate-400">
              India&apos;s Swipe-Based Hiring Platform. Fast, transparent, and direct matchmaking for candidates and employers.
            </p>

            {/* QR Code (Left) + Google Play & Socials Stack (Right) */}
            <div className="mt-6 flex items-start gap-4">
              {/* Left: QR Code Card */}
              <div className="shrink-0">
                <div className="rounded-2xl bg-white p-2 w-[92px] shadow-sm">
                  <Image
                    src="/images/qr.png"
                    alt="Scan to download the Hirance app"
                    width={76}
                    height={76}
                    style={{ display: "block", borderRadius: 8 }}
                    data-testid="footer-app-qr"
                  />
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-1.5 font-mono-hi">
                  Scan to download
                </p>
              </div>

              {/* Right: Google Play Button + Social Media Icons below it */}
              <div className="flex flex-col gap-3 justify-center pt-0.5">
                {/* 1. Google Play Store Badge */}
                <a
                  href={siteConfig.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get Hirance on Google Play"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-left transition-all duration-200 hover:border-cyan-400/50 hover:bg-white/[0.08]"
                >
                  <svg
                    className="h-5 w-5 fill-white shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3.18 23.76a2.23 2.23 0 0 1-1.18-.34V.58A2.23 2.23 0 0 1 3.18.24L13.7 12 3.18 23.76zM14.9 13.2l2.5 2.5-9.8 5.56 7.3-8.06zm2.5-4.9L14.9 10.8 7.6 2.74l9.8 5.56zM19.06 9.8l2.87 1.63a1.4 1.4 0 0 1 0 2.44l-2.87 1.63-2.7-2.7 2.7-3z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase leading-none font-medium">
                      Get it on
                    </span>
                    <span className="text-xs font-bold text-white leading-tight mt-0.5">
                      Google Play
                    </span>
                  </div>
                </a>

                {/* 2. Social Media Icons Row */}
                <div className="flex items-center gap-2.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      data-testid={`footer-social-${s.label.toLowerCase()}`}
                      className="w-8 h-8 rounded-lg bg-white/5 grid place-items-center text-slate-400 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-sky-500 hover:text-white transition-all"
                    >
                      <s.icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <nav
            className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-7 lg:gap-8"
            aria-label="Footer Quick Links"
          >
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => {
                    const isExternal = l.href.startsWith("http");
                    const testId = `footer-link-${l.label
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}`;
                    return (
                      <li key={l.label}>
                        {isExternal ? (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={testId}
                            className="text-sm hover:text-cyan-300 transition-colors text-slate-400"
                          >
                            {l.label}
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            data-testid={testId}
                            className="text-sm hover:text-cyan-300 transition-colors text-slate-400"
                          >
                            {l.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Hirance. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
