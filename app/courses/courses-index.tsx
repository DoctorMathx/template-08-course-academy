"use client";
import { useMemo, useState } from "react";
import { CourseCard } from "@/components/ui/course-card";
import { courses } from "@/mock/products";
import type { CourseCategory, CourseFormat } from "@/lib/types";

const CATS: { id: CourseCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "business", label: "Business" },
  { id: "product", label: "Product" },
  { id: "design", label: "Design" },
  { id: "writing", label: "Writing" },
  { id: "engineering", label: "Engineering" },
  { id: "leadership", label: "Leadership" },
];

const FORMATS: { id: CourseFormat | "all"; label: string }[] = [
  { id: "all", label: "Any format" },
  { id: "self-paced", label: "Self-paced" },
  { id: "live-cohort", label: "Live cohort" },
  { id: "hybrid", label: "Hybrid" },
];

export function CoursesIndex() {
  const [cat, setCat] = useState<CourseCategory | "all">("all");
  const [format, setFormat] = useState<CourseFormat | "all">("all");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let l = [...courses];
    if (cat !== "all") l = l.filter((c) => c.category === cat);
    if (format !== "all") l = l.filter((c) => c.format === format);
    if (sort === "popular") l.sort((a, b) => (b.studentCount ?? 0) - (a.studentCount ?? 0));
    else if (sort === "newest") l.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
    else if (sort === "price-asc") l.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") l.sort((a, b) => b.price - a.price);
    else l.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return l;
  }, [cat, format, sort]);

  return (
    <>
      <section className="bg-paper border-b border-line">
        <div className="container-x py-16 md:py-20 max-w-4xl">
          <div className="eyebrow">The library</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight leading-[1.02] mt-4">
            All courses.
          </h1>
          <p className="prose-lede mt-5 max-w-2xl">
            A small, careful library of courses on business, product, design, writing, engineering
            and leadership. Every course is taught by a senior practitioner.
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur border-b border-line">
        <div className="container-x py-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-2 -mx-2 px-2 overflow-x-auto no-scrollbar">
            {CATS.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`chip whitespace-nowrap ${cat === c.id ? "chip-dark" : "hover:border-[color:var(--ink)]"}`}>{c.label}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select value={format} onChange={(e) => setFormat(e.target.value as CourseFormat | "all")} className="input py-2 text-[13.5px] w-40">
              {FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input py-2 text-[13.5px] w-44">
              <option value="featured">Featured</option>
              <option value="popular">Most students</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
            </select>
          </div>
        </div>
      </section>

      <div className="container-x pt-6"><span className="chip">{list.length} courses</span></div>

      <div className="container-x py-10 md:py-14">
        {list.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-line rounded-3xl">
            <p className="font-display text-2xl font-semibold">No courses match those filters.</p>
            <p className="muted mt-2 text-[14px]">Try a different category or format.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {list.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        )}
      </div>
    </>
  );
}
