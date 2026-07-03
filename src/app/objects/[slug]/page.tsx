import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { getProductBySlug, getProducts } from "@/lib/data/products";
import { CATEGORY_LABELS } from "@/lib/utils/constants";
import { formatPrice } from "@/lib/utils/format";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — SOIL STUDIO`,
    description: product.shortDescription ?? product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const categoryLabel = CATEGORY_LABELS[product.category];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <nav className="label-uppercase mb-10 text-xs text-mist-500">
          <Link href="/objects" className="hover:text-ink">
            Objects
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/objects?category=${product.category}`} className="hover:text-ink">
            {categoryLabel.ko}
          </Link>
        </nav>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <ProductGallery images={product.images} />

          <div>
            {product.displayNumber && (
              <p className="label-uppercase text-xs text-mist-500">
                {product.displayNumber}
              </p>
            )}
            <h1 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
              {product.nameEn ?? product.name}
            </h1>
            <p className="mt-1 text-base text-mist-500">{product.name}</p>
            <p className="mt-6 text-xl text-ink">{formatPrice(product.price)}</p>

            <p className="mt-6 leading-relaxed text-ink/80">{product.description}</p>

            <dl className="mt-8 space-y-2 border-t border-mist-300/60 pt-6 text-sm">
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-mist-500">카테고리</dt>
                <dd className="text-ink">{categoryLabel.ko}</dd>
              </div>
              {product.material && (
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 text-mist-500">소재</dt>
                  <dd className="text-ink">{product.material}</dd>
                </div>
              )}
              {product.dimensions && (
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 text-mist-500">사이즈</dt>
                  <dd className="text-ink">
                    W{product.dimensions.width} × D{product.dimensions.depth} × H
                    {product.dimensions.height} {product.dimensions.unit}
                  </dd>
                </div>
              )}
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-mist-500">재고</dt>
                <dd className="text-ink">
                  {product.stock > 0 ? `${product.stock}개` : "품절"}
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
