export const siteConfig = {
  name: "Hirance",
  tagline: "India's 1st Swipe-Based Hiring Platform",
  description:
    "Hirance is India's 1st swipe-based hiring platform. Fastest way to post & apply for jobs with zero forms, zero scrolling, zero waiting, and instant AI match scores.",
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
    { label: "Jobs", href: "/jobs" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
