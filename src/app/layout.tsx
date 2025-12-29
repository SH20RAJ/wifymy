import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Wify – Open social links directly in apps',
	description: 'Generate smart links that open Instagram, YouTube, TikTok, and Telegram directly in their apps. Free, unlimited, no tracking.',
	robots: {
		index: false,
		follow: false,
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
