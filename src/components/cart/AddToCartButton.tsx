"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/catalog";
import { cn } from "@/lib/cn";

export function AddToCartButton({
  product,
  className,
  variant = "primary",
}: {
  product: Product;
  className?: string;
  variant?: "primary" | "outline" | "light";
}) {
  const { addFromProduct } = useCart();
  const [added, setAdded] = useState(false);

  const base =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent/90"
      : variant === "light"
        ? "border border-white/25 bg-white/10 text-white hover:bg-white/20"
        : "border border-charcoal/15 bg-surface text-matte hover:border-charcoal/40";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition sm:min-h-10 sm:py-2",
        base,
        className,
      )}
      onClick={() => {
        addFromProduct(product, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
    >
      <ShoppingCart className="size-4 shrink-0" aria-hidden />
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
