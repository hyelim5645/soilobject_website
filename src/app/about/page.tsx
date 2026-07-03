import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IMAGE_SLOTS, SITE_NAME_KO } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "About — SOIL STUDIO",
  description: "소일 스튜디오의 철학과 이야기.",
};

export default function AboutPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-5xl">
        <p className="label-uppercase text-xs text-mist-500">About</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
          Our Philosophy
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-16">
          <div className="order-2 space-y-6 leading-relaxed text-ink/80 md:order-1 md:col-span-3">
            <p>
              우리는 공간을 시공하지 않습니다. 대신 그 공간에 놓일 오브제를
              만듭니다. {SITE_NAME_KO}는 자연이 지닌 여백과 질감을 조명, 화병,
              플랜트 스탠드, 원목 벤치로 옮겨오는 작업을 합니다.
            </p>
            <p>
              채우기보다 덜어내는 감각으로, 공간과 사물 사이의 거리감을
              조율합니다. 하나의 오브제가 공간의 중심이 될 수 있다는 믿음으로
              소재와 형태를 고릅니다. 완벽하게 다듬어진 것보다 자연스러운
              결을 그대로 남기는 방식을 택합니다.
            </p>
            <p>우리는 자연을 통해 더 나은 공간과 삶을 제안합니다.</p>
          </div>

          <div className="order-1 md:order-2 md:col-span-2">
            <PlaceholderImage
              image={{
                src: null,
                alt: "About Soil Studio",
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
