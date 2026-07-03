import type { CartItem, Product } from "@/lib/data/types";
import { readCart, writeCart } from "@/lib/cart/cart-storage";

type Listener = () => void;

const EMPTY_CART: CartItem[] = [];

let items: CartItem[] = EMPTY_CART;
let isInitialized = false;
const listeners = new Set<Listener>();

function ensureInitialized() {
  if (!isInitialized && typeof window !== "undefined") {
    items = readCart();
    isInitialized = true;
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function commit(next: CartItem[]) {
  items = next;
  writeCart(items);
  emit();
}

export function subscribe(listener: Listener): () => void {
  ensureInitialized();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartItem[] {
  ensureInitialized();
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function addItem(product: Product, quantity: number): void {
  const existing = items.find((item) => item.productId === product.id);
  if (existing) {
    commit(
      items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    );
    return;
  }

  const primaryImage = product.images[0] ?? {
    src: null,
    alt: product.name,
    width: 900,
    height: 1125,
  };

  commit([
    ...items,
    {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: primaryImage,
      quantity,
    },
  ]);
}

export function removeItem(productId: string): void {
  commit(items.filter((item) => item.productId !== productId));
}

export function updateQuantity(productId: string, quantity: number): void {
  commit(
    quantity <= 0
      ? items.filter((item) => item.productId !== productId)
      : items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
  );
}

export function clearCart(): void {
  commit([]);
}
