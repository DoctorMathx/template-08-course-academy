"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";
import { navItems } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";
import type { NavItem } from "@/lib/types";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-white/90 backdrop-blur transition-colors ${scrolled ? "border-b border-line" : "border-b border-transparent"}`}>
      <div className="container-x flex items-center justify-between h-16">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[color:var(--ink)] flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="font-display font-semibold text-[19px] tracking-tight">{siteConfig.brand.name}</span>
          </Link>
          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} open={open === item.label} onOpen={setOpen} onClose={() => setOpen(null)} />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/courses" className="hidden sm:inline-flex btn btn-outline btn-sm">Courses</Link>
          <Link href="/checkout" className="hidden sm:inline-flex btn btn-accent btn-sm">Start learning</Link>
          <button onClick={() => setMobileOpen(true)} aria-label="Menu" className="lg:hidden p-2 -mr-2"><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[86%] max-w-[360px] bg-white flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <span className="font-display font-semibold text-lg">{siteConfig.brand.name}</span>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {navItems.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
              ))}
            </nav>
            <div className="p-5 border-t border-line space-y-2">
              <Link href="/courses" className="btn btn-outline w-full" onClick={() => setMobileOpen(false)}>All courses</Link>
              <Link href="/checkout" className="btn btn-accent w-full" onClick={() => setMobileOpen(false)}>Start learning</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopNavItem({ item, open, onOpen, onClose }: { item: NavItem; open: boolean; onOpen: (l: string) => void; onClose: () => void }) {
  if (!item.children) return <Link href={item.href ?? "#"} className="px-3 py-2 text-[14px] muted hover:text-[color:var(--ink)] transition-colors">{item.label}</Link>;
  return (
    <div className="relative" onMouseEnter={() => onOpen(item.label)} onMouseLeave={onClose}>
      <button className="flex items-center gap-1 px-3 py-2 text-[14px] muted hover:text-[color:var(--ink)] transition-colors">
        {item.label}<ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2">
          <div className="bg-white border border-line rounded-2xl shadow-[0_20px_50px_-20px_rgba(15,26,22,.18)] p-2 min-w-[300px]">
            {item.children.map((c) => (
              <Link key={c.label} href={c.href} onClick={onClose} className="block px-3 py-2.5 rounded-xl hover:bg-paper">
                <div className="text-sm font-medium">{c.label}</div>
                {c.description && <div className="text-xs muted mt-0.5">{c.description}</div>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [ex, setEx] = useState(false);
  if (!item.children) return <Link href={item.href ?? "#"} onClick={onClose} className="block px-3 py-3 text-[15px] font-medium rounded-lg hover:bg-paper">{item.label}</Link>;
  return (
    <div>
      <button onClick={() => setEx(!ex)} className="w-full flex items-center justify-between px-3 py-3 text-[15px] font-medium rounded-lg hover:bg-paper">
        {item.label}<ChevronDown className={`w-4 h-4 transition-transform ${ex ? "rotate-180" : ""}`} />
      </button>
      {ex && <div className="pl-3 pb-1">{item.children.map((c) => (<Link key={c.label} href={c.href} onClick={onClose} className="block px-3 py-2 text-[14px] muted hover:text-[color:var(--ink)]">{c.label}</Link>))}</div>}
    </div>
  );
}
