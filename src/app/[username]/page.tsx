import { notFound } from "next/navigation";
import { ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTheme } from "@/lib/themes";
import { getCollection } from "@/lib/mongodb";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { TrackedLink } from "@/components/TrackedLink";
import { ThemeEffects } from "@/components/ThemeEffects";
import Image from "next/image";

export default async function PublicProfilePage({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
    const { username } = await params;

	if (!username) {
		notFound();
	}

    // Fetch page by slug from MongoDB
    const pages = await getCollection("pages");
    const page = await pages.findOne({ slug: username });
    if (!page) {
        notFound();
    }

    // Fetch active links from MongoDB
    const linksCollection = await getCollection("links");
    const pageLinks = await linksCollection.find({ pageId: page.id }).sort({ order: 1 }).toArray();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activeLinks = pageLinks.filter((l) => (l as any).isActive);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = getTheme((page as any).themeId || "minimalist");

	return (
		<div 
            className="min-h-dvh flex flex-col pt-16 pb-8 px-4 sm:px-6 relative selection:bg-black selection:text-white"
            style={{
                background: theme.style.background,
                color: theme.style.text,
                fontFamily: theme.style.fontFamily,
                '--theme-muted': theme.style.textMuted,
                '--theme-card': theme.style.card,
                '--theme-border': theme.style.cardBorder,
                '--theme-btn': theme.style.button,
                '--theme-btn-text': theme.style.buttonText,
                '--theme-btn-hover': theme.style.buttonHover,
            } as React.CSSProperties}
        >
			<AnalyticsTracker pageId={page.id} />
            <ThemeEffects theme={theme} />
			
			{/* Decorative Theme Elements */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
			
			<div className="max-w-[680px] w-full mx-auto relative z-10 flex-1 flex flex-col">
				{/* Profile Header */}
				<div className="flex flex-col items-center text-center space-y-4 mb-10">
					<div 
                        className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-[length:inherit]"
                        style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}
                    >
						{page.avatarUrl ? (
							<div className="relative w-full h-full">
								<Image 
									src={page.avatarUrl} 
									alt={page.displayName || page.slug} 
									fill 
									className="object-cover" 
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
					{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
					{activeLinks.map((link: any) => (
						<TrackedLink 
							key={link.id} 
							href={link.url}
							pageId={page.id}
							linkId={link.id}
							className={cn(
								"group relative flex items-center justify-between p-4 px-6 rounded-2xl shadow-sm hover:scale-[1.02] transition-all duration-300 border-[length:inherit]"
							)}
                            style={{
                                backgroundColor: 'var(--theme-card)',
                                borderColor: 'var(--theme-border)',
                            }}
						>
							<div className="flex items-center gap-4">
								<div 
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                    style={{ backgroundColor: theme.type === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                >
									<ExternalLink className="w-4 h-4" style={{ color: 'var(--theme-muted)' }} />
								</div>
								<span className="font-semibold text-[15px]">{link.title}</span>
							</div>
							<div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold">
								<ArrowUpRightIcon />
							</div>
						</TrackedLink>
					))}
				</div>

				{/* Footer Branding */}
				<div className="mt-auto pt-16 flex justify-center">
					<Link 
                        href="/" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors border-[length:inherit]"
                        style={{
                            backgroundColor: 'var(--theme-card)',
                            borderColor: 'var(--theme-border)',
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
