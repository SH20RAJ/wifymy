'use client';

import Link from "next/link";
import { Zap, UserCircle, Link as LinkIcon, Palette, BarChart3 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function DashboardNav() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("page");
  
  const querySuffix = pageId ? `?page=${pageId}` : "";

  return (
    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 px-2">
      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:backdrop-blur-md transition-all duration-300 text-sm font-medium border border-transparent hover:border-white/10 group">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4 text-primary" />
        </div>
        Overview
      </Link>
      <Link href="/dashboard/deeplinks" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:backdrop-blur-md transition-all duration-300 text-sm font-medium border border-transparent hover:border-white/10 group">
        <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <LinkIcon className="w-4 h-4 text-yellow-500" />
        </div>
        Smart Deeplinks
      </Link>
      <div className="md:my-2 w-px md:w-full h-full md:h-px bg-border/50 shrink-0" />
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2 hidden md:block mt-2">Page Management</div>
      <Link 
        href={`/dashboard/links${querySuffix}`} 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:backdrop-blur-md transition-all duration-300 text-sm font-medium border border-transparent hover:border-white/10 group ${!pageId && 'opacity-50 pointer-events-none'}`}
      >
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <LinkIcon className="w-4 h-4 text-blue-500" />
        </div>
        Links
      </Link>
      <Link 
        href={`/dashboard/appearance${querySuffix}`} 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:backdrop-blur-md transition-all duration-300 text-sm font-medium border border-transparent hover:border-white/10 group ${!pageId && 'opacity-50 pointer-events-none'}`}
      >
        <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Palette className="w-4 h-4 text-pink-500" />
        </div>
        Appearance
      </Link>
      <Link 
        href={`/dashboard/analytics${querySuffix}`} 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:backdrop-blur-md transition-all duration-300 text-sm font-medium border border-transparent hover:border-white/10 group ${!pageId && 'opacity-50 pointer-events-none'}`}
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
        </div>
        Analytics
      </Link>
      <div className="md:my-2 w-px md:w-full h-full md:h-px bg-border/50 shrink-0" />
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2 hidden md:block mt-2">Account</div>
      <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:backdrop-blur-md transition-all duration-300 text-sm font-medium border border-transparent hover:border-white/10 group">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <UserCircle className="w-4 h-4 text-purple-500" />
        </div>
        Master Profile
      </Link>
    </nav>
  );
}
