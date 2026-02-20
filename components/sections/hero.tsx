"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Terminal, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- Decrypted Text Effect ---
const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

const DecryptedText = ({ text, className, animateOnHover = false }: { text: string, className?: string, animateOnHover?: boolean }) => {
    const [outputText, setOutputText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const animate = () => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setOutputText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        if (!animateOnHover) animate();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMouseEnter = () => {
        if (animateOnHover) animate();
    };

    return (
        <span
            className={className}
            onMouseEnter={handleMouseEnter}
        >
            {outputText}
        </span>
    );
};

// --- Code Snippet Component ---
const CodeSnippet = () => {
    const codeLines = [
        "class Developer {",
        "   constructor() {",
        "       this.name = 'Zaw Ye Htet';",
        "       this.role = 'Full-Stack';",
        "       this.stack = ['Node.js', 'Next.js'];",
        "   }",
        "   deploy() {",
        "       return 'Production Ready';",
        "  }",
        "}"
    ];

    return (
        <div className="font-mono text-xs md:text-sm leading-relaxed text-muted-foreground p-4">
            {codeLines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <span className="text-gray-600 mr-4 select-none">{i + 1}</span>
                    <span className={line.includes("class") || line.includes("return") ? "text-purple-400" : line.includes("this") ? "text-blue-400" : "text-foreground"}>
                        {line}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export function Hero() {
    const { scrollY } = useScroll();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="group relative min-h-screen w-full flex items-center justify-center bg-background text-foreground overflow-hidden pt-20 pb-10 px-4 md:px-8"
            onMouseMove={handleMouseMove}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.1]" />

            {/* Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          var(--color-secondary),
                          transparent 80%
                        )
                    `,
                }}
            />

            {/* Main Grid Container */}
            <div className="z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

                {/* 1. Main Intro Card (Large) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-8 row-span-2 relative p-8 md:p-12 border border-border bg-card/50 backdrop-blur-sm overflow-hidden group/card"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <Cpu className="w-12 h-12 text-muted-foreground/20 animate-spin-slow" />
                    </div>

                    <div className="flex flex-col justify-between h-full space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-mono mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                AVAILABLE FOR WORK
                            </div>

                            <h1 className="text-5xl md:text-8xl font-bold font-mono tracking-tighter uppercase leading-[0.9]">
                                <span className="block text-muted-foreground/40 text-2xl md:text-4xl mb-2 tracking-widest">HELLO, I'M</span>
                                <DecryptedText text="ZAW YE" animateOnHover />
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
                                    HTET
                                </span>
                            </h1>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                            <p className="max-w-md text-muted-foreground font-mono text-sm leading-relaxed">
                                Full-Stack Software Engineer specializing in scalable SaaS architecture and high-performance web applications.
                                Based in Bangkok, Thailand.
                            </p>

                            <Button asChild className="rounded-none h-12 px-8 font-mono uppercase tracking-widest group-hover/card:bg-foreground group-hover/card:text-background transition-all">
                                <Link href="#projects">View Projects <ArrowRight className="ml-2 w-4 h-4" /></Link>
                            </Button>
                        </div>
                    </div>

                    {/* Decorative Corner */}
                    <svg className="absolute top-0 left-0 w-20 h-20 text-foreground/20" viewBox="0 0 100 100">
                        <path d="M0 0 L20 0 L20 2 M0 0 L0 20 L2 20" fill="currentColor" />
                    </svg>
                </motion.div>

                {/* 2. Code Terminal (Side) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="md:col-span-4 row-span-1 border border-border bg-black/90 relative overflow-hidden flex flex-col min-h-[300px]"
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">config.ts</span>
                    </div>
                    <CodeSnippet />
                    {/* Animated scanline */}
                    <div className="absolute left-0 w-full bg-gradient-to-b from-transparent via-green-500/10 to-transparent h-[20px] animate-scan pointer-events-none" />
                </motion.div>

                {/* 3. Latest Activity (Simulated) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="md:col-span-2 border border-border bg-card p-6 flex flex-col justify-between hover:bg-muted/50 transition-colors cursor-default min-h-[150px]"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase font-mono text-muted-foreground">Git Activity</span>
                        </div>
                        <Github className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1">Latest Commit</div>
                        <div className="text-sm font-mono font-bold truncate">feat: ultra-modern-ui</div>
                        <div className="text-[10px] font-mono text-muted-foreground mt-1">2m ago • main</div>
                    </div>
                </motion.div>

                {/* 4. Experience Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="md:col-span-2 border border-border bg-card p-6 flex flex-col justify-between hover:bg-muted/50 transition-colors cursor-default min-h-[150px]"
                >
                    <Terminal className="w-6 h-6 text-muted-foreground" />
                    <div>
                        <div className="text-3xl font-mono font-bold">3+</div>
                        <div className="text-xs text-muted-foreground font-mono uppercase">Years Exp.</div>
                    </div>
                </motion.div>

                {/* 5. Tech Stack Marquee (Bottom Wide) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="md:col-span-12 border border-border bg-card/30 p-4 flex items-center overflow-hidden relative min-h-[80px]"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                    <div className="flex gap-12 animate-marquee whitespace-nowrap items-center w-full">
                        {["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "SUPABASE", "AWS", "DOCKER", "GRAPHQL", "TAILWIND", "REDIS", "POSTGRESQL", "REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "SUPABASE", "AWS", "DOCKER", "GRAPHQL", "TAILWIND", "REDIS", "POSTGRESQL"].map((tech, i) => (
                            <span key={i} className="text-2xl md:text-4xl font-mono font-bold text-muted-foreground/20 uppercase tracking-widest select-none">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* Social Links sidebar (Fixed) */}
            <div className="absolute left-6 bottom-0 hidden md:flex flex-col gap-6 z-20 pb-8">
                <div className="w-px h-20 bg-border mx-auto" />
                <Link href="https://github.com/Zaw-Ye-Htet12" target="_blank" rel="noopener noreferrer" className="p-2 border border-border rounded-full hover:bg-foreground hover:text-background transition-all">
                    <Github className="w-4 h-4" />
                </Link>
                <Link href="https://www.linkedin.com/in/zawyehtet/" target="_blank" rel="noopener noreferrer" className="p-2 border border-border rounded-full hover:bg-foreground hover:text-background transition-all">
                    <Linkedin className="w-4 h-4" />
                </Link>
                <Link href="mailto:zawyehtet1004@gmail.com" className="p-2 border border-border rounded-full hover:bg-foreground hover:text-background transition-all">
                    <Mail className="w-4 h-4" />
                </Link>
            </div>

        </section>
    );
}
