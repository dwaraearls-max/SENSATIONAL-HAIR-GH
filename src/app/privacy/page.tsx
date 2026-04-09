import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { getSiteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${brand.siteName} handles your data when you browse or contact us.`,
  alternates: { canonical: `${getSiteUrl()}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="border-t border-charcoal/10 bg-background py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold text-matte">Privacy Policy</h1>
          <p className="mt-6 text-muted leading-relaxed">
            {brand.siteName} respects your privacy. When you submit an inquiry, call,
            or message us on WhatsApp, we use your details only to respond to your
            request and fulfil orders. We do not sell your personal information.
            Analytics tools may be enabled to understand site traffic — you can
            manage cookies through your browser settings.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            For questions about this policy, contact us via the phone number or
            WhatsApp shown on this site.
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
