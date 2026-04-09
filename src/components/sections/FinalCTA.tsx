import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="scroll-mt-28 bg-charcoal py-20 text-white md:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2
          id="cta-heading"
          className="text-balance text-3xl font-bold tracking-tight md:text-4xl"
        >
          Bag the hair — we&apos;ll handle the rest
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Your cart is your yes. Checkout here, we confirm everything before you
          pay — lace, bundles &amp; nationwide delivery across Ghana.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/cart"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            View cart &amp; checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
