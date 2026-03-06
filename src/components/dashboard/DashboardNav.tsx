'use client';

import Link from "next/link";
import { Zap, UserCircle, Link as LinkIcon, Palette } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function DashboardNav() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("page");
  
  const querySuffix = pageId ? `?page=${pageId}` : "";

  return (
    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
        <Zap className="w-5 h-5 text-muted-foreground" />
        Overview
      </Link>
      <Link 
        href={`/dashboard/links${querySuffix}`} 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium ${!pageId && 'opacity-50 pointer-events-none'}`}
      >
        <LinkIcon className="w-5 h-5 text-muted-foreground" />
        Links
      </Link>
      <Link 
        href={`/dashboard/appearance${querySuffix}`} 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium ${!pageId && 'opacity-50 pointer-events-none'}`}
      >
        <Palette className="w-5 h-5 text-muted-foreground" />
        Appearance
      </Link>
      <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
        <UserCircle className="w-5 h-5 text-muted-foreground" />
        Master Profile
      </Link>
    </nav>
  );
}
