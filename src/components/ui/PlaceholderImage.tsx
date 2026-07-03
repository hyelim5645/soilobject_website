import Image from "next/image";
import type { ProductImage } from "@/lib/data/types";

export function PlaceholderImage({
  image,
  label,
  className = "",
  sizes = "(min-width: 768px) 25vw, 50vw",
  priority = false,
  tone = "light",
  compact = false,
}: {
  image: ProductImage;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
  /** Use for small render sizes (thumbnails, cart line items) — drops the
   * dimension line and clamps the label so long alt text can't wrap into an
   * illegible stack of broken lines. */
  compact?: boolean;
}) {
  const ratio = `${image.width} / ${image.height}`;
  // A caller-supplied position utility (e.g. "absolute inset-0" for a
  // full-bleed background) must win over our default — Tailwind utilities
  // have equal specificity, so having both "relative" and "absolute"
  // present is a real conflict, not just redundant.
  const hasPositionOverride = /(^|\s)(absolute|fixed|sticky|static)(\s|$)/.test(
    className
  );
  const positionClass = hasPositionOverride ? "" : "relative";

  if (image.src) {
    return (
      <div
        className={`${positionClass} overflow-hidden ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const toneClasses =
    tone === "dark"
      ? "border-paper/20 bg-ink-soft text-mist-300"
      : "border-mist-300 bg-paper-dim text-mist-500";

  return (
    <div
      className={`${positionClass} flex flex-col items-center justify-center gap-1 border border-dashed text-center ${
        compact ? "px-1" : "px-4"
      } ${toneClasses} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span
        className={`label-uppercase line-clamp-2 text-[10px] ${
          compact ? "px-0.5 leading-tight" : ""
        }`}
      >
        {label ?? image.alt}
      </span>
      {!compact && (
        <span className="text-[10px] opacity-70">
          {image.width} × {image.height}
        </span>
      )}
    </div>
  );
}
