import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { CourseCard } from "@/components/ui/course-card";
import { courses, flagshipCourse } from "@/mock/products";
import { formatLabel } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { CheckCircle2, Mail, Award, ArrowRight, Users } from "lucide-react";

export const metadata: Metadata = { title: "You're enrolled" };

export default function ThankYouPage() {
  const c = flagshipCourse();
  const more = courses.filter((x) => x.id !== c.id).slice(0, 3);
  return (
    <>
      <section className="bg-canvas border-b border-line">
        <div className="container-x py-16 md:py-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 chip chip-accent"><CheckCircle2 className="w-4 h-4" /> Enrolment confirmed</div>
          <h1 className="font-display text-5xl md:text-6xl font-normal tracking-tight leading-[1.02] mt-6">You&apos;re in. Welcome to the academy.</h1>
          <p className="prose-lede mt-5 max-w-xl">Your enrolment is confirmed and your dashboard is ready. Everything below is also on its way to your inbox.</p>
        </div>
      </section>

      <Section pad="md">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="card p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-canvas border border-line shrink-0"><Image src={c.cover} alt="" fill sizes="80px" className="object-cover" /></div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] muted">Access · Ready</div>
                  <div className="font-display text-2xl font-normal mt-1">{c.title}</div>
                  <p className="text-[14px] muted mt-2">{formatLabel(c.format)} · {c.duration}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/courses/${c.slug}`} className="btn btn-accent">Open the course <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Step icon={Mail} title="Check your inbox" body="A receipt and dashboard link were emailed. If not there in 2 minutes, check spam." />
              <Step icon={Users} title="Meet the cohort" body="Introduce yourself in the private community — you'll find a channel invite in your email." href="#" cta="Open community" />
              <Step icon={Award} title="Save your certificate for later" body="You'll unlock a signed certificate when you finish the last module." />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="p-6 md:p-8 rounded-3xl border border-line bg-canvas">
              <div className="eyebrow mb-3">Enrolment summary</div>
              <div className="text-[13px] muted">Order · <span className="text-[color:var(--ink)] font-medium">#LA-{Math.floor(Math.random() * 900000 + 100000)}</span></div>
              <div className="mt-4 pt-4 border-t border-line space-y-2 text-[14px]">
                <Row label="Course" value={c.title} />
                <Row label="Format" value={formatLabel(c.format)} />
                <Row label="Method" value="Card · **** 4242" />
                <Row label="Total" value="Paid in full" bold />
              </div>
              <div className="mt-5 text-[12.5px] muted">Need help? Email {siteConfig.brand.email}.</div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="canvas" pad="md">
        <div className="mb-10"><div className="eyebrow">Keep learning</div><h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight mt-3">More courses you might like.</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">{more.map((m) => <CourseCard key={m.id} course={m} />)}</div>
      </Section>
    </>
  );
}

function Step({ icon: Icon, title, body, href, cta }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string; href?: string; cta?: string }) {
  return (
    <div className="card p-6">
      <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-[color:var(--accent-ink)]"><Icon className="w-4 h-4" /></div>
      <div className="font-display text-lg font-semibold mt-4">{title}</div>
      <p className="text-[14px] text-[color:var(--charcoal)] leading-relaxed mt-1">{body}</p>
      {href && cta && <Link href={href} className="btn btn-outline btn-sm mt-4">{cta}</Link>}
    </div>
  );
}
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return <div className="flex items-start justify-between gap-4"><span className="muted">{label}</span><span className={`text-right ${bold ? "font-medium" : ""}`}>{value}</span></div>;
}
