"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CartLineItem } from "@/components/commerce/CartLineItem";
import { CartSummary } from "@/components/commerce/CartSummary";
import { useCart } from "@/lib/cart/cart-context";

export default function CartPage() {
  const { items, subtotal, isHydrated } = useCart();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="label-uppercase text-xs text-mist-500">Cart</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
          장바구니
        </h1>

        {!isHydrated ? null : items.length === 0 ? (
          <div className="mt-16 flex flex-col items-start gap-6">
            <p className="text-mist-500">장바구니가 비어 있습니다.</p>
            <Link
              href="/objects"
              className="label-uppercase text-xs text-ink underline decoration-mist-300 underline-offset-4 hover:text-wood-600"
            >
              오브제 둘러보기
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              {items.map((item) => (
                <CartLineItem key={item.productId} item={item} />
              ))}
            </div>
            <div>
              <CartSummary subtotal={subtotal} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
