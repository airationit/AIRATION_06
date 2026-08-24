"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./logo";

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
      { label: "Download App", href: "https://play.google.com/store/apps/details?id=com.hirance" },
      { label: "How Hirance Works", href: "/how-it-works" },
      { label: "Candidate FAQ", href: "/how-it-works" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Job", href: "https://employer.hirance.com/" },
      { label: "Employer Dashboard", href: "https://employer.hirance.com/" },
      { label: "Pricing", href: "/request-demo" },
      { label: "How Hirance Works", href: "/how-it-works" },
      { label: "Employer FAQ", href: "/how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
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
    <footer className="bg-[#060c18] text-slate-400 pt-16 pb-8" data-testid="footer" aria-label="Hirance Global Footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <Logo dark />
            <p className="mt-4 text-sm max-w-xs leading-relaxed text-slate-400">
              India&apos;s 1st Swipe-Based Hiring Platform.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <div className="shrink-0">
                <div className="rounded-2xl bg-white p-2 w-[92px]">
                  <Image
                    src="/images/qr.png"
                    alt="Scan to download the Hirance app"
                    width={76}
                    height={76}
                    style={{ display: "block", borderRadius: 8 }}
                    data-testid="footer-app-qr"
                  />
                </div>
                <p className="text-[10px] text-slate-500 text-center mt-1.5 font-mono-hi">Scan to download</p>
              </div>

              {/* Store Badges */}
              <div className="flex flex-col gap-2">
                {/* App Store */}
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-left transition-all duration-200 hover:border-cyan-400/50 hover:bg-white/[0.08]"
                >
                  <svg className="h-5 w-5 fill-white shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.24 1.31-2.22 3.91.03 3.1 2.72 4.13 2.75 4.15l-.08.56zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase leading-none">
                      Download on the
                    </span>
                    <span className="text-xs font-bold text-white leading-tight mt-0.5">
                      App Store
                    </span>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.hirance"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-left transition-all duration-200 hover:border-cyan-400/50 hover:bg-white/[0.08]"
                >
                  <svg className="h-5 w-5 fill-white shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.18 23.76a2.23 2.23 0 0 1-1.18-.34V.58A2.23 2.23 0 0 1 3.18.24L13.7 12 3.18 23.76zM14.9 13.2l2.5 2.5-9.8 5.56 7.3-8.06zm2.5-4.9L14.9 10.8 7.6 2.74l9.8 5.56zM19.06 9.8l2.87 1.63a1.4 1.4 0 0 1 0 2.44l-2.87 1.63-2.7-2.7 2.7-3z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase leading-none">
                      Get it on
                    </span>
                    <span className="text-xs font-bold text-white leading-tight mt-0.5">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                  className="w-10 h-10 rounded-xl bg-white/5 grid place-items-center text-slate-400 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-sky-500 hover:text-white transition-all"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="font-display font-bold text-white mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => {
                  const isExternal = l.href.startsWith("http");
                  const testId = `footer-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
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
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {currentYear} Hirance. All Rights Reserved.</p>
          <p className="font-mono-hi text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> All systems operational · Bengaluru · Mumbai · Delhi-NCR
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
