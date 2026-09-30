"use client";

import { useState } from "react";
import { galleryPhotos } from "@/app/data/content";
import type { ActivityType } from "@/app/data/content";

const filters: { label: string; value: ActivityType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Trekking", value: "trekking" },
  { label: "Running", value: "running" },
];

export default function Gallery() {
  const [active, setActive] = useState<ActivityType | "all">("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const photos =
    active === "all" ? galleryPhotos : galleryPhotos.filter((p) => p.type === active);

  return (
    <div className="bg-cream text-charcoal min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-10 max-w-7xl mx-auto px-6 border-b border-border">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted-fg mb-2">
          Photography
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">Gallery</h1>

          {/* Filters */}
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`text-[10px] font-mono tracking-[0.15em] uppercase px-3 py-1.5 transition-colors border ${
                  active === f.value
                    ? "bg-charcoal text-cream border-charcoal"
                    : "bg-transparent text-muted-fg border-border hover:border-charcoal hover:text-charcoal"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div
          className="[column-count:1] sm:[column-count:2] lg:[column-count:3] gap-2"
          style={{ columnGap: "8px" }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-2 overflow-hidden bg-muted group cursor-zoom-in relative"
              onClick={() => setLightbox(photo.src.replace("w=600", "w=1400").replace("w=800", "w=1400"))}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <p className="text-cream text-xs font-mono tracking-wide">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif italic text-2xl text-muted-fg">
              No photos in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-8 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery photo lightbox"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-cream/60 hover:text-cream font-mono text-xs tracking-wider"
            onClick={() => setLightbox(null)}
          >
            CLOSE ×
          </button>
        </div>
      )}
    </div>
  );
}
