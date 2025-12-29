import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Wify – Open links in apps',
	description: 'Open social media links directly in their native apps. No tracking, no login.',
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
