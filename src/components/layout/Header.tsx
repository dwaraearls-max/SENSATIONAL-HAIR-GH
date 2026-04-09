"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { brand } from "@/lib/brand";
import { CartIconLink } from "@/components/cart/CartIconLink";
import { getPhoneTel } from "@/lib/site";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/#hero", label: "Home" },
  { href: "/#products", label: "Wigs & hair" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const tel = getPhoneTel();

  return (
    <header
      className={cn(
        "border-b border-white/10 bg-matte/95 text-white backdrop-blur-md transition-shadow",
        scrolled && "shadow-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="min-w-0 shrink" aria-label={`${brand.siteName} home`}>
          <Logo variant="light" />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center sm:hidden">
            <CartIconLink light className="min-h-11 min-w-11" />
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <CartIconLink light />
            <a
              href={`tel:${tel}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden />
              Call Now
            </a>
            <Link
              href="/cart"
              className="inline-flex min-h-11 items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-matte transition hover:bg-white/90"
            >
              Cart &amp; checkout
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-[80] flex flex-col bg-matte lg:hidden",
          open ? "flex" : "hidden",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <span className="text-base font-semibold text-white">Menu</span>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>
        <nav
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4"
          aria-label="Mobile primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${tel}`}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 py-3 font-semibold"
            onClick={() => setOpen(false)}
          >
            <Phone className="size-4" />
            Call Now
          </a>
          <Link
            href="/cart"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white py-3 font-semibold text-matte"
            onClick={() => setOpen(false)}
          >
            Cart &amp; checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
