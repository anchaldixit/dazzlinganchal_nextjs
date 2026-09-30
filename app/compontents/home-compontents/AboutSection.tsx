import Link from "next/link";

export default function AboutSection() {
    return (
        <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden bg-muted max-w-sm">
                <img
                  src="/snow-zero-points.jpg?w=600&h=800&fit=crop&auto=format"
                  alt="Portrait with backpack on mountain"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-earth px-5 py-3 hidden md:block">
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-cream">
                  Explorer
                </p>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-4">
                About
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">
                More than destinations.
                <br />
                <em>It&apos;s the journey.</em>
              </h2>
              <p className="text-sm text-muted-fg leading-relaxed mb-4 max-w-md">
                I&apos;m Anchal — someone who believes that the best stories are
                written with your feet, not your fingers. I run marathons to test
                my limits, trek mountains to find perspective, and travel to
                collect the kind of memories that don&apos;t fit in photographs.
              </p>
              <p className="text-sm text-muted-fg leading-relaxed mb-8 max-w-md">
                This is where I document all of it. Honestly, imperfectly,
                completely.
              </p>

              <div className="flex gap-8 mb-8">
                {[
                  { label: "Countries", value: "12" },
                  { label: "Treks", value: "24" },
                  { label: "Marathons", value: "8" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-mono text-2xl text-charcoal">{s.value}</p>
                    <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-fg">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="text-xs tracking-[0.12em] uppercase text-charcoal border border-charcoal px-6 py-3 hover:bg-charcoal hover:text-cream transition-colors inline-block"
              >
                More about me →
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
}