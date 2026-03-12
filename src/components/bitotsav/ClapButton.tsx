'use client';

import { useState, useEffect } from 'react';
import { incrementClaps } from '@/app/actions/bitotsav';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClapButton({ initialClaps, slug }: { initialClaps: number, slug: string }) {
    const [claps, setClaps] = useState(initialClaps);
    const [isClapping, setIsClapping] = useState(false);
    const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

    const handleClap = async () => {
        setClaps(prev => prev + 1);
        setIsClapping(true);
        
        const id = Date.now();
        const x = (Math.random() - 0.5) * 100;
        const y = -Math.random() * 100 - 50;
        
        setParticles(prev => [...prev, { id, x, y }]);
        
        // Remove particle after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p.id !== id));
        }, 1000);

        try {
            await incrementClaps(slug);
        } catch (error) {
            console.error("Failed to sync claps", error);
        }
    };

    useEffect(() => {
        if (isClapping) {
            const timer = setTimeout(() => setIsClapping(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isClapping]);

    return (
        <div className="flex flex-col items-center gap-4 relative">
            <div className="relative">
                <AnimatePresence>
                    {particles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                            animate={{ opacity: 0, scale: 1.5, x: p.x, y: p.y }}
                            exit={{ opacity: 0 }}
                            className="absolute pointer-events-none text-2xl"
                        >
                            👏
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClap}
                    className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 shadow-xl flex items-center justify-center text-4xl border-4 border-white/20 hover:border-white/50 transition-all group"
                >
                    <motion.span
                        animate={isClapping ? { scale: [1, 1.4, 1] } : {}}
                    >
                        👏
                    </motion.span>
                </motion.button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
                <span className="text-white font-bold text-2xl tabular-nums">
                    {claps.toLocaleString()} <span className="text-sm font-medium text-white/60 ml-1">CLAPS</span>
                </span>
            </div>
        </div>
    );
}
