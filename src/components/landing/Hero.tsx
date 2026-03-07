'use client';

import { useState } from 'react';
import { generateLinks } from '@/lib/deep-links';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Copy, Check, ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Hero() {
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
		<section className="relative rounded-[2.5rem] bg-card overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border">
			{/* Abstract Background Elements matching Lattice/Trvvrat */}
			<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/80 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 opacity-60 pointer-events-none" />

			<div className="relative pt-32 pb-40 px-6 sm:px-12 md:px-20 lg:px-32 text-center flex flex-col items-center">
				<div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background text-xs font-bold text-foreground border border-border tracking-widest mb-10 shadow-sm pointer-events-none">
					<Zap className="h-3.5 w-3.5 fill-foreground" /> ZERO SETUP. INSTANT OPEN.
				</div>

				<h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-foreground leading-[1.05] max-w-4xl text-balance mb-8">
					Your ultimate <span className="text-muted-foreground">universal smart links.</span>
				</h1>

				<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 text-balance">
					Create stunning bio pages or generate instant, zero-auth deeplinks that open directly in native apps. Elite engineering, free for everyone.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 mb-14">
					<Link href="/dashboard">
						<Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-lg group">
							Create Hero Page <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</Link>
					<Link href="#features">
						<Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold border-border hover:bg-secondary/50">
							How it works
						</Button>
					</Link>
				</div>

				{/* Generator Form styled Premium */}
				<div className="w-full max-w-2xl relative z-10 transition-all">
					<div className="bg-background rounded-full p-2.5 flex flex-col sm:flex-row gap-2 shadow-[0_15px_40px_rgb(0,0,0,0.12)] ring-1 ring-border/50 focus-within:ring-primary/20 focus-within:ring-2 transition-all">
						<form onSubmit={handleGenerate} className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
							<Input
								type="text"
								placeholder="Paste any link (No login required)..."
								value={inputUrl}
								onChange={(e) => setInputUrl(e.target.value)}
								className="border-0 bg-transparent h-14 md:h-16 text-lg focus-visible:ring-0 shadow-none px-6 flex-1 rounded-full placeholder:text-muted-foreground"
							/>
							<Button type="submit" size="lg" className="h-14 md:h-16 px-8 rounded-full text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 min-w-[160px] inline-flex items-center justify-center shadow-md">
								Fix Link <Zap className="ml-2 w-4 h-4 fill-current" />
							</Button>
						</form>
					</div>
                    <p className="mt-4 text-sm text-muted-foreground/60 font-medium">
                        Instant deep-links are anonymous. Managed slugs require a free account.
                    </p>

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
									variant="default" // Using default which maps to the primary styled button or secondary to look grey
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
	);
}
