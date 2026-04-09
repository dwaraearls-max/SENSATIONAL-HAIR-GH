"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

const faqs = [
  {
    q: "Is the hair human and as described?",
    a: "We focus on honest grading and transparent sourcing. Ask about texture, length, and bundle weight before you pay — we confirm details on WhatsApp or by phone.",
  },
  {
    q: "How do I care for lace and bundles?",
    a: "Care depends on texture and processing. We share washing, styling, and storage tips at checkout and by message so your install lasts longer.",
  },
  {
    q: "How fast is delivery?",
    a: "Major cities are typically fastest; nationwide delivery is available. You will get a clear timeline when your order is confirmed.",
  },
  {
    q: "Do you accept payment on delivery?",
    a: "Payment options vary by item and location. You will see available options on the checkout page, or contact us if you need help.",
  },
  {
    q: "Which areas do you deliver to?",
    a: "We deliver to Accra, Kumasi, Tema, Takoradi, and nationwide across Ghana.",
  },
];

export function FAQ() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-28 bg-surface py-16 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2
          id="faq-heading"
          className="text-3xl font-bold tracking-tight text-matte md:text-4xl"
        >
          FAQ
        </h2>
        <p className="mt-3 text-muted">
          The stuff everyone asks before they tap &quot;add to cart&quot; — lace,
          coins &amp; delivery across Ghana.
        </p>
        <div className="mt-10 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10 bg-background">
          {faqs.map((item, i) => {
            const id = `${baseId}-faq-${i}`;
            const expanded = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`${id}-btn`}
                    aria-expanded={expanded}
                    aria-controls={`${id}-panel`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-matte transition hover:bg-charcoal/5"
                    onClick={() => setOpen(expanded ? null : i)}
                  >
                    {item.q}
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 transition",
                        expanded && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  hidden={!expanded}
                  className={cn(!expanded && "hidden")}
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
