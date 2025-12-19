"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { mainNav, business } from "@/lib/site";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-between rounded-full border border-white/50 bg-glass backdrop-blur-2xl shadow-glass transition">
          <Link href="/" className="flex items-center gap-3 px-4 py-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-1 shadow-card">
              <Image
                src="/assets/logo.png"
                alt="Boucherie Limare"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden leading-tight text-ink md:block">
              <p className="text-sm uppercase tracking-[0.18em] text-primary">Boucherie Limare</p>
              <p className="font-display text-lg font-semibold">Cormeilles</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition hover:bg-white/70 hover:text-ink focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 pr-3">
            <Button variant="secondary" size="sm" className="hidden md:inline-flex" asChild>
              <a href={`tel:${business.phone}`} className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </Button>
            <button
              aria-label="Ouvrir le menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-ink shadow-card transition hover:bg-white md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden px-4 pb-4 transition-all duration-200 md:hidden",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/90 shadow-card backdrop-blur">
          <nav className="flex flex-col divide-y divide-ink/5">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-5 py-4 text-sm font-semibold text-ink/80 transition hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 px-5 py-4 text-sm text-ink/80">
            <Phone className="h-4 w-4 text-primary" />
            <a href={`tel:${business.phone}`} className="font-semibold text-ink hover:text-primary">
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
