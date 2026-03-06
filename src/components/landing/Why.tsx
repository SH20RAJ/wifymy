import { ArrowUpRight, Smartphone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Why() {
	return (
		<section id="why" className="py-12">
			<div className="bg-card rounded-[2.5rem] border border-border p-8 md:p-16 lg:p-24 shadow-sm flex flex-col lg:flex-row gap-16 lg:items-center">
				<div className="flex-1 space-y-8">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.05]">
						Enhancing the Entire <br /> Engagement Cycle
					</h2>
					<p className="text-xl text-muted-foreground leading-relaxed max-w-xl text-balance">
						Social apps trap users in limited in-app browsers where they aren&apos;t logged in. This kills conversions. Wify ensures users land directly in the native app safely.
					</p>
					<div className="pt-4">
						<a href="https://tally.so/r/7RKqRZ" target="_blank" rel="noopener noreferrer">
							<Button className="rounded-full h-14 px-8 text-base font-semibold bg-primary text-primary-foreground">
								Start generating now <ArrowUpRight className="ml-2 w-5 h-5" />
							</Button>
						</a>
					</div>
				</div>

				{/* Mockup/Visual side */}
				<div className="flex-1 flex justify-center lg:justify-end">
					<div className="w-full max-w-md bg-background rounded-[2rem] p-8 border border-border shadow-xl relative overflow-hidden">
						<div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-500 to-indigo-500" />
						<div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-red-400" />
						<div className="flex items-center gap-5 mb-10">
							<div className="w-14 h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center">
								<Smartphone className="w-6 h-6" />
							</div>
							<div>
								<div className="text-base font-semibold">Instagram Deep Link</div>
								<div className="text-sm text-muted-foreground">Redirecting to app...</div>
							</div>
						</div>
						<div className="space-y-4 mb-4">
							<div className="h-5 bg-secondary rounded-full w-full" />
							<div className="h-5 bg-secondary rounded-full w-4/5" />
							<div className="h-5 bg-secondary rounded-full w-2/3" />
						</div>
						<div className="mt-12 pt-6 border-t border-border flex justify-between items-center">
							<span className="text-sm font-medium text-muted-foreground">Opening native app</span>
							<Check className="w-6 h-6 text-green-500" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
