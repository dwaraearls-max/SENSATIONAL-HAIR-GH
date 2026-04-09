import Image from "next/image";
import Link from "next/link";
import { getDealProducts } from "@/lib/catalog";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatGhs } from "@/lib/format-money";

export function HotDeals() {
  const deals = getDealProducts();

  return (
    <section
      id="deals"
      className="scroll-mt-28 border-y border-charcoal/10 bg-charcoal py-16 text-white md:py-20"
      aria-labelledby="deals-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Don&apos;t sleep on these
            </p>
            <h2 id="deals-heading" className="mt-2 text-3xl font-bold md:text-4xl">
              Deals that won&apos;t wait
            </h2>
            <p className="mt-3 text-white/75">
              When these units move, they move — add to cart &amp; lock yours in
              before stock clears.
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-matte transition hover:bg-white/90 lg:self-auto"
          >
            View cart
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-square bg-black/20">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-1 text-xs text-white/65">
                  {typeof p.priceGhs === "number"
                    ? formatGhs(p.priceGhs)
                    : p.priceLabel ?? ""}
                </p>
                <div className="mt-3">
                  <AddToCartButton product={p} variant="light" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
