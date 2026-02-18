"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, FileText, Github, Linkedin, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-mono text-lg font-bold tracking-tighter">
                        {"<ZawYeHtet />"}
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-foreground/80 text-foreground/60",
                                pathname === item.href && "text-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                        <FileText className="h-4 w-4" />
                        Resume
                    </Button>
                </div>

                {/* Mobile Nav */}
                <div className="flex flex-1 items-center justify-end md:hidden gap-4">
                    <ThemeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[540px]">
                            <SheetHeader>
                                <SheetTitle className="text-left font-mono font-bold">Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <SheetClose asChild key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-lg font-medium transition-colors hover:text-primary"
                                        >
                                            {item.name}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </div>
                            <Separator className="my-6" />
                            <div className="flex flex-col gap-4">
                                <Button className="w-full gap-2" variant="outline">
                                    <FileText className="h-4 w-4" />
                                    Download CV
                                </Button>
                                <div className="flex justify-center gap-4 mt-4">
                                    <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground">
                                        <Github className="h-5 w-5" />
                                    </Link>
                                    <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground">
                                        <Linkedin className="h-5 w-5" />
                                    </Link>
                                    <Link href="mailto:zawyehtet1004@gmail.com" className="text-muted-foreground hover:text-foreground">
                                        <Mail className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
