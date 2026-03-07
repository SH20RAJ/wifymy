'use client';

import Link from "next/link";
import { Zap, UserCircle, Link as LinkIcon, Palette, BarChart3, ChevronRight } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardNav() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageId = searchParams.get("page");
  
  const querySuffix = pageId ? `?page=${pageId}` : "";

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Zap, color: "text-primary", bgColor: "bg-primary/10" },
    { name: "Smart Deeplinks", href: "/dashboard/deeplinks", icon: LinkIcon, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  ];

  const pageItems = [
    { name: "Links", href: `/dashboard/links${querySuffix}`, icon: LinkIcon, color: "text-blue-500", bgColor: "bg-blue-500/10", needsPage: true },
    { name: "Appearance", href: `/dashboard/appearance${querySuffix}`, icon: Palette, color: "text-pink-500", bgColor: "bg-pink-500/10", needsPage: true },
    { name: "Analytics", href: `/dashboard/analytics${querySuffix}`, icon: BarChart3, color: "text-emerald-500", bgColor: "bg-emerald-500/10", needsPage: true },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto no-scrollbar pb-2 md:pb-0 px-2 -mx-2 md:mx-0">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href} 
            className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border border-transparent shrink-0 md:shrink group",
                isActive 
                  ? "bg-white/10 text-white border-white/10 shadow-lg shadow-black/20" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white hover:border-white/5"
            )}
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", item.bgColor)}>
                <item.icon className={cn("w-4 h-4", item.color)} />
            </div>
            {item.name}
            {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden md:block opacity-50" />}
          </Link>
        );
      })}

      <div className="md:my-4 w-px md:w-full h-8 md:h-px bg-white/5 shrink-0 mx-2 md:mx-0 self-center md:self-auto" />
      
      <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] px-4 mb-2 hidden md:block">Page Management</div>
      
      <div className="flex flex-row md:flex-col gap-1">
        {pageItems.map((item) => {
          const itemPath = item.href.split('?')[0];
          const isActive = pathname === itemPath;
          const isDisabled = item.needsPage && !pageId;

          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border border-transparent shrink-0 md:shrink group",
                  isActive 
                    ? "bg-white/10 text-white border-white/10 shadow-lg shadow-black/20" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white hover:border-white/5",
                  isDisabled && "opacity-40 cursor-not-allowed pointer-events-none filter grayscale"
              )}
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", item.bgColor)}>
                  <item.icon className={cn("w-4 h-4", item.color)} />
              </div>
              {item.name}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden md:block opacity-50" />}
            </Link>
          );
        })}
      </div>

      <div className="md:my-4 w-px md:w-full h-8 md:h-px bg-white/5 shrink-0 mx-2 md:mx-0 self-center md:self-auto" />
      
      <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] px-4 mb-2 hidden md:block">Settings</div>
      
      <Link 
        href="/dashboard/profile" 
        className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border border-transparent shrink-0 md:shrink group",
            pathname === "/dashboard/profile"
              ? "bg-white/10 text-white border-white/10 shadow-lg shadow-black/20"
              : "text-neutral-400 hover:bg-white/5 hover:text-white hover:border-white/5"
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <UserCircle className="w-4 h-4 text-purple-500" />
        </div>
        Master Profile
      </Link>
    </nav>
  );
}
