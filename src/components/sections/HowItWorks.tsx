import { Package, Search, ShoppingCart } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Pick wigs & add to cart",
    body: "Pick units, bundles, or care products — your cart saves on this device.",
    icon: Search,
  },
  {
    step: "02",
    title: "Checkout on the site",
    body: "Enter delivery details and payment preference — we confirm your hair order by message or email.",
    icon: ShoppingCart,
  },
  {
    step: "03",
    title: "Fast delivery or pickup",
    body: "Nationwide delivery or arranged pickup — tracked and handled with care.",
    icon: Package,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 bg-surface py-16 md:py-24"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2
          id="how-heading"
          className="text-3xl font-bold tracking-tight text-matte md:text-4xl"
        >
          How it works
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Cart → checkout → your door. No long talk — just your hair, handled.
        </p>
        <ol className="mt-12 grid gap-8 md:grid-cols-3" role="list">
          {steps.map(({ step, title, body, icon: Icon }) => (
            <li
              key={step}
              className="relative rounded-2xl border border-charcoal/10 bg-background p-6 shadow-md"
            >
              <span
                className="text-xs font-bold uppercase tracking-widest text-muted"
                aria-hidden
              >
                Step {step}
              </span>
              <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white">
                <Icon className="size-7" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-matte">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
