"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  id: string;
  sourceUrl: string;
  altText?: string | null;
  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
};

type GalleryLightboxProps = {
  images: GalleryImage[];
  title?: string;
};

export default function GalleryLightbox({
  images,
  title = "Gallery image",
}: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isOpen = selectedIndex !== null;

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, selectedIndex]);

  return (
    <>
      {/* Gallery */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
            <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative block w-full h-[320px] md:h-[360px] overflow-hidden bg-muted text-left"
            >
            <Image
                src={image.sourceUrl}
                alt={image.altText || title}
                width={image.mediaDetails?.width || 1200}
                height={image.mediaDetails?.height || 800}
                className="w-full h-[320px] md:h-[360px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />

            <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-all duration-300 group-hover:bg-charcoal/20">
                <span className="rounded-full bg-cream/90 px-4 py-2 text-xs font-mono uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View
                </span>
            </span>
            </button>
        ))}
        </div>
      {/* Lightbox */}
      {isOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 md:p-8"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center text-cream text-3xl hover:opacity-70"
          >
            ×
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream text-3xl hover:bg-cream/20"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative h-[85vh] w-full max-w-7xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[selectedIndex].sourceUrl}
              alt={images[selectedIndex].altText || title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream text-3xl hover:bg-cream/20"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs tracking-wider text-cream/70">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}