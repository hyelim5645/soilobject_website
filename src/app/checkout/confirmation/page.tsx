import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getOrderById } from "@/lib/data/orders";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { ORDER_STATUS_LABELS } from "@/lib/utils/constants";

export default async function CheckoutConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  const order = orderId ? await getOrderById(orderId) : undefined;

  if (!order) notFound();

  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-2xl">
        <p className="label-uppercase text-xs text-mist-500">
          {ORDER_STATUS_LABELS[order.status]}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
          주문이 접수되었습니다
        </h1>
        <p className="mt-4 text-mist-500">
          주문번호 <span className="text-ink">{order.orderNumber}</span> ·{" "}
          {formatDate(order.createdAt)}
        </p>

        <div className="mt-10 border border-mist-300/60 p-6">
          <p className="label-uppercase text-xs text-mist-500">배송 정보</p>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {order.shipping.recipientName} · {order.shipping.phone}
            <br />
            ({order.shipping.postalCode}) {order.shipping.address1}{" "}
            {order.shipping.address2}
            {order.shipping.memo && (
              <>
                <br />
                메모: {order.shipping.memo}
              </>
            )}
          </p>

          <p className="label-uppercase mt-6 text-xs text-mist-500">주문 상품</p>
          <div className="mt-3 space-y-2">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-ink">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-ink">{formatPrice(item.lineTotal)}</span>
              </div>
            ))}
          </div>

          <dl className="mt-6 space-y-2 border-t border-mist-300/60 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist-500">상품 금액</dt>
              <dd className="text-ink">{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist-500">배송비</dt>
              <dd className="text-ink">
                {order.shippingFee === 0 ? "무료" : formatPrice(order.shippingFee)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between border-t border-mist-300/60 pt-4">
            <p className="label-uppercase text-xs text-mist-500">합계</p>
            <p className="text-lg text-ink">{formatPrice(order.total)}</p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-mist-500">
          결제 안내는 입력하신 연락처 또는 이메일로 곧 전달드립니다. 실제 결제
          기능은 추후 연동될 예정입니다.
        </p>

        <Link
          href="/objects"
          className="label-uppercase mt-10 inline-block text-xs text-ink underline decoration-mist-300 underline-offset-4 hover:text-wood-600"
        >
          계속 둘러보기
        </Link>
      </Container>
    </section>
  );
}
