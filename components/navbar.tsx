"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#experience" },
    { name: "Stack", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

const Logo3D = () => {
    const x = useSpring(0, { stiffness: 100, damping: 20 });
    const y = useSpring(0, { stiffness: 100, damping: 20 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (e.clientX - centerX) / centerX;
            const offsetY = (e.clientY - centerY) / centerY;

            // Rotate based on mouse position (max 45 degrees)
            x.set(-offsetY * 45);
            y.set(offsetX * 45);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    return (
        <div style={{ perspective: "800px" }} className="w-8 h-8">
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    rotateX: x,
                    rotateY: y,
                    transformStyle: "preserve-3d",
                }}
                className="relative"
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 bg-foreground flex items-center justify-center text-background font-bold font-mono text-lg border border-background/20"
                    style={{ transform: "translateZ(16px)" }}
                >
                    Z
                </div>
                {/* Back Face */}
                <div
                    className="absolute inset-0 bg-foreground/80 border border-background/20"
                    style={{ transform: "rotateY(180deg) translateZ(16px)" }}
                />
                {/* Right Face */}
                <div
                    className="absolute inset-0 bg-foreground/90 border border-background/20"
                    style={{ transform: "rotateY(90deg) translateZ(16px)" }}
                />
                {/* Left Face */}
                <div
                    className="absolute inset-0 bg-foreground/90 border border-background/20"
                    style={{ transform: "rotateY(-90deg) translateZ(16px)" }}
                />
                {/* Top Face */}
                <div
                    className="absolute inset-0 bg-foreground/90 border border-background/20"
                    style={{ transform: "rotateX(90deg) translateZ(16px)" }}
                />
                {/* Bottom Face */}
                <div
                    className="absolute inset-0 bg-foreground/90 border border-background/20"
                    style={{ transform: "rotateX(-90deg) translateZ(16px)" }}
                />
            </motion.div>
        </div>
    );
};

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${scrolled ? "py-4" : "py-6"
                }`}
        >
            <div
                className={`relative flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-300 bg-background/50 backdrop-blur-xl border border-border ${scrolled ? "shadow-[0_0_20px_rgba(0,0,0,0.1)]" : "bg-transparent border-transparent"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-4 z-50">
                    <Logo3D />
                    <span className="font-mono text-sm tracking-widest text-foreground transition-colors uppercase">
                        Zaw Ye Htet
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            className="relative text-sm font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <ThemeToggle />
                    <Button
                        asChild
                        variant="outline"
                        className="ml-4 h-9 px-4 rounded-none border-border text-foreground hover:bg-foreground hover:text-background font-mono text-xs uppercase tracking-widest transition-all"
                    >
                        <Link href="/resume.pdf" target="_blank">Resume</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 text-foreground"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Nav Overlay */}
                <motion.div
                    initial={{ opacity: 0, pointerEvents: "none" }}
                    animate={{ opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? "auto" : "none" }}
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-background/95 backdrop-blur-3xl border border-border flex flex-col gap-4 items-center md:hidden"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-muted-foreground hover:text-foreground font-mono uppercase tracking-widest text-sm py-2"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        asChild
                        className="w-full rounded-none bg-foreground text-background font-mono uppercase tracking-widest"
                    >
                        <Link href="/resume.pdf">Resume</Link>
                    </Button>
                </motion.div>
            </div>
        </motion.header>
    );
}
