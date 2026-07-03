"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { AddressSearchField } from "@/components/commerce/AddressSearchField";
import { shippingAddressSchema } from "@/lib/validation/shipping";
import { submitOrder } from "@/app/checkout/actions";
import { formatPrice } from "@/lib/utils/format";
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/utils/constants";

interface FormState {
  recipientName: string;
  phone: string;
  postalCode: string;
  address1: string;
  address2: string;
  memo: string;
  customerEmail: string;
}

const INITIAL_FORM: FormState = {
  recipientName: "",
  phone: "",
  postalCode: "",
  address1: "",
  address2: "",
  memo: "",
  customerEmail: "",
};

export function CheckoutForm() {
  const { items, subtotal, isHydrated, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitError(null);

    const result = shippingAddressSchema.safeParse({
      recipientName: form.recipientName,
      phone: form.phone,
      postalCode: form.postalCode,
      address1: form.address1,
      address2: form.address2 || undefined,
      memo: form.memo || undefined,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const { orderId } = await submitOrder({
        shipping: result.data,
        items: items.map((item) => ({
          productId: item.productId,
          slug: item.slug,
          name: item.name,
          unitPrice: item.price,
          quantity: item.quantity,
          lineTotal: item.price * item.quantity,
        })),
        customerEmail: form.customerEmail || undefined,
      });

      clearCart();
      router.push(`/checkout/confirmation?orderId=${orderId}`);
    } catch {
      setSubmitError("주문 접수 중 문제가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  }

  if (!isHydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-start gap-6">
        <p className="text-mist-500">장바구니가 비어 있어 주문할 수 없습니다.</p>
        <Link
          href="/objects"
          className="label-uppercase text-xs text-ink underline decoration-mist-300 underline-offset-4 hover:text-wood-600"
        >
          오브제 둘러보기
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <div>
          <label className="label-uppercase text-xs text-mist-500">받는 분 성함</label>
          <input
            type="text"
            value={form.recipientName}
            onChange={(event) => updateField("recipientName", event.target.value)}
            className="mt-2 w-full border border-mist-300 px-3 py-2 text-sm text-ink"
          />
          {errors.recipientName && (
            <p className="mt-1 text-xs text-red-700">{errors.recipientName}</p>
          )}
        </div>

        <div>
          <label className="label-uppercase text-xs text-mist-500">연락처</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="010-0000-0000"
            className="mt-2 w-full border border-mist-300 px-3 py-2 text-sm text-ink"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
        </div>

        <div>
          <AddressSearchField
            postalCode={form.postalCode}
            address1={form.address1}
            onSelect={({ postalCode, address1 }) => {
              updateField("postalCode", postalCode);
              updateField("address1", address1);
            }}
          />
          {(errors.postalCode || errors.address1) && (
            <p className="mt-1 text-xs text-red-700">
              {errors.postalCode ?? errors.address1}
            </p>
          )}
        </div>

        <div>
          <label className="label-uppercase text-xs text-mist-500">상세주소</label>
          <input
            type="text"
            value={form.address2}
            onChange={(event) => updateField("address2", event.target.value)}
            className="mt-2 w-full border border-mist-300 px-3 py-2 text-sm text-ink"
          />
        </div>

        <div>
          <label className="label-uppercase text-xs text-mist-500">배송 메모</label>
          <textarea
            value={form.memo}
            onChange={(event) => updateField("memo", event.target.value)}
            rows={3}
            className="mt-2 w-full border border-mist-300 px-3 py-2 text-sm text-ink"
          />
        </div>

        <div>
          <label className="label-uppercase text-xs text-mist-500">
            연락 받으실 이메일 (선택)
          </label>
          <input
            type="email"
            value={form.customerEmail}
            onChange={(event) => updateField("customerEmail", event.target.value)}
            className="mt-2 w-full border border-mist-300 px-3 py-2 text-sm text-ink"
          />
        </div>
      </div>

      <div className="border border-mist-300/60 p-6">
        <p className="label-uppercase text-xs text-mist-500">주문 상품</p>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-ink">
                {item.name} × {item.quantity}
              </span>
              <span className="text-ink">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <dl className="mt-6 space-y-2 border-t border-mist-300/60 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-mist-500">상품 금액</dt>
            <dd className="text-ink">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-mist-500">배송비</dt>
            <dd className="text-ink">{shippingFee === 0 ? "무료" : formatPrice(shippingFee)}</dd>
          </div>
        </dl>

        <div className="mt-4 flex items-baseline justify-between border-t border-mist-300/60 pt-4">
          <p className="label-uppercase text-xs text-mist-500">합계</p>
          <p className="text-lg text-ink">{formatPrice(total)}</p>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-mist-500">
          실제 결제 기능은 추후 연동 예정입니다. 주문 접수 후 결제 안내를 드립니다.
        </p>

        {submitError && <p className="mt-3 text-xs text-red-700">{submitError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="label-uppercase mt-6 w-full bg-ink px-8 py-3 text-xs font-medium text-paper transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "접수 중..." : "주문 접수하기"}
        </button>
      </div>
    </form>
  );
}
