import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getJournalPostBySlug, getJournalPosts } from "@/lib/data/journal";
import { formatDate } from "@/lib/utils/format";

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — SOIL STUDIO`, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="py-16 md:py-24">
      <Container className="max-w-2xl">
        <Link href="/journal" className="label-uppercase text-xs text-mist-500 hover:text-ink">
          Journal
        </Link>
        <p className="label-uppercase mt-6 text-xs text-mist-500">
          {formatDate(post.publishedAt)}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
          {post.title}
        </h1>

        <PlaceholderImage image={post.coverImage} className="mt-10 w-full" />

        <p className="mt-10 leading-relaxed text-ink/80">{post.content}</p>
      </Container>
    </article>
  );
}
