import { MapPin } from "lucide-react";

const areas = ["Accra", "Kumasi", "Tema", "Takoradi", "Nationwide delivery"];

export function ServiceAreas() {
  return (
    <section
      id="delivery"
      className="scroll-mt-28 border-t border-charcoal/10 bg-surface py-16 md:py-24"
      aria-labelledby="delivery-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              id="delivery-heading"
              className="text-3xl font-bold tracking-tight text-matte md:text-4xl"
            >
              Service areas & delivery
            </h2>
            <p className="mt-3 text-muted">
              City or town — if you&apos;re in Ghana, we&apos;re trying to get
              your order to you clean and on time.
            </p>
            <ul className="mt-8 space-y-3" role="list">
              {areas.map((a) => (
                <li key={a} className="flex items-center gap-3 text-matte">
                  <MapPin className="size-5 shrink-0 text-matte" aria-hidden />
                  <span className="font-medium">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-[2rem] border border-charcoal/10 bg-matte p-8 text-white shadow-xl"
            aria-hidden
          >
            <svg viewBox="0 0 200 200" className="h-full w-full max-w-[280px]">
              <defs>
                <radialGradient id="g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="url(#g)" />
              <circle
                cx="100"
                cy="100"
                r="72"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
              <circle
                cx="100"
                cy="100"
                r="48"
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="2"
              />
              <circle cx="100" cy="100" r="6" fill="white" />
            </svg>
            <p className="pointer-events-none absolute bottom-6 left-6 right-6 text-center text-sm text-white/80">
              Nationwide radius · Priority hubs in Accra & Kumasi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
