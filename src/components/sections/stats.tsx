"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, LayoutGrid, Zap } from "lucide-react";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  useCommaFormatting?: boolean;
}

function Counter({
  from,
  to,
  duration = 2,
  suffix = "",
  decimals = 0,
  useCommaFormatting = false,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    const node = ref.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
      onUpdate(value) {
        let displayVal = value.toFixed(decimals);
        if (useCommaFormatting) {
          displayVal = Math.floor(value).toLocaleString();
        }
        node.textContent = displayVal + suffix;
      },
    });

    return () => controls.stop();
  }, [from, to, inView, duration, decimals, suffix, useCommaFormatting]);

  return <span ref={ref}>{from}</span>;
}

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: "users",
      label: "Peoples Trusted Hirance",
      value: 15480,
      suffix: "+",
      useCommaFormatting: true,
      decimals: 0,
      icon: Users,
      colorClass: "text-brand-500 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-400 border-brand-200/50 dark:border-brand-800/30",
      glowClass: "group-hover:shadow-brand-500/10",
      gradientClass: "from-brand-500/20 to-transparent",
      description: "Candidates and hiring teams actively matched with premium job positions.",
    },
    {
      id: "categories",
      label: "Total Job Categories",
      value: 85,
      suffix: "+",
      useCommaFormatting: false,
      decimals: 0,
      icon: LayoutGrid,
      colorClass: "text-violet-500 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400 border-violet-200/50 dark:border-violet-800/30",
      glowClass: "group-hover:shadow-violet-500/10",
      gradientClass: "from-violet-500/20 to-transparent",
      description: "Diverse career tracks across tech, product, marketing, operations, and more.",
    },
    {
      id: "swipes",
      label: "Swipes Till Now",
      value: 2.4,
      suffix: "M+",
      useCommaFormatting: false,
      decimals: 1,
      icon: Zap,
      colorClass: "text-amber-500 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30",
      glowClass: "group-hover:shadow-amber-500/10",
      gradientClass: "from-amber-500/20 to-transparent",
      description: "Fast-paced swipe connections indicating active talent matchmaking momentum.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden border-t border-border bg-background py-20 px-6 sm:py-28"
    >
      {/* Premium Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-80 w-80 rounded-full bg-brand-500/10 blur-[120px] dark:bg-brand-500/5" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px] dark:bg-violet-500/5" />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
        
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Our User Presentation Countings Database
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Verifiable real-time statistics showcasing the speed and scale of matchmaking
            across the entire Hirance ecosystem.
          </motion.p>
        </div>

        {/* Stats Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-brand-500/20 dark:bg-card/30"
              >
                {/* Background Gradient Hover Highlight */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${stat.gradientClass} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div>
                  {/* Top Bar: Icon and Status Dot */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${stat.colorClass}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-success-500 dark:bg-success-400 animate-pulse" />
                  </div>

                  {/* Main Metric Value */}
                  <div className="mt-8 flex items-baseline">
                    <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                      <Counter
                        from={0}
                        to={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        useCommaFormatting={stat.useCommaFormatting}
                      />
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                {/* Sub-card details representing a "database node" style */}
                <div className="mt-8 border-t border-border/60 pt-4 flex items-center justify-between text-[11px] font-mono tracking-wider text-muted-foreground/80 uppercase">
                  <span>NODE: {stat.id}_DB</span>
                  <span className="text-success-600 dark:text-success-400 font-semibold">
                    ONLINE
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
