"use client";

import { useState, useEffect, useMemo, memo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getCompanyColorTheme, initials } from "@/config/companies";
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
    if (!name) continue;

    // Normalize: alphanumeric only, lowercase
    const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const existing = map.get(key);

    if (!existing) {
      map.set(key, item);
    } else {
      // Prioritize entry with valid company_logo
      if (!existing.company_logo?.trim() && item.company_logo?.trim()) {
        map.set(key, item);
      }
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
      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
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
      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" viewBox="0 0 24 24">
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
      <span className="font-mono font-extrabold text-[12px] sm:text-sm md:text-base text-[#006699] tracking-widest border-y-2 border-[#006699] py-0.5 leading-none select-none">
        IBM
      </span>
    );
  }

  // 4. PhonePe (Purple circle with Hindi 'पे')
  if (lower.includes("phonepe") || lower.includes("phone pe")) {
    return (
      <div className="w-[78%] h-[78%] rounded-full bg-[#5F259F] flex items-center justify-center text-white shadow-xs">
        <span className="font-bold text-sm sm:text-base md:text-lg select-none leading-none -mt-0.5">
          पे
        </span>
      </div>
    );
  }

  // 5. Zomato (Red circle with white zomato text)
  if (lower.includes("zomato")) {
    return (
      <div className="w-[78%] h-[78%] rounded-full bg-[#E23744] flex items-center justify-center text-white shadow-xs px-1">
        <span className="font-bold italic text-[8.5px] sm:text-[9.5px] md:text-[11px] tracking-tight select-none">
          zomato
        </span>
      </div>
    );
  }

  // 6. OYO (Red circle with white OYO)
  if (lower.includes("oyo")) {
    return (
      <div className="w-[78%] h-[78%] rounded-full bg-[#EE2E24] flex items-center justify-center text-white shadow-xs">
        <span className="font-black text-[11px] sm:text-xs md:text-sm tracking-tighter select-none">
          OYO
        </span>
      </div>
    );
  }

  // 7. Zepto (Yellow rounded square with '7')
  if (lower.includes("zepto")) {
    return (
      <div className="w-[72%] h-[72%] rounded-2xl bg-[#FFDE00] flex items-center justify-center text-[#1E293B] shadow-xs">
        <span className="font-black text-xs sm:text-sm md:text-base select-none">7</span>
      </div>
    );
  }

  // 8. LinkedIn (Blue rounded square with 'in')
  if (lower.includes("linkedin")) {
    return (
      <div className="w-[70%] h-[70%] rounded-lg bg-[#0A66C2] flex items-center justify-center text-white shadow-xs">
        <span className="font-bold text-xs sm:text-sm md:text-base select-none">in</span>
      </div>
    );
  }

  // 9. Deloitte (D with green dot)
  if (lower.includes("deloitte")) {
    return (
      <div className="flex items-center justify-center font-bold text-slate-900 dark:text-white select-none">
        <span className="text-base sm:text-lg md:text-xl font-black">D</span>
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#86BC25] ml-0.5 mt-2" />
      </div>
    );
  }

  // 10. Paytm
  if (lower.includes("paytm")) {
    return (
      <div className="flex items-center justify-center select-none font-bold text-xs sm:text-sm md:text-base">
        <span className="text-[#002970]">pay</span>
        <span className="text-[#00BAF2]">tm</span>
      </div>
    );
  }

  // 11. Infosys
  if (lower.includes("infosys")) {
    return (
      <span className="font-bold text-xs sm:text-[13px] md:text-sm text-[#007CC3] tracking-tight select-none">
        Infosys
      </span>
    );
  }

  // 12. TCS
  if (lower.includes("tcs") || lower.includes("tata consultancy")) {
    return (
      <span className="font-black text-xs sm:text-sm md:text-base text-[#D90429] tracking-tight select-none">
        tcs
      </span>
    );
  }

  // 13. Adobe
  if (lower.includes("adobe")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" viewBox="0 0 24 24">
        <path fill="#FA0F00" d="M14.58 2.05H24v19.9H14.58zm-5.16 0H0v19.9h9.42zM12 9.07l3.69 8.88h-2.58l-1.11-2.73h-3.3l1.88-4.52z" />
      </svg>
    );
  }

  // 14. Intel
  if (lower.includes("intel")) {
    return (
      <div className="w-[74%] h-[74%] rounded-full border-2 border-[#0071C5] flex items-center justify-center text-[#0071C5]">
        <span className="font-bold text-[9px] sm:text-[10.5px] select-none lowercase">intel</span>
      </div>
    );
  }

  // 15. Swiggy
  if (lower.includes("swiggy")) {
    return (
      <div className="w-[78%] h-[78%] rounded-full bg-[#FC8019] flex items-center justify-center text-white shadow-xs">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    );
  }

  // 16. Wipro / swirl logo
  if (lower.includes("wipro")) {
    return (
      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
        <circle cx="12" cy="6" r="2.8" fill="#D92D20" />
        <circle cx="17.2" cy="9" r="2.4" fill="#EAAA08" />
        <circle cx="17.2" cy="15" r="2.4" fill="#12B76A" />
        <circle cx="12" cy="18" r="2.8" fill="#0BA5EC" />
        <circle cx="6.8" cy="15" r="2.4" fill="#7A5AF8" />
        <circle cx="6.8" cy="9" r="2.4" fill="#EE46BC" />
      </svg>
    );
  }

  return null;
}

