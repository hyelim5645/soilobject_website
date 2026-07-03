import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IMAGE_SLOTS } from "@/lib/utils/constants";

const CATEGORIES = [
  { label: "Residential", ko: "주거" },
  { label: "Commercial", ko: "상업" },
  { label: "Hospitality", ko: "호스피탈리티" },
  { label: "Retail", ko: "리테일" },
];

export function SpaceStyling() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          number="03"
          title="Where They Belong"
          subtitle="어떤 공간이든, 오브제 하나 놓을 자리는 있습니다."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href="/objects"
              className="group relative block"
            >
              <PlaceholderImage
                tone="dark"
                image={{
                  src: null,
                  alt: `${category.label} 공간`,
                  width: IMAGE_SLOTS.categoryTile.width,
                  height: IMAGE_SLOTS.categoryTile.height,
                }}
                className="w-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/30 transition-colors group-hover:bg-ink/55">
                <p className="text-lg font-semibold text-paper md:text-xl">
                  {category.label}
                </p>
                <p className="label-uppercase text-[10px] text-paper/0 transition-colors group-hover:text-paper/80">
                  Shop Objects
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
