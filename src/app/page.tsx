'use client';

import { useState } from 'react';
import { generateLinks } from '@/lib/deep-links';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
			setError('Unsupported link or username format.');
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

	return (
		<div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100 font-sans selection:bg-blue-100 selection:text-blue-900">

			{/* Navbar / Logo */}
			<header className="p-6 border-b border-gray-100 dark:border-gray-900">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<div className="font-bold text-xl tracking-tight">Wify.my</div>
					<div className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors cursor-pointer">
						GitHub
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-6 py-16 md:py-24">

				{/* Hero Section */}
				<div className="text-center space-y-6 mb-16">
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white text-balance">
						Open social links <br /><span className="text-gray-500 dark:text-gray-400">directly in apps</span>
					</h1>
					<p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-balance leading-relaxed">
						Paste any Instagram, YouTube, TikTok, or Telegram link and get a smart link that opens in the native app — no login, no tracking.
					</p>
				</div>

				{/* Input Form */}
				<div className="max-w-xl mx-auto mb-20 relative">
					<form onSubmit={handleGenerate} className="flex flex-col gap-4">
						<div className="flex gap-2 relative">
							<Input
								type="text"
								placeholder="Paste link or username (e.g. instagram.com/shaswat, @shaswat)"
								value={inputUrl}
								onChange={(e) => setInputUrl(e.target.value)}
								className="shadow-sm h-14 text-lg"
								autoFocus
							/>
							<Button type="submit" size="lg" className="h-14 px-8 text-base shadow-sm">
								Generate <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</form>

					{/* Error Message */}
					{error && (
						<div className="mt-4 p-4 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/50 animate-in fade-in slide-in-from-top-2">
							{error}
						</div>
					)}

					{/* Generated Result */}
					{generatedLink && (
						<div className="mt-6 p-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 animate-in fade-in slide-in-from-top-4 duration-500">
							<div className="flex items-center gap-2 p-2 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
								<div className="flex-1 px-3 py-2 font-mono text-base truncate select-all text-gray-800 dark:text-gray-200">
									{generatedLink}
								</div>
								<Button
									onClick={copyToClipboard}
									variant={copied ? "default" : "outline"}
									size="sm"
									className={cn(
										"h-10 px-5 transition-all duration-300",
										copied ? "bg-green-600 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-600 text-white border-transparent" : ""
									)}
								>
									{copied ? (
										<>
											<Check className="mr-2 h-4 w-4" /> Copied
										</>
									) : (
										<>
											<Copy className="mr-2 h-4 w-4" /> Copy
										</>
									)}
								</Button>
							</div>
						</div>
					)}
				</div>

				{/* Trust Section */}
				<div className="grid md:grid-cols-3 gap-6 mb-24">
					<TrustCard
						icon={<ShieldCheck className="h-6 w-6 text-gray-900 dark:text-white" />}
						title="No Tracking"
						desc="We don’t log clicks, IPs, or behavior. Ever."
					/>
					<TrustCard
						icon={<Lock className="h-6 w-6 text-gray-900 dark:text-white" />}
						title="No Login"
						desc="Paste, generate, share. That’s it."
					/>
					<TrustCard
						icon={<Zap className="h-6 w-6 text-gray-900 dark:text-white" />}
						title="Unlimited & Free"
						desc="Use it as much as you want. Forever."
					/>
				</div>

				{/* SEO Content Section */}
				<section className="prose dark:prose-invert max-w-none hover:prose-a:text-blue-500 transition-colors">
					<h2 className="text-2xl font-bold tracking-tight mb-6">Why open links in apps instead of browsers?</h2>
					<div className="grid md:grid-cols-2 gap-12 text-gray-600 dark:text-gray-400 leading-relaxed">
						<div className="space-y-4">
							<p>
								Social media apps are designed for engagement. When you share a standard link, it often opens in a limited in-app browser or the mobile web, where users aren&apos;t logged in. This kills conversion and engagement.
							</p>
							<p>
								<strong>Wify</strong> acts as a smart bridge. It detects the device and attempts to
								deep link directly into the native app.
								Whether you need to <strong>open Instagram links in app</strong>, ensure a YouTube video plays in the player, or get a TikTok to load properly, Wify handles the complex routing for you.
							</p>
						</div>
						<div className="space-y-4">
							<p>
								Our <strong>deep link generator</strong> works for all major platforms.
								Generate an <strong>Instagram deep link</strong> for your bio, a <strong>YouTube deep link</strong> for your newsletter, or a <strong>TikTok deep link</strong> for cross-promotion.
							</p>
							<p>
								Best of all, we believe in privacy. Unlike other link shorteners, we store zero data. Your audience lands where you want them, instantly.
							</p>
						</div>
					</div>
				</section>

			</main>

			{/* Footer */}
			<footer className="py-12 border-t border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-black">
				<div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
					<p>Wify – Open links the right way.</p>
					<div className="flex gap-6">
						<a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Privacy</a>
						<a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Terms</a>
						<span className="opacity-50 cursor-not-allowed">Pro (Soon)</span>
					</div>
				</div>
			</footer>
		</div>
	);
}

function TrustCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
	return (
		<Card className="border-0 shadow-none bg-gray-50 dark:bg-gray-900/50">
			<CardContent className="pt-6">
				<div className="mb-4 bg-white dark:bg-black w-12 h-12 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm">
					{icon}
				</div>
				<h3 className="font-semibold text-lg mb-2">{title}</h3>
				<p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
			</CardContent>
		</Card>
	)
}
