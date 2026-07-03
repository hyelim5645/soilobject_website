"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { useCart } from "@/lib/cart/cart-context";
import type { Product } from "@/lib/data/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const isSoldOut = product.stock <= 0;

  function handleAdd() {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  if (isSoldOut) {
    return (
      <Button variant="secondary" disabled className="w-full">
        Sold Out
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <QuantityStepper quantity={quantity} onChange={setQuantity} max={product.stock} />
      <Button onClick={handleAdd} className="flex-1">
        {justAdded ? "장바구니에 담았습니다" : "장바구니 담기"}
      </Button>
    </div>
  );
}
