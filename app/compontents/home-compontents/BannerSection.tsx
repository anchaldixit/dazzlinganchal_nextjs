"use client";
import Link from "next/link";
export default function BannerSection() {
  return (
    <section className="relative h-screen min-h-[640px] flex flex-col justify-end">
        <img
          src="https://images.unsplash.com/photo-1486525546686-3cd5484691f4?w=1920&h=1080&fit=crop&auto=format"
          alt="Person standing before a mountain range"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/20 to-charcoal/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/60 mb-6">
            Personal Journal
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.05] max-w-4xl">
            <em>I travel. I run.</em>
            <br />
            <em>I trek. I collect</em>
            <br />
            experiences.
          </h1>
          <p className="mt-6 text-sm md:text-base text-cream/60 max-w-lg leading-relaxed font-sans">
            A personal journal of places I&apos;ve explored, trails I&apos;ve walked,
            races I&apos;ve run, and stories worth remembering.
          </p>
          <Link
            href="/journal"
            className="inline-block mt-8 text-sm tracking-[0.12em] uppercase text-cream border-b border-cream/50 pb-0.5 hover:border-cream hover:text-cream transition-colors"
          >
            Explore my journey
          </Link>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-cream/50" />
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream rotate-90 origin-center translate-y-4">
            Scroll
          </p>
        </div>
      </section>
    );  
}

