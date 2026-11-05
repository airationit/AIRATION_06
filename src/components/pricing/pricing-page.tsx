"use client";

import { Footer } from "@/components/shared";
import { PRICING_PLANS, PlanCard } from "@/components/sections/pricing-modal";

export function PricingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-36 bg-background text-foreground">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Post jobs <span className="italic font-serif">free.</span> Pay for{" "}
            <span className="italic font-serif">matches.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Use tokens to access candidate contact details and management features.
          </p>
        </div>

        {/* 3 Cards Grid - Exactly matching image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {PRICING_PLANS.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <p className="mt-8 text-center text-xs sm:text-sm text-muted-foreground/80 leading-normal">
          Prices are exclusive of 18% GST · GST calculated at checkout. All plans include the same core hiring platform & features.
        </p>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}

export default PricingPage;
