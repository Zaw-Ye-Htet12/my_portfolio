"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 md:py-32">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] bg-primary/20 blur-[100px] rounded-full mix-blend-multiply filter opacity-70 dark:opacity-40"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -60, 0],
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] bg-purple-500/20 blur-[100px] rounded-full mix-blend-multiply filter opacity-70 dark:opacity-40"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 45, 0],
                        x: [0, 20, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute bottom-[-20%] left-[20%] h-[500px] w-[500px] bg-blue-500/20 blur-[100px] rounded-full mix-blend-multiply filter opacity-70 dark:opacity-40"
                />
            </div>

            <div className="container relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge variant="outline" className="mb-6 px-4 py-1 text-sm backdrop-blur-sm border-border/50">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Immediately available for jobs
                    </Badge>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                >
                    Zaw Ye Htet
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl font-mono"
                >
                    Full-Stack Developer building microservices, property platforms, and high-performance web applications.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <Button size="lg" className="gap-2 h-12 px-8 text-base">
                        <FileText className="h-4 w-4" />
                        Download CV
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" asChild>
                            <Link href="https://github.com" target="_blank">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" asChild>
                            <Link href="https://linkedin.com" target="_blank">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" asChild>
                            <Link href="mailto:zawyehtet1004@gmail.com">
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
        </section>
    );
}