const GRADIENT_PALETTES = [
  "from-violet-600 to-indigo-600",
  "from-blue-600 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-red-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-600 to-pink-600",
  "from-indigo-600 to-purple-700",
  "from-teal-500 to-cyan-600",
  "from-sky-500 to-blue-600",
  "from-pink-500 to-rose-600",
];

/**
 * Circular white badge card for a company matching the Figma reference design.
 * Features a soft drop shadow, crisp border, and centered logo/brand badge.
 */
const AppIconCompanyCard = memo(function AppIconCompanyCard({
  company,
  index,
}: {
  company: CompanyItem;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const name = company.company_name?.trim() || "Company";
  const logoUrl = company.company_logo?.trim() || "";
  const hasLogo = Boolean(logoUrl) && !failed;

  // Check if this company has a recognizable brand icon
  const brandIcon = useMemo(() => BrandIcon({ name }), [name]);

  // Deterministic refined gradient for company monograms
  const fallbackGradient = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = (Math.abs(hash) + index) % GRADIENT_PALETTES.length;
    return GRADIENT_PALETTES[idx];
  }, [name, index]);

  return (
    <Link
      href={company.id ? `/company/${company.id}` : `/jobs?search=${encodeURIComponent(name)}`}
      title={name}
      aria-label={`View ${name} company profile`}
      suppressHydrationWarning
      className="relative flex shrink-0 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-full"
    >
      {/* Circular White Badge Container with Soft Shadow matching Figma */}
      <div
        suppressHydrationWarning
        className={cn(
          "relative flex items-center justify-center overflow-hidden select-none rounded-full bg-white dark:bg-slate-900",
          "w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] lg:w-[76px] lg:h-[76px]",
          "border border-slate-100/90 dark:border-slate-800",
          "shadow-[0_4px_16px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.35)]",
          "transition-all duration-300 ease-out hover:scale-108 hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] active:scale-95"
        )}
      >
        {/* Centered Content: Brand Icon, Official Logo, or Circular Brand Monogram */}
        <div
          suppressHydrationWarning
          className="relative z-10 flex h-full w-full items-center justify-center p-2 sm:p-2.5"
        >
          {brandIcon ? (
            brandIcon
          ) : hasLogo ? (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt={name}
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                suppressHydrationWarning
                className={cn(
                  "object-contain select-none transition-transform duration-200",
                  "max-h-7 max-w-7 sm:max-h-8 sm:max-w-8 md:max-h-9 md:max-w-9 lg:max-h-10 lg:max-w-10"
                )}
                onError={() => setFailed(true)}
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              suppressHydrationWarning
              className={cn(
                "flex items-center justify-center rounded-full font-bold select-none shadow-xs bg-gradient-to-br",
                fallbackGradient,
                "w-[76%] h-[76%]"
              )}
            >
              <span className="text-xs sm:text-[13px] md:text-sm font-bold tracking-tight text-white drop-shadow-xs">
                {initials(name)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
});

/**
 * Continuous infinite marquee row that never stops on hover.
 */
function ContinuousMarqueeRow({
  items,
  direction = "normal",
  speed = "70s",
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
      className="relative flex overflow-hidden py-1 sm:py-1.5 md:py-2 select-none [contain:layout_paint]"
    >
      <div
        suppressHydrationWarning
        className="flex shrink-0 gap-3.5 sm:gap-4 md:gap-5 animate-marquee will-change-transform items-center"
        style={
          {
            "--marquee-duration": speed,
            "--marquee-direction": direction,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((company, idx) => (
          <AppIconCompanyCard
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
  const reducedMotion = useReducedMotion();
  const [companyList, setCompanyList] = useState<CompanyItem[]>(() =>
    deduplicateCompanies(initialCompanies || [])
  );

  // Only fetch on client if server-rendered initialCompanies was not provided
  useEffect(() => {
    if (initialCompanies && initialCompanies.length > 0) return;

    let isMounted = true;
    fetchCompanies({ search: "", page_size: 100 })
      .then((res) => {
        if (isMounted && res.data && res.data.length > 0) {
          setCompanyList(deduplicateCompanies(res.data));
        }
      })
      .catch(() => {
        // Silently ignore network hiccup to prevent red error overlay
      });

    return () => {
      isMounted = false;
    };
  }, [initialCompanies]);

  // Round-robin distribution into exactly 3 balanced rows matching the Figma reference pattern
  const { row1, row2, row3 } = useMemo(() => {
    // Curated top brand logos directly matching the Figma rows
    const r1Brands: CompanyItem[] = [
      { id: "brand-phonepe-1", company_name: "PhonePe", company_logo: "" },
      { id: "brand-google-1", company_name: "Google", company_logo: "" },
      { id: "brand-microsoft-1", company_name: "Microsoft", company_logo: "" },
      { id: "brand-infosys-1", company_name: "Infosys", company_logo: "" },
      { id: "brand-zomato-1", company_name: "Zomato", company_logo: "" },
      { id: "brand-swiggy-1", company_name: "Swiggy", company_logo: "" },
      { id: "brand-zepto-1", company_name: "Zepto", company_logo: "" },
      { id: "brand-oyo-1", company_name: "OYO", company_logo: "" },
      { id: "brand-deloitte-1", company_name: "Deloitte", company_logo: "" },
      { id: "brand-phonepe-1b", company_name: "PhonePe", company_logo: "" },
    ];

    const r2Brands: CompanyItem[] = [
      { id: "brand-paytm-2", company_name: "Paytm", company_logo: "" },
      { id: "brand-linkedin-2", company_name: "LinkedIn", company_logo: "" },
      { id: "brand-infosys-2", company_name: "Infosys", company_logo: "" },
      { id: "brand-tcs-2", company_name: "TCS", company_logo: "" },
      { id: "brand-swiggy-2", company_name: "Swiggy", company_logo: "" },
      { id: "brand-deloitte-2", company_name: "Deloitte", company_logo: "" },
      { id: "brand-ibm-2", company_name: "IBM", company_logo: "" },
      { id: "brand-adobe-2", company_name: "Adobe", company_logo: "" },
      { id: "brand-wipro-2", company_name: "Wipro", company_logo: "" },
      { id: "brand-intel-2", company_name: "Intel", company_logo: "" },
    ];

    const r3Brands: CompanyItem[] = [
      { id: "brand-phonepe-3", company_name: "PhonePe", company_logo: "" },
      { id: "brand-google-3", company_name: "Google", company_logo: "" },
      { id: "brand-microsoft-3", company_name: "Microsoft", company_logo: "" },
      { id: "brand-infosys-3", company_name: "Infosys", company_logo: "" },
      { id: "brand-zomato-3", company_name: "Zomato", company_logo: "" },
      { id: "brand-swiggy-3", company_name: "Swiggy", company_logo: "" },
      { id: "brand-zepto-3", company_name: "Zepto", company_logo: "" },
      { id: "brand-oyo-3", company_name: "OYO", company_logo: "" },
      { id: "brand-deloitte-3", company_name: "Deloitte", company_logo: "" },
      { id: "brand-phonepe-3b", company_name: "PhonePe", company_logo: "" },
    ];

    // Filter out brands already represented from the API list to avoid duplication
    const BRAND_KEYWORDS = [
      "phonepe", "google", "microsoft", "infosys", "zomato",
      "swiggy", "zepto", "oyo", "deloitte", "paytm",
      "linkedin", "tcs", "adobe", "intel", "ibm", "wipro"
    ];

    const cleanApiList = companyList.filter((item) => {
      const n = (item.company_name || "").toLowerCase().trim();
      return !BRAND_KEYWORDS.some((k) => n.includes(k));
    });

    // Distribute API companies evenly across 3 rows
    const api1: CompanyItem[] = [];
    const api2: CompanyItem[] = [];
    const api3: CompanyItem[] = [];

    cleanApiList.forEach((item, idx) => {
      const bucket = idx % 3;
      if (bucket === 0) api1.push(item);
      else if (bucket === 1) api2.push(item);
      else api3.push(item);
    });

    // Interleave: [Brand, API, Brand, API, ...]
    const interleave = (brands: CompanyItem[], apiItems: CompanyItem[]) => {
      const out: CompanyItem[] = [];
      const len = Math.max(brands.length, apiItems.length);
      for (let i = 0; i < len; i++) {
        if (i < brands.length) out.push(brands[i]);
        if (i < apiItems.length) out.push(apiItems[i]);
      }
      return out;
    };

    return {
      row1: interleave(r1Brands, api1),
      row2: interleave(r2Brands, api2),
      row3: interleave(r3Brands, api3),
    };
  }, [companyList]);

  return (
    <section
      id="partners"
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center min-h-0"
      aria-labelledby="trusted-by-heading"
    >
      {/* Background Subtle Divider */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Clean, SEO-optimized Header matching Figma */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl text-center mb-8 sm:mb-10"
        >

          <h2
            id="trusted-by-heading"
            className="text-balance text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl lg:text-[40px] leading-tight"
          >
            Companies Are Hiring on{" "}
            <span className="italic font-bold">
              Hirance
            </span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Built for modern hiring teams looking for better matches, faster applications and simpler hiring.
          </p>
          <div className="mt-3.5 flex items-center justify-center">
            <Link
              href="/companies"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <span>Explore Top Companies</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* 3-Row Continuous Circular Badges Stream matching Figma */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-3.5 md:space-y-4 marquee-mask py-2"
        >
          {/* Row 1: Leftward continuous scroll */}
          <ContinuousMarqueeRow
            items={row1}
            direction="normal"
            speed="60s"
            startIndex={0}
          />

          {/* Row 2: Rightward continuous scroll */}
          <ContinuousMarqueeRow
            items={row2}
            direction="reverse"
            speed="50s"
            startIndex={row1.length}
          />

          {/* Row 3: Leftward continuous scroll */}
          <ContinuousMarqueeRow
            items={row3}
            direction="normal"
            speed="65s"
            startIndex={row1.length + row2.length}
          />
        </motion.div>
      </div>
    </section>
  );
}
