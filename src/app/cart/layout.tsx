import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Cart",
  description: `Review your ${brand.siteName} cart and checkout.`,
  alternates: { canonical: `${getSiteUrl()}/cart` },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
