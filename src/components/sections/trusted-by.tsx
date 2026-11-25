"use client";

import { useState, useEffect, useMemo, memo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getCompanyColorTheme, initials } from "@/config/companies";
import companiesData from "@/config/companies.json";
import { fetchCompanies } from "@/lib/api";
import type { CompanyItem } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * Deduplicate company items by normalized company name.
 * Keeps entry with valid logo when duplicates exist.
 */
function deduplicateCompanies(list: CompanyItem[]): CompanyItem[] {
  if (!Array.isArray(list) || list.length === 0) return [];
  const map = new Map<string, CompanyItem>();

  for (const item of list) {
    if (!item || !item.company_name) continue;
    const name = item.company_name.trim();
    const logo = item.company_logo?.trim();
    // Exclude companies without a logo
    if (!name || !logo) continue;

    // Normalize: alphanumeric only, lowercase
    const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  return Array.from(map.values());
}

/**
 * Dedicated Brand Icon SVGs / stylized marks for top industry brands
 * to accurately replicate the Figma visual pattern.
 */
function BrandIcon({ name }: { name: string }) {
  const lower = name.toLowerCase().trim();

  // 1. Google (Multi-color G)
  if (lower === "google") {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
    );
  }

  // 2. Microsoft (4 colored squares)
  if (lower === "microsoft") {
    return (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" viewBox="0 0 24 24">
        <rect x="1.5" y="1.5" width="9.5" height="9.5" fill="#F25022" />
        <rect x="13" y="1.5" width="9.5" height="9.5" fill="#7FBA00" />
        <rect x="1.5" y="13" width="9.5" height="9.5" fill="#00A4EF" />
        <rect x="13" y="13" width="9.5" height="9.5" fill="#FFB900" />
      </svg>
    );
  }

  // 3. IBM
  if (lower === "ibm") {
    return (
      <span className="font-mono font-black text-2xl sm:text-3xl md:text-4xl text-[#006699] tracking-widest border-y-2 border-[#006699] py-0.5 leading-none select-none">
        IBM
      </span>
    );
  }

  // 4. PhonePe
  if (lower.includes("phonepe") || lower.includes("phone pe")) {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5F259F] flex items-center justify-center text-white shadow-xs">
        <span className="font-bold text-lg sm:text-xl select-none leading-none -mt-0.5">
          पे
        </span>
      </div>
    );
  }

  // 5. Zomato
  if (lower.includes("zomato")) {
    return (
      <span className="font-black italic text-xl sm:text-2xl md:text-3xl text-[#E23744] tracking-tight select-none">
        zomato
      </span>
    );
  }

  // 6. OYO
  if (lower.includes("oyo")) {
    return (
      <span className="font-black text-2xl sm:text-3xl md:text-4xl text-[#EE2E24] tracking-tighter select-none">
        OYO
      </span>
    );
  }

  // 7. Zepto
  if (lower.includes("zepto")) {
    return (
      <span className="font-black text-2xl sm:text-3xl md:text-4xl text-[#FFDE00] tracking-tight select-none">
        zepto
      </span>
    );
  }

  // 8. LinkedIn
  if (lower.includes("linkedin")) {
    return (
      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded bg-[#0A66C2] flex items-center justify-center text-white shadow-xs">
        <span className="font-bold text-lg sm:text-xl select-none">in</span>
      </div>
    );
  }

  // 9. Deloitte (Full wordmark with green dot)
  if (lower.includes("deloitte")) {
    return (
      <div className="flex items-center justify-center font-bold text-slate-900 dark:text-white select-none">
        <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">Deloitte</span>
        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#86BC25] ml-0.5 mt-2 sm:mt-2.5" />
      </div>
    );
  }

  // 10. Paytm
  if (lower.includes("paytm")) {
    return (
      <div className="flex items-center justify-center select-none font-bold text-xl sm:text-2xl md:text-3xl">
        <span className="text-[#002970]">pay</span>
        <span className="text-[#00BAF2]">tm</span>
      </div>
    );
  }

  // 11. Infosys
  if (lower.includes("infosys")) {
    return (
      <span className="font-bold text-xl sm:text-2xl md:text-3xl text-[#007CC3] tracking-tight select-none">
        Infosys
      </span>
    );
  }

  // 12. TCS (Tata Consultancy Services)
  if (lower.includes("tcs") || lower.includes("tata consultancy")) {
    return (
      <span className="font-black text-2xl sm:text-3xl md:text-4xl text-[#D90429] tracking-tight select-none">
        tcs
      </span>
    );
  }

  // 13. Adobe
  if (lower.includes("adobe")) {
    return (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" viewBox="0 0 24 24">
        <path fill="#FA0F00" d="M14.58 2.05H24v19.9H14.58zm-5.16 0H0v19.9h9.42zM12 9.07l3.69 8.88h-2.58l-1.11-2.73h-3.3l1.88-4.52z" />
      </svg>
    );
  }

  // 14. Intel
  if (lower.includes("intel")) {
    return (
      <span className="font-bold text-xl sm:text-2xl md:text-3xl text-[#0071C5] select-none lowercase">
        intel
      </span>
    );
  }

  // 15. Swiggy
  if (lower.includes("swiggy")) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#FC8019]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    );
  }

  // 16. Wipro
  if (lower.includes("wipro")) {
    return (
      <svg className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12" viewBox="0 0 24 24">
        <circle cx="12" cy="6" r="2.8" fill="#D92D20" />
        <circle cx="17.2" cy="9" r="2.4" fill="#EAAA08" />
        <circle cx="17.2" cy="15" r="2.4" fill="#12B76A" />
        <circle cx="12" cy="18" r="2.8" fill="#0BA5EC" />
        <circle cx="6.8" cy="15" r="2.4" fill="#7A5AF8" />
        <circle cx="6.8" cy="9" r="2.4" fill="#EE46BC" />
      </svg>
    );
  }

  // 17. Amazon
  if (lower === "amazon") {
    return (
      <div className="flex flex-col items-center justify-center select-none">
        <span className="font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight lowercase">
          amazon
        </span>
        <svg className="w-16 h-3 text-[#FF9900] -mt-1" viewBox="0 0 100 20" fill="currentColor">
          <path d="M5 6c25 10 65 10 90 0-5 5-20 10-45 10S10 11 5 6z" />
        </svg>
      </div>
    );
  }

  // 18. Flipkart
  if (lower === "flipkart") {
    return (
      <div className="flex items-center gap-1 select-none">
        <span className="font-black italic text-xl sm:text-2xl md:text-3xl text-[#2874F0] tracking-tight">
          Flipkart
        </span>
      </div>
    );
  }

  // 19. Uber
  if (lower === "uber") {
    return (
      <span className="font-bold text-xl sm:text-2xl md:text-3xl text-slate-900 dark:text-white tracking-widest select-none uppercase">
        Uber
      </span>
    );
  }

  // 20. Netflix
  if (lower === "netflix") {
    return (
      <span className="font-black text-xl sm:text-2xl md:text-3xl text-[#E50914] tracking-wider select-none uppercase">
        Netflix
      </span>
    );
  }

  // 21. Razorpay
  if (lower === "razorpay") {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <svg className="w-6 h-6 text-[#0C2340] dark:text-[#3395FF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2L4 14h7v8l10-12h-7z" />
        </svg>
        <span className="font-black text-xl sm:text-2xl text-[#0C2340] dark:text-[#3395FF] tracking-tight">
          Razorpay
        </span>
      </div>
    );
  }

  return null;
}

