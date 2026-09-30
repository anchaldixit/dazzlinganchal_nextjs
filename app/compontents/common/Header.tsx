"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Travel", to: "/travel" },
  { label: "Trekking", to: "/trekking" },
  { label: "Running", to: "/running" },
  { label: "Cycling", to: "/cycling" },
  { label: "Gallery", to: "/gallery" },
  { label: "Books", to: "/books" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className=" top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-serif text-xl tracking-wide text-charcoal hover:text-earth transition-colors"
        >
          Dazzling Anchal
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`text-xs tracking-[0.12em] uppercase font-sans transition-colors ${
                pathname === link.to
                  ? "text-earth border-b border-earth pb-0.5"
                  : "text-muted-fg hover:text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-charcoal transition-all ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-charcoal transition-all ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-charcoal transition-all ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-cream border-t border-border py-6 px-6">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-[0.1em] uppercase font-sans ${
                  pathname === link.to
                    ? "text-earth"
                    : "text-muted-fg"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
