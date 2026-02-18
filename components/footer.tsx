"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background/95 py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-8">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <span className="font-semibold text-foreground">
                        Zaw Ye Htet
                    </span>
                    . The source code is available on{" "}
                    <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        GitHub
                    </Link>
                    .
                </p>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:zawyehtet1004@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
