import { notFound } from "next/navigation";
import { ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTheme } from "@/lib/themes";

// In a real app, this data would come from Drizzle ORM
// const userProfile = await db.query.users.findFirst({ where: eq(users.username, params.username) });
const mockProfile = {
	displayName: "John Doe",
	bio: "Digital creator and developer building the future of the web.",
	avatarUrl: null,
	theme: "minimalist", // later fetched from DB
	links: [
		{ id: "1", title: "Follow me on X", url: "https://x.com", icon: "x" },
		{ id: "2", title: "My GitHub", url: "https://github.com", icon: "github" },
		{ id: "3", title: "Watch my tutorials", url: "https://youtube.com", icon: "youtube" },
	]
};

export default async function PublicProfilePage({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
    const { username } = await params;

	if (!username) {
		notFound();
	}

    const theme = getTheme(mockProfile.theme);

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
			{/* Decorative Theme Elements */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
			
			<div className="max-w-[680px] w-full mx-auto relative z-10 flex-1 flex flex-col">
				{/* Profile Header */}
				<div className="flex flex-col items-center text-center space-y-4 mb-10">
					<div 
                        className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-[length:inherit]"
                        style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}
                    >
						{mockProfile.avatarUrl ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img src={mockProfile.avatarUrl} alt={mockProfile.displayName} className="w-full h-full object-cover" />
						) : (
							<span className="text-3xl font-bold" style={{ color: 'var(--theme-muted)' }}>{mockProfile.displayName[0]}</span>
						)}
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">{mockProfile.displayName}</h1>
						<p className="text-md mt-2 max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--theme-muted)' }}>{mockProfile.bio}</p>
					</div>
				</div>

				{/* Links Container */}
				<div className="flex flex-col gap-4 w-full">
					{mockProfile.links.map((link) => (
						<a 
							key={link.id} 
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
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
						</a>
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
