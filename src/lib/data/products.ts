import type { ObjectCategory, Product } from "@/lib/data/types";
import productsData from "@/lib/data/mock/products.json";

// Seam: swap the body of each function below for a Supabase query
// (e.g. `const { data } = await supabase.from('products').select('*')`)
// once a Supabase project exists. Call sites already `await` these
// functions, so no other file needs to change.

const products = productsData as Product[];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((product) => product.featured);
}

export async function getProductsByCategory(category: ObjectCategory): Promise<Product[]> {
  return products.filter((product) => product.category === category);
}
