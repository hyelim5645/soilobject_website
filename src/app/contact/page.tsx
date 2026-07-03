import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IMAGE_SLOTS } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Contact — SOIL STUDIO",
  description: "소일 스튜디오 주문, 입점, 협업 문의.",
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3">
            <p className="label-uppercase text-xs text-mist-500">Contact</p>
            <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
              Get in Touch
            </h1>
            <p className="mt-4 leading-relaxed text-mist-500">
              주문/배송 문의는 이메일로, 입점·대량 구매·브랜드 협업 제안은
              아래 채널로 편하게 남겨주세요.
            </p>

            <dl className="mt-10 space-y-6 border-t border-mist-300/60 pt-8 text-sm">
              <div>
                <dt className="label-uppercase text-xs text-mist-500">Address</dt>
                <dd className="mt-2 leading-relaxed text-ink">
                  서울특별시 성동구 이패원로 54길 58
                  <br />
                  소일 스튜디오
                </dd>
              </div>
              <div>
                <dt className="label-uppercase text-xs text-mist-500">Phone</dt>
                <dd className="mt-2 text-ink">+82 10 1234 5678</dd>
              </div>
              <div>
                <dt className="label-uppercase text-xs text-mist-500">Email</dt>
                <dd className="mt-2 text-ink">hello@soilstudio.co.kr</dd>
              </div>
              <div>
                <dt className="label-uppercase text-xs text-mist-500">Instagram</dt>
                <dd className="mt-2 text-ink">@soilstudio</dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-2">
            <PlaceholderImage
              image={{
                src: null,
                alt: "소일 스튜디오 쇼룸",
                width: IMAGE_SLOTS.aboutSplit.width,
                height: IMAGE_SLOTS.aboutSplit.height,
              }}
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
