export const siteConfig = {
  brand: {
    name: "Ladipo Academy",
    tagline: "Practical business & tech courses, taught in African classrooms.",
    domain: "ladipoacademy.co",
    email: "hello@ladipoacademy.co",
    whatsapp: "+234 700 000 0000",
    city: "Lagos, Nigeria",
    social: {
      instagram: "https://instagram.com/ladipoacademy",
      twitter: "https://twitter.com/ladipoacademy",
      youtube: "https://youtube.com/@ladipoacademy",
      linkedin: "https://linkedin.com/company/ladipoacademy",
    },
  },
  instructor: {
    name: "Dr. Tolu Ladipo",
    role: "Founder & lead instructor",
    portrait: "/img/creator.png",
    shortBio:
      "Two decades in product and pedagogy. I teach the courses I wish I could have taken when I was starting out — clear, useful, no fluff.",
    metric: "12,400+ students across 41 countries",
  },
  hero: {
    tag: "New cohort starts July 22",
    headline: "Learn a real skill. Ship real work.",
    lede:
      "Ladipo Academy is a small, careful online school. We build focused courses on business, product and creative craft — taught by senior practitioners.",
    primaryCta: { label: "Browse all courses", href: "/courses" },
    secondaryCta: { label: "See the flagship program", href: "/courses/product-strategy-mastery" },
  },
  commerce: {
    currency: "₦",
    trust: [
      "Lifetime access & free updates",
      "Certificate of completion",
      "7-day satisfaction guarantee",
    ],
  },
} as const;
