import Link from "next/link";

export default function FeaturedStory() {
  return (
   <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-6">
                Featured Story
              </p>
              <blockquote className="font-serif italic text-3xl md:text-4xl text-charcoal leading-[1.25] mb-8">
                &ldquo;Some journeys stay with you long after you return.&rdquo;
              </blockquote>
              <p className="text-sm text-muted-fg leading-relaxed max-w-md mb-8">
                The Kedarkantha trail taught me that discomfort and beauty are the
                same thing. At 12,500 feet, with snow underfoot and silence so
                thick you could lean on it, I understood why people keep going
                back.
              </p>
              <Link
                href="/trekking"
                className="text-xs tracking-[0.12em] uppercase text-charcoal border-b border-charcoal pb-0.5 hover:text-earth hover:border-earth transition-colors"
              >
                Read the story →
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] overflow-hidden bg-muted relative group">
                <img
                  src="/home-river.jpg?w=800&h=1000&fit=crop&auto=format"
                  alt="dazzling photographing in mountains"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}