// Premier brand icons with high-fidelity vector graphics
const PREMIER_BRAND_NAMES = [
  "Google",
  "Microsoft",
  "IBM",
  "Amazon",
  "Deloitte",
  "TCS",
  "Infosys",
  "Wipro",
  "Adobe",
  "Intel",
  "LinkedIn",
  "Swiggy",
  "Zomato",
  "PhonePe",
  "Paytm",
  "Zepto",
  "Flipkart",
  "OYO",
  "Uber",
  "Netflix",
  "Razorpay",
];

const PREMIER_BRAND_COMPANIES: CompanyItem[] = PREMIER_BRAND_NAMES.map((name, i) => ({
  id: `premier-brand-${i}`,
  company_name: name,
  company_logo: "brand-icon",
}));

// Companies from static data that have verified, working high-res logos (no 16x16 globe fallbacks)
const VERIFIED_STATIC_NAMES = new Set([
  "bigbasket",
  "codinwalk software",
  "cognizant",
  "dhl",
  "digital search technologies pvt. ltd.",
  "edelta corporation",
  "elyriasoft",
  "ey",
  "goomi technology",
  "imch patna",
  "innovaneers technologies",
  "iph technologies",
  "jobgenix",
  "mckinsey & company",
  "mingrow",
  "pitch pine media pvt. ltd.",
  "robospecies technologies",
  "square yards",
  "stand in crowd technologies",
  "teleperformance",
  "vexil infotech pvt ltd",
  "webspirt technology pvt. ltd.",
]);

