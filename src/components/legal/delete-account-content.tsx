"use client";

import {
  Shield, ChevronDown, HelpCircle, Users, Lock,
  Trash2, Smartphone, Mail, CheckCircle2,
  Copy, Check, Clock, FileText, UserX
} from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/shared/footer";

export function DeleteAccountContent() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const emailAddress = "hello@hirance.com";

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const faqs = [
    {
      q: "Can I cancel my account deletion request?",
      a: "Yes! When you initiate account deletion in the app, your account enters a 10-day grace period. If you change your mind, simply log back into the Hirance App using your credentials before the 10 days expire to cancel the deletion request and restore your profile instantly."
    },
    {
      q: "Will recruiters still be able to see my profile after I request deletion?",
      a: "No. The moment you confirm deletion in the app, your profile, resume, and active job applications are immediately hidden from recruiters and unlisted from candidate search results."
    },
    {
      q: "How long does account deletion take?",
      a: "Deletion requests are typically completed within 10 days. During this period, your profile remains deactivated, and on Day 10, all data is permanently purged from our active databases."
    },
    {
      q: "What if I cannot log into my account to request deletion?",
      a: "If you cannot access your account (e.g. lost phone number or forgotten credentials), email us at hello@hirance.com with your registered email or phone number, and our support team will process your deletion request."
    },
    {
      q: "Can I register again in the future using the same phone number or email?",
      a: "Yes! Once the 10-day processing window finishes and your account is permanently erased, you are free to register as a fresh candidate at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-indigo-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase">
            <UserX className="w-4 h-4" /> Account Control &amp; Data Erasure
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Delete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Hirance App</span> Account
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            You can permanently delete your account and associated personal data at any time directly through the app.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Shield className="w-3.5 h-3.5 text-blue-400" /> DPDP Act 2023 Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> 10-Day Processing Window
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Google Play Policy Ready
            </span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14 w-full">

        {/* SECTION 1: HOW TO REQUEST DELETION (IN-APP STEPS) */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none space-y-8">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-6 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
              <Smartphone className="w-4 h-4" /> Simple In-App Deletion Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">How to Request Deletion</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Follow these easy step-by-step instructions inside your Hirance App to delete your candidate profile.
            </p>
          </div>

          {/* STEP-BY-STEP CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* STEP 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/30 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-md shadow-blue-500/20">
                    1
                  </span>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-full">
                    Step 1
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">Sign In to App</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sign in to your <strong>Hirance App</strong> account on your mobile device using your registered phone number or email address.
                </p>
              </div>
              
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                💡 <em>Example: Enter registered mobile &amp; verify OTP</em>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/30 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-md shadow-blue-500/20">
                    2
                  </span>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-full">
                    Step 2
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">Navigate to Settings</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Open <strong>Settings</strong> → <strong>Account Settings</strong> → <strong>Delete Account</strong> from your candidate profile menu.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                ⚙️ <em>Menu: Settings ➔ Account ➔ Delete Account</em>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-red-300 dark:hover:border-red-500 hover:bg-red-50/20 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-red-600 text-white text-sm font-bold flex items-center justify-center shadow-md shadow-red-500/20">
                    3
                  </span>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-2.5 py-0.5 rounded-full">
                    Step 3
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">Confirm Deletion</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Review the deletion prompt and <strong>Confirm your deletion request</strong>. Your profile will be instantly deactivated.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                ✅ <em>Deactivates instantly &amp; purges in 10 days</em>
              </div>
            </div>

          </div>

          {/* EMAIL ASSISTANCE FALLBACK BOX */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <HelpCircle className="w-4 h-4" /> Cannot access your account?
                </div>
                <h4 className="text-base font-bold text-white">Email Us Directly for Manual Deletion Request</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  If you cannot log into your account or have uninstalled the app, email us at <strong className="text-blue-300">{emailAddress}</strong> with the phone number or email address associated with your account.
                </p>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" /> Email Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Email Address
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT WILL BE DELETED VS WHAT MAY BE RETAINED */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Data Deletion Details</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Understand exactly what information gets deleted and what may be temporarily retained for legal requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* WHAT WILL BE DELETED */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-red-200/80 dark:border-red-900/50 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-red-100 dark:border-red-900/40 pb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">What Will Be Deleted</h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">Permanently erased from our systems</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Account profile</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Your profile picture, full name, phone number, email, and authentication credentials.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Personal information</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Location, contact details, work experience, and education records.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Resume and profile details</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Uploaded CV files, portfolio links, skill tags, and career preferences.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Job applications</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Application history, active job submissions, and saved job bookmarks.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Chat history (where applicable)</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Messages sent to recruiters, interview notifications, and chat records.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Account preferences</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Saved searches, job alert configurations, and notification preferences.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* WHAT MAY BE RETAINED */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/50 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-amber-100 dark:border-amber-900/40 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">What May Be Retained</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Statutory legal &amp; security compliance</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Some information may be retained for a limited period to comply with legal obligations, resolve disputes, prevent fraud, or enforce our Terms of Service.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                  <h4 className="text-xs font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Statutory Retention Window
                  </h4>
                  <p className="text-xs text-amber-900 dark:text-amber-200/80 leading-relaxed">
                    After the retention period expires, the remaining personal data will be permanently deleted from all server backups.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-white">Examples of Retained Records:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    <li>Financial transaction logs (if paid services were used) for tax reporting.</li>
                    <li>De-identified security logs to prevent fraudulent account creation.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: PROCESSING TIME & TIMELINE */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Processing Time</h2>
                <p className="text-xs text-slate-400">Deletion requests are typically completed within 10 days.</p>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold shrink-0">
              10-Day Purge Guarantee
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-blue-400 font-bold text-sm">Day 0: Request Initiated</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your account is immediately deactivated and your profile is hidden from recruiters.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-amber-400 font-bold text-sm">Days 1 - 10: Grace Period</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you change your mind, log back into the app to restore your account before Day 10.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-emerald-400 font-bold text-sm">Day 10+: Final Deletion</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All personal profile data, CVs, and chats are permanently expunged from database servers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
              Quick answers regarding your candidate account deletion request.
            </p>
          </div>

          <div className="space-y-3.5 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${activeFaq === index ? "rotate-180 text-blue-600" : ""}`} />
                </button>

                {activeFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default DeleteAccountContent;
