import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CtaSection } from "@/components/ui/cta-section";
import { faqs } from "@/mock/faqs";

export const metadata: Metadata = { title: "FAQ" };

const TOPICS = [
  { id: "access", label: "Access & delivery" },
  { id: "certificate", label: "Certificates" },
  { id: "refunds", label: "Refunds" },
  { id: "cohort", label: "Live cohorts" },
  { id: "payment", label: "Payment" },
  { id: "team", label: "Team pricing" },
  { id: "who", label: "Who this is for" },
];

export default function FaqPage() {
  return (
    <>
      <section className="bg-canvas border-b border-line">
        <div className="container-x py-16 md:py-20 max-w-4xl">
          <div className="eyebrow">Help centre</div>
          <h1 className="font-display text-5xl md:text-6xl font-normal tracking-tight leading-[1.02] mt-4">Answers before you enrol.</h1>
          <p className="prose-lede mt-5 max-w-2xl">
            Access, certificates, refunds, cohorts, payment, and more. Can&apos;t find what you need?{" "}
            <Link href="/contact" className="underline underline-offset-4">Contact the academy</Link>.
          </p>
        </div>
      </section>

      <Section pad="md">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="eyebrow mb-4">Topics</div>
              <nav className="flex flex-col gap-1">
                {TOPICS.map((t) => <a key={t.id} href={`#${t.id}`} className="px-3 py-2 rounded-lg text-[14px] muted hover:text-[color:var(--ink)] hover:bg-paper">{t.label}</a>)}
              </nav>
            </div>
          </aside>
          <div className="lg:col-span-9 space-y-14">
            {TOPICS.map((t) => {
              const items = faqs.filter((f) => f.topic === t.id);
              if (!items.length) return null;
              return (
                <div key={t.id} id={t.id}>
                  <SectionHeader eyebrow={t.label} title={t.label} />
                  <FaqAccordion items={items} />
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section pad="sm"><CtaSection eyebrow="Still stuck?" title="Message the academy." primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Browse courses", href: "/courses" }} tone="light" /></Section>
    </>
  );
}
