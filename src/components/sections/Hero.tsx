import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, ShoppingBasket, User } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { Logo } from "@/components/Logo";
import { CartIconLink } from "@/components/cart/CartIconLink";
import { HeroQuantity } from "@/components/sections/HeroQuantity";
import { brand } from "@/lib/brand";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const mainImage = "/products/wig-01.png";
const thumbImages = [
  "/products/wig-02.png",
  "/products/wig-05.png",
  "/products/wig-08.png",
];

function HeroBackdropPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12]"
      aria-hidden
    >
      <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -right-1/4 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <svg
        className="absolute -left-[10%] top-0 h-full w-[120%] text-white"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120C200 80 400 160 600 120C800 80 1000 140 1200 100V400H0V120Z"
          fill="currentColor"
        />
        <path
          d="M0 200C180 240 380 160 600 200C820 240 1020 180 1200 220V400H0V200Z"
          fill="currentColor"
          opacity="0.55"
        />
        <path
          d="M0 280C250 320 450 240 600 260C750 280 950 240 1200 300V400H0V280Z"
          fill="currentColor"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-matte via-matte to-charcoal pb-12 pt-6 md:pb-16 md:pt-8"
      aria-labelledby="hero-heading"
    >
      <HeroBackdropPattern />

      <div className="relative z-[1] mx-auto max-w-6xl px-3 sm:px-4">
        <div className="rounded-2xl border border-white/10 bg-white p-4 shadow-2xl shadow-matte/20 sm:rounded-[2rem] sm:p-6 md:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-4 border-b border-neutral-200/90 pb-5 sm:mb-8 sm:gap-5 sm:pb-6 md:mb-10 md:flex-row md:items-center md:justify-between md:gap-4">
            <Link
              href="/"
              className="shrink-0"
              aria-label={`${brand.siteName} home`}
            >
              <Logo
                variant="dark"
                layout="inline"
                className="scale-95 md:scale-100"
              />
            </Link>

            <nav
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-neutral-600 md:gap-6 lg:gap-8"
              aria-label="Primary"
            >
              <Link href="/#hero" className="transition hover:text-matte">
                Home
              </Link>
              <span className="relative inline-flex flex-col items-center pt-2">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  New
                </span>
                <Link href="/#products" className="transition hover:text-matte">
                  Wigs &amp; hair
                </Link>
              </span>
              <Link href="/#contact" className="transition hover:text-matte">
                Contact
              </Link>
            </nav>

            <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3 md:max-w-none md:justify-end">
              <label className="sr-only" htmlFor="hero-search">
                Search hair products
              </label>
              <div className="flex min-w-0 max-w-full flex-1 basis-[200px] items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 sm:max-w-[240px] sm:flex-initial md:max-w-[200px]">
                <Search className="size-4 shrink-0 text-neutral-400" aria-hidden />
                <input
                  id="hero-search"
                  type="search"
                  placeholder="Wigs, bundles, lace…"
                  className="min-w-0 flex-1 bg-transparent text-sm text-matte outline-none placeholder:text-neutral-400"
                />
              </div>
              <CartIconLink />
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
                aria-label="Account"
              >
                <User className="size-5" />
              </button>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <h1
                id="hero-heading"
                className={`${playfair.className} text-balance text-4xl font-semibold leading-[1.15] text-matte md:text-5xl lg:text-[2.75rem]`}
              >
                Your install deserves the SENSATIONAL standard
              </h1>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 md:text-sm">
                HD lace · raw bundles · nationwide — same energy as our TikTok
              </p>

              <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:max-w-none lg:justify-start">
                <HeroQuantity />
                <Link
                  href="/cart"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-accent/90 sm:min-h-[52px] sm:px-8"
                >
                  <ShoppingBasket className="size-5" aria-hidden />
                  Buy now
                </Link>
                <Link
                  href="/#contact"
                  className="text-sm font-semibold text-neutral-600 underline-offset-4 hover:text-matte hover:underline"
                >
                  Help with your order
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mx-auto flex max-w-[440px] flex-col items-center gap-6 sm:flex-row sm:items-center lg:max-w-none lg:justify-end">
                <div className="relative w-full max-w-[360px]">
                  <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-full shadow-lg ring-4 ring-accent/25">
                    <Image
                      src={mainImage}
                      alt="Premium human hair and lace styling"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 400px"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -left-2 top-[18%] z-10 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-matte shadow-md md:left-0">
                    Real hair, real density
                  </div>
                  <div className="absolute -right-2 bottom-[22%] z-10 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-md md:right-0">
                    We ship Ghana-wide
                  </div>
                </div>

                <div className="flex flex-row gap-3 sm:flex-col sm:gap-3">
                  {thumbImages.map((src) => (
                    <div
                      key={src}
                      className="relative size-14 overflow-hidden rounded-full border-2 border-white shadow-md ring-2 ring-accent/20 sm:size-16"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center sm:text-right lg:pr-4">
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition hover:gap-3 hover:text-matte"
                >
                  Shop wigs
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
