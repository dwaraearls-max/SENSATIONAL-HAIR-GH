"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const reviews = [
  {
    name: "Kojo A.",
    location: "Accra",
    text: "HD lace melted perfectly — hair is soft and full. Delivery was quick.",
    photo: "/testimonials/kojo-a.png",
    rating: 5,
  },
  {
    name: "Ama S.",
    location: "Kumasi",
    text: "Bundles matched the texture they described. Great communication on WhatsApp.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    rating: 5,
  },
  {
    name: "Emmanuel T.",
    location: "Tema",
    text: "Fair pricing vs salons — my unit still looks amazing weeks later.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    rating: 5,
  },
  {
    name: "Yaa M.",
    location: "Takoradi",
    text: "Smooth checkout — they confirmed stock and delivery the same day.",
    photo:
      "https://images.unsplash.com/photo-1589156191108-c762ff4b96ac?w=200&q=80",
    rating: 5,
  },
];

export function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    const id = requestAnimationFrame(() => onSelect());
    return () => {
      cancelAnimationFrame(id);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="reviews"
      className="scroll-mt-28 border-y border-charcoal/10 bg-background py-16 md:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2
          id="reviews-heading"
          className="text-3xl font-bold tracking-tight text-matte md:text-4xl"
        >
          The girls said it, not us
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Real installs, real Ghana — lace that melts and bundles that match the
          hype.
        </p>
        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((r) => (
              <article
                key={r.name}
                className="min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="flex h-full flex-col rounded-2xl border border-charcoal/10 bg-surface p-6 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 overflow-hidden rounded-full">
                      <Image
                        src={r.photo}
                        alt={`${r.name} from ${r.location}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-matte">{r.name}</p>
                      <p className="text-sm text-muted">{r.location}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-0.5" aria-hidden>
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="size-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    “{r.text}”
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cn(
                "size-2 rounded-full transition",
                i === selected ? "bg-accent" : "bg-charcoal/20",
              )}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
