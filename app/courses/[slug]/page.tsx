import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courseBySlug, courses } from "@/mock/products";
import { testimonials } from "@/mock/testimonials";
import { faqs } from "@/mock/faqs";
import { siteConfig } from "@/lib/site-config";
import { Section, SectionHeader } from "@/components/ui/section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CtaSection } from "@/components/ui/cta-section";
import { CourseCard } from "@/components/ui/course-card";
import { PricingCard } from "@/components/ui/pricing-card";
import { formatLabel, formatPrice, levelLabel } from "@/lib/utils";
import { Award, ArrowRight, Check, Clock, PlayCircle, Star, Users } from "lucide-react";
import { Curriculum } from "./curriculum";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = courseBySlug(slug);
  return { title: c?.title ?? "Course", description: c?.shortDescription };
}

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = courseBySlug(slug);
  if (!c) notFound();
  const related = courses.filter((x) => x.id !== c.id).slice(0, 3);
  const reviews = testimonials.filter((t) => !t.courseId || t.courseId === c.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-graphite text-white">
        <div className="container-x py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="text-[13px] text-white/60 flex items-center gap-1.5">
                <Link href="/courses" className="hover:text-white">All courses</Link>
                <span>/</span>
                <span className="capitalize">{c.category}</span>
              </div>
              <div className="inline-flex items-center gap-2 chip bg-white/10 border-white/15 text-white mt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)]" />{formatLabel(c.format)} · {levelLabel(c.level)}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[68px] font-normal tracking-tight leading-[1.03] mt-5">{c.title}</h1>
              <p className="text-lg text-white/80 mt-5 max-w-xl leading-relaxed">{c.fullDescription ?? c.shortDescription}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="#enrol" className="btn btn-accent btn-lg">Enrol now <ArrowRight className="w-4 h-4" /></Link>
                <Link href="#curriculum" className="btn btn-lg border border-white/25 text-white hover:bg-white/10"><PlayCircle className="w-4 h-4" /> Preview curriculum</Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div><div className="font-display text-xl font-semibold">{c.rating?.toFixed(1)}</div><div className="text-[12px] text-white/60">Avg. rating</div></div>
                <div><div className="font-display text-xl font-semibold tabular-nums">{c.studentCount?.toLocaleString()}</div><div className="text-[12px] text-white/60">Students</div></div>
                <div><div className="font-display text-xl font-semibold">{c.totalLessons}</div><div className="text-[12px] text-white/60">Lessons</div></div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/30 border border-white/10">
                <Image src={c.cover} alt={c.title} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" priority />
                <button className="absolute inset-0 flex items-center justify-center group" aria-label="Preview">
                  <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-105 transition"><PlayCircle className="w-8 h-8 text-[color:var(--ink)]" /></span>
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 flex-wrap">
                  <span className="chip bg-white/95"><Clock className="w-3.5 h-3.5" />{c.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <Section pad="md">
        <SectionHeader eyebrow="What you'll be able to do" title="Concrete outcomes, not a topic list." />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {c.outcomes.map((o, i) => (
            <div key={o} className="card p-6 md:p-7">
              <div className="text-[13px] muted">Outcome {String(i + 1).padStart(2, "0")}</div>
              <p className="mt-3 text-[17px] font-medium leading-snug">{o}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Curriculum */}
      <Section tone="canvas" pad="md" id="curriculum">
        <SectionHeader eyebrow="Curriculum" title={`${c.modules.length} modules · ${c.totalLessons} lessons`} lede="Every lesson exists because it changes what you can do next." />
        <Curriculum modules={c.modules} />
      </Section>

      {/* Includes / who-for */}
      <Section pad="md">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="eyebrow mb-3">What's included</div>
            <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight leading-tight">Everything you need to finish.</h2>
            <ul className="mt-6 space-y-3">
              {c.includes.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-accent-soft flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-[color:var(--accent-ink)]" /></span>
                  <span className="text-[15px] text-[color:var(--charcoal)] leading-relaxed">{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-3">Who this is for</div>
            <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight leading-tight">Built for working professionals.</h2>
            <ul className="mt-6 space-y-3">
              {c.whoFor.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[color:var(--ink)] mt-1 shrink-0" />
                  <span className="text-[15px] text-[color:var(--charcoal)] leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
            {c.requirements && (
              <>
                <div className="eyebrow mt-8 mb-3">Requirements</div>
                <ul className="space-y-2 text-[14px] text-[color:var(--charcoal)]">
                  {c.requirements.map((r) => <li key={r}>• {r}</li>)}
                </ul>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* Instructor */}
      <Section tone="paper" pad="md">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <div className="relative aspect-square max-w-[320px] rounded-3xl overflow-hidden bg-canvas border border-line">
              <Image src={siteConfig.instructor.portrait} alt={c.instructor} fill sizes="320px" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="eyebrow">Your instructor</div>
            <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight mt-3">{c.instructor}</h2>
            <p className="text-[15px] muted mt-1">{siteConfig.instructor.role}</p>
            <p className="prose-lede mt-5 max-w-xl">{siteConfig.instructor.shortBio}</p>
            <div className="mt-6 flex items-center gap-6 flex-wrap text-[13px]">
              <span className="flex items-center gap-2"><Users className="w-4 h-4" />{siteConfig.instructor.metric}</span>
              <span className="flex items-center gap-2"><Award className="w-4 h-4" />Certificate on completion</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4" />4.9 avg. rating</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <Section pad="md">
          <SectionHeader eyebrow="Student stories" title="Loved by senior professionals." />
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">{reviews.map((r) => <TestimonialCard key={r.id} t={r} />)}</div>
        </Section>
      )}

      {/* Pricing */}
      <Section tone="canvas" pad="md" id="enrol">
        <SectionHeader eyebrow="Enrol" title="Pick how you'd like to learn." align="center" />
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PricingCard name="Course only" price={c.price} interval="one-time" tagline="Lifetime access. One learner." features={["All modules", "Certificate on completion", "Lifetime updates"]} cta="Enrol now" href="/checkout" />
          {c.format !== "self-paced" && (
            <PricingCard name="Course + live cohort" price={Math.round(c.price * 1.4)} interval="one-time" tagline="Join the next live cohort." features={["Everything in course only", "Weekly live sessions", "Small-group case work", "Priority Q&A"]} cta="Join the cohort" href="/checkout" featured />
          )}
          <PricingCard name="Team of 5" price={Math.round(c.price * 3.5)} interval="one-time" tagline="For small studios and teams." features={["5 seats", "Team dashboard", "Group kickoff call"]} cta="Enquire for teams" href="/contact" />
        </div>
      </Section>

      {/* FAQ */}
      <Section pad="md">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5"><SectionHeader eyebrow="FAQ" title="Course questions, answered." /><Link href="/faq" className="btn btn-outline">Full FAQ</Link></div>
          <div className="lg:col-span-7"><FaqAccordion items={faqs.slice(0, 6)} /></div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="canvas" pad="md">
          <SectionHeader eyebrow="Keep learning" title="Related courses." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">{related.map((r) => <CourseCard key={r.id} course={r} />)}</div>
        </Section>
      )}

      <Section pad="sm">
        <CtaSection eyebrow="One good decision" title="Enrol today. Start tonight." description={`Lifetime access. ${siteConfig.commerce.trust[0]}. ${siteConfig.commerce.trust[2]}.`} primary={{ label: "Enrol now", href: "/checkout" }} secondary={{ label: "Ask a question first", href: "/contact" }} />
      </Section>
    </>
  );
}
