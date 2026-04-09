import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { getSiteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${brand.siteName} website and placing orders.`,
  alternates: { canonical: `${getSiteUrl()}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="border-t border-charcoal/10 bg-background py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold text-matte">Terms of Service</h1>
          <p className="mt-6 text-muted leading-relaxed">
            By using this website you agree to contact {brand.siteName} in good faith.
            Product availability, pricing, and warranty terms are confirmed at
            the time of order on WhatsApp or phone. Delivery timelines may vary
            by location. Returns and exchanges follow the warranty and policy
            communicated for your specific product.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            Content on this site is for general information; always confirm
            details before payment.
          </p>
          <p className="mt-8">
            <Link href="/" className="font-semibold text-matte hover:underline">
              ← Back home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
