import { Hero } from "@/components/sections/hero";
import { TerminalBio } from "@/components/sections/terminal-bio";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Skills } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { EducationContact } from "@/components/sections/education-contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <TerminalBio />
      <ExperienceTimeline />
      <Skills />
      <FeaturedProjects />
      <EducationContact />
    </div>
  );
}
