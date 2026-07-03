import Link from "next/link";
import { formatPrice } from "@/lib/utils/format";
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/utils/constants";

export function CartSummary({ subtotal }: { subtotal: number }) {
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  return (
    <div className="border border-mist-300/60 p-6">
      <p className="label-uppercase text-xs text-mist-500">주문 요약</p>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-mist-500">상품 금액</dt>
          <dd className="text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-mist-500">배송비</dt>
          <dd className="text-ink">
            {shippingFee === 0 ? "무료" : formatPrice(shippingFee)}
          </dd>
        </div>
        {shippingFee > 0 && (
          <p className="text-xs text-mist-500">
            {formatPrice(FREE_SHIPPING_THRESHOLD)} 이상 구매 시 배송비 무료
          </p>
        )}
      </dl>

      <div className="mt-6 flex items-baseline justify-between border-t border-mist-300/60 pt-4">
        <p className="label-uppercase text-xs text-mist-500">합계</p>
        <p className="text-lg text-ink">{formatPrice(total)}</p>
      </div>

      <Link
        href="/checkout"
        className="label-uppercase mt-6 flex w-full items-center justify-center bg-ink px-8 py-3 text-xs font-medium text-paper transition-colors hover:bg-ink-soft"
      >
        주문하기
      </Link>
    </div>
  );
}
