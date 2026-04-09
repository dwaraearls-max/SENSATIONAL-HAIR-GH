import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { blogPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Lace & bundle tips",
  description:
    "Bundles, lace care & quality checks — SENSATIONAL HAIR GH notes for buyers in Ghana.",
  alternates: { canonical: `${getSiteUrl()}/blog` },
  openGraph: {
    title: `Lace & bundle tips | ${brand.siteName}`,
    url: `${getSiteUrl()}/blog`,
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] border-t border-charcoal/10 bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold tracking-tight text-matte">
            The hair tea — blog
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Lace, bundles &amp; keeping your install fresh — straight talk for
            Ghana shoppers.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-surface shadow-md"
              >
                <div className="relative aspect-[16/10] bg-charcoal/5">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium uppercase tracking-wide text-muted"
                  >
                    {post.date}
                  </time>
                  <h2 className="mt-2 text-lg font-semibold text-matte">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-accent"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
