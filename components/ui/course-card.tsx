import Image from "next/image";
import Link from "next/link";
import { Clock, PlayCircle, Star } from "lucide-react";
import type { Course } from "@/lib/types";
import { cn, formatLabel, formatPrice, levelLabel } from "@/lib/utils";

export function CourseCard({ course, variant = "default" }: { course: Course; variant?: "default" | "wide" }) {
  const href = `/courses/${course.slug}`;
  if (variant === "wide") {
    return (
      <Link href={href} className="card group grid sm:grid-cols-5 overflow-hidden">
        <div className="relative sm:col-span-2 aspect-[16/10] sm:aspect-auto bg-canvas overflow-hidden">
          <Image src={course.cover} alt={course.title} fill sizes="(max-width:640px) 100vw, 40vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="sm:col-span-3 p-6 flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="chip chip-accent">{formatLabel(course.format)}</span>
            <span className="chip">{levelLabel(course.level)}</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight mt-4 leading-snug">{course.title}</h3>
          <p className="text-[14px] muted mt-2 line-clamp-2">{course.shortDescription}</p>
          <div className="mt-auto pt-4 flex items-end justify-between">
            <div>
              <div className="text-[15px] font-semibold tabular-nums">{formatPrice(course.price)}</div>
              {course.rating && (
                <div className="flex items-center gap-1 text-[12px] muted mt-1">
                  <Star className="w-3 h-3 fill-current text-[color:var(--warn)]" />
                  {course.rating.toFixed(1)} · {course.studentCount?.toLocaleString()} students
                </div>
              )}
            </div>
            <span className="text-[13px] font-medium text-[color:var(--accent)] group-hover:underline">View course →</span>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={href} className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-canvas overflow-hidden">
        <Image src={course.cover} alt={course.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        {course.badge && (
          <span className={cn("absolute top-3 left-3 badge", `badge-${course.badge === "bestseller" ? "best" : course.badge}`)}>
            {course.badge === "bestseller" ? "Bestseller" : course.badge === "live" ? "Live cohort" : "New"}
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="chip bg-white/95 backdrop-blur">{formatLabel(course.format)}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-[12px] muted flex items-center gap-2">
          <PlayCircle className="w-3.5 h-3.5" /> {course.totalLessons} lessons
          <span className="w-1 h-1 rounded-full bg-[color:var(--slate)]" />
          <Clock className="w-3.5 h-3.5" /> {course.duration}
        </div>
        <h3 className="font-display text-[19px] font-semibold leading-snug mt-3">{course.title}</h3>
        <p className="text-[13.5px] text-[color:var(--charcoal)] mt-2 line-clamp-2 leading-relaxed">{course.shortDescription}</p>
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-line">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[16px] font-semibold tabular-nums">{formatPrice(course.price)}</span>
              {course.compareAtPrice && <span className="text-[12px] muted line-through tabular-nums">{formatPrice(course.compareAtPrice)}</span>}
            </div>
            {course.rating && (
              <div className="flex items-center gap-1 text-[12px] muted mt-0.5">
                <Star className="w-3 h-3 fill-current text-[color:var(--warn)]" />
                {course.rating.toFixed(1)} · {course.studentCount?.toLocaleString()}
              </div>
            )}
          </div>
          <span className="text-[13px] font-medium text-[color:var(--accent)]">View →</span>
        </div>
      </div>
    </Link>
  );
}
