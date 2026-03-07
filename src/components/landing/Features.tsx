import { Zap, Layout, BarChart3 } from 'lucide-react';

export function Features() {
	return (
		<section id="features" className="py-20 lg:py-28">
			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
					The Powerhouse you Need,<br /> <span className="text-muted-foreground">To Scale your Brand</span>
				</h2>
			</div>
			
			<div className="grid md:grid-cols-3 gap-6">
				<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
					<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
						<Layout className="w-7 h-7 text-foreground" />
					</div>
					<div>
						<h3 className="text-2xl font-medium mb-4">Smart Profiles</h3>
						<p className="text-muted-foreground leading-relaxed text-lg">
							Stunning, customizable Link-in-bio pages with premium animated themes. Showcase your brand with artistic precision.
						</p>
					</div>
				</div>
				
				<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
					<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
						<Zap className="w-7 h-7 text-foreground" />
					</div>
					<div>
						<h3 className="text-2xl font-medium mb-4">Smart Deeplinks</h3>
						<p className="text-muted-foreground leading-relaxed text-lg">
							Bypass in-app browsers entirely. Force social links to open directly in native apps for maximum engagement.
						</p>
					</div>
				</div>

				<div className="bg-card rounded-[2rem] p-10 lg:p-12 border border-border shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
					<div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-10 shadow-sm">
						<BarChart3 className="w-7 h-7 text-foreground" />
					</div>
					<div>
						<h3 className="text-2xl font-medium mb-4">Elite Analytics</h3>
						<p className="text-muted-foreground leading-relaxed text-lg">
							Real-time insights on your audience. Track views, clicks, and device types with our privacy-first engine.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
