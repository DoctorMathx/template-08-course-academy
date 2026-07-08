import Image from "next/image";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { CtaSection } from "@/components/ui/cta-section";
import { siteConfig } from "@/lib/site-config";
import { proofStats } from "@/mock/testimonials";

export const metadata: Metadata = { title: "About the academy" };

const VALUES = [
  { title: "Small on purpose", body: "We cap every live cohort at 40 students. Our library grows two or three courses a year, not twenty." },
  { title: "Senior teachers only", body: "Every instructor is a working practitioner with 5+ years in the discipline they teach." },
  { title: "Africa-first, world-open", body: "Built in Lagos and Nairobi. Every course example is pulled from real African companies." },
  { title: "Practical, always", body: "You leave every course with something real — a portfolio piece, a project, or a template you'll actually use." },
];

const STORY = [
  { year: "2018", title: "The first cohort", body: "12 students in a Lagos co-working space. A single course on product strategy." },
  { year: "2020", title: "Going online", body: "We rebuilt the flagship as a live-online cohort. Applications tripled in a year." },
  { year: "2023", title: "The library grows", body: "Four new courses. First live cohort in Nairobi." },
  { year: "2026", title: "12,400 students", body: "Alumni now working across product, design and leadership at companies on 4 continents." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-canvas border-b border-line">
        <div className="container-x py-16 md:py-24 max-w-4xl">
          <div className="eyebrow">About the academy</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[80px] font-normal tracking-tight leading-[1.02] mt-4">
            A <span className="italic">quiet</span> academy for serious learners.
          </h1>
          <p className="prose-lede mt-6 max-w-2xl">
            {siteConfig.brand.name} teaches senior, practical courses for working professionals across
            Africa. We stay small so every student is known — not just enrolled.
          </p>
        </div>
      </section>

      <Section pad="lg">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-canvas border border-line">
              <Image src={siteConfig.instructor.portrait} alt={siteConfig.instructor.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow">Founder</div>
            <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight leading-tight mt-3">{siteConfig.instructor.name}</h2>
            <div className="prose-lede mt-5 space-y-4 max-w-xl">
              <p>{siteConfig.instructor.shortBio}</p>
              <p>Ladipo Academy grew out of a small course we ran for our own team. When we opened it publicly, we quickly learned that senior, honest teaching was a small category — and we've stayed there on purpose ever since.</p>
              <p>We&apos;ve chosen to grow slowly: only launching new courses when a working senior practitioner is ready to teach one, and only opening cohorts we can staff properly.</p>
            </div>
          </div>
        </div>
      </Section>

      <div className="container-x">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-canvas border border-line">
          <Image src="/img/hero-scene.jpg" alt="A working session" fill sizes="1200px" className="object-cover" />
        </div>
      </div>

      <Section tone="canvas" pad="lg">
        <SectionHeader eyebrow="What we believe" title="Four things we don't compromise on." />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {VALUES.map((v, i) => (
            <div key={v.title} className="card p-7">
              <div className="font-display text-[24px] font-semibold tabular-nums text-[color:var(--accent)]">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-xl font-semibold mt-3">{v.title}</h3>
              <p className="text-[15px] text-[color:var(--charcoal)] leading-relaxed mt-2">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section pad="lg">
        <SectionHeader eyebrow="Milestones" title="A short timeline." />
        <div className="grid md:grid-cols-4 gap-6">
          {STORY.map((s) => (
            <div key={s.year} className="pt-6 border-t border-line">
              <div className="font-display text-2xl font-semibold tabular-nums text-[color:var(--accent)]">{s.year}</div>
              <div className="mt-2 font-medium">{s.title}</div>
              <p className="text-[14px] text-[color:var(--charcoal)] leading-relaxed mt-2">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl text-center">
          {proofStats.map((s) => (
            <div key={s.label} className="border-t border-line pt-4">
              <div className="font-display text-3xl font-semibold tabular-nums">{s.value}</div>
              <div className="text-[12px] muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section pad="sm">
        <CtaSection eyebrow="Start learning" title="Pick a course and get started." primary={{ label: "Browse the library", href: "/courses" }} secondary={{ label: "Talk to us", href: "/contact" }} />
      </Section>
    </>
  );
}
