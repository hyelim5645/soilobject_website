import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getProjects } from "@/lib/data/journal";

export async function SelectedProjects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="bg-paper-dim py-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            number="02"
            title="Styled Spaces"
            subtitle="소일의 오브제가 실제로 놓인 공간들입니다."
          />
          <Link
            href="/objects"
            className="label-uppercase hidden shrink-0 text-xs text-ink hover:text-wood-600 sm:block"
          >
            Shop Objects
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/objects/${project.featuredObjectSlug}`}
              className="group block"
            >
              <PlaceholderImage image={project.image} className="w-full" />
              <p className="mt-4 text-sm text-ink transition-colors group-hover:text-wood-600">
                {project.title}
              </p>
              <p className="label-uppercase mt-1 text-xs text-mist-500">
                {project.category} · {project.featuredObjectName}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
