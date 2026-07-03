import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/commerce/ProductCard";
import { getProducts } from "@/lib/data/products";
import { CATEGORY_LABELS } from "@/lib/utils/constants";
import type { ObjectCategory } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Objects — SOIL STUDIO",
  description: "소일 스튜디오의 오브제 컬렉션: 조명, 화병, 플랜트 스탠드, 원목 벤치.",
};

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as ObjectCategory[];

export default async function ObjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await getProducts();

  const activeCategory = CATEGORY_ORDER.includes(category as ObjectCategory)
    ? (category as ObjectCategory)
    : undefined;

  const filtered = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="label-uppercase text-xs text-mist-500">Objects</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
          Object Collection
        </h1>
        <p className="mt-4 max-w-md text-mist-500">
          조명, 화병, 플랜트 스탠드, 원목 벤치 — 소재와 결을 그대로 살린 오브제 12점입니다.
        </p>

        <nav className="mt-10 flex gap-6 overflow-x-auto whitespace-nowrap border-b border-mist-300/60 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/objects"
            className={`label-uppercase text-xs ${
              !activeCategory ? "text-ink" : "text-mist-500 hover:text-ink"
            }`}
          >
            전체
          </Link>
          {CATEGORY_ORDER.map((cat) => (
            <Link
              key={cat}
              href={`/objects?category=${cat}`}
              className={`label-uppercase text-xs ${
                activeCategory === cat
                  ? "text-ink"
                  : "text-mist-500 hover:text-ink"
              }`}
            >
              {CATEGORY_LABELS[cat].ko}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-sm text-mist-500">
            해당 카테고리에 상품이 없습니다.
          </p>
        )}
      </Container>
    </section>
  );
}
