import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getJournalPosts } from "@/lib/data/journal";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Journal — SOIL STUDIO",
  description: "자연과 공간, 그리고 일상에 대한 소일 스튜디오의 이야기.",
};

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="label-uppercase text-xs text-mist-500">Journal</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
          저널
        </h1>
        <p className="mt-4 max-w-md text-mist-500">
          자연과 공간, 그리고 일상에 대한 이야기를 전합니다.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
              <PlaceholderImage image={post.coverImage} className="w-full" />
              <p className="mt-4 text-base text-ink transition-colors group-hover:text-wood-600">
                {post.title}
              </p>
              <p className="mt-1 text-sm text-mist-500">{post.excerpt}</p>
              <p className="label-uppercase mt-2 text-xs text-mist-500">
                {formatDate(post.publishedAt)}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
