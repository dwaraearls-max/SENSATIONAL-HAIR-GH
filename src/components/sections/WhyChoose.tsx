import {
  BadgeCheck,
  Banknote,
  Heart,
  Lock,
  MapPin,
  Truck,
} from "lucide-react";
import { brand } from "@/lib/brand";

const items = [
  {
    icon: BadgeCheck,
    title: "Hair that holds up to the hype",
    body: "We stand behind texture and grade — ask us anything before you pay, same as in the DMs.",
  },
  {
    icon: Banknote,
    title: "Prices that make sense",
    body: "Fair on lace, bundles & installs — message us for today’s bundle or TikTok mention.",
  },
  {
    icon: Truck,
    title: "Ghana-wide, packed with care",
    body: "Accra, Kumasi, Tema, Takoradi & beyond — your order leaves like it’s ours.",
  },
  {
    icon: Heart,
    title: "We help you choose right",
    body: "Length, density, lace size — tell us the look and we’ll match the stock.",
  },
  {
    icon: Lock,
    title: "Checkout on-site",
    body: "Clear totals, clear payment options — receipts you can trust.",
  },
  {
    icon: MapPin,
    title: "After you buy",
    body: "Care tips and policy for your order — we want your install to last.",
  },
];

export function WhyChoose() {
  return (
    <section
      id="why"
      className="relative isolate scroll-mt-28 border-t border-charcoal/10 bg-matte py-14 text-white sm:py-16 md:py-24"
      aria-labelledby="why-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-40 top-16 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Verified vibes. Real installs.
            </p>
            <h2
              id="why-heading"
              className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
            >
              Why {brand.siteName} hits different
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">
              Built for girls who want their hair to eat in real life — not just on
              the feed. Premium stock, straight talk, Ghana-wide delivery.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Quality check
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Texture + lace inspected before it leaves.
                </p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Fast support
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Ask for lengths, density, lace size — we reply quick.
                </p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Ghana-wide
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Packed with care, delivered like it’s ours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul
          className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          role="list"
        >
          {items.map(({ icon: Icon, title, body }) => (
            <li key={title} className="group relative">
              <div
                className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/35 via-white/10 to-transparent opacity-0 blur transition duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative h-full rounded-3xl border border-white/12 bg-white/[0.06] p-5 shadow-[0_1px_0_rgba(255,255,255,0.06)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/[0.10] sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-3">
                    <Icon className="size-6 text-white" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
                  </div>
                </div>
                <div
                  className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  aria-hidden
                />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Soft glam, no guesswork
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
