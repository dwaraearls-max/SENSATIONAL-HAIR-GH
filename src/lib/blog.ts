import { brand } from "@/lib/brand";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  keywords: string[];
};

export const blogPosts: (BlogPostMeta & { contentHtml: string })[] = [
  {
    slug: "how-to-choose-quality-human-hair-bundles-ghana",
    title: "How to Choose Quality Human Hair Bundles in Ghana",
    excerpt:
      "Texture, grams per bundle, colour goals, and what to ask before you pay.",
    date: "2026-03-15",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80",
    keywords: [
      "human hair Ghana",
      "hair bundles Ghana",
      "raw hair bundles",
    ],
    contentHtml: `
      <p>Great bundles start with honest grading and consistent wefts. Decide your install first — sew-in, wig, or custom unit — then pick lengths that blend with your natural density. Ask about grams per bundle and whether the hair is single- or double-drawn for fullness from root to tip.</p>
      <h2>Colour and care</h2>
      <p>If you plan to lift colour, choose hair that colour-tests well and follow a moisture routine after processing. At ${brand.siteName} we help you match texture and length to your style goals before checkout.</p>
    `,
  },
  {
    slug: "lace-wig-care-for-longer-wear",
    title: "Lace Wig Care Tips for Longer Wear",
    excerpt:
      "Washing, storage, and nightly habits that keep lace melting and hair soft.",
    date: "2026-03-22",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
    keywords: ["HD lace wigs Ghana", "lace wig care", "human hair wigs"],
    contentHtml: `
      <p>Detangle from ends to roots before washing. Use sulfate-free shampoo and a hydrating conditioner; air-dry on a wig stand when possible. For HD lace, avoid friction at the hairline and protect edges with a silk scarf or bonnet at night.</p>
      <h2>Install-friendly habits</h2>
      <p>Rotate adhesives if you wear glueless caps, and refresh the lace perimeter gently — tension and product buildup are what shorten wear time.</p>
    `,
  },
  {
    slug: "how-to-spot-low-quality-hair-extensions",
    title: "How to Spot Low-Quality Hair Extensions",
    excerpt:
      "Red flags in shedding, smell, and weft construction — before you buy.",
    date: "2026-04-01",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200&q=80",
    keywords: [
      "quality hair extensions Ghana",
      "hair vendor Ghana",
      "fake hair extensions",
    ],
    contentHtml: `
      <p>Excessive shedding on first comb-through, uneven wefts, or a strong chemical smell can signal mixed or over-processed hair. Compare bundle weight and strand thickness across lengths — quality hair feels consistent when run between your fingers.</p>
      <h2>Buy with clarity</h2>
      <p>Choose sellers who explain sourcing, return windows, and care expectations. At ${brand.siteName} we prioritise transparent grading and Ghana-wide delivery so you know what you are getting.</p>
    `,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs() {
  return blogPosts.map((p) => p.slug);
}
