import type { ObjectCategory, OrderStatus } from "@/lib/data/types";

export const NAV_ITEMS = [
  { label: "OBJECTS", href: "/objects" },
  { label: "SPACES", href: "/#projects" },
  { label: "JOURNAL", href: "/journal" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const CATEGORY_LABELS: Record<ObjectCategory, { ko: string; en: string }> = {
  lamp: { ko: "조명", en: "Lamp" },
  vase: { ko: "화병", en: "Vase" },
  "plant-stand": { ko: "플랜트 스탠드", en: "Plant Stand" },
  bench: { ko: "원목 벤치", en: "Bench" },
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "주문접수",
  confirmed: "주문확인",
  preparing: "배송준비중",
  shipped: "배송중",
  completed: "배송완료",
  cancelled: "취소",
};

export const SHIPPING_FEE = 3500;
export const FREE_SHIPPING_THRESHOLD = 50000;

/** Section image slot aspect ratios — see README for full documentation. */
export const IMAGE_SLOTS = {
  hero: { ratio: "16 / 10", width: 1920, height: 1200 },
  projectGrid: { ratio: "4 / 5", width: 1000, height: 1250 },
  productCard: { ratio: "4 / 5", width: 900, height: 1125 },
  productGalleryPrimary: { ratio: "4 / 5", width: 1200, height: 1500 },
  productGalleryThumb: { ratio: "1 / 1", width: 400, height: 400 },
  categoryTile: { ratio: "3 / 4", width: 1200, height: 1600 },
  journalCard: { ratio: "4 / 3", width: 800, height: 600 },
  aboutSplit: { ratio: "4 / 5", width: 1000, height: 1250 },
} as const;

export const SITE_NAME = "SOIL STUDIO";
export const SITE_NAME_KO = "소일 스튜디오";
