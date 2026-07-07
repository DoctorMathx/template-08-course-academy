"use client";
import { useState } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";

export function Curriculum({ modules }: { modules: { title: string; duration?: string; lessons: { title: string; duration?: string; preview?: boolean }[] }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="rounded-3xl border border-line bg-white overflow-hidden">
      {modules.map((m, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={i > 0 ? "border-t border-line" : ""}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between py-5 px-5 md:px-7 gap-5 hover:bg-canvas transition-colors">
              <div className="flex items-center gap-4 text-left min-w-0">
                <span className="w-9 h-9 rounded-full bg-accent-soft text-[color:var(--accent-ink)] flex items-center justify-center text-[13px] font-semibold tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg md:text-xl font-medium tracking-tight truncate">{m.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-[12px] muted">{m.lessons.length} lessons{m.duration ? ` · ${m.duration}` : ""}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>
            {isOpen && (
              <ul className="pb-5 px-5 md:px-16 space-y-2 fade-up">
                {m.lessons.map((l) => (
                  <li key={l.title} className="flex items-center justify-between gap-3 py-2 text-[14.5px] text-[color:var(--charcoal)]">
                    <span className="flex items-center gap-3 min-w-0"><PlayCircle className="w-4 h-4 muted shrink-0" /><span className="truncate">{l.title}</span></span>
                    <span className="flex items-center gap-2 shrink-0">
                      {l.preview && <span className="chip chip-accent text-[10px] px-2 py-0.5">Preview</span>}
                      {l.duration && <span className="text-[12px] muted tabular-nums">{l.duration}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
