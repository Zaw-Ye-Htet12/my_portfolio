"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/loading-screen";
import { Hero } from "@/components/sections/hero";
import { TerminalBio } from "@/components/sections/terminal-bio";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Skills } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { EducationContact } from "@/components/sections/education-contact";

// Dynamic import to avoid SSR issues with Three.js/WebGL
const Badge3D = dynamic(
    () => import("@/components/sections/badge-3d").then((mod) => mod.Badge3D),
    {
        ssr: false,
        loading: () => (
            <section className="w-full py-24 flex justify-center">
                <div className="w-full max-w-4xl h-[600px] bg-card/30 border border-border animate-pulse" />
            </section>
        ),
    }
);

export function HomeContent() {
    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <LoadingScreen />
            <div className="flex flex-col items-center justify-between">
                <Hero />
                <TerminalBio />
                <ExperienceTimeline />
                <Skills />
                <Badge3D />
                <FeaturedProjects />
                <EducationContact />
            </div>
        </main>
    );
}
