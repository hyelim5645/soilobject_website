export interface ProductImage {
  src: string | null;
  alt: string;
  width: number;
  height: number;
}

export type ObjectCategory = "lamp" | "vase" | "plant-stand" | "bench";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  displayNumber?: string;
  category: ObjectCategory;
  price: number;
  shortDescription?: string;
  description: string;
  images: ProductImage[];
  stock: number;
  material?: string;
  dimensions?: {
    width: number;
    depth: number;
    height: number;
    unit: "mm" | "cm";
  };
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: ProductImage;
  quantity: number;
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  postalCode: string;
  address1: string;
  address2?: string;
  memo?: string;
}

export interface OrderLineItem {
  productId: string;
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: "pending";
  shipping: ShippingAddress;
  items: OrderLineItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customerName?: string;
  customerEmail?: string;
  note?: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage: ProductImage;
}

export interface ProjectEntry {
  id: string;
  title: string;
  location: string;
  category: string;
  image: ProductImage;
  featuredObjectName: string;
  featuredObjectSlug: string;
}
