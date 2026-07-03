import { Hero } from "@/components/sections/Hero";
import { ObjectCollection } from "@/components/sections/ObjectCollection";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { SpaceStyling } from "@/components/sections/SpaceStyling";
import { JournalTeaser } from "@/components/sections/JournalTeaser";
import { AboutContactSplit } from "@/components/sections/AboutContactSplit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ObjectCollection />
      <SelectedProjects />
      <SpaceStyling />
      <JournalTeaser />
      <AboutContactSplit />
    </>
  );
}
