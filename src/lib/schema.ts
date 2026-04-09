import type { Product } from "@/types/catalog";
import { getSiteUrl, getPhoneTel, getBusinessAddress } from "./site";
import { brand } from "./brand";

export function localBusinessJsonLd(): Record<string, unknown> {
  const address = getBusinessAddress();
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: brand.siteName,
    description: brand.description,
    url: getSiteUrl(),
    telephone: getPhoneTel(),
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    priceRange: "$$",
  };
  if (address) {
    base.address = {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "GH",
    };
  }
  return base;
}

export function productJsonLd(products: Product[]): Record<string, unknown> {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": products.map((p) => ({
      "@type": "Product",
      name: p.name,
      description: p.benefit,
      image: p.image.startsWith("http") ? p.image : `${site}${p.image}`,
      brand: { "@type": "Brand", name: brand.siteName },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "GHS",
        url: `${site}/#products`,
        seller: { "@type": "Organization", name: brand.siteName },
      },
    })),
  };
}
