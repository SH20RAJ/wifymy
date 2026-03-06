import { ShieldCheck, Lock, Zap } from 'lucide-react';

export function Features() {
	return (
		<section id="features" className="py-20 lg:py-28">
			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
					The help you Need,<br /> <span className="text-muted-foreground">When you Need it</span>
				</h2>
			</div>
			
			<div className="grid md:grid-cols-3 gap-6">
				<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
					<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
						<ShieldCheck className="w-7 h-7 text-foreground" />
					</div>
					<div>
						<h3 className="text-2xl font-medium mb-4">Privacy First</h3>
						<p className="text-muted-foreground leading-relaxed text-lg">
							We never log your clicks, IPs, or behavior. Your generated links are yours. No cookies, no invasive tracking.
						</p>
					</div>
				</div>
				
				<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
					<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
						<Lock className="w-7 h-7 text-foreground" />
					</div>
					<div>
						<h3 className="text-2xl font-medium mb-4">Zero Auth</h3>
						<p className="text-muted-foreground leading-relaxed text-lg">
							No accounts, no onboarding friction. Just paste, generate, and share instantly without a fuss.
						</p>
					</div>
				</div>

				<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
					<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
						<Zap className="w-7 h-7 text-foreground" />
					</div>
					<div>
						<h3 className="text-2xl font-medium mb-4">Edge Speed</h3>
						<p className="text-muted-foreground leading-relaxed text-lg">
							Built on Edge runtime for sub-millisecond redirects worldwide. True blazing fast performance.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
