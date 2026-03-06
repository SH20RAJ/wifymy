'use client';

import { getTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { ExternalLink, Zap } from "lucide-react";

type MockProfile = {
	displayName: string;
	bio: string;
	avatarUrl: string | null;
};

type MockLink = {
    id: string;
    title: string;
    url: string;
    icon?: string;
};

export function MobilePreview({ 
    profile, 
    links, 
    themeId 
}: { 
    profile: MockProfile, 
    links: MockLink[], 
    themeId: string 
}) {
    const theme = getTheme(themeId);

    return (
        <div className="w-full max-w-[340px] mx-auto aspect-9/19 rounded-[3rem] border-8 border-neutral-900 bg-black overflow-hidden shadow-2xl relative">
            {/* Phone Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex items-end justify-center z-20">
                <div className="w-24 h-5 bg-neutral-900 rounded-b-3xl"></div>
            </div>

            <div 
                className="w-full h-full overflow-y-auto no-scrollbar pt-12 pb-6 px-4 flex flex-col relative"
                style={{
                    background: theme.style.background,
                    color: theme.style.text,
                    fontFamily: theme.style.fontFamily,
                    '--theme-muted': theme.style.textMuted,
                    '--theme-card': theme.style.card,
                    '--theme-border': theme.style.cardBorder,
                } as React.CSSProperties}
            >
                {/* Decorative Theme Elements */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
                
                <div className="relative z-10 flex-1 flex flex-col">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center text-center space-y-3 mb-6">
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-[length:inherit]"
                            style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}
                        >
                            {profile.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold" style={{ color: 'var(--theme-muted)' }}>{profile.displayName?.[0] || 'U'}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">{profile.displayName || 'Your Name'}</h1>
                            <p className="text-sm mt-1.5 max-w-[200px] mx-auto leading-relaxed" style={{ color: 'var(--theme-muted)' }}>
                                {profile.bio || 'Your bio will appear here.'}
                            </p>
                        </div>
                    </div>

                    {/* Links Container */}
                    <div className="flex flex-col gap-3 w-full">
                        {links.length === 0 && (
                            <div className="text-center text-sm py-4" style={{ color: 'var(--theme-muted)' }}>No links added yet.</div>
                        )}
                        {links.map((link) => (
                            <div 
                                key={link.id} 
                                className={cn(
                                    "flex items-center justify-between p-3 px-4 rounded-xl shadow-sm border-[length:inherit]"
                                )}
                                style={{
                                    backgroundColor: 'var(--theme-card)',
                                    borderColor: 'var(--theme-border)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: theme.type === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--theme-muted)' }} />
                                    </div>
                                    <span className="font-semibold text-sm truncate max-w-[140px]">{link.title || 'Untitled Link'}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Branding */}
                    <div className="mt-auto pt-8 flex justify-center">
                        <div 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide border-[length:inherit]"
                            style={{
                                backgroundColor: 'var(--theme-card)',
                                borderColor: 'var(--theme-border)',
                                color: 'var(--theme-muted)'
                            }}
                        >
                            <Zap className="w-3 h-3 fill-current" /> Wify
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
