import type { Order, OrderLineItem, ShippingAddress } from "@/lib/data/types";
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/utils/constants";

// Seam: replace this in-memory store with Supabase inserts/selects once a
// project exists (see products.ts for the pattern). Known MVP limitation:
// this array only persists for the lifetime of the current Node process —
// it resets on server restart and won't work across multiple instances.
const orders = new Map<string, Order>();

function generateOrderNumber(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SS-${datePart}-${suffix}`;
}

export interface CreateOrderInput {
  shipping: ShippingAddress;
  items: OrderLineItem[];
  customerName?: string;
  customerEmail?: string;
  note?: string;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const subtotal = input.items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const order: Order = {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(),
    createdAt: new Date().toISOString(),
    status: "pending",
    paymentStatus: "pending",
    shipping: input.shipping,
    items: input.items,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    note: input.note,
  };

  orders.set(order.id, order);
  return order;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return orders.get(id);
}
