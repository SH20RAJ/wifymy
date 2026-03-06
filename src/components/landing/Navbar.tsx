'use client';

import { Zap, ArrowUpRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useUser } from '@stackframe/stack';
import Link from 'next/link';

export function Navbar() {
	const user = useUser();

	return (
		<nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
			<div className="bg-card text-card-foreground rounded-full px-6 py-4 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-border/50">
				<div className="flex items-center gap-2 font-bold text-xl tracking-tight">
					<Zap className="h-5 w-5 fill-foreground" />
					<span>Wify.my</span>
				</div>
				<div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
					<Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
					<Link href="/#why" className="hover:text-foreground transition-colors">Why Wify</Link>
					<Link href="/#platforms" className="hover:text-foreground transition-colors">Platforms</Link>
				</div>
				<div className="flex items-center gap-4">
					<ThemeToggle />
					{user ? (
						<Link href="/dashboard">
							<Button variant="default" className="rounded-full px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-10 shadow-sm">
								Dashboard <ArrowUpRight className="ml-1 h-4 w-4" />
							</Button>
						</Link>
					) : (
						<Link href="/handler/sign-in">
							<Button variant="default" className="rounded-full px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-10 shadow-sm">
								Login <User className="ml-2 w-4 h-4" />
							</Button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
