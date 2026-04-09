import { Award, Clock, Shield, Users } from "lucide-react";

const stats = [
  { icon: Clock, value: "5+", label: "Years in hair retail" },
  { icon: Users, value: "3,000+", label: "Happy installs & deliveries" },
  { icon: Shield, value: "100%", label: "Quality-checked sourcing" },
  { icon: Award, value: "Nationwide", label: "Fast delivery" },
];

export function Stats() {
  return (
    <section
      id="stats"
      className="scroll-mt-28 border-t border-charcoal/10 bg-matte py-16 text-white md:py-20"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2 id="stats-heading" className="sr-only">
          Trust and brand stats
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {stats.map(({ icon: Icon, value, label }) => (
            <li
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <Icon className="mx-auto size-8 text-accent" aria-hidden />
              <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-white/70">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
