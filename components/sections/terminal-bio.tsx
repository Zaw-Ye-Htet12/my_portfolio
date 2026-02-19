"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface Command {
    cmd: string;
    output: React.ReactNode;
}

const commands: Record<string, React.ReactNode> = {
    help: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
            <span><span className="text-blue-400">about</span> &mdash; Display bio information</span>
            <span><span className="text-blue-400">stack</span> &mdash; List technical skills</span>
            <span><span className="text-blue-400">projects</span> &mdash; View selected works</span>
            <span><span className="text-blue-400">contact</span> &mdash; Show contact details</span>
            <span><span className="text-blue-400">clear</span> &mdash; Clear terminal screen</span>
        </div>
    ),
    about: (
        <div className="space-y-2 text-muted-foreground">
            <p>Name: <span className="text-foreground font-bold">Zaw Ye Htet (Simon)</span></p>
            <p>Role: <span className="text-foreground">Full-Stack Software Engineer</span></p>
            <p>Location: <span className="text-foreground">Bangkok, Thailand (DTV Visa Holder)</span></p>
            <p>Status: <span className="text-green-500">Available for opportunities</span></p>
            <p>Bio: Building scalable SaaS applications with modern web technologies.</p>
        </div>
    ),
    stack: (
        <div className="text-muted-foreground">
            <p className="mb-2">Core Technologies:</p>
            <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "Supabase", "TailwindCSS"].map(tech => (
                    <span key={tech} className="bg-muted px-2 py-1 rounded text-foreground text-xs">{tech}</span>
                ))}
            </div>
        </div>
    ),
    projects: (
        <div className="text-muted-foreground">
            <p>Use the navigation or scroll down to view detailed project case studies.</p>
        </div>
    ),
    contact: (
        <div className="text-muted-foreground">
            <p>Email: <a href="mailto:zawyehtet1004@gmail.com" className="text-blue-400 underline decoration-blue-400/30 underline-offset-4 hover:decoration-blue-400">zawyehtet1004@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com" target="_blank" className="text-blue-400 underline decoration-blue-400/30 underline-offset-4 hover:decoration-blue-400">github.com/zawyehtet</a></p>
        </div>
    ),
    whoami: "guest@portfolio:~$ access_level: visitor",
};

export function TerminalBio() {
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initial greeting
    useEffect(() => {
        setHistory([
            {
                cmd: "init",
                output: (
                    <div className="mb-4">
                        <p className="text-muted-foreground">Welcome to ZYH Terminal v2.0.0</p>
                        <p className="text-muted-foreground">Type <span className="text-blue-400">'help'</span> to see available commands.</p>
                    </div>
                )
            }
        ]);
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        if (cmd === "clear") {
            setHistory([]);
            setInput("");
            return;
        }

        let output: React.ReactNode;
        if (commands[cmd]) {
            output = commands[cmd];
        } else {
            output = (
                <span className="text-red-400">
                    Command not found: '{cmd}'. Type 'help' for available commands.
                </span>
            );
        }

        setHistory(prev => [...prev, { cmd, output }]);
        setInput("");
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    return (
        <section id="about" className="w-full bg-background py-20 px-4 md:px-8 flex justify-center border-t border-border/40">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-4xl"
            >
                {/* Window Container */}
                <div
                    className="relative rounded-xl overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] shadow-2xl border border-gray-500/20 font-mono text-sm group"
                    onClick={handleContainerClick}
                >
                    {/* Window Header */}
                    <div className="flex items-center px-4 py-3 bg-[#e8e8e8] dark:bg-[#1a1a1a] border-b border-gray-300 dark:border-gray-800 select-none">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-110 transition-all cursor-pointer" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-110 transition-all cursor-pointer" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:brightness-110 transition-all cursor-pointer" />
                        </div>
                        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <Terminal className="w-3 h-3" />
                                <span className="text-xs font-medium font-sans">zaw-ye-htet — -zsh — 80x24</span>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div
                        ref={scrollRef}
                        className="p-6 h-[450px] overflow-y-auto bg-[#1e1e1e] dark:bg-black text-gray-200 selection:bg-white/20 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                    >
                        {/* Status Bar */}
                        <div className="mb-6 flex justify-between text-xs text-gray-500 select-none">
                            <span>Last login: {new Date().toDateString()} on ttys000</span>
                        </div>

                        {/* History */}
                        <div className="space-y-4">
                            {history.map((item, i) => (
                                <div key={i} className="flex flex-col">
                                    {item.cmd !== "init" && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-400">➜</span>
                                            <span className="text-blue-400">~</span>
                                            <span className="text-gray-400">{item.cmd}</span>
                                        </div>
                                    )}
                                    <div className="mt-1 ml-6 leading-relaxed">
                                        {item.output}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Line */}
                        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 relative">
                            <span className="text-green-400 select-none">➜</span>
                            <span className="text-blue-400 select-none">~</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="bg-transparent outline-none border-none text-white w-full font-mono caret-white focus:ring-0 p-0 m-0 h-6"
                                autoFocus
                                spellCheck="false"
                                autoComplete="off"
                            />
                            {/* Custom Cursor if needed, but native caret works well */}
                        </form>
                        <div className="h-4" /> {/* Spacer for scroll */}
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center px-2">
                    <p className="text-xs font-mono text-muted-foreground/60">
                        * Try different commands to explore the system.
                    </p>
                    <div className={`w-2 h-2 rounded-full ${isFocused ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                </div>

            </motion.div>
        </section>
    );
}
