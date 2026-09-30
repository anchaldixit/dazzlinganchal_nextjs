import Link from "next/link";
import { featuredRace } from "@/app/data/content";

export default function RunningFeature() {
    return (
      <section className="bg-charcoal text-cream py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/40 mb-4">
                Race Feature
              </p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-2">
                {featuredRace.name}
              </h2>
              <p className="font-mono text-xs tracking-[0.15em] text-cream/40 mb-10">
                {featuredRace.location} · {featuredRace.date}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-px bg-cream/10">
                {[
                  { label: "Distance", value: featuredRace.distance },
                  { label: "Finish Time", value: featuredRace.time },
                  { label: "Avg Pace", value: featuredRace.pace },
                  { label: "Position", value: featuredRace.position },
                ].map((stat) => (
                  <div key={stat.label} className="bg-charcoal p-5">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-1">
                      {stat.label}
                    </p>
                    <p className="font-mono text-xl text-cream">{stat.value}</p>
                  </div>
                ))}
              </div>

              <blockquote className="mt-10 pl-5 border-l border-earth">
                <p className="font-serif italic text-lg text-cream/80 leading-relaxed">
                  &ldquo;{featuredRace.experience}&rdquo;
                </p>
              </blockquote>

              <Link
                href="/running"
                className="inline-block mt-8 text-xs tracking-[0.15em] uppercase text-cream/60 border-b border-cream/20 pb-0.5 hover:text-cream hover:border-cream transition-colors"
              >
                All races →
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden bg-charcoal/50">
                <img
                  src={featuredRace.image}
                  alt="Runner on city street"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-earth px-4 py-2">
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-cream">
                  Full Marathon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}