"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getCompanyColorTheme, initials } from "@/config/companies";
import { fetchCompanies } from "@/lib/api";
import type { CompanyItem } from "@/types";

interface ProdCompany {
  name: string;
  logoUrl?: string;
}

/**
 * Filter and deduplicate companies strictly from the Production API.
 * Cleans out obvious test entries and prioritizes profiles with verified logos.
 */
function cleanProdApiCompanies(apiCompanies: CompanyItem[]): ProdCompany[] {
  if (!Array.isArray(apiCompanies) || apiCompanies.length === 0) return [];

  const map = new Map<string, ProdCompany>();

  for (const item of apiCompanies) {
    if (!item?.company_name) continue;
    const name = item.company_name.trim();
    if (name.length < 3) continue;

    // Filter out test/junk entries from prod database
    if (
      /^(67567|dummy|test|asdf|qwerty|jhg|ppppp|wewrr|wddw|eretrete|guty|hdfg|dgrgt|dfsddf|ddfdf|yu7i|kmjuhnh|buhbh|wrtfuh|xyzpriv|JHHG|I am user)/i.test(
        name
      )
    ) {
      continue;
    }
    if (/[;'"\\]/.test(name)) continue;

    const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!key) continue;

    const logoUrl = item.company_logo?.trim() || undefined;
    const existing = map.get(key);

    if (!existing) {
      map.set(key, { name, logoUrl });
    } else {
      // Prioritize entry with valid logo
      if (!existing.logoUrl && logoUrl) {
        existing.logoUrl = logoUrl;
      }
    }
  }

  // Prioritize companies with valid logos, then alphabetically
  return Array.from(map.values()).sort((a, b) => {
    const aLogo = Boolean(a.logoUrl);
    const bLogo = Boolean(b.logoUrl);
    if (aLogo && !bLogo) return -1;
    if (!aLogo && bLogo) return 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Clean, prominent company badge exclusively featuring production API data.
 * Displays large company logo/avatar and bold typography.
 */
const CompanyBadge = memo(function CompanyBadge({
  company,
  index,
}: {
  company: ProdCompany;
  index: number;
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const name = company.name?.trim() || "Company";
  const logoUrl = company.logoUrl?.trim() || "";
  const hasLogo = Boolean(logoUrl) && !logoFailed;
  const theme = useMemo(() => getCompanyColorTheme(name, index), [name, index]);

  return (
    <div
      title={name}
      aria-label={name}
      suppressHydrationWarning
      className="group relative flex shrink-0 items-center gap-3.5 sm:gap-4 md:gap-4.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 px-4.5 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all duration-200 select-none cursor-default"
    >
      {/* Prominent Logo / Monogram Container */}
      <div
        className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-1.5 shadow-2xs"
        style={!hasLogo ? { backgroundColor: theme.bg } : undefined}
      >
        {hasLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={name}
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain select-none"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span
            className="text-xs sm:text-sm md:text-base font-bold"
            style={{ color: theme.textColor || (theme.isLight ? "#0F172A" : "#FFFFFF") }}
          >
            {initials(name)}
          </span>
        )}
      </div>

      {/* Prominent Company Name */}
      <span className="text-sm sm:text-base md:text-[17px] font-bold text-foreground/90 whitespace-nowrap tracking-tight">
        {name}
      </span>
    </div>
  );
});

/**
 * Continuous infinite marquee row with smooth GPU-accelerated motion at an easy, readable pace.
 */
function ContinuousMarqueeRow({
  items,
  direction = "normal",
  speed = "120s",
  startIndex = 0,
}: {
  items: ProdCompany[];
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
      className="relative flex overflow-hidden py-1.5 sm:py-2 select-none [contain:layout_paint]"
    >
      <div
        suppressHydrationWarning
        className="flex shrink-0 gap-3.5 sm:gap-4.5 md:gap-5 animate-marquee will-change-transform items-center"
        style={
          {
            "--marquee-duration": speed,
            "--marquee-direction": direction,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((company, idx) => (
          <CompanyBadge
            key={`${company.name}-${startIndex}-${idx}`}
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
  const [companyList, setCompanyList] = useState<ProdCompany[]>(() =>
    cleanProdApiCompanies(initialCompanies || [])
  );

  // Client-side refresh exclusively from prod API if server rendered data wasn't provided
  useEffect(() => {
    if (initialCompanies && initialCompanies.length > 0) return;

    let isMounted = true;
    fetchCompanies({ search: "", page_size: 100 })
      .then((res) => {
        if (isMounted && res.data && res.data.length > 0) {
          setCompanyList(cleanProdApiCompanies(res.data));
        }
      })
      .catch(() => {
        // Silently ignore network hiccup to prevent red error overlay
      });

    return () => {
      isMounted = false;
    };
  }, [initialCompanies]);

  // Split into 2 balanced rows for optimal visual spacing
  const { row1, row2 } = useMemo(() => {
    const r1: ProdCompany[] = [];
    const r2: ProdCompany[] = [];

    companyList.forEach((item, idx) => {
      if (idx % 2 === 0) {
        r1.push(item);
      } else {
        r2.push(item);
      }
    });

    return { row1: r1, row2: r2 };
  }, [companyList]);

  return (
    <section
      id="partners"
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center min-h-0"
      aria-labelledby="trusted-by-heading"
    >
      {/* Ambient Glows matching site standard */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-500/8 via-indigo-500/6 to-sky-500/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Header - Clean, Crisp, Focused */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center mb-6 sm:mb-8"
        >
          <h2
            id="trusted-by-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
          >
            Companies Are Hiring on{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 dark:from-brand-400 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              Hirance
            </span>
          </h2>
        </motion.div>

        {/* 2-Row Streamlined Company Marquee with Smooth, Gentle Glide */}
        {companyList.length > 0 && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5 sm:space-y-4.5 marquee-mask"
          >
            {/* Row 1: Leftward gentle glide */}
            <ContinuousMarqueeRow
              items={row1}
              direction="normal"
              speed="120s"
              startIndex={0}
            />

            {/* Row 2: Rightward gentle glide */}
            <ContinuousMarqueeRow
              items={row2}
              direction="reverse"
              speed="140s"
              startIndex={row1.length}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
