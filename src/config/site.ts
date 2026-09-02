export const siteConfig = {
  name: "Hirance",
  tagline: "India's Swipe-Based Hiring Platform",
  description:
    "Hirance is India's swipe-based hiring platform. Fastest way to post & apply for jobs with zero forms, zero scrolling, zero waiting, and instant AI match scores.",
  url: "https://hirance.com",
  ogImage: "/og.png",
  links: {
    // Google Play store listing
    playStore: "https://play.google.com/store/apps/details?id=com.hirance",
    employer: "https://employer.hirance.com/",
    twitter: "#",
    github: "#",
  },
  /** Dual audience: employers use the web; candidates use the mobile app */
  audiences: [
    {
      id: "employers",
      label: "Employers",
      href: "https://employer.hirance.com/",
      hint: "Web platform",
      cta: "Employer login",
      external: true,
    },
    {
      id: "candidates",
      label: "Candidates",
      href: "https://play.google.com/store/apps/details?id=com.hirance",
      hint: "Mobile app",
      cta: "Get the app",
      external: true,
    },
  ],
  nav: [
    {
      label: "Jobs",
      href: "/jobs",
      subNav: {
        left: [
          { label: "Work from Office Jobs", href: "/jobs/work-from-office-jobs" },
          { label: "Field Jobs", href: "/jobs/field-jobs" },
          { label: "Work from Home Jobs", href: "/jobs/work-from-home-jobs" },
          { label: "Full-time Jobs", href: "/jobs/full-time-jobs" },
          { label: "Part-time Jobs", href: "/jobs/part-time-jobs" },
          { label: "Day Shift Jobs", href: "/jobs/day-shift-jobs" },
          { label: "Night Shift Jobs", href: "/jobs/night-shift-jobs" },
          { label: "Hybrid Jobs", href: "/jobs/hybrid-jobs" },
        ],
        right: [
          {
            label: "Jobs By City",
            href: "/jobs?keyword=Jobs+By+City",
            hasArrow: true,
            flyoutItems: [
              { label: "Jobs in Bangalore", href: "/jobs/jobs-in-bangalore" },
              { label: "Jobs in Mumbai", href: "/jobs/jobs-in-mumbai" },
              { label: "Jobs in Delhi NCR", href: "/jobs/jobs-in-delhi-ncr" },
              { label: "Jobs in Pune", href: "/jobs/jobs-in-pune" },
              { label: "Jobs in Hyderabad", href: "/jobs/jobs-in-hyderabad" },
              { label: "Jobs in Chennai", href: "/jobs/jobs-in-chennai" },
            ],
          },
          {
            label: "Jobs By Department",
            href: "/jobs?keyword=Jobs+By+Department",
            hasArrow: true,
            flyoutItems: [
              { label: "Software & IT Jobs", href: "/jobs/software-developer-jobs" },
              { label: "Sales & Marketing Jobs", href: "/jobs/sales-executive" },
              { label: "Human Resources (HR)", href: "/jobs/hr-manager" },
              { label: "Finance & Accounts", href: "/jobs/accountant" },
              { label: "Operations & Admin", href: "/jobs/operations-executive" },
              { label: "Design & Creative", href: "/jobs/ui-ux-designer" },
            ],
          },
          {
            label: "Jobs By Qualification",
            href: "/jobs?keyword=Jobs+By+Qualification",
            hasArrow: true,
            flyoutItems: [
              { label: "10th Pass Jobs", href: "/jobs?keyword=10th+Pass" },
              { label: "12th Pass Jobs", href: "/jobs?keyword=12th+Pass" },
              { label: "Diploma Jobs", href: "/jobs?keyword=Diploma" },
              { label: "Graduate Jobs", href: "/jobs?keyword=Graduate" },
              { label: "Post Graduate Jobs", href: "/jobs?keyword=Post+Graduate" },
            ],
          },
          {
            label: "Others",
            href: "/jobs?keyword=Others",
            hasArrow: true,
            flyoutItems: [
              { label: "Fresher Jobs", href: "/jobs/freshers-jobs" },
              { label: "Internships with Stipend", href: "/jobs/internship-jobs" },
              { label: "Free to Apply Jobs", href: "/jobs/free-to-apply-jobs" },
            ],
          },
        ],
      },
    },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "QR-marketing", href: "/qr-marketing" },
  ],
};
