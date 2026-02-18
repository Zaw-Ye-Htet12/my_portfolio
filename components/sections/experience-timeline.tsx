"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
    {
        company: "HexDev",
        role: "Frontend Developer (Freelance)",
        period: "2024 - Present",
        description: "Focusing on building high-performance web applications using React and Next.js. Achieved 20% performance gains through code optimization and modern best practices.",
        tags: ["React", "Next.js", "Tailwind CSS", "Performance"],
    },
    {
        company: "FRONTIIR (Myanmar Net)",
        role: "Associate Software Engineer",
        period: "2022 - 2024",
        description: "Handled Odoo ERP development and customization. Built and maintained microservices using Python. Contributed to internal property platforms and system integrations.",
        tags: ["Python", "Odoo", "Microservices", "PostgreSQL"],
    },
];

export function ExperienceTimeline() {
    return (
        <section id="experience" className="container mx-auto px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Professional Experience</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    My journey in the software industry, from enterprise ERP systems to modern web development.
                </p>
            </motion.div>

            <div className="relative mx-auto max-w-3xl">
                {/* Vertical Line */}
                <div className="absolute left-0 lg:left-1/2 h-full w-px bg-border -translate-x-1/2 hidden lg:block" />
                <div className="absolute left-4 h-full w-px bg-border lg:hidden" />

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col gap-4 lg:flex-row ${index % 2 === 0 ? "lg:text-right" : "lg:flex-row-reverse"
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 mt-1.5 hidden lg:block" />
                            <div className="absolute left-4 -translate-x-[5px] w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mt-1.5 lg:hidden" />

                            {/* Content Spacer for Desktop */}
                            <div className="flex-1 lg:w-1/2" />

                            {/* Card */}
                            <div className={`flex-1 lg:w-1/2 pl-12 lg:pl-0 ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                                <Card className="relative overflow-hidden border-none bg-secondary/20 hover:bg-secondary/40 transition-colors">
                                    <CardHeader>
                                        <div className={`flex flex-col gap-2 ${index % 2 === 0 ? "lg:items-end" : "lg:items-start"}`}>
                                            <div className="flex items-center gap-2 text-primary font-semibold">
                                                <Briefcase className="h-4 w-4" />
                                                {exp.company}
                                            </div>
                                            <CardTitle className="text-xl">{exp.role}</CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                {exp.period}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-muted-foreground">
                                            {exp.description}
                                        </p>
                                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"}`}>
                                            {exp.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
