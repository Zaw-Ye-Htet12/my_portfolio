"use client";

import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function EducationContact() {
    const [copied, setCopied] = useState(false);
    const email = "zawyehtet1004@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <section id="contact" className="w-full py-32 bg-background text-foreground px-6 md:px-12 border-t border-border">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">

                {/* Contact Info */}
                <div className="flex-1 space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-bold font-mono tracking-tighter uppercase leading-none"
                    >
                        Let's<br />Talk
                    </motion.h2>

                    <p className="max-w-md text-muted-foreground font-mono text-sm leading-relaxed uppercase tracking-wide">
                        Available for freelance projects and full-time opportunities.
                        Let's build something scalable.
                    </p>

                    <div className="flex items-center gap-4">
                        <a href={`mailto:${email}`} className="text-2xl md:text-4xl font-mono underline decoration-muted-foreground/30 underline-offset-8 hover:decoration-foreground transition-all">
                            {email}
                        </a>
                        <button onClick={handleCopy} className="p-2 hover:bg-muted rounded-full transition-colors relative group">
                            <Copy className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                            {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-foreground text-background px-2 py-1 font-mono uppercase">Copied!</span>}
                        </button>
                    </div>

                    <div className="flex gap-6 pt-8">
                        <Link href="https://www.linkedin.com/in/zawyehtet/" className="uppercase font-mono tracking-widest text-sm hover:underline decoration-foreground underline-offset-4">LinkedIn</Link>
                        <Link href="https://github.com/Zaw-Ye-Htet12" className="uppercase font-mono tracking-widest text-sm hover:underline decoration-foreground underline-offset-4">GitHub</Link>
                    </div>
                </div>

                {/* Education & Certs - Minimal Layout */}
                <div className="w-full md:w-auto md:min-w-[300px] space-y-12 text-right">
                    <div>
                        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">Education</h3>
                        <div className="space-y-4">
                            <div className="border-l border-border pl-4 py-1 hover:border-foreground transition-colors">
                                <h4 className="font-bold text-md uppercase leading-tight">B.Sc Computer Science</h4>
                                <p className="text-xs font-mono text-muted-foreground">KBTC / NCC Education (UK)</p>
                                <p className="text-xs font-mono text-muted-foreground">Pursuing</p>
                            </div>
                            <div className="border-l border-border pl-4 py-1 hover:border-foreground transition-colors">
                                <h4 className="font-bold text-md uppercase leading-tight">Level 5 Diploma</h4>
                                <p className="text-xs font-mono text-muted-foreground">NCC Education (UK)</p>
                                <p className="text-xs font-mono text-muted-foreground">Computing</p>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    );
}