const verifiedStaticCompanies: CompanyItem[] = (companiesData as any[])
  .filter((c) => VERIFIED_STATIC_NAMES.has((c.name || "").toLowerCase().trim()))
  .map((c, i) => ({
    id: `static-verified-${i}`,
    company_name: c.name,
    company_logo: c.logo_url,
  }));

/**
 * Clean corporate logo item matching the style in reference Image 2.
 * Renders company logo / brand mark in grayscale with smooth hover.
 */
const CompanyLogoItem = memo(function CompanyLogoItem({
  company,
  index,
}: {
  company: CompanyItem;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const name = company.company_name?.trim() || "Company";
  const logoUrl = company.company_logo?.trim() || "";
  const brandIcon = useMemo(() => BrandIcon({ name }), [name]);
  const hasLogo = Boolean(logoUrl) && logoUrl !== "brand-icon" && !failed;

  // STRICT: Do not render if neither logo nor brand icon exists
  if (!hasLogo && !brandIcon) return null;

  return (
    <div
      suppressHydrationWarning
      className="relative flex shrink-0 items-center justify-center px-3 sm:px-5 py-1 select-none pointer-events-none"
    >
      <div className="flex items-center justify-center h-12 sm:h-14 md:h-16 min-w-0 grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
        {brandIcon ? (
          <div className="flex items-center justify-center">
            {brandIcon}
          </div>
        ) : (
          <img
            src={logoUrl}
            alt={name}
            loading="lazy"
            decoding="async"
            className="h-9 sm:h-11 md:h-13 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[200px] object-contain pointer-events-none"
            onError={() => setFailed(true)}
            onLoad={(e) => {
              const img = e.currentTarget;
              // If image is a tiny 16x16 or 32x32 generic globe or broken placeholder, discard it
              if (img.naturalWidth <= 32 && img.naturalHeight <= 32) {
                setFailed(true);
              }
            }}
          />
        )}
      </div>
    </div>
  );
});

/**
 * Continuous infinite marquee row with pause on hover.
 */
function ContinuousMarqueeRow({
  items,
  direction = "normal",
  speed = "50s",
  startIndex = 0,
}: {
  items: CompanyItem[];
  direction?: "normal" | "reverse";
  speed?: string;
  startIndex?: number;
}) {
  const duplicatedItems = useMemo(() => {
    if (items.length === 0) return [];
    if (items.length < 15) {
      return [...items, ...items, ...items, ...items];
    }
    return [...items, ...items];
  }, [items]);

  if (duplicatedItems.length === 0) return null;

  return (
    <div
      suppressHydrationWarning
      className="relative flex overflow-hidden py-1 sm:py-2 select-none [contain:layout_paint]"
    >
      <div
        suppressHydrationWarning
        className="flex shrink-0 gap-3 sm:gap-4 md:gap-5 animate-marquee will-change-transform items-center"
        style={
          {
            "--marquee-duration": speed,
            "--marquee-direction": direction,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((company, idx) => (
          <CompanyLogoItem
            key={`${company.id || company.company_name}-${startIndex}-${idx}`}
            company={company}
            index={startIndex + idx}
          />
        ))}
      </div>
    </div>
  );
}

interface TrustedByProps {
  initialCompanies?: CompanyItem[];
}

export function TrustedBy({ initialCompanies }: TrustedByProps) {
  const [companyList, setCompanyList] = useState<CompanyItem[]>(() => {
    const validInitial = (initialCompanies || []).filter((c) => {
      if (!c || !c.company_logo) return false;
      const name = (c.company_name || "").toLowerCase().trim();
      return name.length > 2 && !name.match(/^[0-9]+$/) && !name.includes("test") && !name.includes("thank you");
    });
    return deduplicateCompanies([...PREMIER_BRAND_COMPANIES, ...validInitial, ...verifiedStaticCompanies]);
  });

  // Fetch and sync real-time API companies
  useEffect(() => {
    let isMounted = true;
    fetchCompanies({ search: "", page_size: 100 })
      .then((res) => {
        if (isMounted && res.data && res.data.length > 0) {
          const validApi = res.data.filter((c) => {
            if (!c || !c.company_logo) return false;
            const name = (c.company_name || "").toLowerCase().trim();
            return name.length > 2 && !name.match(/^[0-9]+$/) && !name.includes("test") && !name.includes("thank you");
          });
          setCompanyList(deduplicateCompanies([...PREMIER_BRAND_COMPANIES, ...validApi, ...verifiedStaticCompanies]));
        }
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, [initialCompanies]);

  // Distribute into 2 balanced rows matching Image 2 - strictly companies with logos
  const { row1, row2 } = useMemo(() => {
    const withLogos = (companyList || []).filter((c) => {
      if (!c) return false;
      const name = (c.company_name || "").trim();
      if (!name) return false;
      // Brand icons don't need a remote URL
      if (BrandIcon({ name })) return true;
      const url = c.company_logo?.trim();
      return url && url !== "null" && url !== "undefined" && url !== "brand-icon";
    });

    if (withLogos.length === 0) {
      return { row1: [], row2: [] };
    }

    const r1: CompanyItem[] = [];
    const r2: CompanyItem[] = [];

    withLogos.forEach((c, idx) => {
      if (idx % 2 === 0) r1.push(c);
      else r2.push(c);
    });

    return { row1: r1, row2: r2 };
  }, [companyList]);

  return (
    <section
      id="partners"
      className="relative w-full overflow-hidden py-8 sm:py-10 md:py-12 flex flex-col items-center justify-center bg-transparent"
      aria-labelledby="trusted-by-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header matching Image 2: Horizontal lines on left & right with centered text */}
        <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-4 mb-7 sm:mb-9">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          <h1
            id="trusted-by-heading"
            className="px-6 text-lg sm:text-xl md:text-[22px] font-medium text-slate-700 dark:text-slate-300 tracking-tight text-center whitespace-nowrap"
          >
            Trusted companies ready to hire
          </h1>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
        </div>

        {/* 2-Row Continuous Logos Stream matching Image 2 */}
        <div className="space-y-6 sm:space-y-8 marquee-mask py-3">
          {/* Row 1: Leftward continuous scroll */}
          <ContinuousMarqueeRow
            items={row1}
            direction="normal"
            speed="110s"
            startIndex={0}
          />

          {/* Row 2: Rightward continuous scroll */}
          <ContinuousMarqueeRow
            items={row2}
            direction="reverse"
            speed="125s"
            startIndex={row1.length}
          />
        </div>
      </div>
    </section>
  );
}
