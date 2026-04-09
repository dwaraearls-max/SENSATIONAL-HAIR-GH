"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { formatGhs } from "@/lib/format-money";
import { cn } from "@/lib/cn";

const schema = z.object({
  fullName: z.string().min(2, "Enter your name"),
  phone: z.string().min(9, "Enter a valid phone"),
  email: z.union([z.literal(""), z.string().email("Invalid email")]),
  city: z.string().min(2, "Enter your city"),
  address: z.string().min(5, "Enter your delivery address"),
  paymentMethod: z.enum(["cash_on_delivery", "mobile_money", "bank_transfer"]),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalGhs, clear } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      city: "",
      address: "",
      paymentMethod: "cash_on_delivery",
      notes: "",
    },
  });

  if (items.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-[50vh] border-t border-charcoal/10 px-3 py-16 text-center sm:px-4">
          <p className="text-muted">Your cart is empty.</p>
          <Link href="/#products" className="mt-4 inline-block font-semibold text-matte underline">
            Shop wigs &amp; hair
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  async function onSubmit(data: CheckoutForm) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email || undefined,
          city: data.city,
          address: data.address,
          paymentMethod: data.paymentMethod,
          notes: data.notes,
        },
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          priceGhs: i.priceGhs,
          qty: i.qty,
        })),
      }),
    });
    if (!res.ok) {
      alert("Could not place order. Please try again or call us.");
      return;
    }
    clear();
    router.push("/checkout/success");
  }

  return (
    <>
      <SiteHeader />
      <main className="border-t border-charcoal/10 bg-background py-12">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-matte">Checkout</h1>
          <p className="mt-2 text-muted">
            Complete your details. We&apos;ll confirm your order by phone or SMS.
          </p>

          <div className="mt-8 rounded-2xl border border-charcoal/10 bg-surface p-4 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Order summary
            </h2>
            <ul className="mt-3 divide-y divide-charcoal/10 text-sm">
              {items.map((i) => (
                <li
                  key={i.productId}
                  className="flex justify-between gap-3 py-2.5 first:pt-0"
                >
                  <span className="min-w-0 break-words pr-2">
                    {i.name}{" "}
                    <span className="whitespace-nowrap text-muted">× {i.qty}</span>
                  </span>
                  <span className="shrink-0 font-medium tabular-nums">
                    {formatGhs(i.priceGhs * i.qty)}
                  </span>
                </li>
              ))}
              <li className="flex justify-between gap-3 pt-3 font-semibold text-matte">
                <span>Total</span>
                <span className="tabular-nums">{formatGhs(subtotalGhs)}</span>
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
            noValidate
          >
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-matte">
                Full name
              </label>
              <input
                id="fullName"
                autoComplete="name"
                className={cn(
                  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-matte outline-none",
                  errors.fullName ? "border-red-600" : "border-charcoal/15",
                )}
                {...register("fullName")}
              />
              {errors.fullName ? (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.fullName.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-matte">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className={cn(
                  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-matte outline-none",
                  errors.phone ? "border-red-600" : "border-charcoal/15",
                )}
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-matte">
                Email <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={cn(
                  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-matte outline-none",
                  errors.email ? "border-red-600" : "border-charcoal/15",
                )}
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-matte">
                City / Town
              </label>
              <input
                id="city"
                autoComplete="address-level2"
                className={cn(
                  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-matte outline-none",
                  errors.city ? "border-red-600" : "border-charcoal/15",
                )}
                {...register("city")}
              />
              {errors.city ? (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.city.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-matte">
                Delivery address
              </label>
              <textarea
                id="address"
                rows={3}
                autoComplete="street-address"
                className={cn(
                  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-matte outline-none",
                  errors.address ? "border-red-600" : "border-charcoal/15",
                )}
                {...register("address")}
              />
              {errors.address ? (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.address.message}
                </p>
              ) : null}
            </div>
            <fieldset>
              <legend className="text-sm font-medium text-matte">Payment method</legend>
              <div className="mt-3 space-y-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal/15 px-4 py-3">
                  <input
                    type="radio"
                    value="cash_on_delivery"
                    className="mt-1 shrink-0"
                    {...register("paymentMethod")}
                  />
                  <span className="min-w-0 leading-snug">Cash on delivery</span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal/15 px-4 py-3">
                  <input
                    type="radio"
                    value="mobile_money"
                    className="mt-1 shrink-0"
                    {...register("paymentMethod")}
                  />
                  <span className="min-w-0 leading-snug">Mobile money</span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal/15 px-4 py-3">
                  <input
                    type="radio"
                    value="bank_transfer"
                    className="mt-1 shrink-0"
                    {...register("paymentMethod")}
                  />
                  <span className="min-w-0 leading-snug">Bank transfer</span>
                </label>
              </div>
              {errors.paymentMethod ? (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.paymentMethod.message}
                </p>
              ) : null}
            </fieldset>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-matte">
                Notes <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={2}
                className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-matte outline-none"
                {...register("notes")}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-12 w-full rounded-xl bg-matte py-3 font-semibold text-white transition hover:bg-charcoal disabled:opacity-60"
            >
              {isSubmitting ? "Placing order…" : "Place order"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
