"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Custom SVG Logo Components ---
// These are crafted to look clean, modern, and adapt to light/dark themes.
// Heights have been increased (e.g. h-11 to h-15) to make logos much larger and highly readable.

function CiplaLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8C7.58 8 4 11.58 4 16C4 20.42 7.58 24 12 24C16.42 24 20 20.42 20 16C20 11.58 16.42 8 12 8ZM12 21C9.24 21 7 18.76 7 16C7 13.24 9.24 11 12 11C14.76 11 17 13.24 17 16C17 18.76 14.76 21 12 21Z" fill="#2563EB" />
      <circle cx="12" cy="16" r="2.5" fill="#EF4444" />
      <text x="28" y="25" className="fill-foreground font-sans text-xl font-bold tracking-tight">Cipla</text>
    </svg>
  );
}

function IIFLLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" fill="#F97316" />
      <path d="M14 14H18V26H14V14ZM22 14H26V26H22V14Z" fill="white" />
      <circle cx="20" cy="20" r="3" fill="#FFE8D6" />
      <text x="44" y="21" className="fill-foreground font-sans text-base font-extrabold tracking-wider">IIFL</text>
      <text x="44" y="31" className="fill-muted-foreground font-sans text-[9px] font-semibold tracking-widest">FINANCE</text>
    </svg>
  );
}

function VFSGlobalLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6C10.27 6 4 12.27 4 20C4 27.73 10.27 34 18 34C25.73 34 32 27.73 32 20C32 12.27 25.73 6 18 6ZM18 29C13.03 29 9 24.97 9 20C9 15.03 13.03 11 18 11C22.97 11 27 15.03 27 20C27 24.97 22.97 29 18 29Z" fill="#1E3A8A" />
      <path d="M18 13C16.34 13 15 16.13 15 20C15 23.87 16.34 27 18 27C19.66 27 21 23.87 21 20C21 16.13 19.66 13 18 13Z" fill="#3B82F6" />
      <text x="38" y="24" className="fill-foreground font-sans text-xs font-bold tracking-tight">vfs.</text>
      <text x="58" y="24" className="fill-foreground font-sans text-xs font-black tracking-normal">VFS.GLOBAL</text>
    </svg>
  );
}

function RPGLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="skewX(-12)">
        <text x="10" y="28" className="fill-[#2563EB] dark:fill-brand-400 font-sans text-3xl font-black tracking-tighter">RPG</text>
        <line x1="12" y1="32" x2="68" y2="32" stroke="#EF4444" strokeWidth="3" />
      </g>
    </svg>
  );
}

function CEATLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="skewX(-8)">
        <text x="15" y="28" className="fill-[#1E3A8A] dark:fill-brand-400 font-sans text-3xl font-extrabold tracking-tight">CEAT</text>
      </g>
      <path d="M82 12L94 28H104L92 12H82Z" fill="#F97316" />
    </svg>
  );
}

function KECLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-13 md:h-15 w-auto", className)} viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="26" className="fill-[#1E3A8A] dark:fill-brand-400 font-sans text-2xl font-black tracking-tight">KEC</text>
      <text x="5" y="34" className="fill-muted-foreground font-sans text-[7px] font-bold tracking-widest">INTERNATIONAL LIMITED</text>
      <rect x="52" y="10" width="4" height="20" fill="#EF4444" transform="rotate(20 52 10)" />
    </svg>
  );
}

function RPGLifeSciencesLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 md:h-12 w-auto", className)} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 8L15 28H20L10 8H5Z" fill="#1E3A8A" />
      <path d="M12 8L22 28H27L17 8H12Z" fill="#EF4444" />
      <text x="32" y="20" className="fill-foreground font-sans text-xs font-black tracking-tight">RPG LIFE SCIENCES</text>
      <text x="32" y="28" className="fill-muted-foreground font-sans text-[8px] font-medium tracking-wider">LIMITED</text>
    </svg>
  );
}

function RaychemLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" className="fill-[#B91C1C] font-sans text-2xl font-black tracking-tight">Raychem</text>
    </svg>
  );
}

function HarrisonsLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="20" r="12" fill="#0284C7" />
      <path d="M16 12C16 12 13 16 13 20C13 24 16 28 16 28C16 28 19 24 19 20C19 16 16 12 16 12Z" fill="white" />
      <text x="34" y="24" className="fill-foreground font-sans text-[9px] font-bold tracking-tight">HARRISONS MALAYALAM LIMITED</text>
    </svg>
  );
}

function CanaraHSBCLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 8L5 28H25L15 8Z" fill="#059669" />
      <path d="M18 16L12 28H24L18 16Z" fill="#3B82F6" />
      <text x="32" y="20" className="fill-foreground font-sans text-[9px] font-extrabold tracking-tight">Canara HSBC</text>
      <text x="32" y="28" className="fill-muted-foreground font-sans text-[8px] font-semibold tracking-wider">LIFE INSURANCE</text>
    </svg>
  );
}

function DigitLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" className="fill-foreground font-sans text-3xl font-black tracking-tighter">digit</text>
      <circle cx="78" cy="14" r="5" fill="#10B981" />
    </svg>
  );
}

function ExpleoLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 md:h-12 w-auto", className)} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="26" className="fill-violet-600 dark:fill-violet-400 font-sans text-xl font-bold tracking-normal">( expleo )</text>
    </svg>
  );
}

function TavantLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 md:h-12 w-auto", className)} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" className="fill-[#1E293B] dark:fill-slate-200 font-sans text-2xl font-black tracking-wider">TAVANT</text>
      <rect x="5" y="30" width="85" height="3" fill="#F97316" />
    </svg>
  );
}

function AngelOneLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 28C6 24 6 16 10 12C14 8 20 8 24 12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 24C12 22 12 18 14 16C16 14 18 14 20 16" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
      <text x="32" y="25" className="fill-foreground font-sans text-base font-bold tracking-tight">AngelOne</text>
    </svg>
  );
}

// Custom simple inline FPI logo
function FPILogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-13 md:h-15 w-auto", className)} viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="22" className="fill-[#1E3A8A] dark:fill-brand-400 font-sans text-2xl font-black tracking-tight">FPI</text>
      <text x="5" y="31" className="fill-muted-foreground font-sans text-[7px] font-bold tracking-wider">FUTURE PIPE INDUSTRIES</text>
      <circle cx="48" cy="14" r="3.5" fill="#EF4444" />
    </svg>
  );
}

function TataHitachiLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 md:h-12 w-auto", className)} viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" className="fill-foreground font-sans text-lg font-black tracking-wider">TATA HITACHI</text>
    </svg>
  );
}

function SparkMindaLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 md:h-12 w-auto", className)} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="115" height="24" rx="4" fill="#0284C7" />
      <text x="12" y="24" className="fill-white font-sans text-xs font-black tracking-widest">SPARK MINDA</text>
      <path d="M110 14L114 18L110 22L112 18L110 14Z" fill="#EF4444" />
    </svg>
  );
}

function LatentViewLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="12" height="20" rx="2" fill="#3B82F6" />
      <rect x="21" y="15" width="12" height="15" rx="2" fill="#2563EB" />
      <text x="40" y="25" className="fill-foreground font-sans text-base font-extrabold tracking-tight">LatentView</text>
    </svg>
  );
}

function EQTLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="28" className="fill-[#1E3A8A] dark:fill-brand-400 font-sans text-3xl font-black tracking-tight">EQT</text>
      <path d="M64 12L74 22L60 26L64 12Z" fill="#EC4899" />
    </svg>
  );
}

function HFCLLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="28" className="fill-[#1E3A8A] dark:fill-brand-400 font-sans text-3xl font-black tracking-wider">HFCL</text>
    </svg>
  );
}

function InfoceptsLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-13 md:h-15 w-auto", className)} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 24L18 10L24 14L14 28L8 24Z" fill="#10B981" />
      <text x="30" y="22" className="fill-foreground font-sans text-sm font-extrabold tracking-tight">INFOCEPTS</text>
      <text x="30" y="30" className="fill-muted-foreground font-sans text-[8px] font-bold tracking-widest">DATA & AI</text>
    </svg>
  );
}

function AckoLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="20" r="10" fill="#6366F1" />
      <path d="M12 20L18 15V25L12 20Z" fill="white" />
      <text x="32" y="26" className="fill-foreground font-sans text-xl font-black tracking-normal">ACKO</text>
    </svg>
  );
}

function CredLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-11 md:h-13 w-auto", className)} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 8L25 14V22L15 28L5 22V14L15 8Z" stroke="currentColor" strokeWidth="2.5" className="text-foreground" fill="none" />
      <text x="34" y="24" className="fill-foreground font-sans text-base font-extrabold tracking-widest">CRED</text>
    </svg>
  );
}

function NaviLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12H12V24H6V12ZM16 18H22V24H16V18ZM16 12H22V15H16V12Z" fill="#10B981" />
      <text x="28" y="25" className="fill-foreground font-sans text-xl font-bold tracking-tight">navi</text>
    </svg>
  );
}

function UrbanCompanyLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 md:h-12 w-auto", className)} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" className="fill-foreground font-sans text-lg font-black tracking-wider">URBAN COMPANY</text>
    </svg>
  );
}

function LighthouseCantonLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 md:h-12 w-auto", className)} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="22" className="fill-[#DC2626] dark:fill-red-500 font-sans text-base font-black tracking-wider">LIGHTHOUSE</text>
      <text x="5" y="32" className="fill-foreground font-sans text-xs font-bold tracking-widest">CANTON</text>
    </svg>
  );
}

function PorterLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" className="fill-[#1D4ED8] dark:fill-brand-400 font-sans text-2xl font-black tracking-widest">PORTER</text>
    </svg>
  );
}

function CFCLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 md:h-14 w-auto", className)} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="27" className="fill-[#1E3A8A] dark:fill-brand-400 font-sans text-2xl font-black tracking-tight">CFC</text>
    </svg>
  );
}

// Logo collection containing meta info and reference components
const logos: { id: string; name: string; component: React.ComponentType<{ className?: string }> }[] = [
  { id: "cipla", name: "Cipla", component: CiplaLogo },
  { id: "iifl", name: "IIFL Finance", component: IIFLLogo },
  { id: "vfs", name: "VFS Global", component: VFSGlobalLogo },
  { id: "rpg", name: "RPG", component: RPGLogo },
  { id: "ceat", name: "CEAT", component: CEATLogo },
  { id: "kec", name: "KEC", component: KECLogo },
  { id: "rpglife", name: "RPG Life Sciences", component: RPGLifeSciencesLogo },
  { id: "raychem", name: "Raychem", component: RaychemLogo },
  { id: "harrisons", name: "Harrisons Malayalam", component: HarrisonsLogo },
  { id: "canarahsbc", name: "Canara HSBC", component: CanaraHSBCLogo },
  { id: "digit", name: "digit", component: DigitLogo },
  { id: "expleo", name: "expleo", component: ExpleoLogo },
  { id: "tavant", name: "TAVANT", component: TavantLogo },
  { id: "angelone", name: "AngelOne", component: AngelOneLogo },
  { id: "fpi", name: "FPI", component: FPILogo },
  { id: "tatahitachi", name: "Tata Hitachi", component: TataHitachiLogo },
  { id: "sparkminda", name: "Spark Minda", component: SparkMindaLogo },
  { id: "latentview", name: "LatentView", component: LatentViewLogo },
  { id: "eqt", name: "EQT", component: EQTLogo },
  { id: "hfcl", name: "HFCL", component: HFCLLogo },
  { id: "infocepts", name: "Infocepts", component: InfoceptsLogo },
  { id: "acko", name: "ACKO", component: AckoLogo },
  { id: "cred", name: "CRED", component: CredLogo },
  { id: "navi", name: "navi", component: NaviLogo },
  { id: "urbancompany", name: "Urban Company", component: UrbanCompanyLogo },
  { id: "lighthouse", name: "Lighthouse Canton", component: LighthouseCantonLogo },
  { id: "porter", name: "Porter", component: PorterLogo },
  { id: "cfc", name: "CFC", component: CFCLogo },
];

export function TrustedBy() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-20 px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Dynamic Highlighted Heading */}
        <h2 className="mx-auto mb-16 max-w-4xl text-center text-lg font-medium leading-relaxed tracking-tight text-foreground/80 md:text-xl md:leading-loose">
          Trusted by{" "}
          <span className="relative mx-1 inline-block rounded-md bg-brand-100 px-2 py-0.5 font-bold text-brand-600 dark:bg-brand-950/60 dark:text-brand-400">
            500+ employers
          </span>{" "}
          from{" "}
          <span className="relative mx-1 inline-block rounded-md bg-violet-50 px-2 py-0.5 font-bold text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
            leading companies
          </span>{" "}
          across{" "}
          <span className="relative mx-1 inline-block rounded-md bg-warning-50 px-2 py-0.5 font-bold text-warning-600 dark:bg-amber-950/40 dark:text-amber-400">
            India
          </span>
          .
        </h2>

        {/* Centered Flex Grid of Logos */}
        <div className="flex flex-wrap justify-center gap-4">
          {logos.map((logo, index) => {
            const LogoComp = logo.component;
            return (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                className="glow-hover group flex h-24 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(16.666%-14px)] items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-brand-500/20 dark:bg-card/40"
              >
                <LogoComp className="opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
