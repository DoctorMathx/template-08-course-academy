import { siteConfig } from "./site-config";

export function formatPrice(v: number, currency = siteConfig.commerce.currency) {
  return `${currency}${v.toLocaleString("en-NG")}`;
}
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
export function levelLabel(l: string) {
  return ({ beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", "all-levels": "All levels" } as Record<string, string>)[l] ?? l;
}
export function formatLabel(f: string) {
  return ({ "self-paced": "Self-paced", "live-cohort": "Live cohort", hybrid: "Hybrid" } as Record<string, string>)[f] ?? f;
}
