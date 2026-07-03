"use client";

import { useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { ProductImage } from "@/lib/data/types";

const THUMB_GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const thumbGridCols = THUMB_GRID_COLS[images.length] ?? "grid-cols-4";

  return (
    <div>
      <PlaceholderImage
        image={activeImage}
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="w-full"
      />
      {images.length > 1 && (
        <div className={`mt-4 grid ${thumbGridCols} gap-3`}>
          {images.map((image, index) => (
            <button
              key={`${image.alt}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`border transition-colors ${
                index === activeIndex
                  ? "border-ink"
                  : "border-transparent hover:border-mist-300"
              }`}
            >
              <PlaceholderImage
                image={{ ...image, width: 400, height: 400 }}
                className="w-full"
                compact
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
