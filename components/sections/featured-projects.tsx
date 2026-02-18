"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "Mingalarrooms.com",
        description: "A comprehensive property finding website tailored for the Myanmar market. Features include advanced search filtering, user authentication, and property management for agents.",
        tags: ["React", "Node.js", "MySQL", "AWS S3", "Express"],
        image: "/project-placeholder-1.jpg", // Placeholder until real image
        links: {
            demo: "https://mingalarrooms.com", // Assuming live URL based on name
            github: "#", // Private repo likely
        },
    },
    {
        title: "Pokémon Search App",
        description: "A modern, high-performance Pokémon search application built with Next.js App Router and GraphQL. detailed stats, evolutions, and types.",
        tags: ["Next.js 15", "GraphQL", "Tailwind CSS", "Framer Motion"],
        image: "/project-placeholder-2.jpg", // Placeholder
        links: {
            demo: "#",
            github: "https://github.com",
        },
    },
];

export function FeaturedProjects() {
    return (
        <section id="projects" className="container mx-auto px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Featured Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    A selection of projects that showcase my technical depth and problem-solving abilities.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl dark:bg-card/50">
                            <div className="relative h-48 w-full bg-muted overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-sm opacity-50">
                                    {project.title} Preview
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">{project.title}</CardTitle>
                                <CardDescription className="text-base mt-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                {project.links.github !== "#" && (
                                    <Button variant="outline" size="sm" className="gap-2" asChild>
                                        <Link href={project.links.github} target="_blank">
                                            <Github className="h-4 w-4" />
                                            Code
                                        </Link>
                                    </Button>
                                )}
                                {project.links.demo !== "#" && (
                                    <Button size="sm" className="gap-2" asChild>
                                        <Link href={project.links.demo} target="_blank">
                                            <ExternalLink className="h-4 w-4" />
                                            Live Demo
                                        </Link>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
