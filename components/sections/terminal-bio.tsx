"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function TerminalBio() {
    const [text, setText] = useState("");
    const fullText = `const developer = {
  name: "Zaw Ye Htet",
  role: "Full-Stack Developer",
  company: "FRONTIIR (Myanmar Net)",
  skills: [
    "React", "Next.js", "Node.js",
    "PostgreSQL", "Docker", "AWS"
  ],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    return this.hardWorker && this.problemSolver;
  }
};`;

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length) {
                clearInterval(timer);
            }
        }, 25);
        return () => clearInterval(timer);
    }, [fullText]);

    return (
        <section className="container mx-auto px-4 py-24 min-h-[50vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl rounded-xl border bg-[#1e1e1e] shadow-2xl overflow-hidden"
            >
                <div className="flex items-center justify-between border-b border-white/10 bg-[#2d2d2d] px-4 py-3">
                    <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                        <Terminal className="h-4 w-4" />
                        <span>bio.js</span>
                    </div>
                    <div className="w-16" /> {/* Spacer for balance */}
                </div>

                <div className="p-6 font-mono text-sm sm:text-base overflow-x-auto">
                    <pre className="text-gray-300">
                        <code>
                            {text.split("\n").map((line, i) => (
                                <div key={i} className="table-row">
                                    <span className="table-cell select-none pr-4 text-right text-gray-600 w-8">
                                        {i + 1}
                                    </span>
                                    <span className="table-cell">
                                        {/* Basic syntax highlighting simulation */}
                                        <span dangerouslySetInnerHTML={{
                                            __html: line
                                                .replace(/"(.*?)"/g, '<span class="text-[#ce9178]">"$1"</span>')
                                                .replace(/(const|function|return|this)/g, '<span class="text-[#569cd6]">$1"</span>')
                                                .replace(/([a-zA-Z0-9_]+):/g, '<span class="text-[#9cdcfe]">$1</span>:')
                                                .replace(/(true|false)/g, '<span class="text-[#569cd6]">$1"</span>')
                                        }} />
                                        {/* Blinking cursor at the end of the last line being typed */}
                                        {i === text.split("\n").length - 1 && (
                                            <span className="animate-pulse inline-block w-2 h-4 bg-[#569cd6] align-middle ml-1" />
                                        )}
                                    </span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>
            </motion.div>
        </section>
    );
}
