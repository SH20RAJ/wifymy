'use client';

import { useState } from 'react';
import { generateLinks } from '@/lib/deep-links';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, ArrowUpRight, Zap, ArrowRight, ShieldCheck, Lock, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SupportedPlatforms } from '@/components/SupportedPlatforms';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
	const [inputUrl, setInputUrl] = useState('');
	const [generatedLink, setGeneratedLink] = useState('');
	const [error, setError] = useState('');
	const [copied, setCopied] = useState(false);

	const handleGenerate = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setGeneratedLink('');
		setCopied(false);

		if (!inputUrl.trim()) return;

		const data = generateLinks(inputUrl);

		if (data.platform === 'unknown') {
			setError('Unsupported link format. Try a full URL.');
			return;
		}

		const cleanOriginal = data.originalUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
		const origin = typeof window !== 'undefined' ? window.location.origin : 'https://wify.my';

		setGeneratedLink(`${origin}/l/${cleanOriginal}`);
	};

	const copyToClipboard = () => {
		if (!generatedLink) return;
		navigator.clipboard.writeText(generatedLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
			{/* Navbar */}
			<nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
				<div className="bg-card text-card-foreground rounded-full px-6 py-4 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-border/50">
					<div className="flex items-center gap-2 font-bold text-xl tracking-tight">
						<Zap className="h-5 w-5 fill-foreground" />
						<span>Wify.my</span>
					</div>
					<div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
						<a href="#features" className="hover:text-foreground transition-colors">Features</a>
						<a href="#why" className="hover:text-foreground transition-colors">Why Wify</a>
						<a href="#platforms" className="hover:text-foreground transition-colors">Platforms</a>
					</div>
					<div className="flex items-center gap-4">
						<ThemeToggle />
						<a href="https://tally.so/r/7RKqRZ" target="_blank" rel="noopener noreferrer">
							<Button variant="default" className="rounded-full px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-10 shadow-sm">
								Join Waitlist <ArrowUpRight className="ml-1 h-4 w-4" />
							</Button>
						</a>
					</div>
				</div>
			</nav>

			<main className="pt-32 pb-32 px-4 max-w-7xl mx-auto space-y-6">
				{/* Hero Section Container */}
				<section className="relative rounded-[2.5rem] bg-card overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border">
					{/* Abstract Background Elements matching Lattice/Trvvrat */}
					<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
					<div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/80 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 opacity-60 pointer-events-none" />

					<div className="relative pt-32 pb-40 px-6 sm:px-12 md:px-20 lg:px-32 text-center flex flex-col items-center">
						<div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background text-xs font-bold text-foreground border border-border tracking-widest mb-10 shadow-sm pointer-events-none">
							<Zap className="h-3.5 w-3.5 fill-foreground" /> ZERO SETUP. INSTANT OPEN.
						</div>

						<h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-foreground leading-[1.05] max-w-4xl text-balance mb-8">
							Open social links <span className="text-muted-foreground">directly in apps.</span>
						</h1>

						<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-16 text-balance">
							We bring ideas to life by bypassing limited inside-app browsers. Ensure your audience engages where it matters native and seamless.
						</p>

						{/* Generator Form styled Premium */}
						<div className="w-full max-w-2xl relative z-10 transition-all">
							<div className="bg-background rounded-full p-2.5 flex flex-col sm:flex-row gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-border/50 focus-within:ring-primary/20 focus-within:ring-2 transition-all">
								<form onSubmit={handleGenerate} className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
									<Input
										type="text"
										placeholder="Paste link or @username..."
										value={inputUrl}
										onChange={(e) => setInputUrl(e.target.value)}
										className="border-0 bg-transparent h-14 md:h-16 text-lg focus-visible:ring-0 shadow-none px-6 flex-1 rounded-full placeholder:text-muted-foreground"
									/>
									<Button type="submit" size="lg" className="h-14 md:h-16 px-8 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 min-w-[160px] inline-flex items-center justify-center shadow-md">
										Generate <ArrowRight className="ml-2 w-5 h-5" />
									</Button>
								</form>
							</div>

							{error && (
								<p className="mt-6 text-sm font-medium text-red-500 bg-red-50 dark:bg-red-500/10 inline-flex px-4 py-2 rounded-full absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap border border-red-100 dark:border-red-900/50">
									{error}
								</p>
							)}

							{generatedLink && !error && (
								<div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xl animate-in slide-in-from-top-4 fade-in duration-500">
									<div className="bg-foreground text-background p-2 rounded-full flex items-center shadow-2xl ring-1 ring-border/10">
										<div className="flex-1 px-6 truncate font-mono text-sm sm:text-base selection:bg-primary border-transparent selection:text-primary-foreground">
											{generatedLink}
										</div>
										<Button 
											onClick={copyToClipboard}
											variant="secondary"
											className={cn(
												"rounded-full h-12 px-6 font-semibold transition-all duration-300",
												copied ? "bg-green-500 text-white hover:bg-green-500" : "bg-card text-foreground hover:bg-secondary"
											)}
										>
											{copied ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Floating Features Section (Lattice style) */}
				<section id="features" className="py-20 lg:py-28">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
							The help you Need,<br /> <span className="text-muted-foreground">When you Need it</span>
						</h2>
					</div>
					
					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
							<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
								<ShieldCheck className="w-7 h-7 text-foreground" />
							</div>
							<div>
								<h3 className="text-2xl font-medium mb-4">Privacy First</h3>
								<p className="text-muted-foreground leading-relaxed text-lg">
									We never log your clicks, IPs, or behavior. Your generated links are yours. No cookies, no invasive tracking.
								</p>
							</div>
						</div>
						
						<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
							<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
								<Lock className="w-7 h-7 text-foreground" />
							</div>
							<div>
								<h3 className="text-2xl font-medium mb-4">Zero Auth</h3>
								<p className="text-muted-foreground leading-relaxed text-lg">
									No accounts, no onboarding friction. Just paste, generate, and share instantly without a fuss.
								</p>
							</div>
						</div>

						<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
							<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
								<Zap className="w-7 h-7 text-foreground" />
							</div>
							<div>
								<h3 className="text-2xl font-medium mb-4">Edge Speed</h3>
								<p className="text-muted-foreground leading-relaxed text-lg">
									Built on Edge runtime for sub-millisecond redirects worldwide. True blazing fast performance.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Why Section - Floating Card Split */}
				<section id="why" className="py-12">
					<div className="bg-card rounded-[2.5rem] border border-border p-8 md:p-16 lg:p-24 shadow-sm flex flex-col lg:flex-row gap-16 lg:items-center">
						<div className="flex-1 space-y-8">
							<h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.05]">
								Enhancing the Entire <br /> Engagement Cycle
							</h2>
							<p className="text-xl text-muted-foreground leading-relaxed max-w-xl text-balance">
								Social apps trap users in limited in-app browsers where they aren&apos;t logged in. This kills conversions. Wify ensures users land directly in the native app safely.
							</p>
							<div className="pt-4">
								<a href="https://tally.so/r/7RKqRZ" target="_blank" rel="noopener noreferrer">
									<Button className="rounded-full h-14 px-8 text-base font-semibold bg-primary text-primary-foreground">
										Start generating now <ArrowUpRight className="ml-2 w-5 h-5" />
									</Button>
								</a>
							</div>
						</div>

						{/* Mockup/Visual side */}
						<div className="flex-1 flex justify-center lg:justify-end">
							<div className="w-full max-w-md bg-background rounded-[2rem] p-8 border border-border shadow-xl relative overflow-hidden">
								<div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-500 to-indigo-500" />
								<div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-red-400" />
								<div className="flex items-center gap-5 mb-10">
									<div className="w-14 h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center">
										<Smartphone className="w-6 h-6" />
									</div>
									<div>
										<div className="text-base font-semibold">Instagram Deep Link</div>
										<div className="text-sm text-muted-foreground">Redirecting to app...</div>
									</div>
								</div>
								<div className="space-y-4 mb-4">
									<div className="h-5 bg-secondary rounded-full w-full" />
									<div className="h-5 bg-secondary rounded-full w-4/5" />
									<div className="h-5 bg-secondary rounded-full w-2/3" />
								</div>
								<div className="mt-12 pt-6 border-t border-border flex justify-between items-center">
									<span className="text-sm font-medium text-muted-foreground">Opening native app</span>
									<Check className="w-6 h-6 text-green-500" />
								</div>
							</div>
						</div>
					</div>
				</section>

                <div id="platforms" className="py-12">
				    <SupportedPlatforms />
                </div>
			</main>

			{/* Minimal Footer */}
			<footer className="py-12 px-6 max-w-7xl mx-auto border-t border-border">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-2 font-bold text-lg text-foreground">
						<Zap className="h-4 w-4 fill-foreground" />
						<span>Wify.my</span>
					</div>
					<div className="flex gap-8 text-sm font-medium text-muted-foreground">
						<a href="#" className="hover:text-foreground transition-colors">Privacy</a>
						<a href="#" className="hover:text-foreground transition-colors">Terms</a>
						<a href="https://tally.so/r/7RKqRZ" target="_blank" className="hover:text-foreground transition-colors">Waitlist</a>
					</div>
					<div className="text-sm text-muted-foreground font-medium">
						© {new Date().getFullYear()} Wify. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
