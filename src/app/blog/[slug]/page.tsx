import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${getSiteUrl()}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    image: post.image,
    author: { "@type": "Organization", name: brand.siteName },
    publisher: { "@type": "Organization", name: brand.siteName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <SiteHeader />
      <article className="border-t border-charcoal/10 bg-background py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-medium text-muted">
            <Link href="/blog" className="hover:text-matte">
              Blog
            </Link>{" "}
            / {post.title}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-matte">
            {post.title}
          </h1>
          <time dateTime={post.date} className="mt-3 block text-sm text-muted">
            {post.date}
          </time>
          <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-2xl bg-charcoal/5">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div
            className="article-body mt-10 max-w-none space-y-4 text-base leading-relaxed text-matte/90 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </article>
      <Footer />
    </>
  );
}
