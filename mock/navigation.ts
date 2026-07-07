import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  {
    label: "Courses",
    children: [
      { label: "All courses", href: "/courses", description: "Every course we teach" },
      { label: "Business", href: "/courses?cat=business", description: "Strategy, ops, sales" },
      { label: "Product", href: "/courses?cat=product", description: "Product management & design" },
      { label: "Writing", href: "/courses?cat=writing", description: "Craft, editorial, essays" },
      { label: "Leadership", href: "/courses?cat=leadership", description: "Managing, hiring, growth" },
    ],
  },
  { label: "Cohorts", href: "/courses?format=live-cohort" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  academy: [
    { label: "All courses", href: "/courses" },
    { label: "Live cohorts", href: "/courses?format=live-cohort" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],
  help: [
    { label: "Contact", href: "/contact" },
    { label: "Access & delivery", href: "/faq" },
    { label: "Refunds", href: "/faq" },
    { label: "Certificates", href: "/faq" },
  ],
};
