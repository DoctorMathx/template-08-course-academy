import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Clock, PlayCircle, Star, Users } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { CourseCard } from "@/components/ui/course-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CtaSection } from "@/components/ui/cta-section";
import { siteConfig } from "@/lib/site-config";
import { courses, featuredCourses, flagshipCourse } from "@/mock/products";
import { testimonials, proofStats } from "@/mock/testimonials";
import { faqs } from "@/mock/faqs";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const flagship = flagshipCourse();
  const featured = featuredCourses().slice(0, 6);

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-canvas overflow-hidden">
        <div className="absolute inset-0 grain opacity-60 pointer-events-none" />
        <div className="container-x pt-14 md:pt-20 pb-16 md:pb-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 chip chip-accent"><span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />{siteConfig.hero.tag}</div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-[80px] lg:text-[104px] font-normal tracking-tight leading-[0.98] mt-6">
              Learn a <span className="italic font-semibold">real skill.</span><br />Ship <span className="italic font-semibold">real work.</span>
            </h1>
            <p className="prose-lede mt-8 max-w-2xl mx-auto">{siteConfig.hero.lede}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={siteConfig.hero.primaryCta.href} className="btn btn-accent btn-lg">{siteConfig.hero.primaryCta.label}<ArrowRight className="w-4 h-4" /></Link>
              <Link href={siteConfig.hero.secondaryCta.href} className="btn btn-outline btn-lg">{siteConfig.hero.secondaryCta.label}</Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {proofStats.map((s) => (
              <div key={s.label} className="border-t border-line pt-4">
                <div className="font-display text-2xl md:text-3xl font-semibold tabular-nums">{s.value}</div>
                <div className="text-[12px] muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship program spotlight */}
      <Section pad="lg">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="eyebrow">Flagship program</div>
            <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight leading-[1.05] mt-4">
              {flagship.title}
            </h2>
            <p className="prose-lede mt-5">{flagship.fullDescription ?? flagship.shortDescription}</p>
            <ul className="mt-6 space-y-2.5">
              {flagship.outcomes.slice(0, 3).map((o) => (
                <li key={o} className="flex items-start gap-3 text-[15px] text-[color:var(--charcoal)]">
                  <Award className="w-4 h-4 text-[color:var(--accent)] mt-1 shrink-0" />{o}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Link href={`/courses/${flagship.slug}`} className="btn btn-accent btn-lg">Enrol in the program <ArrowRight className="w-4 h-4" /></Link>
              <div className="text-[14px]"><span className="muted">From </span><span className="font-semibold tabular-nums">{formatPrice(flagship.price)}</span></div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-canvas border border-line">
              <Image src={flagship.cover} alt={flagship.title} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" priority />
              <button aria-label="Play preview" className="absolute inset-0 flex items-center justify-center group">
                <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-105 transition">
                  <PlayCircle className="w-10 h-10 text-[color:var(--ink)]" />
                </span>
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap">
                <span className="chip bg-white/95"><Clock className="w-3.5 h-3.5" />{flagship.duration}</span>
                <span className="chip bg-white/95"><Users className="w-3.5 h-3.5" />{flagship.studentCount?.toLocaleString()} students</span>
                <span className="chip bg-white/95"><Star className="w-3.5 h-3.5 fill-current text-[color:var(--warn)]" />{flagship.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Course library */}
      <Section tone="canvas" pad="lg">
        <SectionHeader
          eyebrow="The library"
          title="Focused, senior courses. Nothing filler."
          lede="Every course is taught by a working practitioner. We only launch a course when we're sure it earns its price."
          action={<Link href="/courses" className="btn btn-outline btn-sm">Browse all courses <ArrowRight className="w-3.5 h-3.5" /></Link>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </Section>

      {/* How you'll learn */}
      <Section pad="lg">
        <SectionHeader eyebrow="How you'll learn" title="Practical, cohort-friendly, senior-taught." lede="The academy is built around the way working professionals actually learn — small, focused, and real." align="center" />
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mt-4">
          {[
            { icon: PlayCircle, title: "Watch when you need to", body: "Short, focused lessons — most under 30 minutes. Speed up, slow down, or come back to them any time." },
            { icon: Users, title: "Learn with a small cohort", body: "Live programs cap at 40 students. You get real feedback from peers and instructors, not just a completion badge." },
            { icon: Award, title: "Leave with something real", body: "Every course ships with a portfolio piece, a project, or a set of tools you can plug into your work tomorrow." },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card p-7">
                <div className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center text-[color:var(--accent-ink)]"><Icon className="w-5 h-5" /></div>
                <h3 className="font-display text-xl font-semibold mt-5">{f.title}</h3>
                <p className="text-[14.5px] text-[color:var(--charcoal)] leading-relaxed mt-2">{f.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Instructor */}
      <Section tone="paper" pad="lg">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md rounded-3xl overflow-hidden bg-canvas border border-line">
              <Image src={siteConfig.instructor.portrait} alt={siteConfig.instructor.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow">Founder & lead instructor</div>
            <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight leading-tight mt-4">{siteConfig.instructor.name}</h2>
            <p className="text-[15px] muted mt-2">{siteConfig.instructor.role}</p>
            <p className="prose-lede mt-5 max-w-xl">{siteConfig.instructor.shortBio}</p>
            <p className="mt-6 text-[14px] flex items-center gap-2"><Users className="w-4 h-4" /> {siteConfig.instructor.metric}</p>
            <div className="mt-6"><Link href="/about" className="btn btn-outline">Read more about the academy</Link></div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section pad="lg">
        <SectionHeader eyebrow="Student stories" title="What students say after finishing." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.slice(0, 6).map((t) => <TestimonialCard key={t.id} t={t} />)}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="canvas" pad="lg">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Frequently asked" title="Answers before you enrol." />
            <Link href="/faq" className="btn btn-outline">Full FAQ</Link>
          </div>
          <div className="lg:col-span-7"><FaqAccordion items={faqs.slice(0, 6)} /></div>
        </div>
      </Section>

      <Section pad="sm">
        <CtaSection
          eyebrow="Ready when you are"
          title="Pick a course. Start tonight."
          description="Self-paced courses open instantly. Live cohorts open a few times a year. Either way, you're in a small, careful classroom."
          primary={{ label: "Browse the library", href: "/courses" }}
          secondary={{ label: "Talk to us first", href: "/contact" }}
        />
      </Section>
    </>
  );
}
