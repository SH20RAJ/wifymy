import { notFound } from "next/navigation";
import { Instagram, Youtube, Linkedin, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

	// Mock check
	if (!username) {
		notFound();
	}

	return (
		<div className="min-h-[100dvh] flex flex-col pt-16 pb-8 px-4 sm:px-6 bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground">
			{/* Decorative Theme Elements */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
			
			<div className="max-w-[680px] w-full mx-auto relative z-10 flex-1 flex flex-col">
				{/* Profile Header */}
				<div className="flex flex-col items-center text-center space-y-4 mb-10">
					<div className="w-24 h-24 rounded-full bg-secondary border border-border shadow-sm flex items-center justify-center overflow-hidden">
						{mockProfile.avatarUrl ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img src={mockProfile.avatarUrl} alt={mockProfile.displayName} className="w-full h-full object-cover" />
						) : (
							<span className="text-3xl font-bold text-muted-foreground">{mockProfile.displayName[0]}</span>
						)}
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">{mockProfile.displayName}</h1>
						<p className="text-md text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">{mockProfile.bio}</p>
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
								"group relative flex items-center justify-between p-4 px-6 rounded-2xl border border-border bg-card shadow-sm hover:scale-[1.02] transition-all duration-300",
								"hover:border-primary/50 hover:shadow-md"
							)}
						>
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
									{/* Placeholder for matched icons based on link.icon */}
									<ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
								</div>
								<span className="font-semibold text-[15px]">{link.title}</span>
							</div>
							<div className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
								<ArrowUpRightIcon />
							</div>
						</a>
					))}
				</div>

				{/* Footer Branding */}
				<div className="mt-auto pt-16 flex justify-center">
					<Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-xs font-semibold tracking-wide text-muted-foreground hover:text-foreground transition-colors border border-border/50">
						<Zap className="w-3.5 h-3.5" /> Made with Wify
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
