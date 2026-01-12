'use client';

import { useState } from 'react';
import { generateLinks } from '@/lib/deep-links';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check, ArrowRight, ShieldCheck, Zap, Lock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SupportedPlatforms } from '@/components/SupportedPlatforms';

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
			setError('Unsupported link or username format. Please try a full URL or @username.');
			return;
		}

		const cleanOriginal = data.originalUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
		const origin = typeof window !== 'undefined' ? window.location.origin : 'https://wify.my';

		setGeneratedLink(`${origin}/${cleanOriginal}`);
	};

	const copyToClipboard = () => {
		if (!generatedLink) return;
		navigator.clipboard.writeText(generatedLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Wify',
		applicationCategory: 'UtilityApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		description: 'Generate smart links that open Instagram, YouTube, TikTok, and Telegram directly in their apps.',
		featureList: 'Deep linking, Social Media App Opener, No Login, No Tracking',
	};

	return (
		<div className="min-h-screen bg-white text-gray-900 dark:bg-[#09090b] dark:text-gray-100 font-sans selection:bg-blue-500/30 selection:text-current transition-colors">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			{/* Header */}
			<nav className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-white/5">
				<div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
					<div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
						<Zap className="h-5 w-5 text-blue-500 fill-blue-500" />
						<span>Wify.my</span>
					</div>
					<div className="hidden sm:flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
						<a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
						<a href="#why" className="hover:text-gray-900 dark:hover:text-white transition-colors">Why Wify</a>
					</div>
					<a href="https://tally.so/r/7RKqRZ" target="_blank" rel="noopener noreferrer">
						<Button variant="outline" size="sm" className="rounded-full px-5 text-xs font-semibold">
							Join Waitlist
						</Button>
					</a>
				</div>
			</nav>

			<main>
				{/* Hero Section */}
				<section className="relative pt-20 pb-32 overflow-hidden">
					{/* Subtle Background Glow */}
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

					<div className="max-w-5xl mx-auto px-6 text-center space-y-8">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-700">
							<Zap className="h-3 w-3" /> Zero Setup. Instant Open.
						</div>

						<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-950 dark:text-white text-balance leading-[1.1]">
							Open social links <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">directly in apps</span>
						</h1>

						<p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-balance">
							Stop losing engagement. Generate smart links that bypass in-app browsers and open Instagram, YouTube, and TikTok natively.
						</p>

						{/* Input Form Container */}
						<div className="max-w-2xl mx-auto mt-12 relative group">
							<div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />

							<div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/20">
								<form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-2">
									<div className="relative flex-1">
										<Input
											type="text"
											placeholder="Paste link or @username..."
											value={inputUrl}
											onChange={(e) => setInputUrl(e.target.value)}
											className="border-0 bg-transparent h-14 text-lg focus-visible:ring-0 shadow-none px-4"
										/>
									</div>
									<Button type="submit" variant="primary" size="lg" className="h-14 sm:h-14 px-10 rounded-xl text-base font-bold shadow-lg shadow-blue-500/20">
										Generate <ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</form>
							</div>

							{/* Status / Error */}
							{error && (
								<div className="mt-4 text-sm font-medium text-red-500 text-center animate-in fade-in slide-in-from-top-2">
									{error}
								</div>
							)}

							{/* Result Area */}
							{generatedLink && (
								<div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
									<div className="bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 p-4 rounded-2xl space-y-4 shadow-inner">
										<div className="flex items-center justify-between px-2">
											<span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Your Smart Link</span>
											<a href={generatedLink} target="_blank" className="text-xs font-medium text-gray-500 hover:text-blue-500 flex items-center gap-1 transition-colors">
												Preview <ExternalLink className="h-3 w-3" />
											</a>
										</div>
										<div className="flex items-center gap-3 bg-white dark:bg-gray-950 p-3 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
											<code className="flex-1 text-base md:text-lg font-mono text-gray-800 dark:text-gray-200 truncate select-all px-2">
												{generatedLink}
											</code>
											<Button
												onClick={copyToClipboard}
												variant={copied ? "default" : "outline"}
												className={cn(
													"h-12 px-6 rounded-lg font-bold transition-all duration-300",
													copied ? "bg-green-600 hover:bg-green-600 text-white border-transparent" : "dark:border-white/10"
												)}
											>
												{copied ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
											</Button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>

				<SupportedPlatforms />

				{/* Features / Trust Section */}
				<section id="features" className="py-24 bg-gray-50 dark:bg-white/2 border-y border-gray-100 dark:border-white/5">
					<div className="max-w-5xl mx-auto px-6">
						<div className="grid md:grid-cols-3 gap-8">
							<TrustCard
								icon={<ShieldCheck className="h-6 w-6" />}
								title="Privacy First"
								desc="We don't log clicks, IPs, or behavior. Your links are yours. No cookies, no trackers."
								color="blue"
							/>
							<TrustCard
								icon={<Lock className="h-6 w-6" />}
								title="Zero Auth"
								desc="No accounts, no onboarding. Just paste, generate, and share. Completely frictionless."
								color="indigo"
							/>
							<TrustCard
								icon={<Zap className="h-6 w-6" />}
								title="Blazing Fast"
								desc="Built on Edge runtime for sub-millisecond redirects worldwide. Speed is our priority."
								color="blue"
							/>
						</div>
					</div>
				</section>

				{/* SEO / Why Content */}
				<section id="why" className="py-32">
					<div className="max-w-5xl mx-auto px-6">
						<div className="max-w-3xl space-y-12">
							<div className="space-y-4">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why use dynamic deep links?</h2>
								<div className="h-1 w-20 bg-blue-500 rounded-full" />
							</div>

							<div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
								<div className="space-y-6">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white">Better Conversion</h3>
									<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
										Social media apps are designed for engagement. When you share a standard link, it often opens in a limited in-app browser where users aren&apos;t logged in. This kills conversion.
										<strong> Wify</strong> ensures users land directly in their app.
									</p>
									<ul className="space-y-3 text-sm font-medium text-gray-500 dark:text-gray-400">
										<li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" /> Open Instagram links in app</li>
										<li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" /> Direct YouTube app player</li>
										<li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" /> Native TikTok video experience</li>
									</ul>
								</div>

								<div className="space-y-6">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white">Built for Growth</h3>
									<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
										Our <strong>deep link generator</strong> works for all major platforms. Use it for your Bio-link, newsletters, or cross-promotion. Get an <strong>Instagram deep link</strong> that works every time.
									</p>
									<p className="text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-2 border-blue-500/20 pl-4">
										&ldquo;The simplest way to improve social CTR without adding analytics bloat.&rdquo;
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="py-16 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black">
				<div className="max-w-5xl mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-8">
						<div className="flex items-center gap-2 font-bold text-lg opacity-70">
							<Zap className="h-4 w-4 text-blue-500 fill-blue-500" />
							<span>Wify.my</span>
						</div>
						<div className="flex gap-10 text-xs font-semibold text-gray-500 uppercase tracking-widest">
							<a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
							<a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
							<a href="https://tally.so/r/7RKqRZ" target="_blank" className="hover:text-blue-500 transition-colors text-blue-500">Waitlist</a>
						</div>
						<p className="text-xs text-gray-400 font-medium">
							&copy; {new Date().getFullYear()} Wify. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

function TrustCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: 'blue' | 'indigo' }) {
	return (
		<Card className="border-0 shadow-none bg-transparent group">
			<CardContent className="p-0 space-y-4">
				<div className={cn(
					"w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-lg",
					color === 'blue' ? "bg-blue-500 text-white shadow-blue-500/20" : "bg-indigo-600 text-white shadow-indigo-500/20"
				)}>
					{icon}
				</div>
				<h3 className="text-xl font-bold tracking-tight">{title}</h3>
				<p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
			</CardContent>
		</Card>
	)
}
