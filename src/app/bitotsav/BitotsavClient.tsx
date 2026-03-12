'use client';

import { Instagram, MessageCircle, PartyPopper, Flame, Ghost, Sparkles, Trophy } from 'lucide-react';
import ClapButton from '@/components/bitotsav/ClapButton';
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker';
import { motion } from 'framer-motion';

export default function BitotsavClient() {
    const bio = "The craziest fest is here! Tap tap tap! 👏";
    const staticPageId = "bitotsav-page-id";
    const initialClaps = 0;

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white selection:bg-yellow-400 selection:text-black overflow-hidden font-sans">
            <AnalyticsTracker pageId={staticPageId} />
            
            {/* Funny/Festive Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 animate-bounce duration-3000">
                    <Ghost className="w-12 h-12 text-blue-400" />
                </div>
                <div className="absolute bottom-20 right-10 animate-pulse">
                    <Flame className="w-16 h-16 text-orange-500" />
                </div>
                <div className="absolute top-1/2 left-1/4 animate-spin duration-10000">
                    <Ghost className="w-8 h-8 text-purple-400" />
                </div>
                <div className="absolute top-1/4 right-1/4 animate-bounce duration-5000">
                    <PartyPopper className="w-10 h-10 text-pink-400" />
                </div>
                <div className="absolute bottom-1/4 left-1/3 animate-pulse">
                    <Trophy className="w-12 h-12 text-yellow-500/40" />
                </div>
                <div className="absolute top-1/3 right-10 animate-spin-slow">
                    <Sparkles className="w-8 h-8 text-cyan-400/30" />
                </div>
            </div>

            {/* Gradient Glows */}
            <div className="fixed -top-24 -left-24 w-96 h-96 bg-purple-600/30 blur-[120px] rounded-full" />
            <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-yellow-600/20 blur-[120px] rounded-full" />

            <div className="max-w-2xl mx-auto px-6 pt-16 pb-24 relative z-10">
                <div className="flex flex-col items-center text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative inline-block"
                        >
                            <h1 className="text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-orange-500 to-pink-500 animate-pulse p-4 leading-tight">
                                BITOTSAV
                            </h1>
                            <div className="absolute -top-6 -right-12 rotate-12 bg-yellow-400 text-black text-sm font-black px-3 py-1 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)] animate-bounce">
                                2k26 🚀
                            </div>
                        </motion.div>
                        <p className="text-2xl md:text-3xl font-extrabold text-white leading-tight uppercase tracking-tighter italic">
                            {bio}
                        </p>
                    </div>

                    {/* Clap Section */}
                    <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl w-full max-w-md">
                        <ClapButton initialClaps={initialClaps} slug="bitotsav" />
                        <p className="mt-6 text-white/50 text-sm font-bold uppercase tracking-widest">
                            Official Hype Meter
                        </p>
                    </div>

                    {/* Links Section - Big Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <a 
                            href="https://www.instagram.com/bitotsav.2026/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative flex flex-col items-center gap-4 bg-gradient-to-br from-purple-600/20 to-pink-500/20 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 hover:border-white/30 transition-all active:scale-[0.95]"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_10px_30px_rgba(192,38,211,0.4)] group-hover:scale-110 transition-transform">
                                <Instagram className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-xl text-white">INSTAGRAM</h3>
                                <p className="text-white/40 text-xs font-bold uppercase mt-1 tracking-widest">Don&apos;t Miss the sauce</p>
                            </div>
                        </a>

                        <a 
                            href="https://chat.whatsapp.com/C8ICNlasuguC9g0EQ3HDy3" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative flex flex-col items-center gap-4 bg-gradient-to-br from-green-600/20 to-emerald-500/20 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 hover:border-white/30 transition-all active:scale-[0.95]"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-green-500 flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-xl text-white">WHATSAPP</h3>
                                <p className="text-white/40 text-xs font-bold uppercase mt-1 tracking-widest">Vibe check here</p>
                            </div>
                        </a>
                    </div>

                    {/* Funny Quote */}
                    <div className="pt-12 flex flex-col items-center gap-4">
                        <div className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl">
                            <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest">
                                Warning: Excessive clapping may cause euphoria 🧪
                            </p>
                        </div>
                        <div className="text-white/10 uppercase tracking-[0.4em] text-[12px] font-black italic">
                            The East India Legends have arrived.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
