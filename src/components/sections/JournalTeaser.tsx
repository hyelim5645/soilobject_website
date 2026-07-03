import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getJournalPosts } from "@/lib/data/journal";
import { formatDate } from "@/lib/utils/format";

export async function JournalTeaser() {
  const posts = await getJournalPosts();

  return (
    <section className="bg-paper-dim py-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            number="04"
            title="Journal"
            subtitle="자연과 공간, 그리고 일상에 대한 이야기를 전합니다."
          />
          <Link
            href="/journal"
            className="label-uppercase hidden shrink-0 text-xs text-ink hover:text-wood-600 sm:block"
          >
            Read All
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
          {posts.map((post) => (
            <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
              <PlaceholderImage image={post.coverImage} className="w-full" />
              <p className="mt-4 text-sm text-ink transition-colors group-hover:text-wood-600">
                {post.title}
              </p>
              <p className="label-uppercase mt-1 text-xs text-mist-500">
                {formatDate(post.publishedAt)}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
