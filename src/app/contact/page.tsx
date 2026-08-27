import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Contact Us | Hirance - India's 1st Swipe-Based Hiring Platform",
  description:
    "Contact Hirance for employer support, job seeker help, press, or partnerships. Call +91 9793780913 or email hello@hirance.com. We reply within 24 hours.",
  keywords: [
    "Hirance contact us",
    "Hirance support phone number",
    "Hirance Lucknow office",
    "swipe job app support",
    "employer support Hirance",
    "job seeker support Hirance",
    "fast hiring platform contact",
    "Hirance customer care number",
    "Hirance helpline",
    "Hirance headquarters",
    "Hirance office address",
    "Hirance app not working",
    "Hirance WhatsApp support",
    "Hirance partnership inquiry",
  ],
  alternates: {
    canonical: "https://hirance.com/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hirance.com/contact",
    title: "Contact Us | Hirance - India's 1st Swipe-Based Hiring Platform",
    description:
      "Have questions about hiring or job searching on Hirance? Reach out to our team at +91 9793780913.",
    siteName: "Hirance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Contact Us - Hirance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Hirance - India's 1st Swipe-Based Hiring Platform",
    description:
      "Swipe. Match. Get Hired. Contact Hirance support for instant assistance.",
  },
};

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Us | Hirance",
      url: "https://hirance.com/contact",
      description:
        "Contact Hirance for hiring support, job seeker help, press, or partnerships.",
      publisher: {
        "@type": "Organization",
        name: "Hirance",
        url: "https://hirance.com",
        logo: "https://hirance.com/og.png",
        slogan: "Swipe. Match. Get Hired.",
      },
      mainEntity: {
        "@type": "Organization",
        name: "Hirance",
        url: "https://hirance.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Janki Puram Extension",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          postalCode: "226021",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "26.923114",
          longitude: "80.95313",
        },
        hasMap:
          "https://www.google.com/maps?ll=26.923114,80.95313&z=15&t=m&hl=en&gl=IN&mapclient=embed&q=Jankipuram+Lucknow,+Uttar+Pradesh",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9793780913",
          email: "hello@hirance.com",
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How fast does the Hirance support team respond?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our support team typically responds within 24 hours. For urgent employer queries, you can call or WhatsApp us directly at +91 9793780913.",
          },
        },
        {
          "@type": "Question",
          name: "How can employers get dedicated onboarding assistance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Employers can select 'Employer' in our contact form or email hello@hirance.com for instant onboarding and customized hiring assistance.",
          },
        },
        {
          "@type": "Question",
          name: "What should job seekers do if they face an issue on the app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Send us a message using the contact form or email hello@hirance.com with your registered phone number, and our team will resolve it quickly.",
          },
        },
        {
          "@type": "Question",
          name: "What are Hirance's support working hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Phone and WhatsApp support is active Monday through Saturday from 9:00 AM to 7:00 PM IST. Email support is monitored 7 days a week.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Hirance headquartered?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our headquarters is located at Janki Puram Extension, Lucknow - 226021, Uttar Pradesh, India.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {/* SEO JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  );
}
