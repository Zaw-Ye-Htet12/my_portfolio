"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "Mingalarrooms.com",
        desc: "Property Finding Platform with efficient data fetching & analytics.",
        tech: ["React", "Node.js", "MySQL", "Docker", "AWS S3"],
        href: "#"
    },
    {
        title: "Pokémon Search App",
        desc: "High-performance app utilizing GraphQL & modern state management.",
        tech: ["Next.js", "GraphQL", "Shadcn/UI", "Tailwind CSS"],
        href: "#"
    }
];

export function FeaturedProjects() {
    return (
        <section id="projects" className="w-full py-32 bg-background text-foreground px-6 md:px-12 border-t border-border">
            <div className="max-w-7xl mx-auto space-y-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-end justify-between border-b border-border pb-8"
                >
                    <h2 className="text-6xl md:text-9xl font-bold font-mono tracking-tighter uppercase leading-none">
                        Selected<br />Works
                    </h2>
                    <span className="font-mono text-sm tracking-widest text-muted-foreground mb-2">
                        (2023 — 2025)
                    </span>
                </motion.div>

                <div className="space-y-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative cursor-pointer"
                        >
                            {/* Image Placeholder */}
                            <div className="w-full h-[50vh] md:h-[70vh] bg-muted border border-border relative overflow-hidden mb-8 transition-transform duration-700 ease-out group-hover:scale-[1.01]">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
                                        Project Preview Image
                                    </span>
                                </div>
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-foreground mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-border pb-8">
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-bold font-mono uppercase tracking-tighter mb-2 group-hover:text-transparent group-hover:stroke-foreground group-hover:stroke-1 transition-all duration-300"
                                        style={{ WebkitTextStroke: "1px var(--foreground)" }}>
                                        {project.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-muted-foreground font-mono tracking-wide uppercase">
                                        {project.desc}
                                    </p>
                                </div>

                                <div className="flex flex-col md:items-end gap-4">
                                    <div className="flex gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-3 py-1 border border-border text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <Link href={project.href} className="inline-flex items-center gap-2 group/btn text-muted-foreground hover:text-foreground transition-colors">
                                        <span className="uppercase font-mono text-sm tracking-widest group-hover/btn:underline decoration-foreground underline-offset-4">View Case Study</span>
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
