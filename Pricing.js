import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, TrendingUp, Crown, Check, ArrowRight, Star, CalendarDays, Zap, ShieldCheck, Users, X, Sparkles } from "lucide-react";

const PLANS = [
  {
    id: "starter",
    name: "STARTER",
    icon: Rocket,
    tagline: "Perfect for small teams getting started.",
    price: "₹1,199",
    original: "₹1,410",
    off: "15% OFF",
    per: "Total for 1 Month",
    stats: [{ v: "2", l: "Active Job Posts" }, { v: "₹600", l: "Cost / Job Post" }, { v: "30 Days", l: "Plan Validity" }],
    heading: "Features included",
    features: [
      "2 Active Job Posts",
      "15-Day Job Visibility per Post",
      "Post Any Job in Under 1 Minute",
      "Set Filters to Control Who Can Apply",
      "Candidate Matching & Filtering",
      "Candidate Shortlisting & Interview Scheduling",
      "Candidate Contact Access",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "GROWTH",
    icon: TrendingUp,
    tagline: "Great for growing companies hiring consistently.",
    price: "₹2,799",
    original: "₹3,293",
    off: "15% OFF",
    per: "Total for 3 Months",
    stats: [{ v: "5", l: "Active Job Posts" }, { v: "₹560", l: "Cost / Job Post" }, { v: "90 Days", l: "Plan Validity" }],
    heading: "Everything in Starter, plus",
    features: [
      "5 Active Job Posts",
      "Unlimited Applicants per Job",
      "Unlimited AI Job Description Credits",
      "Advanced Candidate Filtering",
      "Bulk Candidate Shortlisting & Messaging",
      "Bulk Interview Scheduling",
      "Candidate Contact Access",
    ],
    popular: true,
  },
  {
    id: "scale",
    name: "SCALE",
    icon: Crown,
    tagline: "Built for large teams and staffing agencies.",
    price: "₹7,499",
    original: "₹8,822",
    off: "15% OFF",
    per: "Total for 6 Months",
    stats: [{ v: "15", l: "Active Job Posts" }, { v: "₹500", l: "Cost / Job Post" }, { v: "180 Days", l: "Plan Validity" }],
    heading: "Everything in Growth, plus",
    features: [
      "15 Active Job Posts",
      "180-Day Plan Validity",
      "Unlimited Applicants & AI Credits",
      "Advanced Candidate Filtering",
      "Bulk Shortlisting, Messaging & Interviews",
      "Priority Candidate Contact Access",
      "Dedicated Account Support",
    ],
    popular: false,
  },
];

const BOTTOM = [
  { icon: CalendarDays, title: "15-Day Job Visibility", text: "Every job post stays visible for 15 days." },
  { icon: Zap, title: "Post in Under 1 Minute", text: "Quick, simple and built for faster hiring." },
  { icon: ShieldCheck, title: "Control & Privacy", text: "Set filters to control who can apply." },
  { icon: Users, title: "Candidate Access", text: "Get full access to candidate contacts anytime." },
];

const PlanCard = ({ plan, onStartHiring, i }) => {
  const { icon: Icon, popular } = plan;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      data-testid={`pricing-card-${plan.id}`}
      className={`relative rounded-[28px] flex flex-col ${
        popular
          ? "bg-white border-2 border-[var(--hi-blue)] shadow-float lg:-mt-4 lg:mb-4"
          : "bg-white border border-slate-200 shadow-soft"
      }`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-white text-xs font-bold shadow-md" style={{ background: "linear-gradient(135deg,#0284C7,#0369A1)" }}>
          <Star size={13} fill="currentColor" /> MOST POPULAR
        </div>
      )}
      <div className="p-7">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl grid place-items-center ${popular ? "text-white" : "text-[var(--hi-blue)] bg-sky-50"}`} style={popular ? { background: "linear-gradient(135deg,#0284C7,#0369A1)" } : {}}>
            <Icon size={26} />
          </div>
          <div>
            <p className={`font-display font-black text-xl tracking-wide ${popular ? "text-[var(--hi-blue)]" : "text-[var(--hi-navy)]"}`}>{plan.name}</p>
            <p className="text-xs text-slate-500 max-w-[190px] leading-snug mt-0.5">{plan.tagline}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-end gap-2.5 flex-wrap">
            <span className="font-display text-4xl font-black text-[var(--hi-navy)]">{plan.price}</span>
            <span className="text-slate-400 line-through text-lg mb-1">{plan.original}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
              <Sparkles size={12} /> {plan.off}
            </span>
            <span className="text-sm text-slate-400">{plan.per}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 rounded-2xl bg-slate-50 border border-slate-100 divide-x divide-slate-200 overflow-hidden">
          {plan.stats.map((s) => (
            <div key={s.l} className="px-2 py-3 text-center">
              <p className="font-display font-extrabold text-[var(--hi-navy)] text-sm leading-tight">{s.v}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-7 pb-7 flex-1 flex flex-col">
        <p className={`text-sm font-bold mb-3 ${popular ? "text-[var(--hi-blue)]" : "text-[var(--hi-navy)]"}`}>{plan.heading}</p>
        <ul className="space-y-2.5 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span className="shrink-0 w-5 h-5 rounded-full grid place-items-center mt-0.5" style={{ background: popular ? "linear-gradient(135deg,#00E5FF,#0284C7)" : "#e0f2fe" }}>
                <Check size={12} strokeWidth={3} className={popular ? "text-white" : "text-[var(--hi-blue)]"} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={onStartHiring}
          data-testid={`pricing-start-${plan.id}`}
          className={`group mt-6 w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-full transition-all ${
            popular ? "text-white shadow-float hover:shadow-none" : "text-[var(--hi-blue)] border border-slate-200 hover:border-[var(--hi-blue)]"
          }`}
          style={popular ? { background: "linear-gradient(135deg,#0284C7,#0369A1)" } : {}}
        >
          Start Hiring <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const PricingContent = ({ onStartHiring }) => (
  <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
    <div className="text-center max-w-2xl mx-auto mb-14">
      <p className="font-mono-hi text-xs uppercase tracking-[0.2em] text-[var(--hi-blue)] mb-4">Employer Plans</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--hi-navy)] leading-[1.05] text-balance">
        Simple Plans. <span className="text-gradient-blue">Powerful Hiring.</span>
      </h2>
      <p className="mt-4 text-lg text-slate-500 text-pretty">Choose the perfect plan for your team. Pay less per job as your commitment increases.</p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full text-white px-5 py-2 shadow-soft" style={{ background: "linear-gradient(135deg,#0284C7,#0369A1)" }} data-testid="free-posts-banner">
        <Sparkles size={15} className="text-cyan-200" />
        <span className="text-sm font-semibold">Your first 2 job posts are free — start hiring at zero cost.</span>
      </div>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-5 py-2 shadow-soft">
        <span className="text-sm text-slate-500">Per-job cost drops:</span>
        <span className="font-mono-hi text-sm font-bold text-[var(--hi-navy)]">₹600 <span className="text-[var(--hi-blue)]">→</span> ₹560 <span className="text-[var(--hi-blue)]">→</span> ₹500</span>
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-6 items-stretch">
      {PLANS.map((p, i) => (
        <PlanCard key={p.id} plan={p} onStartHiring={onStartHiring} i={i} />
      ))}
    </div>

    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {BOTTOM.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 p-4 shadow-soft"
        >
          <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-50 grid place-items-center text-[var(--hi-blue)]">
            <b.icon size={19} />
          </div>
          <div>
            <p className="font-display font-bold text-[var(--hi-navy)] text-sm">{b.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{b.text}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <p className="mt-8 text-center text-sm text-slate-400">
      Prices are exclusive of <b className="text-slate-500">18% GST</b> · GST calculated at checkout. All plans include the same core hiring platform &amp; features.
    </p>
  </div>
);

// Full-screen pricing shown on click
export const PricingModal = ({ open, onClose, onStartHiring }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-[var(--hi-navy)]/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-8"
        data-testid="pricing-modal"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-7xl mx-auto my-4 rounded-[32px] bg-[var(--hi-canvas)] py-16 shadow-float overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <button
            onClick={onClose}
            data-testid="pricing-modal-close"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 grid place-items-center text-slate-500 hover:text-[var(--hi-navy)] hover:shadow-soft transition-all"
            aria-label="Close plans"
          >
            <X size={20} />
          </button>
          <PricingContent onStartHiring={onStartHiring} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default PricingModal;
