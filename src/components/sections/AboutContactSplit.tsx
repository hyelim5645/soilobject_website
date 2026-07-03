import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IMAGE_SLOTS } from "@/lib/utils/constants";

export function AboutContactSplit() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative flex flex-col justify-end gap-6 bg-ink px-6 py-16 text-paper md:px-10 md:py-24">
        <PlaceholderImage
          tone="dark"
          image={{
            src: null,
            alt: "About Soil — 식물과 화병이 있는 정경",
            width: IMAGE_SLOTS.aboutSplit.width,
            height: IMAGE_SLOTS.aboutSplit.height,
          }}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10">
          <p className="label-uppercase text-xs text-paper/70">05</p>
          <h2 className="label-uppercase mt-2 text-sm font-medium">About Soil</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-paper/80">
            자연의 질감을 오브제로, 오브제를 다시 공간의 일부로.
          </p>
          <Link
            href="/about"
            className="label-uppercase mt-8 inline-block text-xs text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
          >
            Our Philosophy
          </Link>
        </div>
      </div>

      <div className="relative flex flex-col justify-end gap-6 bg-ink-soft px-6 py-16 text-paper md:px-10 md:py-24">
        <PlaceholderImage
          tone="dark"
          image={{
            src: null,
            alt: "Contact Soil — 명함과 자연 소재의 정경",
            width: IMAGE_SLOTS.aboutSplit.width,
            height: IMAGE_SLOTS.aboutSplit.height,
          }}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10">
          <p className="label-uppercase text-xs text-paper/70">06</p>
          <h2 className="label-uppercase mt-2 text-sm font-medium">Contact</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-paper/80">
            입점, 대량 구매, 브랜드 협업 문의를 받고 있습니다.
          </p>
          <Link
            href="/contact"
            className="label-uppercase mt-8 inline-block text-xs text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
