"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Random increment for realistic loading feel
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {progress < 100 && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
                    exit={{
                        opacity: 0,
                        // Explode effect: scale up and fade out
                        scale: 1.2,
                        filter: "blur(20px)",
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                >
                    {/* Central Loader - Futuristic Spinner */}
                    <div className="relative mb-8">
                        <motion.div
                            className="w-24 h-24 border-4 border-t-white border-r-white/20 border-b-white/20 border-l-white/20 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 w-24 h-24 border-4 border-t-transparent border-r-transparent border-b-white border-l-transparent rounded-full opacity-50"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xl">
                            {Math.round(progress)}%
                        </div>
                    </div>

                    {/* Simulation Text */}
                    <div className="h-6 font-mono text-sm text-white/70 uppercase tracking-widest">
                        {progress < 30 && "Initializing Core Systems..."}
                        {progress >= 30 && progress < 60 && "Loading Assets..."}
                        {progress >= 60 && progress < 90 && "Establishing Secure Connection..."}
                        {progress >= 90 && "System Ready."}
                    </div>

                    {/* Progress Bar Line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                        <motion.div
                            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
