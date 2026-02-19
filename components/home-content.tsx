"use client";

import { LoadingScreen } from "@/components/loading-screen";
import { Hero } from "@/components/sections/hero";
import { TerminalBio } from "@/components/sections/terminal-bio";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Skills } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { EducationContact } from "@/components/sections/education-contact";

export function HomeContent() {
    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <LoadingScreen />
            <div className="flex flex-col items-center justify-between">
                <Hero />
                <TerminalBio />
                <ExperienceTimeline />
                <Skills />
                <FeaturedProjects />
                <EducationContact />
            </div>
        </main>
    );
}
