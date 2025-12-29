'use client';

import { useState } from 'react';
import { generateLinks } from '@/lib/deep-links';

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
			setError('This link type is not supported yet.');
			return;
		}

		// Construct valid wify.my link
		// Remove protocol from inputUrl to keep it clean if user pasted https://
		const cleanOriginal = data.originalUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');

		// Ensure we are pointing to current origin
		// In dev: localhost:3000, in prod: wify.my
		// We will use window.location.origin
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
		<main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-extrabold tracking-tight">Wify</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400">Open links directly in apps</p>
				</div>

				<form onSubmit={handleGenerate} className="space-y-4">
					<div className="space-y-2">
						<input
							type="text"
							placeholder="Paste Instagram, YouTube, TikTok, X link..."
							value={inputUrl}
							onChange={(e) => setInputUrl(e.target.value)}
							className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-400"
						/>
					</div>

					<button
						type="submit"
						className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
					>
						Generate Link
					</button>
				</form>

				{error && (
					<div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md text-center">
						{error}
					</div>
				)}

				{generatedLink && (
					<div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
						<label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Generated Link</label>
						<div className="flex items-center gap-2">
							<input
								readOnly
								value={generatedLink}
								className="flex-1 bg-transparent text-sm font-mono truncate focus:outline-none"
							/>
							<button
								onClick={copyToClipboard}
								className="text-sm px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
							>
								{copied ? 'Copied!' : 'Copy'}
							</button>
						</div>
					</div>
				)}

				<div className="pt-8 text-center">
					<p className="text-xs text-gray-400">
						No tracking. No login. Unlimited.
					</p>
				</div>
			</div>
		</main>
	);
}
