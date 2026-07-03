"use server";

import { createOrder } from "@/lib/data/orders";
import { shippingAddressSchema } from "@/lib/validation/shipping";
import type { OrderLineItem } from "@/lib/data/types";

export interface SubmitOrderInput {
  shipping: {
    recipientName: string;
    phone: string;
    postalCode: string;
    address1: string;
    address2?: string;
    memo?: string;
  };
  items: OrderLineItem[];
  customerName?: string;
  customerEmail?: string;
  note?: string;
}

export async function submitOrder(input: SubmitOrderInput): Promise<{ orderId: string }> {
  const shipping = shippingAddressSchema.parse(input.shipping);

  if (!input.items.length) {
    throw new Error("장바구니가 비어 있습니다.");
  }

  const order = await createOrder({
    shipping,
    items: input.items,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    note: input.note,
  });

  return { orderId: order.id };
}
