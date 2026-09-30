"use client";

import Link from "next/link"
import JourneyCard from "../JourneyCard";
import { ActivityType, journeys } from "@/app/data/content";
import { featuredRace, galleryPhotos, locations } from "@/app/data/content";
import { useState } from "react";


const galleryFilters: { label: string; value: ActivityType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Travel", value: "travel" },
  { label: "Trekking", value: "trekking" },
  { label: "Running", value: "running" },
];

export default function GalleryPreview() {
     const [galleryFilter, setGalleryFilter] =  useState<ActivityType | "all">("all");

  const filteredPhotos =
    galleryFilter === "all"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.type === galleryFilter);

    return (
        <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-2">
                Photography
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                Gallery
              </h2>
            </div>

            {/* Filters */}
            <div className="flex gap-1">
              {galleryFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setGalleryFilter(f.value)}
                  className={`text-[10px] font-mono tracking-[0.15em] uppercase px-3 py-1.5 transition-colors border ${
                    galleryFilter === f.value
                      ? "bg-charcoal text-cream border-charcoal"
                      : "bg-transparent text-muted-fg border-border hover:border-charcoal hover:text-charcoal"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry grid */}
          <div
            style={{ columns: "3", columnGap: "8px" }}
            className="[column-count:1] md:[column-count:2] lg:[column-count:3]"
          >
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-2 overflow-hidden bg-muted group cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-block text-xs tracking-[0.15em] uppercase text-charcoal border border-charcoal px-8 py-3 hover:bg-charcoal hover:text-cream transition-colors"
            >
              View full gallery
            </Link>
          </div>
        </div>
      </section>

    )
}