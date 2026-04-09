import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/catalog";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatGhs } from "@/lib/format-money";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section
      id="products"
      className="scroll-mt-28 border-t border-charcoal/10 bg-surface py-16 md:py-24"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 max-w-2xl">
          <h2
            id="products-heading"
            className="text-3xl font-bold tracking-tight text-matte md:text-4xl"
          >
            The units everyone&apos;s adding to cart
          </h2>
          <p className="mt-3 text-muted">
            Hand-picked lace, bundles &amp; care — checkout here, we confirm your
            total before you pay. No stress, just hair.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-background shadow-md transition hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] bg-charcoal/5">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-matte">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{p.benefit}</p>
                {typeof p.priceGhs === "number" ? (
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-matte/70">
                    {formatGhs(p.priceGhs)}
                  </p>
                ) : p.priceLabel ? (
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-matte/70">
                    {p.priceLabel}
                  </p>
                ) : null}
                <AddToCartButton product={p} className="mt-4" />
                <Link
                  href="/#contact"
                  className="mt-2 text-center text-xs font-medium text-muted underline-offset-2 hover:text-matte hover:underline"
                >
                  Need help choosing?
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
