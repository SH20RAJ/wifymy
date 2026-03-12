import { notFound } from "next/navigation";
import { ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTheme } from "@/lib/themes";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { TrackedLink } from "@/components/TrackedLink";
import { ThemeEffects } from "@/components/ThemeEffects";
import { getPageBySlug, type CustomTheme } from "@/app/actions/pages";
import { getActiveLinksByPageId } from "@/app/actions/links";
import Image from "next/image";
import { type Metadata } from "next";
import { generateLinks } from "@/lib/deep-links";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ username: string }>;
}): Promise<Metadata> {
    const { username } = await params;
    
    const page = await getPageBySlug(username);

    if (!page) return {};

    const customTheme = page.customTheme as CustomTheme | null;
    const isCustom = page.themeId === 'custom' && !!customTheme;

    const title = (isCustom && customTheme?.seoTitle) || page.displayName || `@${page.slug} | Wify`;
    const description = (isCustom && customTheme?.seoDescription) || page.bio || `Check out ${page.displayName || page.slug}'s profile on Wify.`;
    const image = (isCustom && customTheme?.socialImage) || page.avatarUrl || "/og-image.png";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default async function PublicProfilePage({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
    const { username } = await params;

	if (!username) {
		notFound();
	}

    // Fetch page by slug using server actions instead of raw ORM
    const page = await getPageBySlug(username);

    if (!page) {
        notFound();
    }

    // Fetch active links using server actions
    const activeLinks = await getActiveLinksByPageId(page.id);

    const theme = getTheme(page.themeId || "minimalist");
    const customTheme = page.customTheme as CustomTheme | null;
    const isCustom = page.themeId === 'custom' && !!customTheme;

    // Determine effective styles
    const background = isCustom && customTheme ? (
        customTheme.backgroundType === 'gradient' ? customTheme.backgroundValue : 
        customTheme.backgroundType === 'image' ? `url(${customTheme.backgroundValue}) ${customTheme.backgroundPosition || 'center'}/${customTheme.backgroundSize || 'cover'} ${customTheme.backgroundRepeat || 'no-repeat'}` : 
        customTheme.backgroundValue
    ) : theme.style.background;

    const backgroundOverlay = isCustom && customTheme && customTheme.backgroundType === 'image' ? customTheme.backgroundOverlay : 'transparent';

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
		<div 
            className="min-h-dvh flex flex-col pt-16 pb-8 px-4 sm:px-6 relative selection:bg-black selection:text-white"
            style={{
                background: background,
                color: textColor,
                fontFamily: fontFamily,
                '--theme-muted': `${textColor}99`,
                '--theme-card': cardBg,
                '--theme-border': cardBorder,
                '--theme-btn': buttonBg,
                '--theme-btn-text': buttonText,
            } as React.CSSProperties}
        >
			<AnalyticsTracker pageId={page.id} />
            {!isCustom && <ThemeEffects theme={theme} />}
            
            {/* Background Overlay for Images */}
            {isCustom && customTheme && customTheme.backgroundType === 'image' && (
                <div 
                    className="fixed inset-0 pointer-events-none z-0" 
                    style={{ backgroundColor: backgroundOverlay }}
                />
            )}

            {/* Custom CSS Injection */}
            {isCustom && customTheme && customTheme.customCss && (
                <style dangerouslySetInnerHTML={{ __html: customTheme.customCss }} />
            )}
			
			{/* Decorative Theme Elements */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
			
			<div className="max-w-[680px] w-full mx-auto relative z-10 flex-1 flex flex-col">
				{/* Profile Header */}
				<div className="profile-header flex flex-col items-center text-center space-y-4 mb-10">
					<div 
                        className={cn(
                            "profile-avatar w-24 h-24 flex items-center justify-center overflow-hidden border-[length:inherit] relative",
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
						{page.avatarUrl ? (
							<div className="relative w-full h-full">
								<Image 
									src={page.avatarUrl} 
									alt={page.displayName || page.slug} 
									fill 
									className="object-cover" 
                                    priority={true}
                                    sizes="96px"
								/>
							</div>
						) : (
							<span className="text-3xl font-bold" style={{ color: 'var(--theme-muted)' }}>{(page.displayName?.[0] || page.slug[0]).toUpperCase()}</span>
						)}
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">{page.displayName || `@${page.slug}`}</h1>
						<p className="text-md mt-2 max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--theme-muted)' }}>{page.bio}</p>
					</div>
				</div>

				{/* Links Container */}
				<div className="flex flex-col gap-4 w-full">
					{activeLinks.map((link) => {
                        const { deepLink } = generateLinks(link.url);
                        return (
                            <TrackedLink 
                                key={link.id} 
                                href={link.url}
                                deepLink={deepLink}
                                pageId={page.id}
                                linkId={link.id}
                                className={cn(
                                    "link-card group relative flex items-center justify-between p-4 px-6 shadow-sm hover:scale-[1.02] transition-all duration-300 border-[length:inherit]",
                                    isCustom && customTheme && customTheme.buttonStyle === 'shadow' && "shadow-[0_6px_0_0_rgba(0,0,0,0.1)]"
                                )}
                                style={{
                                    backgroundColor: isCustom && customTheme ? (customTheme.buttonStyle === 'outline' ? 'transparent' : buttonBg) : 'var(--theme-card)',
                                    borderColor: isCustom && customTheme ? buttonBg : 'var(--theme-border)',
                                    borderRadius: buttonRadiusValue,
                                    color: isCustom && customTheme ? buttonText : 'inherit'
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="social-icon w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                        style={{ backgroundColor: theme.type === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                    >
                                        <ExternalLink className="w-4 h-4" style={{ color: isCustom && customTheme ? buttonText : 'var(--theme-muted)' }} />
                                    </div>
                                    <span className="link-title font-semibold text-[15px]">{link.title}</span>
                                </div>
                                <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold">
                                    <ArrowUpRightIcon />
                                </div>
                            </TrackedLink>
                        );
                    })}
				</div>

				{/* Footer Branding */}
				<div className="mt-auto pt-16 flex justify-center">
					<Link 
                        href="/" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors border-[length:inherit]"
                        style={{
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                            color: 'var(--theme-muted)'
                        }}
                    >
						<Zap className="w-3.5 h-3.5 fill-current" /> Made with Wify
					</Link>
				</div>
			</div>
		</div>
	);
}

function ArrowUpRightIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
			<path d="M7 17L17 7M17 7H7M17 7V17" />
		</svg>
	);
}
