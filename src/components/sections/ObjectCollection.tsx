import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/commerce/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";

export async function ObjectCollection() {
  const products = await getFeaturedProducts();

  return (
    <section id="objects" className="py-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            number="01"
            title="Object Collection"
            subtitle="많이 두지 않아도, 하나로 충분한 오브제를 만듭니다."
          />
          <Link
            href="/objects"
            className="label-uppercase hidden shrink-0 text-xs text-ink hover:text-wood-600 sm:block"
          >
            View Collection
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href="/objects"
          className="label-uppercase mt-10 block text-xs text-ink hover:text-wood-600 sm:hidden"
        >
          View Collection
        </Link>
      </Container>
    </section>
  );
}
