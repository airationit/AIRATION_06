import { GooglePlayButton } from "./google-play-button";

interface SwipeHiringCtaProps {
  className?: string;
}

export function SwipeHiringCta({ className = "" }: SwipeHiringCtaProps) {
  return (
    <section className={`relative overflow-hidden ${className}`} aria-labelledby="cta-experience-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Card with minimum corner radius (rounded-2xl) */}
        <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          {/* 2-Column Grid Layout: col-8 (left) & col-4 (right) with balanced vertical padding */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 px-6 py-7 sm:px-10 sm:py-8 lg:px-12 lg:py-8">
            {/* Left Column: col-8 */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <h2
                id="cta-experience-heading"
                className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
              >
                Experience <span className="text-blue-600">Swipe-Based Hiring</span><br />
                <span className="text-slate-900 dark:text-white">Today</span>
              </h2>

              <p className="mt-2.5 text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl line-clamp-2">
                Whether you&apos;re recruiting top software talent or searching for your next career move, Hirance makes hiring instant with zero forms. Match directly with verified profiles, swipe tailored job cards, and connect in seconds.
              </p>

              {/* CTA Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <GooglePlayButton label="Apply for Jobs" />
                <a
                  href="https://employer.hirance.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full border border-slate-200/90 dark:border-border bg-white dark:bg-card px-6 sm:px-7 text-xs sm:text-sm font-bold text-slate-800 dark:text-white shadow-xs transition-all hover:bg-slate-50 dark:hover:bg-muted/80 active:scale-95"
                >
                  Post a Job in 60s
                </a>
              </div>
            </div>

            {/* Right Column: col-4 */}
            <div className="lg:col-span-4 relative flex items-center justify-center min-h-[200px] sm:min-h-[220px] lg:min-h-[240px]">
              {/* Background Shape Image behind Phone Mockup */}
              <img
                src="/pics/bg-shape.png"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none z-0 w-[340px] sm:w-[400px] lg:w-[440px] max-w-none h-auto object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              {/* Tilted Mobile Phone Image */}
              <img
                src="/pics/mobile_mockup.png"
                alt="Hirance Swipe App Mockup"
                className="relative z-10 max-h-[220px] sm:max-h-[240px] lg:max-h-[260px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(37,99,235,0.22)] transform rotate-6"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
