import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Checkout",
  description: `Complete your ${brand.siteName} order online.`,
  alternates: { canonical: `${getSiteUrl()}/checkout` },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
