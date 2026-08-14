export const siteConfig = {
  name: "Hirance",
  tagline: "Hiring, reimagined.",
  description:
    "Hirance is the modern hiring platform connecting ambitious people with the companies building the future. For employers and job seekers alike.",
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
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
