'use client';

import { cn } from '@/lib/utils';
import { 
    Instagram, 
    Youtube, 
    Facebook, 
    Linkedin, 
    Twitch 
} from 'lucide-react';

const platforms = [
    {
        name: 'Instagram',
        icon: <Instagram className="w-8 h-8 md:w-10 md:h-10" />,
        color: 'hover:text-[#E4405F]',
        bgHover: 'hover:bg-[#E4405F]/5 dark:hover:bg-[#E4405F]/10 hover:border-[#E4405F]/20',
        description: 'Profiles, Reels, Posts, Stories'
    },
    {
        name: 'YouTube',
        icon: <Youtube className="w-8 h-8 md:w-10 md:h-10" />,
        color: 'hover:text-[#FF0000]',
        bgHover: 'hover:bg-[#FF0000]/5 dark:hover:bg-[#FF0000]/10 hover:border-[#FF0000]/20',
        description: 'Videos, Shorts, Channels'
    },
    {
        name: 'TikTok',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
        ),
        color: 'hover:text-black dark:hover:text-white',
        bgHover: 'hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/20',
        description: 'Videos, Profiles'
    },
    {
        name: 'Spotify',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.56.41-.86.22-2.35-1.44-5.3-1.76-8.79-.96-.34.08-.68-.13-.76-.47-.08-.34.13-.68.47-.76 3.86-.88 7.18-.5 9.93 1.18.3.19.41.56.22.86zm1.22-2.71c-.23.38-.72.5-1.1.27-2.69-1.65-6.8-2.13-9.96-1.17-.43.13-.88-.11-1.02-.53-.13-.42.11-.87.53-1.02 3.63-1.1 8.24-.55 11.27 1.34.39.23.51.72.28 1.11zm.1-2.79c-3.23-1.92-8.56-2.1-11.65-1.15-.5.15-1.02-.13-1.17-.63-.15-.5.13-1.02.63-1.17 3.56-1.09 9.53-.87 13.29 1.36.46.27.61.87.34 1.33-.27.46-.86.61-1.33.34z"/>
            </svg>
        ),
        color: 'hover:text-[#1DB954]',
        bgHover: 'hover:bg-[#1DB954]/5 dark:hover:bg-[#1DB954]/10 hover:border-[#1DB954]/20',
        description: 'Tracks, Playlists'
    },
    {
        name: 'LinkedIn',
        icon: <Linkedin className="w-8 h-8 md:w-10 md:h-10" />,
        color: 'hover:text-[#0A66C2]',
        bgHover: 'hover:bg-[#0A66C2]/5 dark:hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/20',
        description: 'Profiles, Companies'
    },
    {
        name: 'Pinterest',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.8-.17-2.02.04-2.9l.88-3.73s-.22-.45-.22-1.12c0-1.05.61-1.83 1.38-1.83.65 0 .96.49.96 1.08 0 .66-.42 1.64-.64 2.55-.18.76.38 1.38 1.13 1.38 1.36 0 2.4-1.43 2.4-3.5 0-1.83-1.32-3.11-3.2-3.11-2.33 0-3.7 1.75-3.7 3.56 0 .7.27 1.45.61 1.86.07.08.08.15.06.23l-.23.95c-.04.16-.13.2-.3.12-1.11-.52-1.8-2.14-1.8-3.45 0-2.82 2.05-5.4 5.92-5.4 3.1 0 5.51 2.21 5.51 5.16 0 3.08-1.94 5.56-4.64 5.56-.9 0-1.75-.47-2.04-1.02l-.56 2.11c-.2.77-.74 1.73-1.1 2.32z"/>
            </svg>
        ),
        color: 'hover:text-[#E60023]',
        bgHover: 'hover:bg-[#E60023]/5 dark:hover:bg-[#E60023]/10 hover:border-[#E60023]/20',
        description: 'Pins, Profiles'
    },
    {
        name: 'Facebook',
        icon: <Facebook className="w-8 h-8 md:w-10 md:h-10" />,
        color: 'hover:text-[#1877F2]',
        bgHover: 'hover:bg-[#1877F2]/5 dark:hover:bg-[#1877F2]/10 hover:border-[#1877F2]/20',
        description: 'Universal Links'
    },
    {
        name: 'Twitch',
        icon: <Twitch className="w-8 h-8 md:w-10 md:h-10" />,
        color: 'hover:text-[#9146FF]',
        bgHover: 'hover:bg-[#9146FF]/5 dark:hover:bg-[#9146FF]/10 hover:border-[#9146FF]/20',
        description: 'Streams, Channels'
    },
    {
        name: 'Twitter / X',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        ),
        color: 'hover:text-black dark:hover:text-white',
        bgHover: 'hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/20',
        description: 'Profiles, Tweets'
    },
    {
        name: 'Telegram',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
        ),
        color: 'hover:text-[#26A5E4]',
        bgHover: 'hover:bg-[#26A5E4]/5 dark:hover:bg-[#26A5E4]/10 hover:border-[#26A5E4]/20',
        description: 'Channels, Posts'
    },
    {
        name: 'Reddit',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.094z"/>
            </svg>
        ),
        color: 'hover:text-[#FF4500]',
        bgHover: 'hover:bg-[#FF4500]/5 dark:hover:bg-[#FF4500]/10 hover:border-[#FF4500]/20',
        description: 'Posts, Subrds'
    },
    {
        name: 'Snapchat',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M12.004 0C5.378 0 0 5.37 0 12c0 6.621 5.374 12 12.004 12 6.626 0 11.996-5.379 11.996-12 0-6.63-5.37-12-11.996-12zm6.273 17.514c-1.127.319-1.42.062-1.42 1.405h-1.332s.114-1.206-.723-1.474c-.841-.266-1.579.52-2.737.52-1.161 0-2.022-.84-2.862-.573-.836.269-.877 1.543-.877 1.543H6.848c0-1.267-.282-1.144-1.442-1.464-1.455-.403.498-2.618.498-2.618s-.63-.923.064-2.227c-.439-.81-.052-1.611.39-2.049.444-.439-.214-2.316 1.72-3.836 1.933-1.517 5.09-1.077 5.613-.674.522.404.996.388 1.42 1.01.426.624.49 1.968-.198 3.193 1.14.707 1.258 1.554.793 2.193.308.761 1.054 1.48.51 2.37.765 2.174 2.063 2.368 2.063 2.68z"/>
            </svg>
        ),
        color: 'hover:text-black dark:hover:text-[#FFFC00]', // SC yellow isn't very visible on light backgrounds, keeping it black on light
        bgHover: 'hover:bg-[#FFFC00]/20 dark:hover:bg-[#FFFC00]/10 hover:border-[#FFFC00]/50 dark:hover:border-[#FFFC00]/20',
        description: 'Add Friends'
    }
];

