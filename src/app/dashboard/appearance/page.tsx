'use client';

import { useState } from "react";
import { themes } from "@/lib/themes";
import { MobilePreview } from "@/components/dashboard/MobilePreview";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockLinks = [
    { id: "1", title: "My new video", url: "https://youtube.com", isActive: true },
    { id: "2", title: "Instagram", url: "https://instagram.com", isActive: true },
];

export default function AppearancePage() {
    const [themeId, setThemeId] = useState("minimalist");
    const [profile, setProfile] = useState({
        displayName: "John Doe",
        bio: "Digital creator and developer building the future of the web.",
        avatarUrl: null
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 max-w-6xl items-start">
            <div className="max-w-3xl w-full">
                <h1 className="text-3xl font-bold mb-8">Appearance</h1>
                
                <div className="space-y-8">
                    {/* Profile Section */}
                    <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-6">Profile Details</h2>
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="w-24 h-24 bg-secondary text-5xl font-bold text-muted-foreground flex items-center justify-center rounded-full border border-border shrink-0 overflow-hidden">
                                {profile.displayName[0] || 'U'}
                            </div>
                            <div className="space-y-4 flex-1 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium">Display Name</label>
                                    <input 
                                        type="text" 
                                        value={profile.displayName}
                                        onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                                        placeholder="Your Name" 
                                        className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium">Bio</label>
                                    <textarea 
                                        rows={3} 
                                        value={profile.bio}
                                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                        placeholder="A short bio about yourself..." 
                                        className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" 
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Dynamic Themes Section from Registry */}
                    <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold">Themes</h2>
                            <p className="text-sm text-muted-foreground mt-1">Select a premium aesthetic for your smart profile.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {themes.map((theme) => {
                                const isActive = themeId === theme.id;
                                return (
                                    <div 
                                        key={theme.id}
                                        onClick={() => setThemeId(theme.id)}
                                        className={cn(
                                            "aspect-9/16 rounded-xl border-2 transition-all cursor-pointer overflow-hidden relative group",
                                            isActive ? "border-primary ring-4 ring-primary/10" : "border-border hover:border-primary/50 shadow-sm"
                                        )}
                                        style={{
                                            background: theme.style.background,
                                            fontFamily: theme.style.fontFamily,
                                        }}
                                    >
                                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                            {!isActive && <span className="px-4 py-1.5 bg-background text-foreground text-xs font-semibold rounded-full shadow-md">Preview</span>}
                                        </div>
                                        
                                        {isActive && (
                                            <div className="absolute top-2 right-2 z-30 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                        )}

                                        <div 
                                            className="h-1/3 p-4 flex flex-col items-center justify-center gap-2 border-b-[length:inherit]"
                                            style={{ backgroundColor: theme.style.card, borderColor: theme.style.cardBorder }}
                                        >
                                            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: theme.style.textMuted, opacity: 0.3 }} />
                                            <div className="h-2 w-16 rounded-full" style={{ backgroundColor: theme.style.text }} />
                                        </div>
                                        <div className="p-4 space-y-3 relative z-10 w-full">
                                            <div className="h-8 w-full rounded-full border-[length:inherit]" style={{ backgroundColor: theme.style.card, borderColor: theme.style.cardBorder }} />
                                            <div className="h-8 w-full rounded-full border-[length:inherit]" style={{ backgroundColor: theme.style.card, borderColor: theme.style.cardBorder }} />
                                        </div>
                                        
                                        <div 
                                            className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t to-transparent opacity-50 z-0" 
                                            style={{ from: theme.style.background }} 
                                        />

                                        <div className="absolute bottom-2 left-0 w-full text-center z-30">
                                            <span 
                                                className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider"
                                                style={{ backgroundColor: theme.style.card, color: theme.style.text }}
                                            >
                                                {theme.name}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>

            <div className="hidden lg:flex sticky top-8 justify-center pb-8">
                <MobilePreview profile={profile} links={mockLinks} themeId={themeId} />
            </div>
        </div>
    );
}
