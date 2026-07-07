import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-08-course-academy.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`, template: `%s · ${siteConfig.brand.name}` },
  description: "A premium online course academy for African creators, professionals and students.",
  openGraph: { type: "website", siteName: siteConfig.brand.name, url: siteUrl, locale: "en_NG" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
