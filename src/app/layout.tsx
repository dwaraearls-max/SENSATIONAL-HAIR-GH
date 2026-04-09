import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@/components/Analytics";
import { getFeaturedProducts } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";
import { localBusinessJsonLd, productJsonLd } from "@/lib/schema";
import { brand } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.siteName} | ${brand.headlineSuffix}`,
    template: `%s | ${brand.siteName}`,
  },
  description: brand.description,
  keywords: [...brand.keywords],
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteUrl,
    siteName: brand.siteName,
    title: `${brand.siteName} | ${brand.headlineSuffix}`,
    description: brand.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.siteName} | ${brand.headlineSuffix}`,
    description: brand.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#2d2424",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const featured = getFeaturedProducts();
  const localLd = localBusinessJsonLd();
  const productLd = productJsonLd(featured.slice(0, 5));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <Analytics />
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-[max(1rem,env(safe-area-inset-left))] focus:top-[max(1rem,env(safe-area-inset-top))] focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
