import type { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
	title: 'Wifymy | Open social links directly in apps',
	description: 'Bypass limited in-app browsers and ensure your audience engages natively. Maximize conversions safely.',
};

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
