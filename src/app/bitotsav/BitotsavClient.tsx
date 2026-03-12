'use client';

import { useState, useEffect } from 'react';
import { Instagram, MessageCircle, PartyPopper, Flame, Ghost, Sparkles, Trophy, Unlock, Lock, Timer, Zap, Crown, ShieldAlert } from 'lucide-react';
import ClapButton from '@/components/bitotsav/ClapButton';
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker';
import { motion, AnimatePresence } from 'framer-motion';

export default function BitotsavClient({ initialClaps }: { initialClaps: number }) {
    const staticPageId = "bitotsav-premium-v4";

    // Timer logic for the official website link
    const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds
    const [isLinkEnabled, setIsLinkEnabled] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsLinkEnabled(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-400 selection:text-black overflow-hidden font-sans cursor-default">
            <AnalyticsTracker pageId={staticPageId} />
            
            {/* Premium Floating "Badges" - Funny Elements */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-10 left-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-[10px] px-3 py-1 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center gap-2"
                >
                    <Crown size={12} /> VERY PREMIUM USER
                </motion.div>
                
                <motion.div 
                    animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-32 right-12 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] px-3 py-1 rounded-full flex items-center gap-2 text-white/50"
                >
                    <Zap size={12} className="text-cyan-400" /> HYPER-REALISTIC CLAPS
                </motion.div>

                <motion.div 
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    className="absolute bottom-40 left-6 bg-red-500/10 border border-red-500/20 text-red-500 font-extrabold text-[10px] px-3 py-1 rounded-full flex items-center gap-2"
                >
                    <ShieldAlert size={12} /> HACKER-PROOF SYSTEM (PROBABLY)
                </motion.div>
            </div>

            {/* Chaotic Festive Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 animate-bounce duration-3000">
                    <Ghost className="w-16 h-16 text-blue-400/20" />
                </div>
                <div className="absolute top-1/2 right-1/4 animate-spin-slow">
                    <Sparkles className="w-20 h-20 text-yellow-400/10" />
                </div>
                <div className="absolute bottom-1/4 right-10 animate-bounce duration-5000">
                    <PartyPopper className="w-12 h-12 text-pink-400/20" />
                </div>
                <div className="absolute top-10 right-1/3 animate-pulse">
                    <Flame className="w-16 h-16 text-orange-500/20" />
                </div>
                <div className="absolute bottom-1/3 left-10 animate-spin duration-10000">
                    <Trophy className="w-12 h-12 text-yellow-500/20" />
                </div>
                <AnimatePresence>
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: [0, 1, 0], y: -500, x: Math.random() * 100 - 50 }}
                            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: i * 0.5 }}
                            className="absolute bottom-0 text-xl"
                            style={{ left: `${Math.random() * 100}%` }}
                        >
                            🎉
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>


            {/* Premium Glows */}
            <div className="fixed -top-48 -left-48 w-[600px] h-[600px] bg-purple-900/40 blur-[150px] rounded-full mix-blend-screen" />
            <div className="fixed -bottom-48 -right-48 w-[600px] h-[600px] bg-blue-900/30 blur-[150px] rounded-full mix-blend-screen" />

            <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
                <div className="flex flex-col items-center text-center space-y-16">
                    {/* Hero Section */}
                    <div className="space-y-8">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="relative"
                        >
                            <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter">
                                <span className="text-white">BIT</span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-300 to-orange-600">OTSAV</span>
                            </h1>
                            <motion.div 
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-12 -right-8 bg-pink-600 text-white font-black px-6 py-2 rounded-2xl transform rotate-12 shadow-[0_10px_40px_rgba(219,39,119,0.5)] text-xl border-4 border-white"
                            >
                                LIT AF 🔥
                            </motion.div>
                        </motion.div>
                        
                        <div className="space-y-4">
                            <p className="text-3xl md:text-5xl font-black italic uppercase text-white/90 tracking-tight leading-none bg-white/5 backdrop-blur-sm p-4 rounded-3xl border border-white/5">
                                If you don&apos;t clap, the fest gets cancelled.
                            </p>
                            <div className="flex items-center justify-center gap-4 text-white/40 font-bold uppercase tracking-widest text-xs">
                                <span>East India&apos;s Biggest Ego Booster</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span>No Refunds</span>
                            </div>
                        </div>
                    </div>

                    {/* The "Hype Meter" - Ultra Premium Glass */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-lg group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[4rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[4rem] shadow-2xl overflow-hidden hover:border-white/20 transition-all">
                            <ClapButton initialClaps={initialClaps} />
                            <div className="mt-8 space-y-2">
                                <p className="text-white/60 text-sm font-black uppercase tracking-[0.3em]">Hype Levels: Critical ☢️</p>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Official Website Timer Section - NEW */}
                    <div className="w-full max-w-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[3rem] p-10 space-y-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${isLinkEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {isLinkEnabled ? <Unlock size={32} /> : <Lock size={32} />}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Main Portal</h3>
                                    <p className="text-white/40 text-sm font-bold uppercase">bitotsav.bitmesra.ac.in</p>
                                </div>
                            </div>

                            {!isLinkEnabled ? (
                                <div className="flex items-center gap-3 bg-black/40 px-6 py-4 rounded-2xl border border-white/5 shadow-inner">
                                    <Timer className="w-5 h-5 text-cyan-400 animate-pulse" />
                                    <span className="text-3xl font-black tabular-nums text-cyan-400">
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                            ) : (
                                <div className="px-6 py-2 bg-green-500 text-black font-black rounded-xl text-sm animate-bounce">
                                    PORTAL OPEN! 🌌
                                </div>
                            )}
                        </div>

                        <a 
                            href="https://bitotsav.bitmesra.ac.in/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`block w-full text-center p-8 rounded-[2rem] font-black text-2xl transition-all border-4 ${
                                isLinkEnabled 
                                ? 'bg-white text-black hover:bg-cyan-400 hover:border-cyan-200 shadow-[0_20px_50px_rgba(255,255,255,0.2)]' 
                                : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed grayscale'
                            }`}
                            onClick={(e) => !isLinkEnabled && e.preventDefault()}
                        >
                            {isLinkEnabled ? 'ENTER THE VOID 🚀' : 'ACCESS DENIED (WAIT)'}
                        </a>
                    </div>

                    {/* Social Links Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                        <a 
                            href="instagram://user?username=bitotsav.2026" 
                            onClick={(e) => {
                                // Fallback for desktop or if app not installed
                                setTimeout(() => {
                                    window.location.href = "https://www.instagram.com/bitotsav.2026/";
                                }, 500);
                            }}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 hover:border-pink-500/50 transition-all hover:-translate-y-2"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_20px_40px_rgba(192,38,211,0.3)] group-hover:scale-110 transition-transform">
                                <Instagram className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-2xl text-white italic tracking-tighter">THE GRAM</h3>
                                <p className="text-white/40 text-xs font-black uppercase mt-1 tracking-[0.2em] group-hover:text-pink-400 transition-colors underline decoration-pink-500/30 underline-offset-4">Join 2M+ others (liar)</p>
                            </div>
                        </a>

                        <a 
                            href="https://chat.whatsapp.com/C8ICNlasuguC9g0EQ3HDy3" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 hover:border-green-500/50 transition-all hover:-translate-y-2"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-green-500 flex items-center justify-center shadow-[0_20px_40px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-2xl text-white italic tracking-tighter">THE LOBBY</h3>
                                <p className="text-white/40 text-xs font-black uppercase mt-1 tracking-[0.2em] group-hover:text-green-400 transition-colors underline decoration-green-500/30 underline-offset-4">Vibe check passed?</p>
                            </div>
                        </a>
                    </div>

                    {/* Visitor Badge & Footer */}
                    <div className="pt-24 flex flex-col items-center space-y-12 w-full">
                        <div className="space-y-4">
                            <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.5em]">Global Engagement Counter</p>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md hover:scale-105 transition-transform duration-500">
                                <a href="https://visitorbadge.io/status?path=https%3A%2F%2Fwify.my%2Fbitotsav" className="block transform scale-150 py-2">
                                    <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fwify.my%2Fbitotsav&countColor=%23263759" alt="Visitor Badge" className="mx-auto" />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6 opacity-20 hover:opacity-100 transition-opacity duration-1000">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] italic">
                                BIT MESRA LEGENDS ONLY
                            </p>
                            <p className="text-[8px] font-bold text-white/10 uppercase tracking-[0.3em]">
                                Powered by <span className="text-white/20">WifyMy</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
