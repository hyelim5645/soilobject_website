import type { JournalPost, ProjectEntry } from "@/lib/data/types";
import journalData from "@/lib/data/mock/journal.json";
import projectsData from "@/lib/data/mock/projects.json";

// Seam: swap for Supabase queries later, see products.ts for the pattern.

const journalPosts = journalData as JournalPost[];
const projects = projectsData as ProjectEntry[];

export async function getJournalPosts(): Promise<JournalPost[]> {
  return journalPosts;
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | undefined> {
  return journalPosts.find((post) => post.slug === slug);
}

export async function getProjects(): Promise<ProjectEntry[]> {
  return projects;
}
