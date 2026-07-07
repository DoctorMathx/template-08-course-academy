"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { flagshipCourse } from "@/mock/products";
import { siteConfig } from "@/lib/site-config";
import { formatLabel, formatPrice } from "@/lib/utils";
import { ArrowLeft, ShieldCheck, Zap, Tag, Award } from "lucide-react";

export function CheckoutClient() {
  const router = useRouter();
  const course = flagshipCourse();
  const [addCohort, setAddCohort] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const cohortAdd = 80000;
  const subtotal = useMemo(() => course.price + (addCohort ? cohortAdd : 0), [addCohort, course.price]);
  const discount = applied === "ACADEMY10" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); setTimeout(() => router.push("/thank-you"), 700); };

  return (
    <div className="bg-canvas min-h-screen">
      <div className="container-x py-10 md:py-14">
        <Link href="/courses" className="inline-flex items-center gap-2 text-[13.5px] muted hover:text-[color:var(--ink)]"><ArrowLeft className="w-4 h-4" /> Continue browsing</Link>

        <div className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <form onSubmit={submit} className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
              <h1 className="font-display text-3xl md:text-[34px] font-normal tracking-tight">Your details</h1>
              <p className="text-[14px] muted mt-1">We&apos;ll email your dashboard access to this address.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field id="name" label="Full name" required />
                <Field id="email" label="Email" type="email" required />
                <Field id="phone" label="Phone (optional)" />
                <div><label className="label" htmlFor="country">Country</label><select id="country" className="input mt-1.5">{["Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "United States", "Other"].map((c) => <option key={c}>{c}</option>)}</select></div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
              <h2 className="font-display text-xl font-semibold">Payment</h2>
              <p className="text-[14px] muted mt-1">Secure checkout powered by FinStore.</p>
              <div className="mt-5 grid sm:grid-cols-3 gap-2">
                {["Card", "Bank transfer", "USSD"].map((m, i) => (
                  <label key={m} className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${i === 0 ? "border-[color:var(--ink)] bg-paper" : "border-line hover:border-[color:var(--ink)]"}`}>
                    <input type="radio" name="method" defaultChecked={i === 0} className="accent-black" />
                    <span className="text-[14px] font-medium">{m}</span>
                  </label>
                ))}
              </div>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <Field id="card" label="Card number" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-4"><Field id="exp" label="Expiry" placeholder="MM / YY" /><Field id="cvc" label="CVC" placeholder="123" /></div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
              <label htmlFor="agree" className="text-[13.5px] muted leading-relaxed"><input id="agree" type="checkbox" required defaultChecked className="accent-black mr-2" />I agree to the <Link href="/faq" className="underline underline-offset-4 text-[color:var(--ink)]">refund policy</Link> and understand access is granted immediately.</label>
              <button disabled={submitting} className="btn btn-accent btn-lg w-full mt-6">{submitting ? "Processing…" : `Enrol for ${formatPrice(total)}`}</button>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {siteConfig.commerce.trust.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-[12.5px] muted"><ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0" /><span>{t}</span></div>
                ))}
              </div>
            </div>
          </form>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="p-6 md:p-8 rounded-3xl border border-line bg-white">
                <h2 className="font-display text-lg font-semibold">Enrolment summary</h2>
                <div className="mt-5 flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-canvas border border-line shrink-0"><Image src={course.cover} alt="" fill sizes="80px" className="object-cover" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium leading-snug">{course.title}</div>
                    <div className="text-[12px] muted mt-0.5">{formatLabel(course.format)} · {course.duration}</div>
                  </div>
                  <div className="text-[14px] font-medium tabular-nums">{formatPrice(course.price)}</div>
                </div>

                {course.format !== "self-paced" && (
                  <label className="mt-5 flex items-start gap-3 p-4 rounded-2xl border border-dashed border-line cursor-pointer hover:border-[color:var(--ink)]">
                    <input type="checkbox" checked={addCohort} onChange={(e) => setAddCohort(e.target.checked)} className="mt-1 accent-black" />
                    <div className="flex-1">
                      <div className="text-[13px] font-medium">Add live cohort access</div>
                      <div className="text-[12.5px] muted mt-0.5">Weekly live sessions + small-group case work · +{formatPrice(cohortAdd)}</div>
                    </div>
                  </label>
                )}

                <div className="mt-5 pt-5 border-t border-line space-y-2 text-[14px]">
                  <Row label="Subtotal" value={formatPrice(subtotal)} />
                  {discount > 0 && <Row label="Discount (ACADEMY10)" value={`− ${formatPrice(discount)}`} accent />}
                  <Row label="Total" value={formatPrice(total)} bold />
                </div>

                <div className="mt-5 flex gap-2">
                  <div className="relative flex-1"><Tag className="w-3.5 h-3.5 muted absolute left-3 top-1/2 -translate-y-1/2" /><input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="input py-2 pl-8 text-[13px]" /></div>
                  <button type="button" onClick={() => setApplied(coupon.trim().toUpperCase() || null)} className="btn btn-outline btn-sm">Apply</button>
                </div>
                {applied && applied !== "ACADEMY10" && <p className="mt-2 text-[12.5px] muted">Try <span className="font-medium text-[color:var(--ink)]">ACADEMY10</span> for a 10% preview discount.</p>}
              </div>

              <div className="p-5 rounded-3xl bg-white border border-line flex items-start gap-3"><Zap className="w-4 h-4 mt-1" /><div><div className="text-[14px] font-medium">Instant access</div><div className="text-[12.5px] muted mt-0.5">Your dashboard opens in your inbox within a minute.</div></div></div>
              <div className="p-5 rounded-3xl bg-white border border-line flex items-start gap-3"><Award className="w-4 h-4 mt-1" /><div><div className="text-[14px] font-medium">Certificate on completion</div><div className="text-[12.5px] muted mt-0.5">A signed PDF and a LinkedIn-ready share link.</div></div></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, type = "text", placeholder, required }: { id: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return <div><label className="label" htmlFor={id}>{label}</label><input id={id} type={type} required={required} placeholder={placeholder} className="input mt-1.5" /></div>;
}
function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return <div className="flex items-center justify-between"><span className={bold ? "font-medium" : "muted"}>{label}</span><span className={`${bold ? "font-display text-lg font-semibold" : ""} tabular-nums ${accent ? "text-[color:var(--accent)]" : ""}`}>{value}</span></div>;
}
