'use client';

import { useState, useEffect } from 'react';
import { Instagram, MessageCircle, Unlock, Lock, Timer, ShieldCheck } from 'lucide-react';
import ClapButton from '@/components/bitotsav/ClapButton';
import { motion } from 'framer-motion';

export default function BitotsavClient({ initialClaps }: { initialClaps: number }) {
    // Timer logic for the official website link
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isLinkEnabled, setIsLinkEnabled] = useState(true);

    useEffect(() => {
        // Portal is now unlocked
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white selection:text-black overflow-hidden font-sans">
            
            {/* Subtle Gradient Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-white/[0.02] blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 relative z-10">
                <div className="flex flex-col items-center text-center space-y-24">
                    
                    {/* Header Section */}
                    <header className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter">
                                BITOTSAV
                            </h1>
                            <p className="text-white/40 text-sm font-light uppercase tracking-[0.4em] mt-4">
                                2026 • Cultural Festival
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="pt-4"
                        >
                            <span className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/60 bg-white/5">
                                Official Link Landing
                            </span>
                        </motion.div>
                    </header>

                    {/* Clap Section - Minimalist */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="w-full max-w-sm"
                    >
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 backdrop-blur-sm hover:border-white/20 transition-colors">
                            <ClapButton initialClaps={initialClaps} />
                            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                                Show your support
                            </p>
                        </div>
                    </motion.div>

                    {/* Social Links - Clean Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <a 
                            href="instagram://user?username=bitotsav.2026" 
                            onClick={() => {
                                setTimeout(() => {
                                    window.open("https://www.instagram.com/bitotsav.2026/", "_blank");
                                }, 500);
                            }}
                            className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 py-5 rounded-2xl hover:bg-white/[0.06] transition-all group"
                        >
                            <Instagram size={18} className="text-white/60 group-hover:text-white transition-colors" />
                            <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Instagram</span>
                        </a>

                        <a 
                            href="https://chat.whatsapp.com/C8ICNlasuguC9g0EQ3HDy3" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 py-5 rounded-2xl hover:bg-white/[0.06] transition-all group"
                        >
                            <MessageCircle size={18} className="text-white/60 group-hover:text-white transition-colors" />
                            <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">WhatsApp</span>
                        </a>
                    </div>

                    {/* Portal Timer Section */}
                    <div className="w-full space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                {isLinkEnabled ? 
                                    <Unlock size={16} className="text-white/40" /> : 
                                    <Lock size={16} className="text-white/40" />
                                }
                                <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Main Portal Status</span>
                            </div>
                            {!isLinkEnabled && (
                                <div className="flex items-center gap-2 font-mono text-sm text-white/60">
                                    <Timer size={14} />
                                    <span>{formatTime(timeLeft)}</span>
                                </div>
                            )}
                        </div>

                        <a 
                            href="https://bitotsav.bitmesra.ac.in/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`block w-full text-center py-6 rounded-2xl font-medium text-lg transition-all border ${
                                isLinkEnabled 
                                ? 'bg-white text-black hover:bg-white/90 border-white' 
                                : 'bg-transparent text-white/20 border-white/10 cursor-not-allowed'
                            }`}
                            onClick={(e) => !isLinkEnabled && e.preventDefault()}
                        >
                            {isLinkEnabled ? 'Enter Official Website' : 'Portal Locked'}
                        </a>
                    </div>
               
                    {/* Footer Area */}
                    <footer className="w-full pt-16 flex flex-col items-center space-y-12">
                        <div className="opacity-40 hover:opacity-100 transition-opacity duration-500 transform scale-75 md:scale-90">
                            <a href="https://visitorbadge.io/status?path=https%3A%2F%2Fwify.my%2Fbitotsav">
                                <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fwify.my%2Fbitotsav&countColor=%23263759" alt="Visitor Badge" className="mx-auto grayscale" />
                            </a>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex items-center gap-2 text-white/20">
                                <ShieldCheck size={12} />
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em]">Verified Event</p>
                            </div>
                            <p className="text-[9px] text-white/10 font-medium uppercase tracking-[0.5em] pt-4">
                                Powered by <span className="text-white/20 tracking-normal">WifyMy</span>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
