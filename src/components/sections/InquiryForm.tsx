"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(9, "Enter a valid phone number"),
  product: z.string().min(2, "What are you interested in?"),
  location: z.string().min(2, "Enter your city or area"),
  message: z.string().optional(),
});

export type InquiryValues = z.infer<typeof schema>;

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      product: "",
      location: "",
      message: "",
    },
  });

  async function onSubmit(data: InquiryValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-charcoal/10 bg-background py-16 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-2xl px-4">
        <h2
          id="contact-heading"
          className="text-3xl font-bold tracking-tight text-matte md:text-4xl"
        >
          Book it or ask us anything
        </h2>
        <p className="mt-3 text-muted">
          Drop your details — we reply fast during business hours (and yes, you
          can say you came from TikTok).
        </p>
        <form
          className="mt-10 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-describedby="form-status"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-matte">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(
                "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-matte shadow-md outline-none transition focus:border-matte",
                errors.name ? "border-red-600" : "border-charcoal/15",
              )}
              {...register("name")}
            />
            {errors.name ? (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-matte">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={cn(
                "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-matte shadow-md outline-none transition focus:border-matte",
                errors.phone ? "border-red-600" : "border-charcoal/15",
              )}
              {...register("phone")}
            />
            {errors.phone ? (
              <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-matte">
              Product of interest
            </label>
            <input
              id="product"
              type="text"
              aria-invalid={errors.product ? "true" : "false"}
              aria-describedby={errors.product ? "product-error" : undefined}
              className={cn(
                "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-matte shadow-md outline-none transition focus:border-matte",
                errors.product ? "border-red-600" : "border-charcoal/15",
              )}
              {...register("product")}
            />
            {errors.product ? (
              <p id="product-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.product.message}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-matte">
              Location
            </label>
            <input
              id="location"
              type="text"
              autoComplete="address-level2"
              aria-invalid={errors.location ? "true" : "false"}
              aria-describedby={errors.location ? "location-error" : undefined}
              className={cn(
                "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-matte shadow-md outline-none transition focus:border-matte",
                errors.location ? "border-red-600" : "border-charcoal/15",
              )}
              {...register("location")}
            />
            {errors.location ? (
              <p
                id="location-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.location.message}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-matte">
              Message <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-2 w-full rounded-xl border border-charcoal/15 bg-surface px-4 py-3 text-matte shadow-md outline-none transition focus:border-matte"
              {...register("message")}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-matte py-3 text-sm font-semibold text-white transition hover:bg-charcoal disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send Inquiry"}
          </button>
        </form>
        <div
          id="form-status"
          className="mt-6 min-h-[1.5rem]"
          aria-live="polite"
          role="status"
        >
          {status === "success" ? (
            <p className="rounded-xl border border-green-700/30 bg-green-50 px-4 py-3 text-sm font-medium text-green-900">
              Thank you — our team will contact you within 10 minutes.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900" role="alert">
              Something went wrong. Please try again or call us — see the footer for our number.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
