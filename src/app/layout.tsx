import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL('https://wify.my'),
	title: {
		default: 'Wify – Open social links directly in apps',
		template: '%s | Wify',
	},
	description: 'Generate smart links that open Instagram, YouTube, TikTok, and Telegram directly in their apps. Free, unlimited, no tracking.',
	keywords: ['deep link generator', 'open in app', 'instagram deep link', 'youtube app link', 'tiktok deep link', 'social media deep linking', 'app opener'],
	authors: [{ name: 'Wify Team' }],
	creator: 'Wify',
	publisher: 'Wify',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://wify.my',
		title: 'Wify – Open social links directly in apps',
		description: 'Stop losing engagement. Open Instagram, YouTube, and TikTok links directly in the native app.',
		siteName: 'Wify',
		images: [
			{
				url: '/og.png', // We should strictly have this image, but placeholder for now is standard practice
				width: 1200,
				height: 630,
				alt: 'Wify - Smart Deep Link Generator',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Wify – Open social links directly in apps',
		description: 'Stop losing engagement. Open Instagram, YouTube, and TikTok links directly in the native app.',
		// images: ['/og.png'],
		creator: '@wify_my',
	},
	alternates: {
		canonical: '/',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body>{children}</body>
		</html>
	);
}
