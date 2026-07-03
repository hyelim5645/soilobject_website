import { z } from "zod";

export const shippingAddressSchema = z.object({
  recipientName: z.string().trim().min(1, "받는 분 성함을 입력해주세요."),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해주세요.")
    .regex(/^[0-9-]{9,14}$/, "올바른 연락처 형식이 아닙니다."),
  postalCode: z.string().trim().min(1, "우편번호를 검색해주세요."),
  address1: z.string().trim().min(1, "주소를 검색해주세요."),
  address2: z.string().trim().optional(),
  memo: z.string().trim().optional(),
});

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;
