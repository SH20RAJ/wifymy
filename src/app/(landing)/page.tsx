import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Why } from '@/components/landing/Why';
import { SupportedPlatforms } from '@/components/SupportedPlatforms';

export default function LandingPage() {
	return (
		<main className="pt-32 pb-32 px-4 max-w-7xl mx-auto space-y-6">
			<Hero />
			<Features />
			<Why />
			<div id="platforms" className="py-12">
				<SupportedPlatforms />
			</div>
		</main>
	);
}
