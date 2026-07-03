"use client";

import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { useCart } from "@/lib/cart/cart-context";
import type { CartItem } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils/format";

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-mist-300/60 py-6">
      <Link href={`/objects/${item.slug}`} className="w-24 shrink-0 sm:w-32">
        <PlaceholderImage image={item.image} className="w-full" compact />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <Link href={`/objects/${item.slug}`} className="text-sm text-ink hover:text-wood-600">
            {item.name}
          </Link>
          <p className="whitespace-nowrap text-sm text-ink">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <QuantityStepper
            quantity={item.quantity}
            onChange={(next) => updateQuantity(item.productId, next)}
          />
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="label-uppercase text-xs text-mist-500 hover:text-ink"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
