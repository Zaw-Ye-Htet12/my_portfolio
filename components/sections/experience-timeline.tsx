"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        company: "HexDev (Freelance)",
        role: "Frontend Developer",
        period: "Nov 2024 – Dec 2025",
        description: "Specialized in developing reusable and scalable UI components using React and Next.js. Achieved a ~20% increase in performance through strategic optimization.",
        tech: ["React", "Next.js", "Tailwind CSS", "SSR"]
    },
    {
        company: "FRONTIIR (Myanmar Net)",
        role: "Associate Software Engineer",
        period: "July 2023 – Mar 2024",
        description: "Engineered solutions for ERP and microservices-based systems using Python and Odoo. Enhanced system stability by resolving ~40% of production bugs.",
        tech: ["Python", "Odoo", "Microservices", "PostgreSQL"]
    },
];

export function ExperienceTimeline() {
    return (
        <section id="experience" className="w-full py-20 px-4 md:px-10 border-t border-border bg-background text-foreground">
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold font-mono uppercase mb-16 tracking-tighter"
                >
                    Selected Work
                </motion.h2>

                <div className="space-y-0 divide-y divide-border border-b border-border">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start hover:bg-muted/50 transition-colors duration-500 px-4 cursor-pointer"
                        >
                            {/* Period */}
                            <div className="md:col-span-3">
                                <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase group-hover:text-foreground transition-colors">
                                    {exp.period}
                                </span>
                            </div>

                            {/* Role & Company */}
                            <div className="md:col-span-5">
                                <h3 className="text-2xl md:text-3xl font-bold uppercase mb-1 group-hover:skew-x-2 transition-transform duration-300">
                                    {exp.role}
                                </h3>
                                <p className="text-lg text-muted-foreground font-mono">{exp.company}</p>
                            </div>

                            {/* Tech & Description - Right Side */}
                            <div className="md:col-span-4 flex flex-col justify-between h-full">
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="text-xs font-mono border border-border px-2 py-1 uppercase text-muted-foreground group-hover:border-foreground/50 group-hover:text-foreground transition-all">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
