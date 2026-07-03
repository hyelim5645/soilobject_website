import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";

export default function CheckoutPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="label-uppercase text-xs text-mist-500">Checkout</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
          주문서 작성
        </h1>

        <CheckoutForm />
      </Container>
    </section>
  );
}
