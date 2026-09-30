import Link from "next/link";

const navLinks = [
  { label: "Travel", to: "/travel" },
  { label: "Trekking", to: "/trekking" },
  { label: "Running", to: "/running" },
  { label: "Gallery", to: "/gallery" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-cream/10">
          <div>
            <h3 className="font-serif text-2xl text-cream mb-3">
              Dazzling Anchal
            </h3>
            <p className="text-xs tracking-[0.15em] uppercase text-cream/40 font-mono">
              Travel · Trekking · Running · Stories
            </p>
            <p className="mt-5 text-sm leading-relaxed text-cream/50 max-w-xs">
              A personal journal of places explored, trails walked, races run,
              and stories worth keeping.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase font-mono text-cream/40 mb-5">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase font-mono text-cream/40 mb-5">
              Find me
            </h4>
            <div className="flex flex-col gap-3">
              {["Instagram", "Strava", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-cream/30 font-mono">
            © 2026 Dazzling Anchal. All rights reserved.
          </p>
          <p className="text-xs text-cream/20 font-mono">
            Made with ANCHAL DIXIT.
          </p>
        </div>
      </div>
    </footer>
  );
}
