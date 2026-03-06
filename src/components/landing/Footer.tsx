import { Zap } from 'lucide-react';

export function Footer() {
	return (
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
	);
}