export function SupportedPlatforms() {
    return (
        <section className="py-20 lg:py-32 relative overflow-hidden bg-card rounded-[2.5rem] border border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative flex flex-col md:flex-row gap-16 items-center">
                 <div className="flex-1 space-y-6 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.05]">
                        Works with <span className="text-muted-foreground block">everything.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed text-balance">
                        We support all major social platforms, ensuring your audience gets the best experience regardless of where they discover you.
                    </p>
                </div>

                <div className="flex-[1.5] w-full max-w-3xl space-y-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {platforms.map((platform) => (
                            <div 
                                key={platform.name}
                                className={cn(
                                    "group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border border-border bg-background transition-all duration-300 hover:scale-[1.03] cursor-default text-muted-foreground shadow-sm",
                                    platform.bgHover,
                                    platform.color
                                )}
                            >
                                <div className="mb-4 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                                    {platform.icon}
                                </div>
                                <h3 className="text-base font-bold text-foreground mb-1">{platform.name}</h3>
                                <p className="text-xs text-muted-foreground text-center font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 absolute bottom-4">
                                    {platform.description.split(',')[0]}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* How it Works / Feature Comparison */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground uppercase tracking-tighter">Instant</div>
                                <h4 className="font-bold text-foreground italic">No Login Required</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Paste any social link on our home page and get an immediate deep-link. Perfect for one-off shares.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary/20 border border-border space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-foreground text-background uppercase tracking-tighter">Managed</div>
                                <h4 className="font-bold text-foreground italic">Custom Slugs</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Create a free account to get persistent /l/my-name links and a professional bio-page.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
