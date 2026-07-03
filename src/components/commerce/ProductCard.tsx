import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Product } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils/format";

export function ProductCard({ product }: { product: Product }) {
  const isSoldOut = product.stock <= 0;

  return (
    <Link href={`/objects/${product.slug}`} className="group block">
      <div className="relative">
        <PlaceholderImage
          image={product.images[0]}
          className="w-full"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
        {isSoldOut && (
          <span className="label-uppercase absolute left-3 top-3 bg-ink px-2 py-1 text-[10px] text-paper">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <div>
          {product.displayNumber && (
            <p className="label-uppercase text-xs text-mist-500">
              {product.displayNumber}
            </p>
          )}
          <p className="mt-1 text-sm text-ink transition-colors group-hover:text-wood-600">
            {product.nameEn ?? product.name}
          </p>
          <p className="text-xs text-mist-500">{product.name}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-ink">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
