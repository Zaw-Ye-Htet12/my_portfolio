"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Layout,
    Server,
    Container,
    Cloud
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const skills = [
    {
        category: "Frontend",
        name: "React & Next.js",
        icon: Layout,
        description: "Building modern, interactive UIs with Server Components and Client enhancements."
    },
    {
        category: "Language",
        name: "TypeScript",
        icon: Code2,
        description: "Ensuring type safety and scalable codebases."
    },
    {
        category: "Backend",
        name: "Node.js",
        icon: Server,
        description: "Developing robust APIs and microservices."
    },
    {
        category: "Database",
        name: "PostgreSQL",
        icon: Database,
        description: "Designing efficient schemas and managing data."
    },
    {
        category: "DevOps",
        name: "Docker",
        icon: Container,
        description: "Containerizing applications for consistent deployment."
    },
    {
        category: "Cloud",
        name: "AWS (EC2)",
        icon: Cloud,
        description: "Deploying and managing scalable cloud infrastructure."
    },
];

export function Skills() {
    return (
        <section id="skills" className="container mx-auto px-4 py-24 bg-secondary/10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Technical Arsenal</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    The tools and technologies I use to build digital products.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full border-border/50 hover:border-primary/50 transition-colors hover:shadow-lg">
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <skill.icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{skill.name}</h3>
                                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
