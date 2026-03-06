'use client';

import { useState } from "react";
import { themes } from "@/lib/themes";
import { MobilePreview } from "@/components/dashboard/MobilePreview";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { updatePageProfile, updatePageTheme } from "@/app/actions/pages";

export default function AppearanceClient({ initialPage, initialLinks }: { initialPage: { id: string, slug: string, themeId: string | null, displayName: string | null, bio: string | null, avatarUrl: string | null }, initialLinks: { id: string, title: string, url: string, isActive: boolean }[] }) {
    const [themeId, setThemeId] = useState(initialPage.themeId || "minimalist");
    const [profile, setProfile] = useState({
        displayName: initialPage.displayName || "",
        bio: initialPage.bio || "",
        avatarUrl: initialPage.avatarUrl
    });
    const [isSaving, setIsSaving] = useState(false);

    // simple debounce save for inputs
    const handleProfileChange = (field: string, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        await updatePageProfile(initialPage.id, profile);
        setIsSaving(false);
    };

    const handleThemeChange = async (tid: string) => {
        setThemeId(tid);
        await updatePageTheme(initialPage.id, tid);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 max-w-6xl items-start">
            <div className="max-w-3xl w-full">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Appearance</h1>
                    <button 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center gap-2"
                    >
                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSaving ? "Saving..." : "Save Profile"}
                    </button>
                </div>
                
                <div className="space-y-8">
                    {/* Profile Section */}
                    <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-6">Profile Details</h2>
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="w-24 h-24 bg-secondary text-5xl font-bold text-muted-foreground flex items-center justify-center rounded-full border border-border shrink-0 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    (profile.displayName?.[0] || initialPage.slug[0]).toUpperCase()
                                )}
                            </div>
                            <div className="space-y-4 flex-1 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium">Display Name</label>
                                    <input 
                                        type="text" 
                                        value={profile.displayName}
                                        onChange={(e) => handleProfileChange('displayName', e.target.value)}
                                        placeholder="Your Name" 
                                        className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium">Bio</label>
                                    <textarea 
                                        rows={3} 
                                        value={profile.bio}
                                        onChange={(e) => handleProfileChange('bio', e.target.value)}
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
                                        onClick={() => handleThemeChange(theme.id)}
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
                                            className="absolute bottom-0 inset-x-0 h-1/2 bg-linear-to-t to-transparent opacity-50 z-0" 
                                            style={{ backgroundImage: `linear-gradient(to top, ${theme.style.background}, transparent)` }} 
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
                <MobilePreview profile={profile} links={initialLinks} themeId={themeId} />
            </div>
        </div>
    );
}
