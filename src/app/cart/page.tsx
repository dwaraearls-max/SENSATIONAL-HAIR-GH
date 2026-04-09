"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { formatGhs } from "@/lib/format-money";

export default function CartPage() {
  const { items, subtotalGhs, setQty, remove } = useCart();

  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] border-t border-charcoal/10 bg-background py-12">
        <div className="mx-auto max-w-3xl px-3 sm:px-4">
          <h1 className="text-balance text-2xl font-bold text-matte sm:text-3xl">
            Your cart
          </h1>
          <p className="mt-2 text-muted">
            Review items and proceed to checkout. Orders are confirmed on this
            website — no WhatsApp required.
          </p>

          {items.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-charcoal/10 bg-surface p-10 text-center">
              <p className="text-muted">Your cart is empty.</p>
              <Link
                href="/#products"
                className="mt-4 inline-block font-semibold text-matte underline"
              >
                Shop wigs &amp; hair
              </Link>
            </div>
          ) : (
            <ul className="mt-8 space-y-4" role="list">
              {items.map((line) => (
                <li
                  key={line.productId}
                  className="flex flex-col gap-3 rounded-2xl border border-charcoal/10 bg-surface p-3 shadow-sm sm:flex-row sm:gap-4 sm:p-4"
                >
                  <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      <Image
                        src={line.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-snug text-matte">
                        {line.name}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {formatGhs(line.priceGhs)} each
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <label className="sr-only" htmlFor={`qty-${line.productId}`}>
                          Quantity for {line.name}
                        </label>
                        <input
                          id={`qty-${line.productId}`}
                          type="number"
                          min={1}
                          max={99}
                          value={line.qty}
                          onChange={(e) => {
                            const n = parseInt(e.target.value, 10);
                            if (!Number.isNaN(n)) setQty(line.productId, n);
                          }}
                          className="min-h-10 w-16 rounded-lg border border-charcoal/15 px-2 py-1 text-sm"
                        />
                        <button
                          type="button"
                          className="inline-flex min-h-10 items-center gap-1 text-sm text-red-700 hover:underline"
                          onClick={() => remove(line.productId)}
                        >
                          <Trash2 className="size-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-charcoal/10 pt-3 sm:hidden">
                    <span className="text-sm text-muted">Line total</span>
                    <p className="text-lg font-semibold tabular-nums text-matte">
                      {formatGhs(line.priceGhs * line.qty)}
                    </p>
                  </div>
                  <p className="hidden shrink-0 self-start pt-0.5 text-right text-base font-semibold tabular-nums text-matte sm:block">
                    {formatGhs(line.priceGhs * line.qty)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 ? (
            <div className="mt-8 flex flex-col gap-4 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg">
                <span className="text-muted">Subtotal </span>
                <span className="font-bold tabular-nums text-matte">
                  {formatGhs(subtotalGhs)}
                </span>
              </p>
              <Link
                href="/checkout"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-matte px-8 py-3 font-semibold text-white transition hover:bg-charcoal sm:w-auto"
              >
                Proceed to checkout
              </Link>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
