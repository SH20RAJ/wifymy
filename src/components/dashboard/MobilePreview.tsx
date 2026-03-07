'use client';

import { getTheme, type CustomTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { ExternalLink, Zap } from "lucide-react";
import { ThemeEffects } from "@/components/ThemeEffects";

type MockProfile = {
	displayName: string;
	bio: string;
	avatarUrl: string | null | undefined;
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
    themeId,
    customTheme
}: { 
    profile: MockProfile, 
    links: MockLink[], 
    themeId: string,
    customTheme?: CustomTheme
}) {
    const theme = getTheme(themeId);
    
    // Determine effective styles (prefer customTheme if custom is selected)
    const isCustom = themeId === 'custom' || !!customTheme;
    const background = isCustom && customTheme ? (
        customTheme.backgroundType === 'gradient' ? customTheme.backgroundValue : 
        customTheme.backgroundType === 'image' ? `url(${customTheme.backgroundValue}) center/${customTheme.backgroundSize || 'cover'} ${customTheme.backgroundRepeat || 'no-repeat'}` : 
        customTheme.backgroundValue
    ) : theme.style.background;

    const backgroundOverlay = isCustom && customTheme?.backgroundType === 'image' ? customTheme.backgroundOverlay : 'transparent';

    const textColor = isCustom && customTheme ? customTheme.textColor : theme.style.text;
    const buttonBg = isCustom && customTheme ? customTheme.buttonColor : theme.style.button;
    const buttonText = isCustom && customTheme ? customTheme.buttonTextColor : theme.style.buttonText;
    const buttonRadiusValue = isCustom && customTheme ? customTheme.buttonRadius : '12px';
    const fontFamily = isCustom && customTheme ? customTheme.fontFamily : theme.style.fontFamily;
    
    // Avatar Styles
    const avatarShape = isCustom && customTheme ? customTheme.avatarStyle : 'circle';
    const avatarBorderColor = isCustom && customTheme ? customTheme.avatarBorderColor : 'transparent';
    const avatarBorderSize = isCustom && customTheme ? customTheme.avatarBorderSize : '0px';
    
    const cardBg = isCustom && customTheme ? (
        customTheme.buttonStyle === 'glass' ? 'rgba(255,255,255,0.1)' : 
        customTheme.buttonStyle === 'soft' ? `${customTheme.buttonColor}15` : 
        customTheme.buttonStyle === 'outline' ? 'transparent' : customTheme.buttonColor
    ) : theme.style.card;

    const cardBorder = isCustom && customTheme ? (
        customTheme.buttonStyle === 'outline' ? customTheme.buttonColor : 
        customTheme.buttonStyle === 'glass' ? 'rgba(255,255,255,0.2)' : 'transparent'
    ) : theme.style.cardBorder;

    return (
        <div className="w-full max-w-[340px] mx-auto aspect-9/19 rounded-[3rem] border-8 border-neutral-900 bg-black overflow-hidden shadow-2xl relative">
            {/* Phone Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex items-end justify-center z-20">
                <div className="w-24 h-5 bg-neutral-900 rounded-b-3xl"></div>
            </div>

            <div 
                className="w-full h-full overflow-y-auto no-scrollbar pt-12 pb-6 px-4 flex flex-col relative"
                style={{
                    background: background,
                    color: textColor,
                    fontFamily: fontFamily,
                    '--theme-muted': `${textColor}99`,
                    '--theme-card': cardBg,
                    '--theme-border': cardBorder,
                } as React.CSSProperties}
            >
                {!isCustom && <ThemeEffects theme={theme} />}
                
                {/* Background Overlay for Images */}
                {isCustom && customTheme?.backgroundType === 'image' && (
                    <div 
                        className="absolute inset-0 pointer-events-none z-0" 
                        style={{ backgroundColor: backgroundOverlay }}
                    />
                )}
                {/* Decorative Theme Elements */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
                
                <div className="relative z-10 flex-1 flex flex-col">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center text-center space-y-3 mb-6">
                        <div 
                            className={cn(
                                "w-20 h-20 flex items-center justify-center overflow-hidden border-[length:inherit] relative",
                                avatarShape === 'circle' && "rounded-full",
                                avatarShape === 'square' && "rounded-none",
                                avatarShape === 'rounded' && "rounded-2xl",
                                avatarShape === 'hidden' && "hidden"
                            )}
                            style={{ 
                                backgroundColor: cardBg, 
                                borderColor: avatarBorderColor,
                                borderWidth: avatarBorderSize,
                                borderStyle: 'solid'
                            }}
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
                                    "flex items-center justify-between p-3 px-4 shadow-sm border-[length:inherit]",
                                    isCustom && customTheme?.buttonStyle === 'shadow' && "shadow-[0_4px_0_0_rgba(0,0,0,0.1)]"
                                )}
                                style={{
                                    backgroundColor: isCustom ? (customTheme?.buttonStyle === 'outline' ? 'transparent' : buttonBg) : 'var(--theme-card)',
                                    borderColor: isCustom ? buttonBg : 'var(--theme-border)',
                                    borderRadius: buttonRadiusValue,
                                    color: isCustom ? buttonText : 'inherit'
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: theme.type === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" style={{ color: isCustom ? buttonText : 'var(--theme-muted)' }} />
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
                                backgroundColor: cardBg,
                                borderColor: cardBorder,
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
