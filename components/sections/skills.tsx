"use client";

import { motion } from "framer-motion";
import {
    Code2, Database, Layout, Server, Container, Cloud, Cpu, Braces,
    Terminal, Globe, Shield, Zap
} from "lucide-react";

const skills = [
    { name: "Next.js", icon: Globe, category: "Frontend" },
    { name: "React", icon: Code2, category: "Frontend" },
    { name: "TypeScript", icon: Braces, category: "Language" },
    { name: "Node.js", icon: Server, category: "Backend" },
    { name: "Express.js", icon: Server, category: "Backend" },
    { name: "Laravel", icon: Terminal, category: "Backend" },
    { name: "Supabase", icon: Database, category: "BaaS" },
    { name: "PostgreSQL", icon: Database, category: "Database" },
    { name: "Docker", icon: Container, category: "DevOps" },
    { name: "AWS", icon: Cloud, category: "Cloud" },
    { name: "Tailwind", icon: Layout, category: "Styling" },
    { name: "GraphQL", icon: Zap, category: "API" },
];

export function Skills() {
    return (
        <section id="skills" className="w-full py-24 bg-background text-foreground border-t border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:flex md:items-end md:justify-between"
                >
                    <h2 className="text-5xl md:text-7xl font-bold font-mono uppercase tracking-tighter">
                        Tech Arsenal
                    </h2>
                    <p className="mt-4 md:mt-0 text-muted-foreground font-mono text-sm uppercase tracking-widest text-right">
                        / Current Stack
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t border-border">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative border-r border-b border-border aspect-square flex flex-col items-center justify-center p-6 hover:bg-foreground hover:text-background transition-colors duration-500 cursor-default"
                        >
                            <skill.icon className="w-10 h-10 mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
                            <span className="font-mono text-sm uppercase tracking-widest font-bold">
                                {skill.name}
                            </span>
                            <span className="absolute bottom-4 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest font-mono">
                                {skill.category}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
